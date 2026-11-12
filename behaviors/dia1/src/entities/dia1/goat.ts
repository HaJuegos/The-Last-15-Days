import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const GoatEntity = BPEntityTemplates.GoatTemplate({
    componentsGroups: {
        ram_default: {
            "minecraft:behavior.ram_attack": new BPEntityComponents.SetBehaviorRamAttack({
                priority: 5,
                runSpeed: 0.7,
                ramSpeed: 1.8,
                minRamDistance: 4,
                ramDistance: 7,
                knockbackForce: 10,
                knockbackHeight: 0.075,
                preRamSound: "pre_ram",
                ramImpactSound: "ram_impact",
                cooldownRange: {
                    min: 0,
                    max: 1
                }
            })
        },
        ram_screamer: {
            "minecraft:behavior.ram_attack": new BPEntityComponents.SetBehaviorRamAttack({
                priority: 5,
                runSpeed: 0.7,
                ramSpeed: 1.8,
                minRamDistance: 4,
                ramDistance: 7,
                knockbackForce: 10,
                knockbackHeight: 0.075,
                preRamSound: "pre_ram.screamer",
                ramImpactSound: "ram_impact.screamer",
                cooldownRange: {
                    min: 0,
                    max: 1
                }
            })
        }
    },
    components: {
        "minecraft:behavior.nearest_attackable_target": new BPEntityComponents.SetBehaviorNearestAttackableTarget({
            priority: 2,
            withinRadius: 16,
            mustSee: true,
            entityTypes: [
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.isFamily('goat', 'other', '!=')
                    ),
                    maxDist: 20
                }
            ]
        })
    },
    remove: {
        componentsGroups: {
            attack_cooldown: []
        },
        components: [
            "minecraft:behavior.panic"
        ],
        events: {
            start_event: true,
            attack_cooldown_complete_event: true
        }
    },
    add: {
        components: [
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                hurtOwner: true
            })
        ]
    }
});