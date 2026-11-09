import {createRPEntityClient, MoLang} from "simplified-mojang-jsons";

export const BearTrapClientEntity = createRPEntityClient({
    idEntity: "ha:bear_trap",
    params: {
        materials: {
            default: "entity_alphatest"
        },
        geometry: {
            default: "geometry.bear_trap"
        },
        textures: {
            default: "textures/entity/bear_trap"
        },
        scripts: {
            preAnimation: [
                `${MoLang.variable("anim_speed")} = 1.35;`
            ],
            animate: [
                "scale",
                "spawned"
            ]
        },
        animations: {
            scale: "animation.bear_trap.scale_loop",
            spawned: "animation.bear_trap.spawned"
        },
        renderControllers: [
            "controller.render.bear_trap"
        ]
    }
});