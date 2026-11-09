import { RPRenderControllerTemplates } from "simplified-mojang-jsons";

export const MagmaCubeRenderController = RPRenderControllerTemplates.MagmaCube({
    add: [
        {
            idRender: "magma_copter",
            geometry: "Geometry.copter",
            materials: [
                { "*": "Material.default" }
            ],
            partVisibility: [
                { "*": true },
                { magnet_1: false },
                { magnet_2: false }
            ],
            textures: [
                "Texture.copter"
            ]
        }
    ]
});