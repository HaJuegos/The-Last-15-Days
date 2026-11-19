import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const LasagnaItem = createBPItem({
    idItem: "ha:lasagna",
    menuCategory: {
        category: "equipment",
        group: "minecraft:itemGroup.name.cookedFood"
    },
    components: [
        new BPItemComponents.SetCustomComponent("ha:lasagna_events"),

        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetFood({
            canAlwaysEat: true,
            nutrition: 10,
            saturationModifier: 0.6
        }),
        new BPItemComponents.SetUseAnimation("eat"),
        new BPItemComponents.SetUseModifiers({
            emitVibrations: true,
            useDuration: 1.6,
            movementModifier: 0.35
        }),
        new BPItemComponents.SetDisplayName({
            value: "item.ha:lasagna"
        }),
        new BPItemComponents.SetIcon("lasagna"),
        new BPItemComponents.SetMaxStackSize(16),
        new BPItemComponents.SetRarity("rare"),
        new BPItemComponents.SetTags({
            tags: [
                "minecraft:is_food",
                "minecraft:is_cooked",
            ]
        }),
    ]
});