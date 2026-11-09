import { createRPAnimation } from "simplified-mojang-jsons";

export const SoulFireballAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "soul_fireball.loop",
            loop: true,
            animationLength: 3,
            bones: {
                center: {
                    position: [0, -1, -10]
                },
                OrbeDeAlmas: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "3.0": [720, 0, 0]
                    },
                    position: [0, -3, 4],
                    scale: {
                        "0.0": [0.4, 0.4, 0.4],
                        "0.5": [0.4, 0.4, 0.4],
                        "1.0": [0.5, 0.5, 0.5],
                        "1.5": [0.4, 0.4, 0.4],
                        "2.0": [0.5, 0.5, 0.5],
                        "2.5": [0.4, 0.4, 0.4],
                        "3.0": [0.4, 0.4, 0.4]
                    }
                },
                OrbeDeAlmas2: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "3.0": [0, 0, 720]
                    },
                    position: [0, -3, 4],
                    scale: {
                        "0.0": [0.4, 0.4, 0.4],
                        "0.5": [0.4, 0.4, 0.4],
                        "1.0": [0.5, 0.5, 0.5],
                        "1.5": [0.4, 0.4, 0.4],
                        "2.0": [0.5, 0.5, 0.5],
                        "2.5": [0.4, 0.4, 0.4],
                        "3.0": [0.4, 0.4, 0.4]
                    }
                },
                OrbeDeAlmas3: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "3.0": [0, 720, 0]
                    },
                    position: [0, -3, 4],
                    scale: {
                        "0.0": [0.4, 0.4, 0.4],
                        "0.5": [0.4, 0.4, 0.4],
                        "1.0": [0.5, 0.5, 0.5],
                        "1.5": [0.4, 0.4, 0.4],
                        "2.0": [0.5, 0.5, 0.5],
                        "2.5": [0.4, 0.4, 0.4],
                        "3.0": [0.4, 0.4, 0.4]
                    }
                }
            }
        },
        {
            idAnimation: "soul_fireball.particle",
            loop: true,
            animationLength: 1,
            particleEffects: {
                "0.0": {
                    locator: "particula",
                    effect: "loop"
                }
            }
        },
        {
            idAnimation: "soul_fireball.scale",
            loop: true,
            bones: {
                center: {
                    scale: 5
                }
            }
        }
    ]
});