import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const PolarBearEntity = BPEntityTemplates.PolarBearTemplate({
    remove: {
        componentsGroups: {
            "minecraft:baby_wild": [],
            "minecraft:baby_scared": [],
            "minecraft:adult_wild": [
                "minecraft:behavior.nearest_attackable_target"
            ],
            "minecraft:adult_hostile": [
                "minecraft:behavior.stomp_attack"
            ]
        },
        components: [
            "minecraft:behavior.panic"
        ],
        events: {
            "minecraft:entity_spawned": {
                randomize: [
                    {
                        add: {
                            componentGroups: [
                                "minecraft:baby_wild"
                            ]
                        }
                    }
                ]
            },
            "minecraft:entity_born": {
                add: {
                    componentGroups: [
                        "minecraft:baby_wild"
                    ]
                }
            },
            "minecraft:ageable_grow_up": {
                remove: {
                    componentGroups: [
                        "minecraft:baby_wild",
                        "minecraft:baby_scared"
                    ]
                },
                add: {
                    componentGroups: [
                        "minecraft:adult_wild"
                    ]
                }
            },
            "minecraft:baby_on_calm": true,
            "minecraft:on_scared": true,
        }
    },
    componentsGroups: {
        "minecraft:adult_hostile": {
            "minecraft:angry": new BPEntityComponents.SetAngry({
                angrySoundId: "",
                broadcastAnger: false,
                broadcastAngerOnAttack: false,
                broadcastAngerOnBeingAttacked: false,
                broadcastRange: 20,
                broadcastTargets: [],
                duration: 500,
                durationDelta: 0
            })
        }
    },
    components: {
        "minecraft:behavior.hurt_by_target": new BPEntityComponents.SetBehaviorHurtByTarget({
            priority: 1
        })
    },
    add: {
        components: [
            new BPEntityComponents.SetBehaviorStompAttack({
                priority: 0,
                trackTarget: true,
                requireCompletePath: true,
                stompRangeMultiplier: 2.0,
                noDamageRangeMultiplier: 2.0
            }),
            new BPEntityComponents.SetBehaviorNearestAttackableTarget({
                priority: 2,
                mustSee: false,
                entityTypes: [
                    {
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('player', 'other'),
                            EntityFilters.isFamily('snowgolem', 'other'),
                            EntityFilters.isFamily('irongolem', 'other'),
                            EntityFilters.isFamily('fox', 'other'),
                        ),
                        maxDist: 20
                    }
                ]
            })
        ]
    }
});