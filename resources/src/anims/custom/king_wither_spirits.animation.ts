import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const KingWitherSpiritsAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "spirit.look_at_target",
            loop: true,
            bones: {
                spirit_head: {
                    relativeTo: {
                        rotation: "entity"
                    },
                    rotation: [`${MoLang.targetXRotation()} - this`, `${MoLang.targetYRotation()} - this`, 0],
                    scale: 0.35
                },
                root: {
                    position: [0, `math.sin(${MoLang.lifeTime()} * 50) * 0.25 + 0.25`, 0]
                },
                right: {
                    relativeTo: {
                        rotation: "entity"
                    },
                    rotation: [0, `math.sin(${MoLang.lifeTime()} * 50) * 5 + 5`, 0],
                    scale: 0.35
                },
                left: {
                    relativeTo: {
                        rotation: "entity"
                    },
                    rotation: [0, `math.sin(${MoLang.lifeTime()} * 50) * -5 + 5`, 0],
                    scale: 0.35
                }
            }
        },
        {
            idAnimation: "spirit.start_summon.red",
            loop: true,
            animationLength: 10,
            bones: {
                root_red: {
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.5": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.6": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.9": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.4": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "2.6": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "4.0": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "7.5": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "8.9": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_blue: {
                    scale: 0.35
                },
                root_yellow: {
                    scale: 0.35
                },
                root_orange: {
                    scale: 0.35
                },
                hands: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.1": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.0": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "4.1": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "9.0": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                left: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "3.8": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "4.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "4.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "8.9": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "9.4": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.8": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                right: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "3.8": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "4.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "4.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "8.9": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "9.4": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.8": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                spirit_head: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.9": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "4.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.8": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.5": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "8.9": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        },
        {
            idAnimation: "spirit.start_summon.blue",
            loop: true,
            animationLength: 15,
            bones: {
                root_blue: {
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.9": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.9": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.4": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.7": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.2": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.2": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.1": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.1": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.6": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "14.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "14.6": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.1": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "5.5": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "9.3": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "10.7": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "12.7": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "14.1": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_red: {
                    scale: 0.35
                },
                root_yellow: {
                    scale: 0.35
                },
                root_orange: {
                    scale: 0.35
                },
                hands: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.6": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.8": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.6": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "14.2": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "2.6": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "10.8": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.6": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "14.2": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                left: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "5.7": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "5.9": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "6.2": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "6.4": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "9.5": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "9.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "10.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "10.5": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "10.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "11.0": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "11.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.6": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "12.9": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "13.1": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "13.4": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "13.6": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "13.9": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "14.1": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "14.4": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "14.6": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.7": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.2": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.5": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.5": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.0": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.9": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.4": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.9": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "14.4": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                right: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "5.7": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "5.9": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "6.2": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "6.4": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "9.5": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "9.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "10.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "10.5": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "10.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "11.0": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "11.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.6": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "12.9": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "13.1": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "13.4": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "13.6": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "13.9": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "14.1": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "14.4": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "14.6": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.7": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.2": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.5": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.5": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.0": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.9": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.4": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.9": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "14.4": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                spirit_head: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.4": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.1": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.8": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "6.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.5": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "9.6": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.3": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "10.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "11.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "12.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.0": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "13.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "13.7": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "14.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "15.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        },
        {
            idAnimation: "spirit.start_summon.orange",
            loop: true,
            animationLength: 10,
            bones: {
                root_orange: {
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.1": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.1": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.6": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.6": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.1": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "8.1": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_red: {
                    scale: 0.35
                },
                root_yellow: {
                    scale: 0.35
                },
                root_blue: {
                    scale: 0.35
                },
                hands: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.6": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.6": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "2.6": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.6": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                left: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.6": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "7.1": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "7.6": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "8.1": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "8.6": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                right: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.6": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "7.1": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "7.6": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "8.1": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "8.6": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.3": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.9": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.9": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.4": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                spirit_head: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.4": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.1": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "5.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.6": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "7.4": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "8.1": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        },
        {
            idAnimation: "spirit.start_summon.yellow",
            loop: true,
            animationLength: 10,
            bones: {
                root_yellow: {
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.3": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.2": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.7": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.7": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.2": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [0, 2, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.8": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "3.2": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "6.8": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0.55, 0.55, 0.55],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_red: {
                    scale: 0.35
                },
                root_blue: {
                    scale: 0.35
                },
                root_orange: {
                    scale: 0.35
                },
                hands: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.7": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.3": {
                            post: [-135, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.7": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "3.3": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "8.3": {
                            post: [0, -1, -1],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                left: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "2.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "2.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "3.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "3.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "7.5": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "8.0": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "8.5": {
                            post: [0, 0, -60],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [0, 0, -45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.5": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.0": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.5": {
                            post: [1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                right: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "2.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "2.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "3.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "3.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "7.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "7.5": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "7.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "8.0": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "8.5": {
                            post: [0, 0, 75],
                            lerpMode: "catmullrom"
                        },
                        "8.7": {
                            post: [0, 0, 45],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.0": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "3.5": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.0": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.5": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.0": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "8.5": {
                            post: [-1, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                spirit_head: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.1": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "2.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.8": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "3.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "4.3": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "6.7": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.1": {
                            post: [0, 0, 2.5],
                            lerpMode: "catmullrom"
                        },
                        "7.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "7.8": {
                            post: [0, 0, -2.5],
                            lerpMode: "catmullrom"
                        },
                        "8.2": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "10.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        }
    ]
});