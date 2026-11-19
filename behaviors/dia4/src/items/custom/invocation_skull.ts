import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const InvocationSkullItem = createBPItem({
    idItem: "ha:invocation_skull",
    menuCategory: {
        category: "equipment"
    },
    components: [
        new BPItemComponents.SetDisplayName({
            value: "item.ha:invocation_skull"
        }),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetGlint(true),
        new BPItemComponents.SetIcon("invocation_skull"),
        new BPItemComponents.SetMaxStackSize(1),
        new BPItemComponents.SetRarity("uncommon"),
    ]
});