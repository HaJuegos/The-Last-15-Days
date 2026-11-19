import { createRPEntityClient, FormatVersionListEntities, MoLang } from "simplified-mojang-jsons";

export const IllusionerClientEntity = createRPEntityClient({
    idEntity: "ha:illusioner",
    params: {
        minEngineVersion: FormatVersionListEntities.V1_8_0,
        materials: {
            default: "raid_base",
            glowing: "raid_glow",
        },
        textures: {
            default: "textures/entity/illusioner",
            glowing: "textures/entity/glowing/illusioner/glow_illusioner",
        },
        geometry: {
            default: "geometry.illusioner",
            glowing: "geometry.illusioner.glow"
        },
        scripts: {
            scale: "0.9375",
            animate: [
                "controller_general",
                "controller_move",
                "glowing_scale",
                "clone_controller",
            ],
            preAnimation: [
                "v.riding_y_offset_with_respect_to_player = 1.25;",
                "v.riding_y_offset_on_vehicle_where_other_entites_can_stand = q.is_riding_any_entity_of_type('minecraft:minecart', 'minecraft:boat', 'minecraft:chest_boat') ? -3.0 : 0.0;",
                "v.riding_y_offset = v.riding_y_offset_with_respect_to_player + v.riding_y_offset_on_vehicle_where_other_entites_can_stand;"
            ]
        },
        animations: {
            general: "animation.evoker.general",
            casting: "animation.evoker.casting",
            look_at_target: "animation.common.look_at_target",
            move: "animation.evoker.move",
            celebrating: "animation.humanoid.celebrating",
            controller_general: "controller.animation.evoker.general",
            controller_move: "controller.animation.villager.move",
            "riding.legs": "animation.illusioner.riding.legs",
            controller_riding: "controller.animation.humanoid.riding_legs_only",
            "riding.body": "animation.humanoid.riding.body",
            glowing_scale: "animation.entity_glow.glowing_scale",
            ranged_attack: "animation.evoker.ranged_attack",
            holding: "animation.humanoid.holding",

            clone_controller: "controller.animation.illusioner.clones",
            clone_idle: "animation.illusioner.clones.idle",
        },
        particleEffects: {
            spell: "minecraft:evoker_spell"
        },
        renderControllers: [
            "controller.render.illusioner",
            {
                "controller.render.entity_glowing": "q.property('ha:is_glow')"
            }
        ],
        spawnEgg: {
            texture: "spawn_egg_evoker"
        },
        enableAttachables: true
    }
});