import {createRPRenderController, MoLang} from "simplified-mojang-jsons";

export const PiglinMaceRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "piglin_mace",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": `${MoLang.variable("is_enchanted")} ? Material.enchanted : Material.default`
                }
            ],
            textures: [
                "Texture.default",
                "Texture.enchanted"
            ],
            filterLighting: true
        }
    ]
});