import { createRPRenderController } from "simplified-mojang-jsons";

export const SoulFireballRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "soul_fireball",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            textures: [
                "Texture.default"
            ],
            onFireColor: {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            },
            isHurtColor: {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            },
            ignoreLighting: true,
            filterLighting: true
        }
    ]
});