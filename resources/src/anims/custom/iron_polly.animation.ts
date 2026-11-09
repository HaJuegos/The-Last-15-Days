import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const IronPollyAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "iron_polly.start_flying",
            loop: false,
            animationLength: 1,
            bones: {
                leg0: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 0, 10],
                        "1.0": [35, 0, 10]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 4, 0],
                        "1.0": [0, 2, 0]
                    }
                },
                leg1: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 0, -10],
                        "1.0": [35, 0, -10]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 4, 0],
                        "1.0": [0, 2, 0]
                    }
                },
                leg2: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 0, 10],
                        "1.0": [35, 0, 10]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 4, 0],
                        "1.0": [0, 2, 0]
                    }
                },
                leg3: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 0, -10],
                        "1.0": [35, 0, -10]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 4, 0],
                        "1.0": [0, 2, 0]
                    }
                },
                bone4: {
                    position: {
                        "0.0": [0, 2, 0],
                        "0.1": [0, 3, 0],
                        "0.3": [0, 0, 0],
                        "0.4": [0, 1, 0],
                        "0.5": [0, 2, 0],
                        "0.6": [0, 0, 0],
                        "1.0": [0, 0, 0]
                    },
                    scale: {
                        "0.0": [0.95, 1, 0.95],
                        "0.8": [0.95, 0.9, 0.95],
                        "0.9": [0.95, 1, 0.95],
                        "1.0": [0.95, 0.9, 0.95]
                    }
                },
                bone: {
                    position: {
                        "0.0": [0, 2, 0],
                        "0.1": [0, 3, 0],
                        "0.3": [0, 0, 0],
                        "0.4": [0, 1, 0],
                        "0.5": [0, 2, 0],
                        "0.6": [0, 0, 0]
                    },
                    scale: {
                        "0.0": [0.95, 1, 0.95],
                        "0.8": [0.95, 0.9, 0.95],
                        "0.9": [0.95, 1, 0.95],
                        "1.0": [0.95, 0.9, 0.95]
                    }
                },
                bone2: {
                    position: {
                        "0.0": [0, 2, 0],
                        "0.1": [0, 3, 0],
                        "0.3": [0, 0, 0],
                        "0.4": [0, 1, 0],
                        "0.5": [0, 2, 0],
                        "0.6": [0, 0, 0]
                    },
                    scale: {
                        "0.0": [0.95, 1, 0.95],
                        "0.8": [0.95, 0.9, 0.95],
                        "0.9": [0.95, 1, 0.95],
                        "1.0": [0.95, 0.9, 0.95]
                    }
                },
                bone3: {
                    position: {
                        "0.0": [0, 2, 0],
                        "0.1": [0, 3, 0],
                        "0.3": [0, 0, 0],
                        "0.4": [0, 1, 0],
                        "0.5": [0, 2, 0],
                        "0.6": [0, 0, 0]
                    },
                    scale: {
                        "0.0": [0.95, 1, 0.95],
                        "0.8": [0.95, 0.9, 0.95],
                        "0.9": [0.95, 1, 0.95],
                        "1.0": [0.95, 0.9, 0.95]
                    }
                }
            }
        },
        {
            idAnimation: "iron_polly.flying",
            loop: true,
            animTimeUpdate: `${MoLang.modifiedDistanceMoved()}`,
            bones: {
                leg0: {
                    rotation: {
                        "0.0": {
                            post: [`math.lerp(0, 35 + math.cos(${MoLang.animTime()} * 36) * 2, ${MoLang.variable("fly_blend")})`, 0, 10],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                leg1: {
                    rotation: {
                        "0.0": {
                            post: [`math.lerp(0, 35 + math.cos(${MoLang.animTime()} * 36) * 2, ${MoLang.variable("fly_blend")})`, 0, -10],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                leg2: {
                    rotation: {
                        "0.0": {
                            post: [`math.lerp(0, 35 + math.cos(${MoLang.animTime()} * 36) * 2, ${MoLang.variable("fly_blend")})`, 0, 10],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                leg3: {
                    rotation: {
                        "0.0": {
                            post: [`math.lerp(0, 35 + math.cos(${MoLang.animTime()} * 36) * 2, ${MoLang.variable("fly_blend")})`, 0, -10],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                bone4: {
                    position: [0, `2 + math.cos(${MoLang.lifeTime()} * 900) * 0.85`, 0],
                    scale: [0.95, `1 + math.sin(${MoLang.lifeTime()} * 900) * 0.1`, 0.95]
                },
                bone: {
                    position: [0, `2 + math.cos(${MoLang.lifeTime()} * 900) * 0.85`, 0],
                    scale: [0.95, `1 + math.sin(${MoLang.lifeTime()} * 900) * 0.1`, 0.95]
                },
                bone2: {
                    position: [0, `2 + math.cos(${MoLang.lifeTime()} * 900) * 0.85`, 0],
                    scale: [0.95, `1 + math.sin(${MoLang.lifeTime()} * 900) * 0.1`, 0.95]
                },
                bone3: {
                    position: [0, `2 + math.cos(${MoLang.lifeTime()} * 900) * 0.85`, 0],
                    scale: [0.95, `1 + math.sin(${MoLang.lifeTime()} * 900) * 0.1`, 0.95]
                }
            }
        }
    ]
});