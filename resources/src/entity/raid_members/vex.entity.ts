import { FormatVersionListEntities, MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const VexClientEntity = RPClientEntityTemplates.VexEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    changeEntity: {
        materials: {
            default: "raid_base"
        }
    },
    add: {
        materials: {
            glowing: "raid_glow"
        },
        textures: {
            glowing: "textures/entity/glowing/vex/glow_vex",
            glowing_charged: "textures/entity/vex/ravager/glow_vex_charging"
        },
        geometry: {
            glowing: "geometry.vex.v1.8.glow"
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
                "controller.render.entity_glowing.vex": `${MoLang.property('ha:is_glow')}`
            }
        ]
    }
});