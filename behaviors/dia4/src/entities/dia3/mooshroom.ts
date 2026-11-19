import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const MooshroomCowEntity = BPEntityTemplates.MooshroomTemplate({
    remove: {
        components: [
            "minecraft:behavior.panic"
        ]
    },
    add: {
        components: [
            new BPEntityComponents.SetBehaviorKnockbackRoar({
                priority: 0,
                duration: 1,
                attackTime: 0.5,
                knockbackDamage: 2,
                knockbackHorizontalStrength: 100,
                knockbackVerticalStrength: 4,
                knockbackRange: 10,
                damageFilters: EntityFilters.isFamily('memo', 'other'),
                knockbackFilters: EntityFilters.allOf(
                    EntityFilters.isFamily('cow', 'other', '!=')
                ),
                cooldownTime: 20
            }),
            new BPEntityComponents.SetKnockbackResistance({
                value: 99999
            })
        ]
    }
});