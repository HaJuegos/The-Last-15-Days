import { RPRenderControllerTemplates, MoLang } from "simplified-mojang-jsons";

export const CatRenderController = RPRenderControllerTemplates.CatV2({
    changeRender: {
        "cat.v2": {
            textures: {
                0: `${MoLang.isNameAny('miembro de la comunidad')} ? (${MoLang.isBaby()} ? Array.baby_skins[11] : Array.skins[11]) : (${MoLang.isTamed()} ? (${MoLang.isBaby()} ? Array.baby_tame[${MoLang.variant()}] : Array.tame[${MoLang.variant()}]) : (${MoLang.isBaby()} ? Array.baby_skins[${MoLang.variant()}] : Array.skins[${MoLang.variant()}]))`
            }
        }
    },
    add: [
        {
            "cat.v2": {
                arrays: {
                    textures: {
                        "Array.skins": [
                            "Texture.member_cat"
                        ],
                        "Array.babySkins": [
                            "Texture.member_cat_baby"
                        ]
                    }
                }
            }
        }
    ]
});