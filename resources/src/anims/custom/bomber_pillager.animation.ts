import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const BomberPillagerAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "pillager_bomber.particles",
            loop: true,
            animationLength: 0.55,
            particleEffects: {
                "0.0": [
                    {
                        effect: "dust",
                        locator: "particle"
                    },
                    {
                        effect: "dust",
                        locator: "particle2"
                    }
                ]
            }
        },
        {
            idAnimation: "pillager_bomber.shooting_dynamite",
            animationLength: 1.5,
            overridePreviousAnimation: true,
            bones: {
                head: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "1.0": [0, 10, 0],
                        "1.5": [0, 0, 0]
                    }
                },
                leftLeg: {
                    rotation: [
                        `${MoLang.variable("tcos0")} * -1.4`,
                        -0.1,
                        -0.1
                    ]
                },
                rightLeg: {
                    rotation: [
                        `${MoLang.variable("tcos0")} * 1.4`,
                        0.1,
                        0.1
                    ]
                },
                rightarm: {
                    rotation: {
                        "0.0": [0, 0, 10],
                        "1.0": [-270, -22.5, 0],
                        "1.25": [-101.93109, -8.75168, -11.27784],
                        "1.5": [0, 0, 10]
                    }
                },
                bone9: {
                    position: {
                        "0.0": [0, 0, 0],
                        "0.25": [1.5, 0, 1],
                        "0.5": [0, 0, 0],
                        "0.75": [1.5, 0, 1],
                        "1.0": [0, 0, 0],
                        "1.25": [1.5, 0, 1],
                        "1.5": [0, 0, 0]
                    },
                    scale: {
                        "0.0": [1, 1, 1],
                        "0.25": [1.5, 1, 1.5],
                        "0.5": [1, 1, 1],
                        "0.75": [1.5, 1, 1.5],
                        "1.0": [1, 1, 1],
                        "1.25": [1.5, 1, 1.5],
                        "1.5": [1, 1, 1]
                    }
                },
                leftarm: {
                    rotation: {
                        "0.0": [0, 0, -10],
                        "0.5": [17.5, 0, 0],
                        "1.5": [0, 0, -10]
                    }
                },
                bone8: {
                    position: {
                        "0.0": [0, 0, 0],
                        "0.25": [0, 0, 1],
                        "0.5": [0, 0, 0],
                        "0.75": [0, 0, 1],
                        "1.0": [0, 0, 0],
                        "1.25": [0, 0, 1],
                        "1.5": [0, 0, 0]
                    },
                    scale: {
                        "0.0": [1, 1, 1],
                        "0.25": [1.5, 1, 1.5],
                        "0.5": [1, 1, 1],
                        "0.75": [1.5, 1, 1.5],
                        "1.0": [1, 1, 1],
                        "1.25": [1.5, 1, 1.5],
                        "1.5": [1, 1, 1]
                    }
                }
            }
        },
        {
            idAnimation: "pillager_bomber.fase_bomber",
            loop: true,
            overridePreviousAnimation: true,
            animTimeUpdate: `${MoLang.modifiedDistanceMoved()}`,
            bones: {
                head: {
                    rotation: [
                        0,
                        0,
                        `${MoLang.isMoving()} ? Math.sin(${MoLang.animTime()} * 40) * 7.5 : Math.sin(${MoLang.lifeTime()} * 70) * 1`
                    ]
                },
                body: {
                    rotation: [
                        `${MoLang.isMoving()} ? 10 : 0`,
                        0,
                        0
                    ]
                },
                leftLeg: {
                    rotation: [
                        `${MoLang.isMoving()} ? Math.sin(${MoLang.animTime()} * 47) * 35 : 0`,
                        0,
                        0]
                },
                rightLeg: {
                    rotation: [
                        `${MoLang.isMoving()} ? Math.sin(${MoLang.animTime()} * 47) * -35 : 0`,
                        0,
                        0
                    ]
                },
                rightarm: {
                    rotation: [
                        0,
                        0,
                        `${MoLang.isMoving()} ? Math.lerp(120, 75, Math.sin(${MoLang.animTime()} * 47) * 0.5 + 0.5) : Math.lerp(13, 10, Math.sin(${MoLang.lifeTime()} * 70) * 0.5 + 0.5)`
                    ]
                },
                leftarm: {
                    rotation: [
                        0,
                        0,
                        `${MoLang.isMoving()} ? -(Math.lerp(120, 75, Math.sin(${MoLang.animTime()} * 47) * 0.5 + 0.5)) : -(Math.lerp(13, 10, Math.sin(${MoLang.lifeTime()} * 70) * 0.5 + 0.5))`
                    ]
                },
                bone9: {
                    scale: [
                        `1 + math.cos(${MoLang.lifeTime()} * 100) * 0.075`,
                        1,
                        1
                    ]
                },
                bone8: {
                    scale: [
                        `(1 + math.cos(${MoLang.lifeTime()} * 100) * 0.075)`,
                        1,
                        1
                    ]
                }
            }
        }
    ]
});