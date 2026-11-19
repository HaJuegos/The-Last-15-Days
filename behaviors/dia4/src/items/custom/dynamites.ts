import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const DynamiteOn = createBPItem({
    idItem: "ha:dynamite_item",
    menuCategory: {
        category: "equipment"
    },
    components: [
        new BPItemComponents.SetDisplayName({
            value: "item.ha:dynamite_item.name"
        }),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(false),
        new BPItemComponents.SetIcon("dynamite_on"),
        new BPItemComponents.SetHandEquipped(true),
        new BPItemComponents.SetMaxStackSize(16),
        new BPItemComponents.SetRarity("uncommon"),
        new BPItemComponents.SetThrowable({
            doSwingAnimation: true
        }),
        new BPItemComponents.SetProjectile({
            minimumCriticalPower: 1.25,
            projectileEntity: "ha:dynamite<ha:spawned_from_player>"
        })
    ]
});

export const DynamiteOff = createBPItem({
    idItem: "ha:dynamite_off_item",
    menuCategory: {
        category: "items"
    },
    components: [
        new BPItemComponents.SetDisplayName({
            value: "item.ha:dynamite_off_item"
        }),
        new BPItemComponents.SetBlockPlacer({
            block: "ha:dynamite_block"
        }),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetIcon("dynamite_off"),
        new BPItemComponents.SetHandEquipped(true),
        new BPItemComponents.SetMaxStackSize(16),
        new BPItemComponents.SetRarity("common")
    ]
});