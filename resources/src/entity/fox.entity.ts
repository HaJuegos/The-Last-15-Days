import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const FoxClientEntity = RPClientEntityTemplates.FoxEntity({
    add: {
        materials: {
            mask: "mask_fox"
        },
        textures: {
            mask: "textures/entity/fox/mask_fox"
        },
        renderControllers: [
            {
                "controller.render.mask_fox": `${MoLang.skinId()} == 1`
            }
        ]
    }
});