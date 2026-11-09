import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const SheepRenderController = RPRenderControllerTemplates.SheepV2({
    changeRender: {
        "sheep.v2": {
            geometry: `${MoLang.skinId()} == 1 ? Geometry.iron : (${MoLang.isBaby()} ? Geometry.baby : Array.geos[${MoLang.isSheared()}])`,
            materials: [
                {
                    "*": `${MoLang.skinId()} == 1 ? Material.iron : Material.default`
                }
            ],
            textures: [
                `${MoLang.skinId()} == 1 ? Texture.iron : (${MoLang.isBaby()} ? Texture.baby : Texture.default)`
            ]
        }
    }
});