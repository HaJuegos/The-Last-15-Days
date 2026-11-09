import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const PlayerGhostAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "player_ghost.idle",
            loop: true,
            bones: {
                waist: {
                    rotation: [0, `0 + ${MoLang.lifeTime()} * 60`, 0]
                }
            }
        }
    ]
});