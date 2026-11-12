import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const VillagerChanges = BPEntityTemplates.VillagerV2Template({
    properties: {
        "ha:skin_variant": {
            type: "int",
            clientSync: true,
            default: 0,
            range: [0, 4]
        }
    },
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
            "minecraft:entity_spawned": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:entity_born": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:spawn_from_village": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:entity_transformed": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },

            "minecraft:spawn_armorer": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:spawn_butcher": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:spawn_cleric": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:spawn_farmer": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },
            "minecraft:spawn_librarian": {
                sequence: [
                    {
                        trigger: "ha:set_random_skin_color"
                    }
                ]
            },

            "ha:set_random_skin_color": {
                randomize: [
                    {
                        weight: 65,
                    },
                    {
                        weight: 9,
                        setProperty: {
                            "ha:skin_variant": 1
                        }
                    },
                    {
                        weight: 9,
                        setProperty: {
                            "ha:skin_variant": 2
                        }
                    },
                    {
                        weight: 9,
                        setProperty: {
                            "ha:skin_variant": 3
                        }
                    },
                    {
                        weight: 8,
                        setProperty: {
                            "ha:skin_variant": 4
                        }
                    }
                ]
            },

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