import {createRPEntityClient, MoLang} from "simplified-mojang-jsons";

export const GarfieldClientEntity = createRPEntityClient({
    idEntity: "ha:garfield",
    params: {
        materials: {
            default: "cat"
        },
        textures: {
            default: "textures/entity/cat/garfield",
            angry: "textures/entity/cat/supremacy_garfield"
        },
        geometry: {
            default: "geometry.cat_garfield",
            angry: "geometry.cat_supremacy_garfield"
        },
        scripts: {
            scale: `${MoLang.isBaby()} ? (1 / 0.4) : 1.0`,
            animate: [
                "look_at_target_controller",
                "move_controller"
            ]
        },
        animations: {
            look_at_target_controller: "controller.animation.cat.look_at_target",
            move_controller: "controller.animation.cat.move",

            sneak: "animation.garfield.sneak",
            walk: "animation.garfield.walk",
            sprint: "animation.garfield.sprint",
            sit: "animation.garfield.sit",
            look_at_target: "animation.common.look_at_target",
            baby_transform: "animation.garfield.baby_transform",
            lie_down: "animation.garfield.lie_down",
            baby_lie_down: "animation.cat.baby_lie_down",
            baby_sit: "animation.cat.baby_sit"
        },
        renderControllers: [
            "controller.render.garfield"
        ],
        spawnEgg: {
            texture: "spawn_egg_cat"
        }
    }
});