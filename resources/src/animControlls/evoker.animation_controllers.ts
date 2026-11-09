import { MoLang, RPAnimationControllerTemplates } from "simplified-mojang-jsons";

export const EvokerAnimController = RPAnimationControllerTemplates.EvokerAnimationControllers({
    add: {
        animControllers: [
            {
                "evoker.general": {
                    states: {
                        default: {
                            transitions: [
                                {
                                    ranged: `${MoLang.facingTargetToRangeAttack()}`
                                }
                            ]
                        },
                        "ranged": {
                            animations: [
                                "look_at_target",
                                "ranged_attack",
                                "holding",
                                "controller_riding"
                            ],
                            transitions: [
                                { default: `!${MoLang.facingTargetToRangeAttack()}` }
                            ]
                        }
                    }
                }
            }
        ]
    }
});