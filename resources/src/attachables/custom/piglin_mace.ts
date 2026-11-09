import { createRPAttachable } from "simplified-mojang-jsons";

export const PiglinMaceAttach = createRPAttachable({
    idAttach: "ha:piglin_mace",
    attachable: {
        geometry: {
            default: "geometry.hammer_piglin"
        },
        materials: {
            default: "item_in_hand_entity_alphatest",
            enchanted: "item_in_hand_glint"
        },
        textures: {
            default: "textures/models/items/custom/hammer_piglin",
            enchanted: "textures/misc/enchanted_item_glint"
        },
        animations: {
            fp_anim: "animation.piglin_mace.fp",
            tp_anim: "animation.piglin_mace.tp"
        },
        scripts: {
            animate: [
                {
                    fp_anim: "c.is_first_person"
                },
                {
                    tp_anim: "!c.is_first_person"
                }
            ]
        },
        renderControllers: [
            "controller.render.piglin_mace"
        ]
    }
});