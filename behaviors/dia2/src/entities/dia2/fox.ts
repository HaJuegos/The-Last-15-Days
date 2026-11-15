import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const FoxEntity = BPEntityTemplates.FoxTemplate({
    properties: {
        "ha:is_new_fox": {
            type: "bool",
            default: false,
            clientSync: true
        },
        "ha:has_mask": {
            type: "int",
            default: 0,
            range: [0, 1],
            clientSync: true,
        },
        "ha:can_drop_inv": {
            type: "bool",
            default: true,
            clientSync: true
        }
    },
    componentsGroups: {
        "minecraft:defending_fox": {
            "minecraft:environment_sensor": new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.boolProperty('ha:is_new_fox', false),
                        event: "ha:become_new_fox",
                        target: "self"
                    },
                    {
                        filters: EntityFilters.allOf(
                            EntityFilters.isDaytime(),
                            EntityFilters.hasTarget(false),
                        ),
                        event: "minecraft:fox_configure_docile_day"
                    },
                    {
                        filters: EntityFilters.allOf(
                            EntityFilters.isDaytime(),
                            EntityFilters.hasTarget(false),
                        ),
                        event: "minecraft:fox_configure_docile_night"
                    }
                ]
            })
        },
        "minecraft:fox_thunderstorm": {
            "minecraft:environment_sensor": new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.boolProperty('ha:is_new_fox', false),
                        event: "ha:become_new_fox",
                        target: "self"
                    },
                    {
                        filters: EntityFilters.allOf(
                            EntityFilters.weatherAtPosition('thunderstorm', 'self', '!='),
                            EntityFilters.isDaytime()
                        ),
                        event: "minecraft:fox_configure_day"
                    },
                    {
                        filters: EntityFilters.allOf(
                            EntityFilters.weatherAtPosition('thunderstorm', 'self', '!='),
                            EntityFilters.isDaytime(false)
                        ),
                        event: "minecraft:fox_configure_night"
                    }
                ]
            })
        },
        "minecraft:fox_day": {
            "minecraft:environment_sensor": new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.boolProperty('ha:is_new_fox', false),
                        event: "ha:become_new_fox",
                        target: "self"
                    },
                    {
                        filters: EntityFilters.allOf(
                            EntityFilters.weatherAtPosition('thunderstorm'),
                            EntityFilters.isDaytime()
                        ),
                        event: "minecraft:fox_configure_thunderstorm"
                    },
                    {
                        filters: EntityFilters.isDaytime(false),
                        event: "minecraft:fox_configure_night"
                    }
                ]
            })
        },
        "minecraft:fox_night": {
            "minecraft:environment_sensor": new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.boolProperty('ha:is_new_fox', false),
                        event: "ha:become_new_fox",
                        target: "self"
                    },
                    {
                        filters: EntityFilters.weatherAtPosition('thunderstorm'),
                        event: "minecraft:fox_configure_thunderstorm"
                    },
                    {
                        filters: EntityFilters.isDaytime(),
                        event: "minecraft:fox_configure_day"
                    }
                ]
            })
        }
    },
    components: {
        "minecraft:behavior.avoid_mob_type": new BPEntityComponents.SetBehaviorAvoidMobType({
            priority: 5,
            entityTypes: [
                {
                    filters: EntityFilters.anyOf(
                        EntityFilters.isFamily('polarbear', 'other'),
                        EntityFilters.isFamily('wolf', 'other')
                    ),
                    maxDist: 10,
                    walkSpeedMultiplier: 1,
                    sprintSpeedMultiplier: 1.5
                }
            ]
        }),
        "minecraft:environment_sensor": new BPEntityComponents.SetEnvironmentSensor({
            triggers: [
                {
                    filters: EntityFilters.boolProperty('ha:is_new_fox', false),
                    event: "ha:become_new_fox",
                    target: "self"
                },
                {
                    filters: EntityFilters.isDaytime(false),
                    event: "minecraft:fox_configure_night"
                },
                {
                    filters: EntityFilters.isDaytime(),
                    event: "minecraft:fox_configure_day"
                }
            ]
        })
    },
    remove: {
        componentsGroups: {
            "minecraft:trusting_fox": [
                "minecraft:behavior.defend_trusted_target"
            ],
            "minecraft:docile_fox": [],
            "minecraft:defending_fox": [
                "minecraft:behavior.melee_box_attack",
                "minecraft:behavior.panic"
            ],
            "minecraft:fox_red": [
                "minecraft:behavior.nearest_prioritized_attackable_target"
            ],
            "minecraft:fox_arctic": [
                "minecraft:behavior.nearest_prioritized_attackable_target"
            ]
        },
        components: [
            "minecraft:despawn"
        ],
        events: {
            "minecraft:entity_spawned": {
                sequence: [
                    {
                        randomize: [
                            {
                                add: {
                                    componentGroups: [
                                        "minecraft:docile_fox"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:entity_born": {
                add: {
                    componentGroups: [
                        "minecraft:docile_fox"
                    ]
                }
            },
            "minecraft:fox_configure_defending": {
                remove: {
                    componentGroups: [
                        "minecraft:docile_fox"
                    ]
                }
            },
            "minecraft:fox_configure_docile_day": {
                add: {
                    componentGroups: [
                        "minecraft:docile_fox"
                    ]
                }
            },
            "minecraft:fox_configure_docile_night": {
                add: {
                    componentGroups: [
                        "minecraft:docile_fox"
                    ]
                }
            }
        }
    },
    add: {
        componentsGroups: {
            "ha:transform_new_fox": [
                new BPEntityComponents.SetSpawnEntity({
                    entities: [
                        {
                            minWaitTime: 0,
                            maxWaitTime: 0.1,
                            numToSpawn: 1,
                            shouldLeash: false,
                            singleUse: true,
                            spawnEntity: MinecraftEntityTypes.Fox,
                            spawnEvent: "minecraft:entity_spawned"
                        }
                    ]
                }),
                new BPEntityComponents.SetInstantDespawn({})
            ],
            "ha:has_items": [
                new BPEntityComponents.SetPersistent()
            ],
            "ha:normal_inv": [
                new BPEntityComponents.SetInventory({
                    inventorySize: 70,
                    private: false,
                    restrictToOwner: true,
                    canBeSiphonedFrom: false,
                    containerType: "inventory"
                })
            ],
            "ha:rare_inv": [
                new BPEntityComponents.SetInventory({
                    inventorySize: 70,
                    private: true,
                    restrictToOwner: true,
                    canBeSiphonedFrom: false,
                    containerType: "inventory"
                })
            ],
            "ha:can_despawn": [
                new BPEntityComponents.SetDespawn({
                    despawnFromDistance: {}
                })
            ]
        },
        components: [
            new BPEntityComponents.SetOnTargetAcquired({
                target: "self",
                event: "ha:set_mask"
            }),
            new BPEntityComponents.SetOnTargetEscape({
                target: "self",
                event: "ha:remove_mask"
            }),
            new BPEntityComponents.SetBehaviorMeleeBoxAttack({
                priority: 0,
                canSpreadOnFire: true,
                cooldownTime: 0.75,
                horizontalReach: 1.3,
                meleeFov: 360,
                trackTarget: true,
                speedMultiplier: 1.15
            }),
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                hurtOwner: true
            }),
            new BPEntityComponents.SetBehaviorNearestPrioritizedAttackableTarget({
                priority: 2,
                reselectTargets: true,
                mustSee: true,
                entityTypes: [
                    {
                        priority: 0,
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('player', 'other'),
                            EntityFilters.isFamily('irongolem', 'other'),
                            EntityFilters.isFamily('snowgolem', 'other'),
                        ),
                        maxDist: 40
                    },
                    {
                        priority: 1,
                        filters: EntityFilters.isFamily('rabbit', 'other'),
                        maxDist: 12
                    },
                    {
                        priority: 1,
                        filters: EntityFilters.isFamily('chicken', 'other'),
                        maxDist: 12
                    },
                    {
                        priority: 1,
                        filters: EntityFilters.allOf(
                            EntityFilters.isFamily('baby_turtle', 'other'),
                            EntityFilters.inWater(true, 'other', '!=')
                        ),
                        maxDist: 12
                    },
                    {
                        priority: 2,
                        filters: EntityFilters.isFamily('cod', 'other'),
                        maxDist: 12
                    },
                    {
                        priority: 2,
                        filters: EntityFilters.isFamily('salmon', 'other'),
                        maxDist: 12
                    },
                    {
                        priority: 2,
                        filters: EntityFilters.isFamily('tropicalfish', 'other'),
                        maxDist: 12
                    }
                ]
            })
        ],
        events: {
            "ha:become_new_fox": {
                add: {
                    componentGroups: [
                        "ha:transform_new_fox"
                    ]
                }
            },

            "minecraft:entity_spawned": {
                sequence: [
                    { trigger: "ha:set_new_fox" },
                    {
                        add: {
                            componentGroups: [
                                "ha:can_despawn"
                            ]
                        }
                    },
                    {
                        randomize: [
                            {
                                weight: 90,
                                add: {
                                    componentGroups: [
                                        "ha:normal_inv"
                                    ]
                                }
                            },
                            {
                                weight: 10,
                                setProperty: {
                                    "ha:can_drop_inv": false
                                },
                                add: {
                                    componentGroups: [
                                        "ha:rare_inv"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:entity_born": {
                sequence: [
                    { trigger: "ha:set_new_fox" },
                    {
                        add: {
                            componentGroups: [
                                "ha:can_despawn"
                            ]
                        }
                    },
                    {
                        randomize: [
                            {
                                weight: 90,
                                add: {
                                    componentGroups: [
                                        "ha:normal_inv"
                                    ]
                                }
                            },
                            {
                                weight: 10,
                                setProperty: {
                                    "ha:can_drop_inv": false
                                },
                                add: {
                                    componentGroups: [
                                        "ha:rare_inv"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },

            "ha:set_new_fox": {
                setProperty: {
                    "ha:is_new_fox": true
                }
            },

            "ha:set_persistance_items": {
                remove: {
                    componentGroups: [
                        "ha:can_despawn"
                    ]
                },
                add: {
                    componentGroups: [
                        "ha:has_items"
                    ]
                }
            },
            "ha:set_mask": {
                setProperty: {
                    "ha:has_mask": 1
                },
                queueCommand: {
                    command: [
                        "playsound armor.equip_generic @a ~~~"
                    ]
                }
            },
            "ha:remove_mask": {
                setProperty: {
                    "ha:has_mask": 0
                }
            },
        }
    }
});