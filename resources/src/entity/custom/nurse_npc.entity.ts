import { createRPEntityClient, MoLang } from "simplified-mojang-jsons";

export const NurseNpcClientEntity = createRPEntityClient({
    idEntity: "ha:nurse_npc",
    params: {
        materials: {
            default: "entity_alphatest"
        },
        geometry: {
            default: "geometry.humanoid.customSlim"
        },
        textures: {
            default: "textures/entity/nurse_skin"
        },
        scripts: {
            preAnimation: [
                `${MoLang.variable('tcos0')} = Math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * ${MoLang.modifiedMoveSpeed()} / ${MoLang.variable('gliding_speed_value')} * 57.3;`
            ],
            variables: {
                "variable.item_use_normalized": "public"
            },
            animate: [
                {
                    look_at_target_controller: `!${MoLang.isSleeping()}`
                },
                {
                    move_controller: `!${MoLang.isSleeping()}`
                },
                {
                    riding_controller: `!${MoLang.isSleeping()}`
                },
                "holding_controller",
                "attack_controller",
                {
                    sneaking_controller: `!${MoLang.isSleeping()}`
                },
                "bob_controller",
                "use_item_progress_controller",
                {
                    swimming_controller: `!${MoLang.isSleeping()}`
                },
                {
                    sleeping: `${MoLang.isSleeping()}`
                }
            ],
            shouldUpdateEffectsOffscreen: "1.0",
            scale: "1.0"
        },
        animations: {
            look_at_target_default: "animation.humanoid.look_at_target.default",
            look_at_target_gliding: "animation.humanoid.look_at_target.gliding",
            look_at_target_swimming: "animation.humanoid.look_at_target.swimming",
            move: "animation.humanoid.move",
            "riding.arms": "animation.humanoid.riding.arms",
            "riding.legs": "animation.humanoid.riding.legs",
            holding: "animation.humanoid.holding",
            "attack.rotations": "animation.humanoid.attack.rotations",
            sneaking: "animation.humanoid.sneaking",
            bob: "animation.humanoid.bob",
            use_item_progress: "animation.humanoid.use_item_progress",
            swimming: "animation.zombie.swimming",
            look_at_target_controller: "controller.animation.humanoid.look_at_target",
            move_controller: "controller.animation.humanoid.move",
            "riding.body": "animation.humanoid.riding.body",
            riding_controller: "controller.animation.humanoid.riding",
            holding_controller: "controller.animation.humanoid.holding",
            attack_controller: "controller.animation.humanoid.attack",
            sneaking_controller: "controller.animation.humanoid.sneaking",
            bob_controller: "controller.animation.humanoid.bob",
            use_item_progress_controller: "controller.animation.humanoid.use_item_progress",
            swimming_controller: "controller.animation.zombie.swimming",
            sleeping: "animation.player.sleeping"
        },
        renderControllers: [
            "controller.render.default"
        ],
        enableAttachables: true
    }
});