import { createRPEntityClient } from "simplified-mojang-jsons";

export const SoulFireballClientEntity = createRPEntityClient({
    idEntity: "ha:soul_fireball",
    params: {
        materials: {
            default: "soul_ghast_brillant"
        },
        geometry: {
            default: "geometry.soul_fireball"
        },
        textures: {
            default: "textures/entity/soul_ghast/soul_fireball"
        },
        scripts: {
            animate: [
                "loop",
                "particle",
                "scale"
            ]
        },
        animations: {
            loop: "animation.soul_fireball.loop",
            particle: "animation.soul_fireball.particle",
            scale: "animation.soul_fireball.scale"
        },
        renderControllers: [
            "controller.render.soul_fireball"
        ],
        particleEffects: {
            loop: "ha:soul_fireball_particle_large"
        }
    }
});