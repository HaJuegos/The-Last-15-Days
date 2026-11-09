import { createRPRenderController } from "simplified-mojang-jsons";

export const LordBlazeRenderControl = createRPRenderController({
    renderControllers: [
        {
            idRender: "lord_blaze",
            geometry: "Geometry.default",
            materials: [
                { "*": "Material.body" },
                { head: "Material.head" }
            ],
            textures: [
                "Texture.default"
            ]
        }
    ]
});