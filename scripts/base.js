const fs = require("fs");
const path = require("path");

class BaseExportUtilAddons {
    constructor() {
        this.rootDir = path.resolve(__dirname, "..");
        this.ignoredList = this.loadIgnored();
    }

    resolve(...segments) {
        return path.join(this.rootDir, ...segments);
    }

    warnIfMissing(envVar, label, dir) {
        if (!fs.existsSync(dir)) {
            console.warn(`⚠️  [${label}] La ruta no existe o no ha sido configurada (define ${envVar}): ${dir}`);
        }
    }

    loadIgnored() {
        const ignorePath = this.resolve(".mcignore");

        if (!fs.existsSync(ignorePath)) {
            return [];
        }

        return fs
            .readFileSync(ignorePath, "utf8")
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);
    }

    reloadIgnored() {
        this.ignoredList = this.loadIgnored();
    }

    isIgnored(name) {
        return this.ignoredList.some((ignored) => ignored == name || ignored.endsWith("/" + name));
    }

    findPacks(dir, result = []) {
        if (!fs.existsSync(dir)) return result;

        if (fs.existsSync(path.join(dir, "manifest.json"))) {
            result.push(dir);
            return result;
        }

        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
            if (!item.isDirectory() || this.isIgnored(item.name)) continue;

            this.findPacks(path.join(dir, item.name), result);
        }

        return result;
    }

    copyDirectory(src, dst, options = {}) {
        const { skipSource = false, warnOnLocked = false } = options;

        if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });

        for (const item of fs.readdirSync(src, { withFileTypes: true })) {
            const itemName = item.name;

            if (skipSource && itemName == "src") continue;
            if (itemName.startsWith(".") || itemName == "node_modules") continue;

            const srcPath = path.join(src, itemName);
            const dstPath = path.join(dst, itemName);

            if (item.isDirectory()) {
                this.copyDirectory(srcPath, dstPath, { warnOnLocked });
                continue;
            }

            try {
                fs.cpSync(srcPath, dstPath, { force: true });
            } catch (error) {
                const isLocked = ["EPERM", "EBUSY", "EPIPE", "EACCES"].includes(error.code);

                if (warnOnLocked && isLocked) {
                    console.warn(`\x1b[33m[Bloqueado]\x1b[0m Minecraft está usando: ${itemName} (Se omitió)`);
                    continue;
                }

                if (isLocked) {
                    console.error(`❌ Archivo en uso (${error.code}): ${srcPath}`);
                    console.error(`   No se pudo copiar a: ${dstPath}`);
                    console.error(`   Cierra el programa que lo está usando (ej. Minecraft) e intenta de nuevo.`);
                }

                throw error;
            }
        }
    }
}

module.exports = BaseExportUtilAddons;
