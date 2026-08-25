const fs = require("fs");
const path = require("path");
const os = require("os");
const cp = require("child_process");
const chokidar = require("chokidar");

const BuildAddonsUtil = require("./deploy");

class WatchAddonsUtil extends BuildAddonsUtil {
    constructor() {
        super();

        const isWindows = process.platform == "win32";
        const appDataDir = isWindows ? process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming") : os.homedir();

        this.targetBP = process.env.MC_TARGET_BP || path.join(appDataDir, "Minecraft Bedrock/Users/Shared/games/com.mojang/development_behavior_packs");
        this.targetRP = process.env.MC_TARGET_RP || path.join(appDataDir, "Minecraft Bedrock/Users/Shared/games/com.mojang/development_resource_packs");

        this.warnIfMissing("MC_TARGET_BP", "targetBP", this.targetBP);
        this.warnIfMissing("MC_TARGET_RP", "targetRP", this.targetRP);

        this.mainWatcher = null;
    }

    compileWatchPack(packDir) {
        const srcDir = path.join(packDir, "src");
        const scriptsDir = path.join(packDir, "scripts");
        const entry = path.join(srcDir, "main.ts");

        if (!fs.existsSync(srcDir) || !fs.existsSync(entry)) return;

        if (fs.existsSync(scriptsDir)) {
            fs.rmSync(scriptsDir, { recursive: true, force: true });
        }

        fs.mkdirSync(scriptsDir, { recursive: true });

        console.log(`🔨 Compilando (Watch) ${path.basename(packDir)}...`);

        const cmd = `esbuild "${entry}" --bundle --sourcemap --outfile="${path.join(scriptsDir, "main.js")}" --format=esm --target=es2020 ${this.externals}`;

        try {
            cp.execSync(cmd, { stdio: "inherit", cwd: this.rootDir });
        } catch {
            console.error(`❌ Error compilando ${path.basename(packDir)}`);
        }
    }

    copyToMojang(packDir, targetBase) {
        this.copyDirectory(packDir, path.join(targetBase, path.basename(packDir)), { skipSource: true, warnOnLocked: true });
    }

    deployAll() {
        const bpPacks = this.findPacks(this.resolve("behaviors"));
        const rpPacks = this.findPacks(this.resolve("resources"));

        bpPacks.forEach((pack) => {
            this.compileWatchPack(pack);
            this.copyToMojang(pack, this.targetBP);
        });
        rpPacks.forEach((pack) => this.copyToMojang(pack, this.targetRP));

        console.log("✅ Deploy a Mojang completo con sourcemaps y sobreescritura forzada.");
    }

    startWatcher() {
        if (this.mainWatcher) this.mainWatcher.close();

        const isIgnoredForWatcher = (testPath) => {
            const normalized = testPath.replace(/\\/g, "/");

            if (/(?:^|\/)\./.test(normalized) && !normalized.endsWith(".mcignore")) {
                return true;
            }

            const segments = normalized.split("/");

            if (segments.includes("node_modules") || segments.includes("scripts")) {
                return true;
            }

            return this.ignoredList.some((ignored) => {
                const normalizedIgnored = ignored.replace(/\\/g, "/");

                return (
                    normalized == normalizedIgnored ||
                    normalized.endsWith("/" + normalizedIgnored) ||
                    normalized.startsWith(normalizedIgnored + "/") ||
                    normalized == normalizedIgnored.replace(/\/$/, "")
                );
            });
        };

        this.mainWatcher = chokidar.watch([this.resolve("behaviors"), this.resolve("resources")], {
            ignored: isIgnoredForWatcher,
            ignoreInitial: true,
            awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
        });

        let timeout;

        this.mainWatcher.on("all", (event, filePath) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log(`🔄 Cambio detectado en: ${filePath}`);
                this.deployAll();
            }, 300);
        });

        console.log("👀 Watcher iniciado.");
    }

    run() {
        const allPacks = [...this.findPacks(this.resolve("behaviors")), ...this.findPacks(this.resolve("resources"))];

        if (allPacks.length == 0) {
            console.error("❌ No se encontraron packs con manifest.json.");
            process.exit(1);
        }

        this.deployAll();
        this.startWatcher();

        chokidar.watch(this.resolve(".mcignore"), { ignoreInitial: true }).on("all", () => {
            console.log("🔄 .mcignore actualizado. Recargando...");

            this.reloadIgnored();
            this.deployAll();
            this.startWatcher();
        });
    }
}

WatchAddonsUtil.prototype.externals = [
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-gametest",
    "@minecraft/server-graphics",
    "@minecraft/server-net",
    "@minecraft/debug-utilities",
    "@minecraft/gameplay-utilities",
]
    .map((external) => `--external:${external}`)
    .join(" ");

if (require.main == module) {
    new WatchAddonsUtil().run();
}

module.exports = WatchAddonsUtil;
