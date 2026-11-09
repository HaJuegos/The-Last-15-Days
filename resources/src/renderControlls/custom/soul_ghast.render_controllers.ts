import { createRPRenderController } from "simplified-mojang-jsons";

export const SoulGhastRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "soul_ghast",
            geometry: "Geometry.default",
            materials: [
                { "*": "Material.default" }
            ],
            textures: [
                "Texture.default"
            ]
        }
    ]
});

export const SoulGhastGlowRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "soul_ghast.glow",
            geometry: "Geometry.default",
            materials: [
                { "*": "Material.brillant" }
            ],
            textures: [
                "Texture.brillant"
            ],
            filterLighting: true,
            ignoreLighting: true
        }
    ]
});