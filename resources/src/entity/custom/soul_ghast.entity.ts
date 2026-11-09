import { createRPEntityClient } from "simplified-mojang-jsons";

export const SoulGhastClientEntity = createRPEntityClient({
    idEntity: "ha:soul_ghast",
    params: {
        materials: {
            default: "soul_ghast_body",
            brillant: "soul_ghast_brillant"
        },
        textures: {
            default: "textures/entity/soul_ghast/soul_ghast_body",
            brillant: "textures/entity/soul_ghast/soul_ghast_billant"
        },
        geometry: {
            default: "geometry.soul_ghast"
        },
        scripts: {
            animate: [
                "controller_root",
                "move",
                "scale"
            ]
        },
        animations: {
            controller_root: "controller.animation.soul_ghast.root",
            chargin: "animation.soul_ghast.chargin",
            chargin_loop: "animation.soul_ghast.chargin.looping_orb",
            shoot: "animation.soul_ghast.shoot",

            move: "animation.ghast.move",
            scale: "animation.soul_ghast.scale"
        },
        renderControllers: [
            "controller.render.soul_ghast",
            "controller.render.soul_ghast.glow"
        ],
        spawnEgg: {
            texture: "spawn_egg_ghast"
        },
        soundEffects: {
            charge: "mob.soul_ghast.charge_and_shot"
        },
        particleEffects: {
            loop: "ha:soul_fireball_particle_large"
        }
    }
});