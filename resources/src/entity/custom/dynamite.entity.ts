import { createRPEntityClient } from "simplified-mojang-jsons";

export const DynamiteClientEntity = createRPEntityClient({
    idEntity: "ha:dynamite",
    params: {
        geometry: {
            default: "geometry.dynamite"
        },
        materials: {
            default: "entity_alphatest"
        },
        textures: {
            default: "textures/entity/dynamite"
        },
        animations: {
            fly: "animation.dynamite.fly",
            particle: "animation.dynamite.particle"
        },
        scripts: {
            animate: [
                "fly",
                "particle"
            ]
        },
        renderControllers: [
            "controller.render.dynamite"
        ],
        particleEffects: {
            dust: "ha:dynamite_dust"
        }
    }
});