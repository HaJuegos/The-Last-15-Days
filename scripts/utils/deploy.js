const fs = require("fs");
const path = require("path");
const os = require("os");

const BaseExportUtilAddons = require("../base");

class BuildAddonsUtil extends BaseExportUtilAddons {
    constructor() {
        super();

        const githubBase = process.env.MC_GITHUB_BASE || path.join(os.homedir(), "Documents/GitHub");

        this.projects = [
            {
                pathBP: "tl15d",
                pathRP: "tl15d_rp",
                githubPath: process.env.MC_PROJECT_TL15D_PATH || path.join(githubBase, "The-Last-15-Days"),
            },
        ];

        this.projects.forEach((project) => this.warnIfMissing(`MC_PROJECT_${project.pathBP.toUpperCase()}_PATH`, project.pathBP, project.githubPath));
    }

    copyToMappedRepo(packDir, typeFolder) {
        const isBP = typeFolder == "behaviors";
        const mapping = this.projects.find((project) => packDir.includes(isBP ? project.pathBP : project.pathRP));

        if (!mapping) return;

        const dest = isBP ? path.join(mapping.githubPath, typeFolder, path.basename(packDir)) : path.join(mapping.githubPath, typeFolder);

        this.copyDirectory(packDir, dest);
    }

    run() {
        const bpPacks = this.findPacks(this.resolve("behaviors"));
        const rpPacks = this.findPacks(this.resolve("resources"));

        bpPacks.forEach((pack) => this.copyToMappedRepo(pack, "behaviors"));
        rpPacks.forEach((pack) => this.copyToMappedRepo(pack, "resources"));

        console.log("✅ Build completo: Desplegado en el repo con la carpeta src y sin compilar JS.");
    }
}

if (require.main == module) {
    new BuildAddonsUtil().run();
}

module.exports = BuildAddonsUtil;
