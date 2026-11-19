import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const SoulLinkItem = createBPItem({
    idItem: "ha:soul_link",
    menuCategory: {
        category: "items"
    },
    components: [
        new BPItemComponents.SetCustomComponent("ha:soul_link_events"),

        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetDisplayName({
            value: "item.ha:soul_link"
        }),
        new BPItemComponents.SetGlint(true),
        new BPItemComponents.SetIcon("soul_link"),
        new BPItemComponents.SetFireResistant({
            value: true
        }),
        new BPItemComponents.SetMaxStackSize(1),
        new BPItemComponents.SetRarity("uncommon")
    ]
});