import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const AllayEssenceItem = createBPItem({
    idItem: "ha:allay_essence",
    menuCategory: {
        category: "items"
    },
    components: [
        new BPItemComponents.SetCustomComponent("ha:allay_essence_events"),

        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetFood({
            canAlwaysEat: true,
            nutrition: 2,
            saturationModifier: 0.6,
            usingConvertsTo: MinecraftItemTypes.GlassBottle,
        }),
        new BPItemComponents.SetDisplayName({
            value: "item.ha:allay_essence"
        }),
        new BPItemComponents.SetGlint({
            value: true
        }),
        new BPItemComponents.SetIcon("allay_essence"),
        new BPItemComponents.SetMaxStackSize(1),
        new BPItemComponents.SetRarity("rare"),
        new BPItemComponents.SetUseAnimation("drink"),
        new BPItemComponents.SetUseModifiers({
            emitVibrations: true,
            useDuration: 1.75,
            movementModifier: 0.35,
        }),
        new BPItemComponents.SetTags({
            tags: [
                "minecraft:is_food"
            ]
        })
    ]
});