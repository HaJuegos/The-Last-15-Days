import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const RadioactiveCreeperAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "radioactive_creeper.idle",
            loop: true,
            bones: {
                head: {
                    rotation: [0, 0, `-10 * math.sin(${MoLang.lifeTime()} * 120)`]
                },
                bone: {
                    rotation: [0, 0, `10 * math.sin(${MoLang.lifeTime()} * 120)`],
                    position: [`-0.45 * math.sin(${MoLang.lifeTime()} * 120)`, `-0.5 * math.sin(${MoLang.lifeTime()} * 120)`, 0],
                    "scale": [1, `1 + math.sin(${MoLang.lifeTime()} * 120) * 1`, 1]
                }
            }
        }
    ]
});