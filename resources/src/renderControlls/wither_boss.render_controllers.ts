import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const WitherRenderController = RPRenderControllerTemplates.WitherBoss({
    changeRender: {
        wither_boss: {
            geometry: `Array.wither_geos[${MoLang.skinId()}]`,
            textures: {
                0: `Array.wither_state[${MoLang.skinId()} == 1 ? (${MoLang.variable("display_normal_skin")} * 2) : ${MoLang.variable("display_normal_skin")}]`
            },
            overlayColor: {
                r: `${MoLang.variable("is_invulnerable")} ? 1.0 : (${MoLang.variant()} > 0 ? (${MoLang.variant()} == 2 ? 0.0 : 1.0) : this)`,
                g: `${MoLang.variable("is_invulnerable")} ? 1.0 : (${MoLang.variant()} > 0 ? (${MoLang.variant()} == 3 ? 0.5 : (${MoLang.variant()} == 4 ? 1.0 : 0.0)) : this)`,
                b: `${MoLang.variable("is_invulnerable")} ? 1.0 : (${MoLang.variant()} > 0 ? (${MoLang.variant()} == 2 ? 1.0 : 0.0) : this)`,
                a: `${MoLang.variable("is_invulnerable")} ? ${MoLang.overlayAlpha()} : (${MoLang.variant()} > 0 ? (math.cos(${MoLang.lifeTime()} * 90) * 0.25 + 0.4) : this)`
            }
        }
    },
    add: [
        {
            wither_boss: {
                arrays: {
                    textures: {
                        "Array.witherState": [
                            "Texture.king"
                        ]
                    },
                    geometries: {
                        "Array.wither_geos": [
                            "Geometry.default",
                            "Geometry.king"
                        ]
                    }
                },
            }
        }
    ]
});