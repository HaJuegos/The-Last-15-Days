import { createRPRenderController } from "simplified-mojang-jsons";

export const PlyBearTrap = createRPRenderController({
    renderControllers: [
        {
            idRender: "player.bear_trap",
            geometry: "Geometry.bear_trap_ply",
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            textures: [
                "Texture.bear_trap_ply"
            ],
            onFireColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            },
            isHurtColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            }
        }
    ]
});