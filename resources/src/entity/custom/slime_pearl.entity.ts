import { createRPEntityClient } from "simplified-mojang-jsons";

export const SlimePearlClientEntity = createRPEntityClient({
    idEntity: "ha:slime_pearl",
    params: {
        geometry: {
            default: "geometry.item_sprite"
        },
        materials: {
            default: "ender_pearl"
        },
        textures: {
            default: "textures/items/custom/viscous_pearl"
        },
        renderControllers: [
            "controller.render.item_sprite"
        ],
        scripts: {
            animate: [
                "flying"
            ]
        },
        animations: {
            flying: "animation.actor.billboard"
        }
    }
});