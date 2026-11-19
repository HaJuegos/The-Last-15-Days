import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const PillagerEntity = BPEntityTemplates.PillagerTemplate({
    properties: {
        "ha:is_glow": {
            type: "bool",
            clientSync: true,
            default: false
        }
    },
    remove: {
        events: {
            "minecraft:spawn_for_raid": true,
            "minecraft:spawn_as_patrol_follower": true,
            "minecraft:spawn_as_illager_captain": true,
        }
    },
    add: {
        componentsGroups: {
            "ha:timer_glowing": [
                new BPEntityComponents.SetBehaviorTimerFlagOne({
                    priority: 0,
                    cooldownRange: {
                        min: 0,
                        max: 0
                    },
                    durationRange: {
                        min: 10,
                        max: 10
                    },
                    onEnd: {
                        event: "ha:remove_glow",
                        target: "self"
                    }
                })
            ],

            "ha:bomber_raid_spawned": [
                new BPEntityComponents.SetSpawnEntity({
                    entities: [
                        {
                            minWaitTime: 0,
                            maxWaitTime: 0.1,
                            numToSpawn: 1,
                            shouldLeash: false,
                            singleUse: true,
                            spawnEntity: "ha:bomber_pillager",
                            spawnEvent: "minecraft:spawn_for_raid"
                        }
                    ]
                })
            ],
            "ha:bomber_captain_spawned": [
                new BPEntityComponents.SetSpawnEntity({
                    entities: [
                        {
                            minWaitTime: 0,
                            maxWaitTime: 0.1,
                            numToSpawn: 1,
                            shouldLeash: false,
                            singleUse: true,
                            spawnEntity: "ha:bomber_pillager",
                            spawnEvent: "minecraft:spawn_as_illager_captain"
                        }
                    ]
                })
            ],
            "ha:bomber_patrol_follower_spawned": [
                new BPEntityComponents.SetSpawnEntity({
                    entities: [
                        {
                            minWaitTime: 0,
                            maxWaitTime: 0.1,
                            numToSpawn: 1,
                            shouldLeash: false,
                            singleUse: true,
                            spawnEntity: "ha:bomber_pillager",
                            spawnEvent: "minecraft:spawn_as_patrol_follower"
                        }
                    ]
                })
            ],
        },
        components: [
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        onDamage: {
                            filters: EntityFilters.isFamily('bomber_pillager', 'other')
                        },
                        cause: "all",
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                entityTypes: [
                    {
                        filters: EntityFilters.noneOf(
                            EntityFilters.isFamily('illager', 'other'),
                            EntityFilters.isFamily('witch', 'other')
                        )
                    }
                ]
            }),
        ],
        events: {
            "minecraft:spawn_for_raid": {
                sequence: [
                    {
                        add: {
                            componentGroups: [
                                "minecraft:ranged_attack",
                                "minecraft:raid_configuration",
                                "minecraft:raid_persistence",
                                "ha:bomber_raid_spawned"
                            ]
                        }
                    },
                    {
                        randomize: [
                            {
                                weight: 60
                            },
                            {
                                weight: 40,
                                add: {
                                    componentGroups: [
                                        "minecraft:patrol_follower"
                                    ]
                                }
                            },
                            {
                                weight: 40,
                                add: {
                                    componentGroups: [
                                        "minecraft:illager_squad_captain"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:spawn_as_patrol_follower": {
                sequence: [
                    {
                        add: {
                            componentGroups: [
                                "minecraft:ranged_attack",
                                "minecraft:patrol_follower"
                            ]
                        }
                    },
                    {
                        randomize: [
                            {
                                weight: 60
                            },
                            {
                                weight: 40,
                                add: {
                                    componentGroups: [
                                        "ha:bomber_patrol_follower_spawned"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:spawn_as_illager_captain": {
                sequence: [
                    {
                        add: {
                            componentGroups: [
                                "minecraft:ranged_attack",
                                "minecraft:illager_squad_captain"
                            ]
                        }
                    },
                    {
                        randomize: [
                            {
                                weight: 60
                            },
                            {
                                weight: 40,
                                add: {
                                    componentGroups: [
                                        "ha:bomber_captain_spawned"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },

            "ha:set_glow": {
                setProperty: {
                    "ha:is_glow": true
                },
                add: {
                    componentGroups: [
                        "ha:timer_glowing"
                    ]
                }
            },
            "ha:remove_glow": {
                setProperty: {
                    "ha:is_glow": false
                },
                remove: {
                    componentGroups: [
                        "ha:timer_glowing"
                    ]
                }
            },
        }
    }
});