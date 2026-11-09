import { createRPEntityClient } from "simplified-mojang-jsons";

export const LordBlazeClientEntity = createRPEntityClient({
    idEntity: "ha:lord_blaze",
    params: {
        geometry: {
            default: "geometry.lord_blaze"
        },
        materials: {
            body: "blaze_body",
            head: "blaze_head"
        },
        textures: {
            default: "textures/entity/lord_blaze/lord_blaze"
        },
        scripts: {
            animate: [
                "controller_flame",
                "controller_move"
            ]
        },
        animations: {
            controller_move: "controller.animation.blaze.move",
            controller_flame: "controller.animation.blaze.flame",

            look_at_target: "animation.common.look_at_target",
            move: "animation.blaze.move"
        },
        particleEffects: {
            charged_flames: "minecraft:mobflame_emitter"
        },
        renderControllers: [
            "controller.render.lord_blaze"
        ],
        spawnEgg: {
            texture: "spawn_egg_blaze"
        }
    }
});