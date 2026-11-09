import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const GarfieldAnims = createRPAnimation({
    animations: [
        {
            idAnimation: "garfield.baby_transform",
            loop: true,
            bones: {
                head: {
                    scale: 1.5
                }
            }
        },
        {
            idAnimation: "garfield.lie_down",
            loop: true,
            bones: {
                backlegl: {
                    position: [
                        0.0,
                        -0.7,
                        0.0
                    ],
                    rotation: [
                        -22.92,
                        0.0,
                        0.0
                    ]
                },
                backlegr: {
                    position: [
                        0.1,
                        -1.2,
                        0.0
                    ],
                    rotation: [
                        28.65,
                        0.0,
                        -28.65
                    ]
                },
                body: {
                    position: [
                        0.0,
                        `${MoLang.variable("liedownamount")} * -4.5 + ${MoLang.variable("lieonplayer")} * (4.5 + ${MoLang.isBaby()} * 6)`,
                        0.0
                    ],
                    rotation: [
                        0.0,
                        0.0,
                        `math.lerprotate(0.0, 90.0, ${MoLang.variable("liedownamount")})`
                    ]
                },
                frontlegl: {
                    position: [
                        0.0,
                        -1.0,
                        -1.5
                    ],
                    rotation: [
                        -72.81,
                        0.0,
                        0.0
                    ]
                },
                frontlegr: {
                    position: [
                        0.2,
                        -0.9,
                        0.0
                    ],
                    rotation: [
                        -30.0,
                        0.0,
                        -14.46
                    ]
                },
                head: {
                    position: [
                        -0.1,
                        0.0,
                        -0.5
                    ],
                    rotation: [
                        -10.0,
                        `math.lerprotate(this, 75.81, ${MoLang.variable("liedownamount")})`,
                        0.0
                    ]
                }
            }
        },
        {
            idAnimation: "garfield.sit",
            loop: true,
            bones: {
                backlegl: {
                    position: [
                        0.0,
                        0.0,
                        1.0
                    ],
                    rotation: [
                        -45.0,
                        0.0,
                        0.0
                    ]
                },
                backlegr: {
                    position: [
                        0.0,
                        0.0,
                        1.0
                    ],
                    rotation: [
                        -45.0,
                        0.0,
                        0.0
                    ]
                },
                body: {
                    position: [
                        0.0,
                        -1.0,
                        0.0
                    ],
                    rotation: [
                        -45.0,
                        0.0,
                        0.0
                    ]
                },
                frontlegl: {
                    position: [
                        0.0,
                        -4.5,
                        -1.0
                    ],
                    rotation: [
                        42.15,
                        0.0,
                        0.0
                    ]
                },
                frontlegr: {
                    position: [
                        0.0,
                        -4.5,
                        -1.0
                    ],
                    rotation: [
                        42.15,
                        0.0,
                        0.0
                    ]
                }
            }
        },
        {
            idAnimation: "garfield.sneak",
            loop: true,
            bones: {
                backlegl: {
                    position: [
                        0.0,
                        1.0,
                        0.0
                    ],
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                backlegr: {
                    position: [
                        0.0,
                        1.0,
                        0.0
                    ],
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 180.0) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                body: {
                    position: [
                        0.0,
                        -1.0,
                        0.0
                    ]
                },
                frontlegl: {
                    position: [
                        0.0,
                        1.0,
                        0.0
                    ],
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 180.0) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                frontlegr: {
                    position: [
                        0.0,
                        1.0,
                        0.0
                    ],
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                head: {
                    position: [
                        0.0,
                        -1.0,
                        0.0
                    ]
                }
            }
        },
        {
            idAnimation: "garfield.sprint",
            loop: true,
            bones: {
                backlegl: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                backlegr: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 17.19) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                frontlegl: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 197.19) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                frontlegr: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 180.0) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                }
            }
        },
        {
            idAnimation: "garfield.walk",
            loop: true,
            bones: {
                backlegl: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                backlegr: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 180.0) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                frontlegl: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17 + 180.0) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                },
                frontlegr: {
                    rotation: [
                        `math.cos(${MoLang.modifiedDistanceMoved()} * 38.17) * 57.3 * ${MoLang.modifiedMoveSpeed()}`,
                        0.0,
                        0.0
                    ]
                }
            }
        }
    ]
});