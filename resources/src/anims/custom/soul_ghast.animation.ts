import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const SoulGhastAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "soul_ghast.chargin",
            loop: "hold_on_last_frame",
            animationLength: 3,
            bones: {
                body: {
                    position: [`math.sin(${MoLang.animTime()} * 90) * 0.4`, `math.sin(${MoLang.animTime()} * 60) * 0.25`, `math.cos(${MoLang.animTime()} * 75) * 0.2`]
                },
                CabezaSuperior: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "3.0": [-25, 0, 0]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "3.0": [0, 4, -3]
                    }
                },
                CabezaInferior: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "1.5": [20, 0, 0],
                        "3.0": [50, 0, 0]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "1.5": [0, 0, 1]
                    }
                },
                Cejas: {
                    position: {
                        "0.0": [0, 0, 0],
                        "0.5": [0, 1.5, 0],
                        "1.5": [0, 1.5, 0]
                    }
                },
                OrbeDeAlmas: {
                    position: {
                        "0.0": [0, -3, 4],
                        "3.0": [0, -2, 1]
                    },
                    scale: {
                        "0.0": [0.5, 0.5, 0.5],
                        "0.5": [0.4, 0.4, 0.4],
                        "1.0": [0.5, 0.5, 0.5],
                        "1.5": [0.4, 0.4, 0.4],
                        "2.0": [0.5, 0.5, 0.5],
                        "2.5": [0.4, 0.4, 0.4],
                        "3.0": [0.4, 0.4, 0.4]
                    }
                },
                Tentaculos: {
                    rotation: {
                        "0.0": [0, 0, 0],
                        "3.0": [50, 0, 0]
                    },
                    position: {
                        "0.0": [0, 0, 0],
                        "3.0": [0, -2, 1]
                    }
                },
                OrbeDeAlmas2: {
                    position: {
                        "0.0": [0, -3, 4],
                        "3.0": [0, -2, 1]
                    },
                    scale: {
                        "0.0": [0.1, 0.1, 0.1],
                        "0.5": [0.2, 0.2, 0.2],
                        "1.0": [0.3, 0.3, 0.3],
                        "1.5": [0.4, 0.4, 0.4],
                        "2.0": [0.5, 0.5, 0.5],
                        "2.5": [0.4, 0.4, 0.4],
                        "3.0": [0.4, 0.4, 0.4]
                    }
                },
                OrbeDeAlmas3: {
                    position: {
                        "0.0": [0, -3, 4],
                        "3.0": [0, -2, 1]
                    },
                    scale: {
                        "0.0": [0.1, 0.1, 0.1],
                        "0.5": [0.2, 0.2, 0.2],
                        "1.0": [0.3, 0.3, 0.3],
                        "1.5": [0.4, 0.4, 0.4],
                        "2.0": [0.5, 0.5, 0.5],
                        "2.5": [0.4, 0.4, 0.4],
                        "3.0": [0.4, 0.4, 0.4]
                    }
                }
            },
            soundEffects: {
                "0.3": {
                    effect: "charge"
                }
            }
        },
        {
            idAnimation: "soul_ghast.chargin.looping_orb",
            loop: true,
            bones: {
                body: {
                    position: [`math.sin(${MoLang.animTime()} * 90) * 0.4`, `math.sin(${MoLang.animTime()} * 60) * 0.25`, `math.cos(${MoLang.animTime()} * 75) * 0.2`]
                },
                OrbeDeAlmas: {
                    rotation: [`${MoLang.animTime()} * 240`, 0, 0]
                },
                OrbeDeAlmas2: {
                    rotation: [0, 0, `${MoLang.animTime()} * 240`]
                },
                OrbeDeAlmas3: {
                    rotation: [0, `${MoLang.animTime()} * 240`, 0]
                }
            },
            particleEffects: {
                "0.3": {
                    effect: "loop",
                    locator: "particula"
                }
            }
        },
        {
            idAnimation: "soul_ghast.shoot",
            animationLength: 3,
            overridePreviousAnimation: true,
            bones: {
                body: {
                    position: {
                        "0.0": [0, 0, 0],
                        "0.25": [0, 3, 5],
                        "1.0": [0, 0, 0],
                        "2.0": [0, 0, 0]
                    }
                },
                CabezaSuperior: {
                    rotation: {
                        "0.0": [-25, 0, 0],
                        "0.2083": [-2.5, 0, 0],
                        "1.0": [-25, 0, 0],
                        "2.0": [0, 0, 0]
                    },
                    position: {
                        "0.0": [0, 4, -3],
                        "1.0": [0, 4, -3],
                        "2.0": [0, 0, 0]
                    }
                },
                CabezaInferior: {
                    rotation: {
                        "0.0": [50, 0, 0],
                        "1.0": [50, 0, 0],
                        "2.0": [0, 0, 0]
                    },
                    position: {
                        "0.0": [0, 0, 1],
                        "1.0": [0, 0, 1],
                        "2.0": [0, 0, 0]
                    }
                },
                Cejas: {
                    position: {
                        "0.0": [0, 1.5, 0],
                        "1.0": [0, 1.5, 0],
                        "2.0": [0, 0, 0]
                    }
                },
                OrbeDeAlmas: {
                    rotation: [`${MoLang.animTime()} * 240`, 0, 0]
                },
                Tentaculos: {
                    rotation: {
                        "0.0": [50, 0, 0],
                        "1.0": [50, 0, 0],
                        "2.0": [0, 0, 0]
                    },
                    position: {
                        "0.0": [0, -2, 1],
                        "0.25": [0, 1, 6],
                        "1.0": [0, -2, 1],
                        "2.0": [0, 0, 0]
                    }
                },
                OrbeDeAlmas2: {
                    rotation: [0, 0, `${MoLang.animTime()} * 240`]
                },
                OrbeDeAlmas3: {
                    rotation: [0, `${MoLang.animTime()} * 240`, 0]
                },
                orbe: {
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.85": {
                            post: [0, 0, -7],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0.5, 0.5, 0.5],
                            lerpMode: "catmullrom"
                        },
                        "0.65": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        },
        {
            idAnimation: "soul_ghast.scale",
            loop: true,
            bones: {
                body: {
                    scale: 4.5
                },
                Tentaculos: {
                    scale: 4.5
                }
            }
        }
    ]
});