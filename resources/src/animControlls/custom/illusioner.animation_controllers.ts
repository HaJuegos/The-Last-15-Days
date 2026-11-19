import { createRPAnimController, MoLang } from "simplified-mojang-jsons";

export const IllusionerAnimController = createRPAnimController({
    animControllers: [
        {
            idController: "illusioner.clones",
            initialState: "default",
            states: {
                default: {
                    transitions: [
                        {
                            clonesAnims: `${MoLang.property('ha:is_minion')}`
                        }
                    ]
                },
                clonesAnims: {
                    animations: ["clone_idle"],
                    transitions: [
                        {
                            default: `!${MoLang.property('ha:is_minion')}`
                        }
                    ]
                }
            }
        }
    ]
});