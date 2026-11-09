import {createRPAnimation, MoLang} from "simplified-mojang-jsons";

export const MagmaCopterAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "magma_copter.flying",
            loop: true,
            animationLength: 2,
            bones: {
                bodyCube_0: {
                    position: {
                        "0.0": {
                            post: [0, `3.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, `0.25+3.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, `3.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, `0.25+3.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, `3.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                bodyCube_1: {
                    position: [0, `2.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0]
                },
                bodyCube_2: {
                    position: [0, `1.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0]
                },
                bodyCube_4: {
                    position: [0, `-1.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0]
                },
                bodyCube_5: {
                    position: [0, `-2.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0]
                },
                bodyCube_6: {
                    position: [0, `-3.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0]
                },
                bodyCube_7: {
                    position: [0, `-4.0 * (${MoLang.variable("slime_squish_factor")} < 0.0 ? 0.0 : ${MoLang.variable("slime_squish_factor")}) * 1.7`, 0]
                },
                insideCube: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, 0, 5],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 0, -5],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 5, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, 4, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 5, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 4, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, 5, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                propeller: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.0": {
                            post: [0, -2160, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                magnet_1: {
                    position: {
                        "0.0": {
                            post: [3, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0, 0, 1],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                magnet_2: {
                    position: {
                        "0.0": {
                            post: [-3, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    scale: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        }
    ]
});