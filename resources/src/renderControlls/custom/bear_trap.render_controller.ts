import { createRPRenderController } from "simplified-mojang-jsons";

export const BearTrapRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "bear_trap",
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