import { createRPAnimController, MoLang } from "simplified-mojang-jsons";

export const SoulGhastController = createRPAnimController({
    animControllers: [
        {
            idController: "soul_ghast.root",
            initialState: "default",
            states: {
                default: {
                    transitions: [
                        { onChargin: `${MoLang.facingTargetToRangeAttack()}` }
                    ]
                },
                onChargin: {
                    animations: ["chargin", "chargin_loop"],
                    transitions: [
                        { onShoot: `${MoLang.isCharged()} && ${MoLang.animTime()} >= 2.8` },
                        { default: `!${MoLang.facingTargetToRangeAttack()}` },
                    ]
                },
                onShoot: {
                    animations: ["shoot"],
                    transitions: [
                        { onChargin: `${MoLang.allAnimationsFinished()}` },
                        { default: `!${MoLang.facingTargetToRangeAttack()}` },
                    ]
                },
            }
        }
    ]
});