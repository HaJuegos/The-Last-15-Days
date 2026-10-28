import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const VillagerChanges = BPEntityTemplates.VillagerV2Template({
    components: {
        "minecraft:damage_sensor": new BPEntityComponents.SetDamageSensor({
            triggers: [
                {
                    onDamage: {
                        filters: EntityFilters.isFamily('villager', 'other')
                    },
                    cause: "all",
                    dealsDamage: "no"
                },
                {
                    onDamage: {
                        filters: EntityFilters.allOf(
                            EntityFilters.isFamily('lightning', 'other'),
                            EntityFilters.isDifficulty('peaceful', 'self', '!=')
                        ),
                        event: "become_witch"
                    },
                    dealsDamage: "no"
                },
                {
                    onDamage: {
                        filters: EntityFilters.allOf(
                            EntityFilters.anyOf(
                                EntityFilters.isFamily('zombie', 'other'),
                                EntityFilters.isFamily('husk', 'other'),
                            ),
                            EntityFilters.hasDamage('fatal')
                        ),
                        event: "become_zombie"
                    }
                }
            ]
        })
    },
    remove: {
        componentsGroups: {
            librarian: {},
            librarian_schedule: {},
            work_schedule_librarian: {}
        },
        events: {
            "minecraft:become_librarian": {},
            "minecraft:entity_transformed": {
                sequence: [
                    {
                        sequence: [
                            {
                                filters: EntityFilters.isFamily('librarian', 'other'),
                                add: {
                                    componentGroups: [
                                        "librarian",
                                        "behavior_non_peasant",
                                        "librarian_schedule"
                                    ]
                                }
                            },
                        ]
                    }
                ]
            },
            "minecraft:entity_spawned": {
                sequence: [
                    {
                        randomize: [
                            {
                                sequence: [
                                    {
                                        randomize: [
                                            {
                                                add: {
                                                    componentGroups: [
                                                        "librarian",
                                                        "behavior_non_peasant",
                                                        "basic_schedule"
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "minecraft:schedule_work_librarian": {},
            "minecraft:spawn_librarian": {
                randomize: [
                    {
                        add: {
                            componentGroups: [
                                "librarian",
                                "adult",
                                "make_and_receive_love",
                                "behavior_non_peasant",
                                "basic_schedule"
                            ]
                        }
                    }
                ]
            }
        }
    },
    add: {
        componentsGroups: {
            "ha:become_angry": [
                new BPEntityComponents.SetBehaviorMeleeBoxAttack({
                    priority: 0,
                    canSpreadOnFire: true,
                    cooldownTime: 0.65,
                    meleeFov: 360,
                    horizontalReach: 1.15,
                    speedMultiplier: 0.95,
                    trackTarget: true
                }),
                new BPEntityComponents.SetAngry({
                    broadcastAnger: true,
                    broadcastAngerOnAttack: true,
                    broadcastAngerOnBeingAttacked: true,
                    broadcastAngerWhenDying: true,
                    broadcastRange: 20,
                    filters: EntityFilters.isFamily('villager', 'other', 'not'),
                    broadcastTargets: [
                        "villager",
                        "irongolem"
                    ],
                    angrySoundId: "haggle.no",
                    soundInterval: [1, 5],
                    duration: 140,
                    calmEvent: {
                        event: "ha:become_calm",
                        target: "self"
                    }
                })
            ]
        },
        components: [
            new BPEntityComponents.SetGroupSize({
                radius: 20,
                filters: EntityFilters.isFamily('villager')
            }),
            new BPEntityComponents.SetOnTargetAcquired({
                target: 'self',
                event: "ha:become_angry"
            }),
            new BPEntityComponents.SetAttack({
                damage: 6
            }),
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                hurtOwner: true,
                entityTypes: [
                    {
                        filters: EntityFilters.isFamily('villager', 'other', 'not')
                    }
                ]
            })
        ],
        events: {
            "ha:become_angry": {
                add: {
                    componentGroups: [
                        "ha:become_angry"
                    ]
                }
            },
            "ha:become_calm": {
                remove: {
                    componentGroups: [
                        "ha:become_angry"
                    ]
                }
            },
        }
    }
});