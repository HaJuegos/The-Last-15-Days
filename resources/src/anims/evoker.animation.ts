import { MoLang, RPAnimationTemplates } from "simplified-mojang-jsons";

export const EvokerAnimations = RPAnimationTemplates.EvokerAnimation({
    add: {
        animations: [
            {
                idAnimation: "evoker.ranged_attack",
                loop: true,
                bones: {
                    arms: {
                        scale: 0.0
                    },
                    leftarm: {
                        scale: 1,
                        rotation: [
                            `${MoLang.targetXRotation()} - 90.0 - math.sin(${MoLang.lifeTime()} * 76.8) * 2.865 - this`,
                            `${MoLang.targetYRotation()} + 28.65`,
                            `-(math.cos(${MoLang.lifeTime()} * 103.2) * 2.865) - 2.865`
                        ]

                    },
                    rightarm: {
                        scale: 1,
                        rotation: [
                            `${MoLang.targetXRotation()} - 90.0 + math.sin(${MoLang.lifeTime()} * 76.8) * 2.865 - this`,
                            `${MoLang.targetYRotation()} - 5.73`,
                            `(math.cos(${MoLang.lifeTime()} * 103.2) * 2.865) + 2.865`
                        ]
                    }
                }
            }
        ]
    }
});