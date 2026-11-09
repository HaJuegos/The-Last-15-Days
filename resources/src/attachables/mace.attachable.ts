import { createRPAttachable } from "simplified-mojang-jsons";

export const MaceAttach = createRPAttachable({
    idAttach: "minecraft:mace",
    attachable: {
        materials: {
            default: "entity_alphatest",
            enchanted: "entity_glint"
        },
        textures: {
            default: "textures/models/mace",
            enchanted: "textures/misc/enchanted_item_glint"
        },
        geometry: {
            default: "geometry.bt_mace"
        },
        scripts: {
            animate: [
                {
                    third_person: "!c.is_first_person"
                },
                {
                    first_person: "c.is_first_person"
                }
            ]
        },
        animations: {
            third_person: "animation.rp.bt.mace_third_person",
            first_person: "animation.rp.bt.mace_first_person"
        },
        renderControllers: [
            "controller.render.item_default"
        ]
    }
});