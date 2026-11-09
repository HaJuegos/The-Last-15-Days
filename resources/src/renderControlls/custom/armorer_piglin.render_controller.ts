import { createRPRenderController } from "simplified-mojang-jsons";

export const ArmorerPiglinRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "armorer_piglin",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            textures: [
                "Texture.default"
            ]
        }
    ]
});