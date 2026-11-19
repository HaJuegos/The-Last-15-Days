import { FormatVersionListEntities, MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const WitchClientEntity = RPClientEntityTemplates.WitchEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    changeEntity: {
        materials: {
            default: "raid_base",
        }
    },
    add: {
        materials: {
            glowing: "raid_glow"
        },
        textures: {
            glowing: "textures/entity/glowing/witch/glowing_witch"
        },
        geometry: {
            glowing: "geometry.villager.witch.v1.8.glow"
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