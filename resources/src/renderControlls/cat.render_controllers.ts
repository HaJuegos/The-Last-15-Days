import { RPRenderControllerTemplates, MoLang } from "simplified-mojang-jsons";

export const CatRenderController = RPRenderControllerTemplates.CatV2({
    changeRender: {
        "cat.v2": {
            textures: {
                0: `(${MoLang.isNameAny('miembro de la comunidad', 'Miembro de la Comunidad', 'Miembro De La Comunidad')}) ? Array.member[(${MoLang.isTamed()} ? 2 : 0) + (${MoLang.isBaby()} ? 1 : 0)] : (${MoLang.isTamed()} ? (${MoLang.isBaby()} ? Array.baby_tame[${MoLang.variant()}] : Array.tame[${MoLang.variant()}]) : (${MoLang.isBaby()} ? Array.baby_skins[${MoLang.variant()}] : Array.skins[${MoLang.variant()}]))`
            }
        }
    },
    add: [
        {
            "cat.v2": {
                arrays: {
                    textures: {
                        "Array.member": [
                            "Texture.member_cat",
                            "Texture.member_cat_baby",
                            "Texture.tamed_member_cat",
                            "Texture.tamed_member_cat_baby"
                        ]
                    }
                }
            }
        }
    ]
});