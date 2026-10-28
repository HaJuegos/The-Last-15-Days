import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const BananaItem = createBPItem({
    idItem: 'ha:banana',
    menuCategory: {
        category: "nature",
        group: "minecraft:itemGroup.name.crop"
    },
    components: [
        new BPItemComponents.SetCustomComponent('ha:banana_events'),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetDisplayName({
            value: "item.ha:banana.name"
        }),
        new BPItemComponents.SetUseModifiers({
            emitVibrations: true,
            useDuration: 1.6,
            movementModifier: 0.35
        }),
        // @ts-ignore
        new BPItemComponents.SetFood({
            canAlwaysEat: true,
            nutrition: 20
        }),
        new BPItemComponents.SetIcon('banana'),
        new BPItemComponents.SetMaxStackSize(16),
        new BPItemComponents.SetRarity('epic'),
        new BPItemComponents.SetStackedByData(true),
        new BPItemComponents.SetUseAnimation('eat'),
        new BPItemComponents.SetTags({
            tags: [
                "minecraft:is_food"
            ]
        }),
    ]
});