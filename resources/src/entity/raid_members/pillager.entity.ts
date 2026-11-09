import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const PillagerClientEntity = RPClientEntityTemplates.PillagerEntity({
    changeEntity: {
        materials: {
            default: "raid_base",
        }
    },
    add: {
        materials: {
            glowing: "raid_glow"
        },
        geometry: {
            glowing: "geometry.pillager.glow"
        },
        scripts: {
            animate: [
                "glowing_scale"
            ]
        },
        animations: {
            glowing_scale: "animation.entity_glow.glowing_scale",
        },
        renderControllers: [
            {
                "controller.render.entity_glowing": `${MoLang.property('ha:is_glow')}`
            }
        ]
    }
});