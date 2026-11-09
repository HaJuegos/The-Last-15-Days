import { RPRenderControllerTemplates } from "simplified-mojang-jsons";

export const FoxRenderController = RPRenderControllerTemplates.FoxV2({
    add: [
        {
            idRender: "mask_fox",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": "Material.mask"
                }
            ],
            textures: [
                "Texture.mask"
            ],
            filterLighting: true
        }
    ]
});