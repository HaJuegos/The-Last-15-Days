import { createRPRenderController } from "simplified-mojang-jsons";

export const PlayerGhostRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "player_ghost",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            textures: [
                "Texture.default"
            ],
            isHurtColor: {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            },
            onFireColor: {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            },
            filterLighting: true
        }
    ]
});