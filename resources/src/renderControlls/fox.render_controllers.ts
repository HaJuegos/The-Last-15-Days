import { MoLang, RPRenderControllerTemplates } from "simplified-mojang-jsons";

export const FoxRenderController = RPRenderControllerTemplates.FoxV2({
    add: [
        {
            idRender: "mask_fox",
            arrays: {
                textures: {
                    "Array.masks": [
                        "Texture.mask",
                        "Texture.baby_mask",
                        "Texture.baby_mask_sleep",
                    ]
                }
            },
            geometry: `${MoLang.isBaby()} ? Geometry.baby : Geometry.default`,
            materials: [
                {
                    "*": "Material.mask"
                }
            ],
            textures: [
                `${MoLang.isBaby()} ? (${MoLang.isSleeping()} ? Array.masks[2] : Array.masks[1]) : Array.masks[0]`
            ],
            filterLighting: true
        }
    ]
});