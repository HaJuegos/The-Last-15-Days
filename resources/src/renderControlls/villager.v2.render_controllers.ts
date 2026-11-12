import { MoLang, RPRenderControllerTemplates } from "simplified-mojang-jsons";

export const VillagerV2RenderController = RPRenderControllerTemplates.VillagerV3Base({
    remove: {
        "villager_v3_base": {
            arrays: {
                textures: true
            }
        }
    },
    changeRender: {
        "villager_v3_base": {
            textures: {
                0: `${MoLang.isBaby()} ? Array.baby_skins[${MoLang.property('ha:skin_variant')}] : Array.skins[${MoLang.property('ha:skin_variant')}]`
            }
        }
    },
    add: [
        {
            villager_v3_base: {
                arrays: {
                    textures: {
                        "Array.skins": [
                            "Texture.base",
                            "Texture.base_villager_dark",
                            "Texture.base_villager_middark",
                            "Texture.base_villager_light",
                            "Texture.base_villager_midlight"
                        ],
                        "Array.babySkins": [
                            "Texture.baby_base",
                            "Texture.base_baby_villager_dark",
                            "Texture.base_baby_villager_middark",
                            "Texture.base_baby_villager_light",
                            "Texture.base_baby_villager_midlight"
                        ]
                    }
                }
            }
        }
    ]
});