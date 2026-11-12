import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const BeeEntity = BPEntityTemplates.BeeTemplate({
    remove: {
        componentsGroups: {
            track_attacker: [],
            angry_bee: [
                "minecraft:behavior.melee_box_attack"
            ],
            escape_fire: [],
            countdown_to_perish: [
                "minecraft:behavior.panic",
                "minecraft:timer",
            ],
            perish: [],
            take_nearest_target: [
                "minecraft:behavior.nearest_attackable_target"
            ]
        },
        events: {
            "countdown_to_perish_event": true,
            "stop_panicking_after_fire": true,
            "perish_event": true,
        }
    },
    add: {
        components: [
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1
            }),
            new BPEntityComponents.SetBehaviorMeleeBoxAttack({
                priority: 0,
                speedMultiplier: 3,
                canSpreadOnFire: true,
                horizontalReach: 2,
                meleeFov: 360,
                trackTarget: true
            }),
            new BPEntityComponents.SetBehaviorNearestAttackableTarget({
                priority: 2,
                entityTypes: [
                    {
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('player', 'other'),
                            EntityFilters.isFamily('snowgolem', 'other'),
                            EntityFilters.isFamily('irongolem', 'other')
                        ),
                        maxDist: 20
                    }
                ]
            })
        ]
    }
});