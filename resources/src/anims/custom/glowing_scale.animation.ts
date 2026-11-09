import { createRPAnimation } from "simplified-mojang-jsons";

export const GlowingAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "entity_glow.glowing_scale",
            loop: true,
            bones: {
                waist_glow: {
                    scale: 1.055
                }
            }
        }
    ]
});