import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPEntityComponents, createBPEntity, EntityFilters, MoLang, SpawnCategoryEntities } from "simplified-mojang-jsons";

export const PillagerBomberEntity = createBPEntity({
    id: "ha:bomber_pillager",
    description: {
        runtimeIdentifier: MinecraftEntityTypes.Pillager,
        spawnCategory: SpawnCategoryEntities.Monster,
        isExperimental: false,
        isSpawneable: true,
        isSummonable: true
    },
    properties: {
        "ha:is_glow": {
            type: "bool",
            clientSync: true,
            default: false
        },
        "ha:in_melee_mode": {
            type: "bool",
            clientSync: true,
            default: false
        },
        "ha:explode": {
            type: "bool",
            clientSync: true,
            default: false
        }
    },
    componentsGroups: {
        "ha:timer_glowing": [
            new BPEntityComponents.SetBehaviorTimerFlagOne({
                priority: 9,
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

        "ha:explode": [
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        cause: "all",
                        onDamage: {
                            filters: EntityFilters.allOf(
                                EntityFilters.anyOf(
                                    EntityFilters.hasDamage('block_explosion'),
                                    EntityFilters.hasDamage('entity_explosion'),
                                ),
                                EntityFilters.noneOf(
                                    EntityFilters.isFamily('player', 'damager'),
                                    EntityFilters.isFamily('player', 'other')
                                )
                            )
                        },
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetExplode({
                power: 3,
                fuseLength: [0.75, 1],
                fuseLit: true,
                allowUnderwater: true,
                breaksBlocks: true,
                fireAffectedByGriefing: true,
                destroyAffectedByGriefing: true,
                togglesBlocks: true
            })
        ],
        "ha:ranged_attack": [
            new BPEntityComponents.SetShooter({
                sound: "bow",
                projectiles: [
                    {
                        def: "ha:dynamite<ha:from_bomber>"
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorRangedAttack({
                priority: 1,
                targetInSightTime: 0.1,
                burstShots: 1,
                burstInterval: 0.1,
                attackInterval: {
                    min: 0.9,
                    max: 1
                },
                attackRange: {
                    min: 0,
                    max: 35,
                },
                chargeChargedTrigger: 0.1,
                chargeShootTrigger: 0.9,
                rangedFov: 360,
                speedMultiplier: 1
            }),
            new BPEntityComponents.SetBehaviorAvoidMobType({
                priority: 0,
                entityTypes: [
                    {
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('creaking', 'other')
                        ),
                        maxDist: 0,
                        sprintSpeedMultiplier: 1.2
                    },
                    {
                        filters: EntityFilters.isFamily('arrow', 'other'),
                        maxDist: 10,
                        maxFlee: 4,
                        walkSpeedMultiplier: 1.5,
                        sprintSpeedMultiplier: 2.5
                    },
                    {
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('player', 'other'),
                            EntityFilters.isFamily('irongolem', 'other'),
                        ),
                        maxDist: 6,
                        maxFlee: 14,
                        walkSpeedMultiplier: 1.3,
                        sprintSpeedMultiplier: 1.7
                    },
                ]
            }),
            new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.actorHealth(50, 'self', '<='),
                        event: "ha:melee_mode",
                        target: "self"
                    }
                ]
            }),
            new BPEntityComponents.SetFollowRange({
                value: 70
            })
        ],
        "ha:melee_attack": [
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        onDamage: {
                            filters: EntityFilters.boolProperty('ha:explode', false),
                            event: "ha:force_explode",
                            target: "self"
                        },
                        dealsDamage: "yes"
                    },
                    {
                        cause: "all",
                        onDamage: {
                            filters: EntityFilters.allOf(
                                EntityFilters.anyOf(
                                    EntityFilters.hasDamage('block_explosion'),
                                    EntityFilters.hasDamage('entity_explosion'),
                                ),
                                EntityFilters.noneOf(
                                    EntityFilters.isFamily('player', 'damager'),
                                    EntityFilters.isFamily('player', 'other')
                                )
                            )
                        },
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorMeleeAttack({
                priority: 0,
                canSpreadOnFire: true,
                cooldownTime: 0.35,
                meleeFov: 360,
                speedMultiplier: 1.35,
                reachMultiplier: 5.5,
                trackTarget: false,
                requireCompletePath: true,
                onAttack: {
                    filters: EntityFilters.boolProperty('ha:explode', false),
                    event: "ha:explode",
                    target: "self"
                }
            }),
            new BPEntityComponents.SetAttack({
                damage: 2
            }),
            new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.actorHealth(51, 'self', '>='),
                        event: "ha:ranged_mode",
                        target: "self"
                    }
                ]
            }),
            new BPEntityComponents.SetFollowRange({
                value: 999
            })
        ],

        "minecraft:celebrate": [
            new BPEntityComponents.SetBehaviorCelebrate({
                priority: 10,
                celebrationSound: "celebrate",
                duration: 30,
                jumpInterval: {
                    max: 3.5,
                    min: 1
                },
                onCelebrationEndEvent: {
                    event: "minecraft:stop_celebrating",
                    target: "self"
                },
                soundInterval: {
                    max: 7,
                    min: 2
                }
            })
        ],
        "minecraft:patrol_follower": [
            new BPEntityComponents.SetBehaviorFollowTargetLeader({
                priority: 11,
                followDistance: 5,
                speedMultiplier: 0.8,
                withinRadius: 64
            }),
            new BPEntityComponents.SetBehaviorHoldGround({
                priority: 12,
                broadcast: true,
                broadcastRange: 8,
                minRadius: 10,
                withinRadiusEvent: {
                    "event": "ha:ranged_mode",
                    "target": "self"
                }
            })
        ],
        "minecraft:illager_squad_captain": [
            new BPEntityComponents.SetEquipment({
                table: "loot_tables/entities/custom/bomber/captain_equipment.json",
                slotDropChance: [
                    {
                        dropChance: 1,
                        slot: "slot.armor.chest"
                    }
                ]
            }),
            new BPEntityComponents.SetIsIllagerCaptain(),
            new BPEntityComponents.SetVariant({
                value: 1
            }),
        ],
        "minecraft:patrol_captain": [
            new BPEntityComponents.SetIsIllagerCaptain(),
            new BPEntityComponents.SetVariant({
                value: 1
            }),
            new BPEntityComponents.SetEquipment({
                table: "loot_tables/entities/custom/bomber/captain_equipment.json",
                slotDropChance: [
                    {
                        dropChance: 1,
                        slot: "slot.armor.chest"
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorHoldGround({
                priority: 13,
                minRadius: 10,
                broadcast: true,
                broadcastRange: 8,
                withinRadiusEvent: {
                    event: "ha:ranged_mode",
                    target: "self"
                }
            }),
            new BPEntityComponents.SetBehaviorMoveToRandomBlock({
                priority: 14,
                speedMultiplier: 0.55,
                withinRadius: 8,
                blockDistance: 512
            })
        ],
        "minecraft:raid_configuration": [
            new BPEntityComponents.SetAmbientSoundInterval({
                soundEvents: "ambient.in.raid",
                minRandomCooldownSound: 4,
                maxRandomCooldownSound: 2
            }),
            new BPEntityComponents.SetBehaviorMoveToVillage({
                priority: 15,
                goalRadius: 2,
                speedMultiplier: 1
            }),
            new BPEntityComponents.SetDweller({
                canFindPoi: false,
                dwellingType: "village",
                canMigrate: true,
                dwellerRole: "hostile",
                firstFoundingReward: 0,
                updateIntervalBase: 60,
                updateIntervalVariant: 40
            }),
            new BPEntityComponents.SetLoot({
                table: "loot_tables/entities/custom/bomber/raid_drop.json"
            })
        ],
        "minecraft:raid_persistence": [
            new BPEntityComponents.SetPersistent()
        ],
    },
    components: [
        new BPEntityComponents.SetVariant({
            value: 0
        }),
        new BPEntityComponents.SetDamageSensor({
            triggers: [
                {
                    cause: "all",
                    onDamage: {
                        filters: EntityFilters.allOf(
                            EntityFilters.anyOf(
                                EntityFilters.hasDamage('block_explosion'),
                                EntityFilters.hasDamage('entity_explosion'),
                            ),
                            EntityFilters.noneOf(
                                EntityFilters.isFamily('player', 'damager'),
                                EntityFilters.isFamily('player', 'other')
                            )
                        )
                    },
                    dealsDamage: "no"
                }
            ]
        }),
        new BPEntityComponents.SetBehaviorAvoidMobType({
            priority: 3,
            entityTypes: {
                filters: EntityFilters.anyOf(
                    EntityFilters.isFamily('creaking', 'other')
                )
            },
            maxDist: 0,
            sprintSpeedMultiplier: 1.2
        }),
        new BPEntityComponents.SetBehaviorFloat({
            priority: 4
        }),
        new BPEntityComponents.SetBehaviorHurtByTarget({
            priority: 1,
            entityTypes: {
                filters: EntityFilters.noneOf(
                    EntityFilters.isFamily('illager', 'other'),
                    EntityFilters.isFamily('witch', 'other'),
                )
            }
        }),
        new BPEntityComponents.SetBehaviorLookAtPlayer({
            priority: 5,
            lookTime: {
                min: 1,
                max: 2
            }
        }),
        new BPEntityComponents.SetBehaviorNearestAttackableTarget({
            priority: 2,
            mustSee: true,
            reselectTargets: true,
            entityTypes: [
                {
                    filters: EntityFilters.anyOf(
                        EntityFilters.isFamily('player', 'other'),
                        EntityFilters.isFamily('irongolem', 'other'),
                        EntityFilters.isFamily('wandering_trader', 'other'),
                    ),
                    maxDist: 30
                },
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.isFamily('villager', 'other'),
                        EntityFilters.hasComponent('minecraft:is_baby', 'other', '!='),
                    ),
                    maxDist: 16
                }
            ]
        }),
        new BPEntityComponents.SetBehaviorRandomLookAround({
            priority: 6
        }),
        new BPEntityComponents.SetBehaviorRandomStroll({
            priority: 7,
            speedMultiplier: 1
        }),
        new BPEntityComponents.SetBreathable({
            suffocateTime: 10,
            totalSupply: 15
        }),
        new BPEntityComponents.SetCollisionBox({
            height: 1.9,
            width: 0.6,
        }),
        new BPEntityComponents.SetCanJoinRaid(),
        new BPEntityComponents.SetExperienceReward({
            onDeath: `${MoLang.lastHitByPlayer()} ? (${MoLang.isBaby()} ? 12 : 5) + (Math.die_roll(${MoLang.equipmentCount()},1,3)) : 0`
        }),
        new BPEntityComponents.SetFollowRange({
            value: 64
        }),
        new BPEntityComponents.SetHealth({
            max: 100,
            value: 100
        }),
        new BPEntityComponents.SetHurtOnCondition({
            damageConditions: [
                {
                    cause: "lava",
                    damagePerTick: 4,
                    filters: EntityFilters.inLava()
                }
            ]
        }),
        new BPEntityComponents.SetIsHiddenWhenInvisible(),
        new BPEntityComponents.SetJumpStatic(),
        new BPEntityComponents.SetMovement({
            value: 0.35
        }),
        new BPEntityComponents.SetMovementBasic(),
        new BPEntityComponents.SetNameable(),
        new BPEntityComponents.SetNavigationWalk({
            avoidDamageBlocks: true,
            avoidPortals: true,
            avoidWater: true,
            canJump: true,
            canPathOverWater: true,
            canWalk: true
        }),
        new BPEntityComponents.SetPhysics(),
        new BPEntityComponents.SetPushableByBlock(),
        new BPEntityComponents.SetPushableByEntity(),
        new BPEntityComponents.SetShareables({
            items: [
                {
                    priority: 0,
                    item: "minecraft:banner:15",
                    surplusAmount: 1,
                    wantAmount: 1
                }
            ]
        }),
        new BPEntityComponents.SetTypeFamily({
            family: [
                "bomber_pillager",
                "pillager",
                "monster",
                "illager",
                "mob",
            ]
        }),
        new BPEntityComponents.SetConditionalBandwidthOptimization(),
        new BPEntityComponents.SetLoot({
            table: "loot_tables/entities/custom/bomber/normal_drop.json"
        }),
        new BPEntityComponents.SetDespawn({
            despawnFromDistance: {}
        }),
        new BPEntityComponents.SetEquipItem(),
        new BPEntityComponents.SetBehaviorPickupItems({
            priority: 8,
            goalRadius: 2,
            maxDist: 3,
            speedMultiplier: 1
        })
    ],
    events: {
        "minecraft:entity_spawned": {
            add: {
                componentGroups: [
                    "ha:ranged_attack"
                ]
            }
        },
        "ha:force_explode": {
            randomize: [
                {
                    weight: 60
                },
                {
                    weight: 20,
                    setProperty: {
                        "ha:explode": true
                    },
                    add: {
                        componentGroups: [
                            "ha:explode"
                        ]
                    }
                }
            ]
        },
        "ha:explode": {
            setProperty: {
                "ha:explode": true
            },
            add: {
                componentGroups: [
                    "ha:explode"
                ]
            }
        },
        "ha:melee_mode": {
            setProperty: {
                "ha:in_melee_mode": true
            },
            remove: {
                componentGroups: [
                    "ha:ranged_attack"
                ]
            },
            add: {
                componentGroups: [
                    "ha:melee_attack"
                ]
            }
        },
        "ha:ranged_mode": {
            setProperty: {
                "ha:in_melee_mode": false
            },
            remove: {
                componentGroups: [
                    "ha:melee_attack"
                ]
            },
            add: {
                componentGroups: [
                    "ha:ranged_attack"
                ]
            }
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

        "minecraft:spawn_for_raid": {
            sequence: [
                {
                    add: {
                        componentGroups: [
                            "ha:ranged_attack",
                            "minecraft:raid_configuration",
                            "minecraft:raid_persistence"
                        ]
                    }
                },
                {
                    randomize: [
                        {
                            weight: 1
                        },
                        {
                            weight: 1,
                            add: {
                                componentGroups: [
                                    "minecraft:illager_squad_captain"
                                ]
                            }
                        },
                        {
                            weight: 1,
                            add: {
                                componentGroups: [
                                    "minecraft:patrol_follower"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        "minecraft:spawn_as_illager_captain": {
            add: {
                componentGroups: [
                    "ha:ranged_attack",
                    "minecraft:illager_squad_captain"
                ]
            }
        },
        "minecraft:spawn_as_patrol_follower": {
            add: {
                componentGroups: [
                    "ha:ranged_attack",
                    "minecraft:patrol_follower"
                ]
            }
        },

        "minecraft:promote_to_illager_captain": {
            add: {
                componentGroups: [
                    "minecraft:illager_squad_captain"
                ]
            },
            remove: {
                componentGroups: [
                    "minecraft:patrol_follower"
                ]
            }
        },
        "minecraft:promote_to_patrol_captain": {
            add: {
                componentGroups: [
                    "minecraft:patrol_captain"
                ]
            },
            remove: {
                componentGroups: [
                    "minecraft:patrol_follower"
                ]
            }
        },

        "minecraft:raid_expired": {
            sequence: [
                {
                    filters: EntityFilters.hasNametag(),
                    remove: {
                        componentGroups: [
                            "minecraft:raid_persistence"
                        ]
                    }
                }
            ]
        },
        "minecraft:start_celebrating": { // Event must be called exactly this for village to fire it when a raid is lost
            sequence: [
                {
                    add: {
                        componentGroups: [
                            "minecraft:celebrate"
                        ]
                    }
                },
                {
                    filters: EntityFilters.hasNametag(false),
                    remove: {
                        componentGroups: [
                            "minecraft:raid_persistence"
                        ]
                    }
                }
            ]
        },
        "minecraft:stop_celebrating": {
            remove: {
                componentGroups: [
                    "minecraft:celebrate"
                ]
            }
        }
    }
});