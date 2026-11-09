import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const CreeperClientEntity = RPClientEntityTemplates.CreeperEntity({
    add: {
        materials: {
            radioactive: "entity_alphatest"
        },
        textures: {
            radioactive: "textures/entity/creepers/radioactive",
            obsidian: "textures/entity/creepers/obsidian",
            debuff: "textures/entity/creepers/debuff",
            mommy: "textures/entity/creepers/mommy",
            ninja: "textures/entity/creepers/ninja"
        },
        geometry: {
            radioactive: "geometry.radioactive_creeper"
        },
        scripts: {
            animate: [
                {
                    radioactive_idle: `${MoLang.variant()} == 1`
                }
            ]
        },
        animations: {
            radioactive_idle: "animation.radioactive_creeper.idle",
        }
    }
});