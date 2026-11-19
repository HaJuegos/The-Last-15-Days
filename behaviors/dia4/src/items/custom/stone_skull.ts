import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const StoneSkullItem = createBPItem({
    idItem: "ha:stone_skull",
    menuCategory: {
        category: "items"
    },
    components: [
        new BPItemComponents.SetDisplayName({
            value: "item.ha:stone_skull"
        }),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetIcon("stone_skull"),
        new BPItemComponents.SetMaxStackSize(16),
        new BPItemComponents.SetRarity("common"),
    ]
});