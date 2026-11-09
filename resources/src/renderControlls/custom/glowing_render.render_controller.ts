import {createRPRenderController, MoLang} from "simplified-mojang-jsons";

export const GlowingRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "entity_glowing",
            geometry: "Geometry.glowing",
            materials: [
                { "*": "Material.glowing" }
            ],
            textures: [
                "Texture.default"
            ],
            ignoreLighting: true,
            onFireColor: {
                r: "1.0",
                g: "1.0",
                b: "0.75",
                a: `0.55 + 0.55 * Math.pow(1.0 - Math.mod(${MoLang.lifeTime()}, 3) / 3, 0.5)`
            },
            isHurtColor: {
                r: "1.0",
                g: "1.0",
                b: "0.75",
                a: `0.55 + 0.55 * Math.pow(1.0 - Math.mod(${MoLang.lifeTime()}, 3) / 3, 0.5)`
            },
            overlayColor: {
                r: "1.0",
                g: "1.0",
                b: "0.75",
                a: `0.55 + 0.55 * Math.pow(1.0 - Math.mod(${MoLang.lifeTime()}, 3) / 3, 0.5)`
            }
        }
    ]
});