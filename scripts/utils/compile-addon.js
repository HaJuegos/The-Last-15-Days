const fs = require("fs");
const path = require("path");
const os = require("os");
const cp = require("child_process");
const AdmZip = require("adm-zip");

const BaseExportUtilAddons = require("../base");

class CompileAddonsUtil extends BaseExportUtilAddons {
    getTsFiles(dir, files = []) {
        if (!fs.existsSync(dir)) {
            return files;
        }

        for (const f of fs.readdirSync(dir)) {
            const full = path.join(dir, f);

            if (fs.statSync(full).isDirectory()) {
                this.getTsFiles(full, files);
            } else if (f.endsWith(".ts")) {
                files.push(`"${full}"`);
            }
        }

        return files;
    }

    compilePack(packDir) {
        const srcDir = path.join(packDir, "src");
        const scriptsDir = path.join(packDir, "scripts");

        if (!fs.existsSync(srcDir)) return;

        const tsFiles = this.getTsFiles(srcDir);

        if (tsFiles.length == 0) return;

        if (fs.existsSync(scriptsDir)) {
            fs.rmSync(scriptsDir, { recursive: true, force: true });
        }

        fs.mkdirSync(scriptsDir, { recursive: true });

        console.log(`🔨 Compilando (Addon con Chunks) ${path.basename(packDir)}...`);

        const cmd = `esbuild ${tsFiles.join(" ")} --bundle --splitting --format=esm --target=es2020 --outdir="${scriptsDir}" ${this.externals} --minify`;

        try {
            cp.execSync(cmd, { stdio: "inherit", cwd: this.rootDir });
        } catch {
            console.error(`❌ Error compilando ${path.basename(packDir)}`);
        }
    }

    zipPack(packDir, outDir, type) {
        const name = path.basename(packDir);

        console.log(`📦 Comprimiendo ${type}: ${name}...`);

        const zip = new AdmZip();

        this.addFolderToZip(zip, packDir, "", true);

        const packPath = path.join(outDir, `${name}_${type.toLowerCase()}.mcpack`);

        zip.writeZip(packPath);

        return packPath;
    }

    addFolderToZip(zip, localPath, zipPath, isRoot = true) {
        if (!fs.existsSync(localPath)) return;

        for (const item of fs.readdirSync(localPath, { withFileTypes: true })) {
            const itemName = item.name;

            if (isRoot && itemName == "src") continue;
            if (itemName.startsWith(".") || itemName == "node_modules") continue;

            const fullPath = path.join(localPath, itemName);
            const relPath = zipPath ? `${zipPath}/${itemName}` : itemName;

            if (item.isDirectory()) {
                this.addFolderToZip(zip, fullPath, relPath, false);
            } else {
                zip.addLocalFile(fullPath, zipPath || "");
            }
        }
    }

    run() {
        const outDir = process.env.MC_OUT_DIR || this.resolve("addons-compilados");

        this.warnIfMissing("MC_OUT_DIR", "outDir", outDir);

        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        fs.readdirSync(outDir).forEach((file) => fs.unlinkSync(path.join(outDir, file)));

        const bpPacks = this.findPacks(this.resolve("behaviors"));
        const rpPacks = this.findPacks(this.resolve("resources"));

        bpPacks.forEach((packDir) => {
            this.compilePack(packDir);
        });

        const generatedPacks = [...bpPacks.map((packDir) => this.zipPack(packDir, outDir, "BP")), ...rpPacks.map((packDir) => this.zipPack(packDir, outDir, "RP"))];

        if (generatedPacks.length == 0) {
            console.log("⚠️ No se generó ningún pack.");
        } else {
            console.log(`✅ ${generatedPacks.length} packs generados individualmente en formato .mcpack en: ${outDir}`);
        }
    }
}

CompileAddonsUtil.prototype.externals = [
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
    new CompileAddonsUtil().run();
}

module.exports = CompileAddonsUtil;
