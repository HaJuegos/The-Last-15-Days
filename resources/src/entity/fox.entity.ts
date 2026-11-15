import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const FoxClientEntity = RPClientEntityTemplates.FoxEntity({
    add: {
        materials: {
            mask: "mask_fox"
        },
        textures: {
            mask: "textures/entity/fox/mask_fox",
            baby_mask: "textures/entity/fox/mask_fox_baby",
            baby_mask_sleep: "textures/entity/fox/mask_fox_baby_sleeping"
        },
        renderControllers: [
            {
                "controller.render.mask_fox": `${MoLang.property('ha:has_mask')} == 1`
            }
        ]
    }
});