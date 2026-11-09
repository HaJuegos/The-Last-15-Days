import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const PiglinBruteRenderController = RPRenderControllerTemplates.PiglinBrute({
    changeRender: {
        "piglin_brute": {
            geometry: `${MoLang.isBaby()} ? Geometry.baby : Geometry.default`,
            materials: [
                { "*": "Material.default" }
            ],
            textures: [`${MoLang.isBaby()} ? Texture.baby : Texture.default`]
        }
    }
});