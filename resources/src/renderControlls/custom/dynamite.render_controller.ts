import {createRPRenderController, MoLang} from "simplified-mojang-jsons";

export const DynamiteRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "dynamite",
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
            overlayColor: {
                a: `(Math.sin(${MoLang.lifeTime()} * (200 + (${MoLang.lifeTime()} * 150))) > 0 ? 0.8 : 0.0)`,
                r: "1.0",
                g: "1.0",
                b: "1.0"
            },
            filterLighting: true
        }
    ]
});