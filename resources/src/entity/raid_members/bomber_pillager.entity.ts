import { createRPEntityClient, MoLang } from "simplified-mojang-jsons";

export const BomberPillagerClientEntity = createRPEntityClient({
    idEntity: "ha:bomber_pillager",
    params: {
        geometry: {
            default: "geometry.bomber_pillager",
            glowing: "geometry.bomber_pillager.glow"
        },
        materials: {
            default: "raid_base",
            glowing: "raid_glow"
        },
        textures: {
            default: "textures/entity/pillager_bomber"
        },
        scripts: {
            preAnimation: [
                `${MoLang.variable("tcos0")} = (Math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * ${MoLang.modifiedMoveSpeed()} / ${MoLang.variable("gliding_speed_value")}) * 57.3;`
            ],
            animate: [
                {
                    pillager_root_controller: `!${MoLang.isChested()}`
                },
                "controller_particles",
                "controller_shooter",
                "controller_fase",

                "glowing_scale"
            ]
        },
        animations: {
            glowing_scale: "animation.entity_glow.glowing_scale",
            controller_fase: "controller.animation.pillager_bomber.start_fase",
            controller_shooter: "controller.animation.pillager_bomber.shooting",
            controller_particles: "controller.animation.pillager_bomber.particles",

            particle: "animation.pillager_bomber.particles",
            shoot: "animation.pillager_bomber.shooting_dynamite",
            fase: "animation.pillager_bomber.fase_bomber",

            humanoid_base_pose: "animation.humanoid.base_pose",
            look_at_target_default: "animation.humanoid.look_at_target.default",
            look_at_target_gliding: "animation.humanoid.look_at_target.gliding",
            look_at_target_swimming: "animation.humanoid.look_at_target.swimming",
            move: "animation.humanoid.move",
            "riding.arms": "animation.humanoid.riding.arms",
            "riding.legs": "animation.humanoid.riding.legs",
            holding: "animation.humanoid.holding",
            "attack.rotations": "animation.humanoid.attack.rotations",
            bob: "animation.humanoid.bob",
            celebrating: "animation.humanoid.celebrating",
            controller_humanoid_base_pose: "controller.animation.humanoid.base_pose",
            controller_look_at_target: "controller.animation.humanoid.look_at_target",
            controller_move: "controller.animation.humanoid.move",
            controller_riding: "controller.animation.humanoid.riding",
            controller_attack: "controller.animation.humanoid.attack",
            controller_bob: "controller.animation.humanoid.bob",
            pillager_root_controller: "controller.animation.pillager_bomber.root",
            "riding.body": "animation.humanoid.riding.body"
        },
        renderControllers: [
            {
                "controller.render.entity_glowing": `${MoLang.property('ha:is_glow')}`
            },
            "controller.render.bomber_pillager"
        ],
        spawnEgg: {
            "texture": "spawn_egg_pillager"
        },
        enableAttachables: true,
        hideArmor: true,
        particleEffects: {
            dust: "ha:dynamite_dust"
        }
    }
});