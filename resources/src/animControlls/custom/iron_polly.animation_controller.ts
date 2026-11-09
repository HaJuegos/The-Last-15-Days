import { createRPAnimController, MoLang } from "simplified-mojang-jsons";

export const IronPollyControllers = createRPAnimController({
    animControllers: [
        {
            idController: "iron_polly.root",
            initialState: "default",
            states: {
                default: {
                    transitions: [
                        { startFlying: `!${MoLang.isOnGround()}` }
                    ]
                },
                startFlying: {
                    animations: ["start_flying"],
                    transitions: [
                        { flyingLoop: `${MoLang.allAnimationsFinished()}` }
                    ]
                },
                flyingLoop: {
                    animations: ["flying"]
                }
            }
        }
    ]
});