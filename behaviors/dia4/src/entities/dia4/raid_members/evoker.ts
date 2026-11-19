import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const EvokerEntity = BPEntityTemplates.EvocationIllagerTemplate({
    properties: {
        "ha:is_glow": {
            type: "bool",
            clientSync: true,
            default: false
        }
    },
    remove: {
        components: [
            "minecraft:behavior.summon_entity",
            "minecraft:follow_range",
            "minecraft:behavior.hurt_by_target",
            "minecraft:behavior.nearest_attackable_target"
        ]
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

            "ha:angry_mode": [
                new BPEntityComponents.SetSpellEffects({
                    addEffects: [
                        {
                            effect: "resistance",
                            duration: "infinite",
                            amplifier: 1,
                            visible: true,
                            ambient: false
                        },
                        {
                            effect: "levitation",
                            duration: 1,
                            amplifier: 10,
                            ambient: false,
                            visible: false
                        },
                        {
                            effect: "slow_falling",
                            duration: 6,
                            amplifier: 0,
                            visible: false,
                            ambient: false
                        }
                    ]
                }),
                new BPEntityComponents.SetEquipment({
                    table: "loot_tables/entities/custom/evoker_ranged.json"
                }),
                new BPEntityComponents.SetShooter({
                    sound: "bow",
                    projectiles: [
                        {
                            def: `${MinecraftEntityTypes.Arrow}<ha:evoker_angry_arrow>`,
                            auxVal: 25
                        }
                    ]
                }),
                new BPEntityComponents.SetBehaviorRangedAttack({
                    priority: 0,
                    attackRange: {
                        min: 0,
                        max: 350,
                    },
                    attackInterval: {
                        min: 0.75,
                        max: 1
                    },
                    rangedFov: 360,
                    speedMultiplier: 1.17
                }),
                new BPEntityComponents.SetFollowRange({
                    value: 351
                }),
                new BPEntityComponents.SetBehaviorNearestPrioritizedAttackableTarget({
                    priority: 2,
                    mustSee: true,
                    reselectTargets: true,
                    entityTypes: [
                        {
                            priority: 0,
                            filters: EntityFilters.anyOf(
                                EntityFilters.isFamily('player', 'other'),
                                EntityFilters.isFamily('snowgolem', 'other'),
                                EntityFilters.isFamily('irongolem', 'other'),
                                EntityFilters.isFamily('wandering_trader', 'other'),
                            ),
                            maxDist: 360
                        },
                        {
                            priority: 1,
                            filters: EntityFilters.allOf(
                                EntityFilters.isFamily('villager', 'other'),
                                EntityFilters.hasComponent('minecraft:is_baby', 'other', '!=')
                            ),
                            maxDist: 20
                        }
                    ]
                })
            ],

            "ha:angry_mode_damage": [
                new BPEntityComponents.SetOnTargetAcquired({
                    target: "self",
                    event: "ha:start_fly"
                }),
                new BPEntityComponents.SetOnTargetEscape({
                    target: "self",
                    event: "ha:remove_fly"
                }),
                new BPEntityComponents.SetTargetNearbySensor({
                    insideRange: 20,
                    outsideRange: 21,
                    onInsideRange: {
                        event: "ha:start_fly",
                        target: "self"
                    },
                    onOutsideRange: {
                        event: "ha:remove_fly",
                        target: "self"
                    }
                }),
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
            ],
            "ha:normal_mode_damage": [
                new BPEntityComponents.SetOnTargetAcquired({
                    target: "self",
                    event: "ha:start_fly"
                }),
                new BPEntityComponents.SetOnTargetEscape({
                    target: "self",
                    event: "ha:remove_fly"
                }),
                new BPEntityComponents.SetTargetNearbySensor({
                    insideRange: 20,
                    outsideRange: 21,
                    onInsideRange: {
                        event: "ha:start_fly",
                        target: "self"
                    },
                    onOutsideRange: {
                        event: "ha:remove_fly",
                        target: "self"
                    }
                }),
                new BPEntityComponents.SetDamageSensor({
                    triggers: [
                        {
                            onDamage: {
                                filters: EntityFilters.isFamily('bomber_pillager', 'other')
                            },
                            cause: "all",
                            dealsDamage: "no"
                        },
                        {
                            onDamage: {
                                target: "self",
                                event: "ha:angry_mode"
                            },
                            cause: "all",
                            dealsDamage: "no"
                        }
                    ]
                }),
            ],

            "ha:magic_mode": [
                new BPEntityComponents.SetEnvironmentSensor({
                    triggers: [
                        {
                            filters: EntityFilters.targetDistance(15, 'self', '<='),
                            event: "ha:become_ranged",
                            target: 'self'
                        }
                    ]
                }),
                new BPEntityComponents.SetBehaviorSummonEntity({
                    priority: 0,
                    summonChoices: [
                        {
                            castDuration: 2,
                            particleColor: "#FF664D59",
                            cooldownTime: 5,
                            maxActivationRange: 3,
                            minActivationRange: 0,
                            sequence: [
                                {
                                    baseDelay: 1,
                                    shape: "circle",
                                    numEntitiesSpawned: 5,
                                    delayPerSummon: 0,
                                    entityLifespan: 1.1,
                                    entityType: "minecraft:evocation_fang",
                                    size: 1.5,
                                    soundEvent: "prepare.attack",
                                    target: "self"
                                },
                                {
                                    baseDelay: 0.15,
                                    target: "self",
                                    delayPerSummon: 0,
                                    numEntitiesSpawned: 8,
                                    shape: "circle",
                                    entityLifespan: 1.1,
                                    entityType: "minecraft:evocation_fang",
                                    size: 2.5
                                }
                            ],
                            startSoundEvent: "cast.spell",
                            weight: 3
                        },
                        {
                            castDuration: 2,
                            particleColor: "#FF664D59",
                            cooldownTime: 5,
                            minActivationRange: 3,
                            sequence: [
                                {
                                    baseDelay: 1,
                                    target: "self",
                                    delayPerSummon: 0.05,
                                    numEntitiesSpawned: 16,
                                    shape: "line",
                                    entityLifespan: 1.1,
                                    entityType: "minecraft:evocation_fang",
                                    size: 20
                                }
                            ],
                            startSoundEvent: "cast.spell",
                            weight: 3
                        },
                        {
                            castDuration: 5,
                            particleColor: "#FFB3B3CC",
                            cooldownTime: 17,
                            sequence: [
                                {
                                    baseDelay: 5,
                                    entityType: "minecraft:vex",
                                    shape: "circle",
                                    numEntitiesSpawned: 3,
                                    summonCapRadius: 16,
                                    size: 1,
                                    soundEvent: "prepare.summon",
                                    summonCap: 8,
                                    summonEvent: "minecraft:add_damage_timer",
                                    target: "self"
                                }
                            ],
                            weight: 1
                        },
                        {
                            weight: 1,
                            minActivationRange: 0,
                            maxActivationRange: 100,
                            cooldownTime: 25,
                            castDuration: 2,
                            particleColor: "#0D0C0CCF",
                            sequence: [
                                {
                                    shape: "circle",
                                    target: "self",
                                    baseDelay: 1,
                                    numEntitiesSpawned: 4,
                                    entityType: MinecraftEntityTypes.WitherSkeleton,
                                    summonEvent: "minecraft:entity_spawned",
                                    size: 1.15,
                                    entityLifespan: 160,
                                    soundEvent: "prepare.summon"
                                }
                            ]
                        }
                    ]
                }),
                new BPEntityComponents.SetBehaviorNearestPrioritizedAttackableTarget({
                    priority: 2,
                    mustSee: false,
                    reselectTargets: false,
                    entityTypes: [
                        {
                            priority: 0,
                            filters: EntityFilters.anyOf(
                                EntityFilters.isFamily('player', 'other'),
                                EntityFilters.isFamily('snowgolem', 'other'),
                                EntityFilters.isFamily('irongolem', 'other'),
                                EntityFilters.isFamily('wandering_trader', 'other'),
                            ),
                            maxDist: 100
                        },
                        {
                            priority: 1,
                            filters: EntityFilters.allOf(
                                EntityFilters.isFamily('villager', 'other'),
                                EntityFilters.hasComponent('minecraft:is_baby', 'other', '!=')
                            ),
                            maxDist: 20
                        }
                    ]
                })
            ],
            "ha:ranged_mode": [
                new BPEntityComponents.SetEnvironmentSensor({
                    triggers: [
                        {
                            filters: EntityFilters.targetDistance(16, 'self', '>='),
                            event: "ha:become_magic",
                            target: 'self'
                        }
                    ]
                }),
                new BPEntityComponents.SetEquipment({
                    table: "loot_tables/entities/custom/evoker_ranged.json"
                }),
                new BPEntityComponents.SetShooter({
                    sound: "bow",
                    projectiles: [
                        {
                            def: `${MinecraftEntityTypes.Arrow}<ha:evoker_arrow>`,
                            auxVal: 25
                        }
                    ]
                }),
                new BPEntityComponents.SetBehaviorRangedAttack({
                    priority: 0,
                    attackRange: {
                        min: 0,
                        max: 30
                    },
                    attackInterval: {
                        min: 1.15,
                        max: 1.65
                    },
                    rangedFov: 360,
                    speedMultiplier: 1.23
                }),
                new BPEntityComponents.SetBehaviorNearestPrioritizedAttackableTarget({
                    priority: 2,
                    mustSee: true,
                    reselectTargets: true,
                    entityTypes: [
                        {
                            priority: 0,
                            filters: EntityFilters.anyOf(
                                EntityFilters.isFamily('player', 'other'),
                                EntityFilters.isFamily('snowgolem', 'other'),
                                EntityFilters.isFamily('irongolem', 'other'),
                                EntityFilters.isFamily('wandering_trader', 'other'),
                            ),
                            maxDist: 40
                        },
                        {
                            priority: 1,
                            filters: EntityFilters.allOf(
                                EntityFilters.isFamily('villager', 'other'),
                                EntityFilters.hasComponent('minecraft:is_baby', 'other', '!=')
                            ),
                            maxDist: 20
                        }
                    ]
                })
            ],

            "ha:remove_fly_mode": [
                new BPEntityComponents.SetSpellEffects({
                    addEffects: [
                        {
                            effect: "resistance",
                            duration: "infinite",
                            amplifier: 1,
                            visible: true,
                            ambient: false
                        }
                    ],
                    removeEffects: ["levitation"]
                })
            ],
            "ha:start_fly_mode": [
                new BPEntityComponents.SetAngry({
                    broadcastAnger: true,
                    broadcastAngerWhenDying: true,
                    broadcastAngerOnAttack: true,
                    broadcastAngerOnBeingAttacked: true,
                    broadcastTargets: ["illager", "wither_skeleton"],
                    broadcastFilters: EntityFilters.noneOf(
                        EntityFilters.isFamily('illager', 'other'),
                        EntityFilters.isFamily('witch', 'other'),
                        EntityFilters.isFamily('wither_skeleton', 'other'),
                    ),
                    broadcastRange: 100,
                    duration: 100
                }),
                new BPEntityComponents.SetSpellEffects({
                    addEffects: [
                        {
                            effect: "resistance",
                            duration: "infinite",
                            amplifier: 1,
                            visible: true,
                            ambient: false
                        },
                        {
                            effect: "levitation",
                            duration: 1,
                            amplifier: 9,
                            visible: true,
                            ambient: false
                        },
                        {
                            effect: "slow_falling",
                            duration: 5,
                            amplifier: 0,
                            visible: true,
                            ambient: false
                        }
                    ]
                })
            ],

            "ha:spawn_illusioner": [
                new BPEntityComponents.SetSpawnEntity({
                    entities: [
                        {
                            numToSpawn: 1,
                            minWaitTime: 0,
                            maxWaitTime: 0,
                            shouldLeash: false,
                            singleUse: true,
                            spawnEntity: "ha:illusioner",
                            spawnEvent: "minecraft:spawn_for_raid"
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
                            EntityFilters.isFamily('witch', 'other'),
                            EntityFilters.isFamily('wither_skeleton', 'other'),
                        )
                    }
                ]
            }),
            new BPEntityComponents.SetFollowRange({
                value: 64
            }),
            new BPEntityComponents.SetSpellEffects({
                addEffects: [
                    {
                        effect: "resistance",
                        duration: "infinite",
                        amplifier: 1,
                        visible: true,
                        ambient: false
                    }
                ]
            })
        ],
        events: {
            "minecraft:entity_spawned": {
                add: {
                    componentGroups: [
                        "ha:magic_mode",
                        "ha:normal_mode_damage"
                    ]
                }
            },
            "minecraft:spawn_for_raid": {
                sequence: [
                    {
                        add: {
                            componentGroups: [
                                "ha:magic_mode",
                                "ha:normal_mode_damage"
                            ]
                        }
                    },
                    {
                        randomize: [
                            {
                                weight: 60
                            },
                            {
                                weight: 20,
                                add: {
                                    componentGroups: [
                                        "ha:spawn_illusioner"
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

            "ha:angry_mode": {
                remove: {
                    componentGroups: [
                        "ha:ranged_mode",
                        "ha:magic_mode",
                        "ha:normal_mode_damage"
                    ]
                },
                add: {
                    componentGroups: [
                        "ha:angry_mode_damage",
                        "ha:angry_mode"
                    ]
                }
            },

            "ha:become_magic": {
                remove: {
                    componentGroups: [
                        "ha:ranged_mode",
                        "ha:angry_mode"
                    ]
                },
                add: {
                    componentGroups: [
                        "ha:magic_mode"
                    ]
                }
            },
            "ha:become_ranged": {
                remove: {
                    componentGroups: [
                        "ha:magic_mode",
                        "ha:angry_mode"
                    ]
                },
                add: {
                    componentGroups: [
                        "ha:ranged_mode"
                    ]
                }
            },

            "ha:remove_fly": {
                remove: {
                    componentGroups: [
                        "ha:start_fly_mode"
                    ]
                },
                add: {
                    componentGroups: [
                        "ha:remove_fly_mode"
                    ]
                }
            },
            "ha:start_fly": {
                queueCommand: {
                    command: [
                        "particle minecraft:knockback_roar_particle"
                    ]
                },
                remove: {
                    componentGroups: [
                        "ha:remove_fly_mode"
                    ]
                },
                add: {
                    componentGroups: [
                        "ha:start_fly_mode"
                    ]
                }
            },
        }
    }
});