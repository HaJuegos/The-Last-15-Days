import {createRPRenderController, MoLang} from "simplified-mojang-jsons";

export const GarfieldRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "garfield",
            arrays: {
                textures: {
                    "Array.skins": [
                        "Texture.default",
                        "Texture.angry"
                    ]
                },
                geometries: {
                    "Array.geo": [
                        "Geometry.default",
                        "Geometry.angry"
                    ]
                }
            },
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            geometry: `Array.geo[${MoLang.skinId()}]`,
            textures: [
                `Array.skins[${MoLang.skinId()}]`
            ]
        }
    ]
});