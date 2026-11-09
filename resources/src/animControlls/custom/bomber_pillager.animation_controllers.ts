import { createRPAnimController, MoLang } from "simplified-mojang-jsons";

export const BomberPillagerControllers = createRPAnimController({
    animControllers: [
        {
            idController: "pillager_bomber.root",
            initialState: "default",
            states: {
                default: {
                    blendTransition: 0.2,
                    blendViaShortestPath: true,
                    animations: [
                        "controller_humanoid_base_pose",
                        "controller_look_at_target",
                        "controller_move",
                        "controller_riding",
                        "controller_attack",
                        "controller_bob"
                    ],
                    transitions: [
                        { celebrating: `${MoLang.isCelebrating()}` }
                    ]
                },
                celebrating: {
                    animations: [
                        "celebrating",
                        {
                            "riding.legs": `${MoLang.isRiding()}`
                        }
                    ],
                    blendTransition: 0.2,
                    blendViaShortestPath: true,
                    transitions: [
                        { default: `!${MoLang.isCelebrating()}` }
                    ]
                }
            }
        },
        {
            idController: "pillager_bomber.start_fase",
            initialState: "default",
            states: {
                default: {
                    transitions: [
                        { suicide: `${MoLang.isChested()}` }
                    ]
                },
                suicide: {
                    animations: ["fase"]
                }
            }
        },
        {
            idController: "pillager_bomber.shooting",
            initialState: "default",
            states: {
                default: {
                    transitions: [
                        { shoot: `${MoLang.isCharged()}` }
                    ]
                },
                shoot: {
                    animations: ["shoot"],
                    transitions: [
                        { default: `!${MoLang.isCharged()} && ${MoLang.allAnimationsFinished()}` }
                    ]
                },
            }
        },
        {
            idController: "pillager_bomber.particles",
            initialState: "default",
            states: {
                default: {
                    animations: ["particle"]
                }
            }
        }
    ]
});