import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const AllayDustItem = createBPItem({
    idItem: "ha:allay_dust",
    menuCategory: {
        category: "items"
    },
    components: [
        new BPItemComponents.SetCustomComponent("ha:allay_dust_events"),

        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetFood({
            canAlwaysEat: true,
            nutrition: 1,
            saturationModifier: 0.6
        }),
        new BPItemComponents.SetDisplayName({
            value: "item.ha:allay_dust"
        }),
        new BPItemComponents.SetGlint({
            value: false
        }),
        new BPItemComponents.SetIcon("allay_dust"),
        new BPItemComponents.SetMaxStackSize(64),
        new BPItemComponents.SetRarity("rare"),
        new BPItemComponents.SetUseAnimation("eat"),
        new BPItemComponents.SetUseModifiers({
            emitVibrations: true,
            useDuration: 1.6,
            movementModifier: 0.35,
        }),
        new BPItemComponents.SetTags({
            tags: [
                "minecraft:is_cooked",
                "minecraft:is_food",
            ]
        })
    ]
});