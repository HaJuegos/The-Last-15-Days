import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const CreeperRenderController = RPRenderControllerTemplates.Creeper({
    changeRender: {
        "creeper": {
            geometry: `${MoLang.variant()} == 1 ? Geometry.radioactive : Geometry.default`,
            materials: [
                {
                    "*": `${MoLang.variant()} == 1 ? Material.radioactive : Material.default`
                }
            ],
            textures: {
                0: `${MoLang.variant()} ? Array.skins[${MoLang.variant()}] : Texture.default`
            }
        }
    },
    add: [
        {
            "creeper": {
                arrays: {
                    textures: {
                        "Array.skins": [
                            "Texture.default",
                            "Texture.radioactive",
                            "Texture.obsidian",
                            "Texture.debuff",
                            "Texture.mommy",
                            "Texture.ninja"
                        ]
                    }
                }
            }
        }
    ]
});