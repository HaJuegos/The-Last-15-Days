import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const IronAppleItem = createBPItem({
    idItem: "ha:iron_apple",
    menuCategory: {
        category: "nature",
        group: "minecraft:itemGroup.name.crop"
    },
    components: [
        new BPItemComponents.SetCustomComponent("ha:iron_apple_events"),

        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetIcon("iron_apple"),
        new BPItemComponents.SetMaxStackSize(64),
        new BPItemComponents.SetRarity("uncommon"),
        new BPItemComponents.SetDisplayName({
            value: "item.ha:iron_apple.name"
        }),
        new BPItemComponents.SetCompostable({
            compostingChance: 1
        }),
        new BPItemComponents.SetUseAnimation("eat"),
        new BPItemComponents.SetUseModifiers({
            emitVibrations: true,
            useDuration: 1.6,
            movementModifier: 0.35
        }),
        new BPItemComponents.SetFood({
            canAlwaysEat: true,
            nutrition: 4,
            saturationModifier: 0.6
        }),
        new BPItemComponents.SetTags({
            tags: [
                "minecraft:is_food",
                "ha:iron_apple",
                "minecraft:apple",
                "minecraft:golden_apple"
            ]
        }),
    ]
});