import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const ChickenRenderController = RPRenderControllerTemplates.ChickenV3({
    changeRender: {
        "chicken.v3": {
            geometry: `${MoLang.skinId()} == 1 ? Array.skuartu_geo[${MoLang.isBaby()} ? 1 : 0] : (${MoLang.isBaby()} ? Geometry.baby : Array.geos[${MoLang.variable("index")}])`,
            materials: [
                {
                    "*": `${MoLang.skinId()} == 1 ? Material.skuartu : (${MoLang.variable("is_cold")} ? Material.cold : Material.default)`
                }
            ],
            textures: [
                `${MoLang.skinId()} == 1 ? Array.skuartu_mode[${MoLang.isBaby()} ? 1 : 0] : (${MoLang.isBaby()} ? Array.baby_textures[${MoLang.variable("index")}] : Array.textures[${MoLang.variable("index")}])`
            ]
        }
    },
    add: [
        {
            "chicken.v3": {
                arrays: {
                    textures: {
                        "Array.skuartu_mode": [
                            "Texture.skuartu",
                            "Texture.skuartu_baby"
                        ]
                    },
                    geometries: {
                        "Array.skuartu_geo": [
                            "Geometry.skuartu",
                            "Geometry.skuartu_baby"
                        ]
                    }
                }
            }
        }
    ]
});