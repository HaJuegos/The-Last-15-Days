import { FormatVersionListEntities, MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const MagmaCubeClientEntity = RPClientEntityTemplates.MagmaCubeEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        textures: {
            copter: "textures/entity/magma_cube/magmacopter"
        },
        geometry: {
            copter: "geometry.magmacopter"
        },
        animations: {
            flying: "animation.magma_copter.flying"
        },
        renderControllers: [
            {
                "controller.render.magma_copter": `${MoLang.skinId()} == 1`
            }
        ]
    }
});