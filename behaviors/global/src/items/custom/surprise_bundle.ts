import { BPItemComponents, createBPItem } from "simplified-mojang-jsons";

export const SurpriseBundleItem = createBPItem({
    idItem: 'ha:surprise_bundle',
    menuCategory: {
        category: "items"
    },
    components: [
        new BPItemComponents.SetDisplayName({
            value: "item.ha:surprise_bundle"
        }),
        new BPItemComponents.SetCustomComponent('ha:surprise_bundle_events'),
        new BPItemComponents.SetAllowOffHand(false),
        new BPItemComponents.SetCanDestroyInCreative(true),
        new BPItemComponents.SetGlint(true),
        new BPItemComponents.SetIcon('surprise_bundle'),
        new BPItemComponents.SetMaxStackSize(1),
        new BPItemComponents.SetRarity("rare"),
    ]
});