import { createRPAnimation } from "simplified-mojang-jsons";

export const KingWitherAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "king_wither.scale_spirits_spawn",
            loop: "hold_on_last_frame",
            animationLength: 1.35,
            bones: {
                root_red: {
                    scale: {
                        "0.0": [0, 0, 0],
                        "1.35": [0.35, 0.35, 0.35]
                    }
                },
                root_blue: {
                    scale: {
                        "0.0": [0, 0, 0],
                        "1.35": [0.35, 0.35, 0.35]
                    }
                },
                root_yellow: {
                    scale: {
                        "0.0": [0, 0, 0],
                        "1.35": [0.35, 0.35, 0.35]
                    }
                },
                root_orange: {
                    scale: {
                        "0.0": [0, 0, 0],
                        "1.35": [0.35, 0.35, 0.35]
                    }
                }
            }
        },
        {
            idAnimation: "king_wither.hide_spirits",
            loop: true,
            bones: {
                root_red: {
                    scale: 0
                },
                root_orange: {
                    scale: 0
                },
                root_blue: {
                    scale: 0
                },
                root_yellow: {
                    scale: 0
                }
            }
        },
        {
            idAnimation: "king_wither.scale_spirits_loop",
            loop: true,
            bones: {
                root_red: {
                    scale: 0.35
                },
                root_orange: {
                    scale: 0.35
                },
                root_blue: {
                    scale: 0.35
                },
                root_yellow: {
                    scale: 0.35
                }
            }
        },
        {
            idAnimation: "king_wither.spirits.positions",
            loop: true,
            bones: {
                root_orange: {
                    position: [-11, 24, -1]
                },
                root_red: {
                    position: [11, 24, -1]
                },
                root_blue: {
                    position: [-6, 27, -1]
                },
                root_yellow: {
                    position: [6, 27, -1]
                }
            }
        },
        {
            idAnimation: "king_wither.spirits_despawn",
            loop: "hold_on_last_frame",
            animationLength: 1.35,
            bones: {
                root_red: {
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.35": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_blue: {
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.35": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_orange: {
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.35": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                root_yellow: {
                    scale: {
                        "0.0": {
                            post: [0.35, 0.35, 0.35],
                            lerpMode: "catmullrom"
                        },
                        "1.35": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        }
    ]
});