import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const EvocationIllagerClientEntity = RPClientEntityTemplates.EvocationIllagerEntity({
    changeEntity: {
        materials: {
            default: "raid_base"
        }
    },
    add: {
        materials: {
            glowing: "raid_glow"
        },
        geometry: {
            glowing: "geometry.evoker.v1.8.glow"
        },
        scripts: {
            animate: [
                "glowing_scale"
            ]
        },
        animations: {
            glowing_scale: "animation.entity_glow.glowing_scale",
            ranged_attack: "animation.evoker.ranged_attack"
        },
        renderControllers: [
            {
                "controller.render.entity_glowing": `${MoLang.property('ha:is_glow')}`
            }
        ]
    }
});