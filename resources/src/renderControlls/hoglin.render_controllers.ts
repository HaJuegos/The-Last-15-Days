import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const HoglinRenderController = RPRenderControllerTemplates.HoglinV2({
    changeRender: {
        "hoglin.v2": {
            geometry: `${MoLang.isBaby()} ? Geometry.baby : Array.geos[${MoLang.skinId()} == 1 ? 1 : 0]`,
            textures: {
                0: `${MoLang.isBaby()} ? Texture.baby : Array.skins[${MoLang.skinId()} == 1 ? 1 : 0]`
            }
        }
    },
    add: [
        {
            "hoglin.v2": {
                arrays: {
                    geometries: {
                        "Array.geos": [
                            "Geometry.default",
                            "Geometry.new"
                        ]
                    },
                    textures: {
                        "Array.skins": [
                            "Texture.default",
                            "Texture.new"
                        ]
                    }
                },
            }
        }
    ]
});