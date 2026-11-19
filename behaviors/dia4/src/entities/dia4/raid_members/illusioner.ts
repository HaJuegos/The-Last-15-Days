import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPEntityComponents, createBPEntity, EntityFilters, SpawnCategoryEntities } from "simplified-mojang-jsons";

const seatsVarsTotal = 10;
const seatsPerVars = 4;
const minRad = -1.5;
const maxRad = 4;
const variantsSeats = createVariantsSeats();

export const IllusionerEntity = createBPEntity({
    id: "ha:illusioner",
    description: {
        runtimeIdentifier: MinecraftEntityTypes.EvocationIllager,
        spawnCategory: SpawnCategoryEntities.Monster,
        isExperimental: false,
        isSpawneable: true,
        isSummonable: true,
    },
    properties: {
        "ha:is_glow": {
            type: "bool",
            clientSync: true,
            default: false
        },
        "ha:is_minion": {
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

        "ha:ranged_mode_minion": [
            new BPEntityComponents.SetExperienceReward({
                onDeath: 0
            }),
            new BPEntityComponents.SetHealth({
                min: 1,
                max: 1,
                value: 1,
            }),
            new BPEntityComponents.SetDespawn({
                filters: EntityFilters.isRiding(false),
                removeChildEntities: true
            }),
            new BPEntityComponents.SetBehaviorRangedAttack({
                priority: 0,
                attackRange: {
                    min: 0,
                    max: 30,
                },
                attackInterval: {
                    min: 1.25,
                    max: 1.59,
                },
                rangedFov: 360,
                speedMultiplier: 1.05,
                inRangeMovementMode: "hold_position"
            }),
            new BPEntityComponents.SetShooter({
                sound: "bow",
                projectiles: [
                    {
                        def: `${MinecraftEntityTypes.Arrow}<ha:illusioner_arrow>`
                    }
                ]
            }),
            new BPEntityComponents.SetBodyRotationAlwaysFollowsHead(),
            new BPEntityComponents.SetCannotBeAttacked(),
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        cause: "all",
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetTypeFamily({
                family: [
                    "illusioner_minion",
                    "inanimate"
                ]
            }),
            new BPEntityComponents.SetPhysics({
                hasCollision: false,
                hasGravity: false
            })
        ],

        "ha:backtopivot": [
            new BPEntityComponents.SetRideable({
                familyTypes: ["illusioner_minion"],
                seatCount: 4,
                pullInEntities: false,
                onRiderExitEvent: "ha:switch_to_magic",
                seats: [
                    {
                        position: [0, 1, 0]
                    },
                    {
                        position: [0, 1, 0]
                    },
                    {
                        position: [0, 1, 0]
                    },
                    {
                        position: [0, 1, 0]
                    }
                ]
            }),
            new BPEntityComponents.SetTimer({
                time: 0.5,
                timeDownEvent: {
                    target: "self",
                    event: "ha:change_positions",
                }
            })
        ],

        ...(Object.fromEntries(variantsSeats.map(({ id, seats }) => [
            id,
            [
                new BPEntityComponents.SetRideable({
                    familyTypes: ["illusioner_minion"],
                    seatCount: seats.length,
                    pullInEntities: false,
                    onRiderExitEvent: "ha:switch_to_magic",
                    seats,
                }),
                new BPEntityComponents.SetDamageSensor({
                    triggers: [
                        {
                            cause: "all",
                            onDamage: {
                                event: "ha:back_to_center",
                                target: "self"
                            },
                            dealsDamage: "yes"
                        }
                    ]
                })
            ]
        ])) as Record<VariantID, any[]>),

        "ha:invi_mode": [
            new BPEntityComponents.SetOnTargetEscape({
                event: "ha:switch_to_magic",
                target: "self"
            }),
            new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.anyOf(
                            EntityFilters.allOf(
                                EntityFilters.hasTarget(),
                                EntityFilters.hasMobEffect('blindness', 'target', '!='),
                                EntityFilters.isFamily('player', 'target'),
                            ),
                            EntityFilters.hasMobEffect('invisibility', 'self', '!='),
                            EntityFilters.riderCount(0, 'self', '<='),
                        ),
                        event: "ha:switch_to_magic",
                        target: "self"
                    }
                ]
            }),
            new BPEntityComponents.SetSpellEffects({
                addEffects: [
                    {
                        effect: "invisibility",
                        duration: 60,
                        amplifier: 0,
                        visible: true,
                        ambient: false
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorAvoidMobType({
                priority: 0,
                entityTypes: [
                    {
                        filters: EntityFilters.noneOf(
                            EntityFilters.isFamily('witch', 'other'),
                            EntityFilters.isFamily('illager', 'other'),
                        ),
                        maxDist: 4,
                        walkSpeedMultiplier: 1.05
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorMeleeAttack({
                priority: 1,
                canSpreadOnFire: true,
                cooldownTime: 99,
                meleeFov: 360,
                speedMultiplier: 0.35,
                trackTarget: true,
                requireCompletePath: true
            }),
            new BPEntityComponents.SetAttack({
                damage: 1
            }),
            new BPEntityComponents.SetAddRider({
                riders: [
                    {
                        entityType: "ha:illusioner",
                        spawnEvent: "ha:spawn_minion"
                    },
                    {
                        entityType: "ha:illusioner",
                        spawnEvent: "ha:spawn_minion"
                    },
                    {
                        entityType: "ha:illusioner",
                        spawnEvent: "ha:spawn_minion"
                    },
                    {
                        entityType: "ha:illusioner",
                        spawnEvent: "ha:spawn_minion"
                    }
                ]
            }),
        ],
        "ha:magic_mode": [
            new BPEntityComponents.SetSpellEffects({
                removeEffects: [
                    "invisibility"
                ]
            }),
            new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('player', 'target', '!='),
                            EntityFilters.allOf(
                                EntityFilters.hasTarget(),
                                EntityFilters.hasMobEffect('blindness', 'target'),
                                EntityFilters.isFamily('player', 'target'),
                            ),
                        ),
                        event: "ha:switch_to_inv",
                        target: "self"
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorSendEvent({
                priority: 0,
                lookAtTarget: true,
                eventChoices: [
                    {
                        weight: 1,
                        filters: EntityFilters.allOf(
                            EntityFilters.hasTarget(),
                            EntityFilters.hasMobEffect('blindness', 'other', '!='),
                            EntityFilters.isFamily('player', 'other'),
                            EntityFilters.hasTag('inSurvival', 'other'),
                        ),
                        castDuration: 5,
                        cooldownTime: 10,
                        minActivationRange: 0,
                        maxActivationRange: 20,
                        particleColor: "#4B4BCAFF",
                        startSoundEvent: "cast.spell",
                        sequence: [
                            {
                                baseDelay: 1,
                                event: "ha:give_blind",
                                soundEvent: "prepare.attack"
                            }
                        ]
                    }
                ]
            }),
        ],

        "ha:can_join_raid": [
            new BPEntityComponents.SetCanJoinRaid(),
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
        "minecraft:raid_despawn": [
            new BPEntityComponents.SetDespawn({
                despawnFromDistance: {}
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
                minRadius: 10
            })
        ],
        "minecraft:illager_squad_captain": [
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
                maxRandomCooldownSound: 4,
                minRandomCooldownSound: 2
            }),
            new BPEntityComponents.SetBehaviorMoveToVillage({
                priority: 15,
                speedMultiplier: 0.7
            }),
            new BPEntityComponents.SetDweller({
                canFindPoi: false,
                dwellingType: "village",
                canMigrate: true,
                dwellerRole: "hostile",
                firstFoundingReward: 0,
                updateIntervalBase: 60,
                updateIntervalVariant: 40
            })
        ],
        "minecraft:raid_persistence": [
            new BPEntityComponents.SetPersistent()
        ],
    },
    components: [
        new BPEntityComponents.SetEquipment({
            table: "loot_tables/entities/custom/evoker_ranged.json"
        }),
        new BPEntityComponents.SetBehaviorFloat({
            priority: 4,
            sinkWithPassengers: true,
            timeUnderWaterToDismountPassengers: 99999
        }),
        new BPEntityComponents.SetBehaviorHurtByTarget({
            priority: 1,
            entityTypes: {
                filters: EntityFilters.noneOf(
                    EntityFilters.isFamily('illager'),
                    EntityFilters.isFamily('witch'),
                )
            }
        }),
        new BPEntityComponents.SetBehaviorLookAtEntity({
            priority: 5,
            lookTime: {
                min: 1,
                max: 2,
            }
        }),
        new BPEntityComponents.SetBehaviorLookAtPlayer({
            priority: 6,
            lookTime: {
                min: 1,
                max: 2,
            },
            lookDistance: 3,
            probability: 1
        }),
        new BPEntityComponents.SetBehaviorNearestPrioritizedAttackableTarget({
            priority: 2,
            mustSee: false,
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
                    maxDist: 35
                },
                {
                    priority: 1,
                    filters: EntityFilters.allOf(
                        EntityFilters.isFamily('villager', 'other'),
                        EntityFilters.isBaby(true, 'other', '!=')
                    ),
                    maxDist: 20
                }
            ]
        }),
        new BPEntityComponents.SetBehaviorRandomStroll({
            priority: 8,
            speedMultiplier: 0.6
        }),
        new BPEntityComponents.SetBreathable({
            suffocateTime: 0,
            totalSupply: 15
        }),
        new BPEntityComponents.SetCanClimb(),
        new BPEntityComponents.SetCollisionBox({
            height: 1.9,
            width: 0.6,
        }),
        new BPEntityComponents.SetConditionalBandwidthOptimization(),
        new BPEntityComponents.SetEquipItem(),
        new BPEntityComponents.SetIsHiddenWhenInvisible(),
        new BPEntityComponents.SetExperienceReward({
            onDeath: 20
        }),
        new BPEntityComponents.SetFollowRange({
            value: 64
        }),
        new BPEntityComponents.SetHealth({
            max: 50,
            value: 50,
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
        new BPEntityComponents.SetJumpStatic(),
        new BPEntityComponents.SetLoot({
            table: "loot_tables/entities/evocation_illager.json"
        }),
        new BPEntityComponents.SetMovement({
            value: 0.5
        }),
        new BPEntityComponents.SetMovementBasic(),
        new BPEntityComponents.SetNameable(),
        new BPEntityComponents.SetPersistent(),
        new BPEntityComponents.SetNavigationWalk({
            avoidWater: true,
            canOpenDoors: true,
            usingDoorAnnotation: true,
            canPassDoors: true,
            canPathOverWater: true
        }),
        new BPEntityComponents.SetPhysics(),
        new BPEntityComponents.SetPushableByBlock(),
        new BPEntityComponents.SetPushableByEntity(),
        new BPEntityComponents.SetTypeFamily({
            family: [
                "illusioner",
                "monster",
                "illager",
                "mob"
            ]
        })
    ],
    events: {
        "minecraft:entity_spawned": {
            add: {
                componentGroups: [
                    "ha:magic_mode",
                    "ha:can_join_raid",
                ]
            }
        },

        "ha:switch_to_inv": {
            sequence: [
                {
                    playSound: {
                        sound: "prepare.summon"
                    },
                    queueCommand: {
                        command: [
                            "particle ha:illusioner_spawn_mirrors ~~~"
                        ]
                    }
                },
                {
                    remove: {
                        componentGroups: [
                            "ha:magic_mode"
                        ]
                    },
                    add: {
                        componentGroups: [
                            "ha:invi_mode"
                        ]
                    }
                },
                {
                    randomize: variantsSeats.map(({ id }) => ({
                        weight: 1,
                        add: {
                            componentGroups: [id]
                        },
                    })),
                }
            ]
        },

        "ha:back_to_center": {
            playSound: {
                sound: "prepare.wololo"
            },
            remove: {
                componentGroups: [
                    ...variantsSeats.map(({ id }) => id),
                ]
            },
            add: {
                componentGroups: [
                    "ha:backtopivot"
                ]
            }
        },
        "ha:change_positions": {
            sequence: [
                {
                    remove: {
                        componentGroups: [
                            "ha:backtopivot"
                        ]
                    },
                    queueCommand: {
                        command: [
                            "particle ha:illusioner_spawn_mirrors ~~~"
                        ]
                    }
                },
                {
                    randomize: variantsSeats.map(({ id }) => ({
                        weight: 1,
                        add: {
                            componentGroups: [id]
                        }
                    }))
                }
            ]
        },
        "ha:spawn_minion": {
            setProperty: {
                "ha:is_minion": true
            },
            add: {
                componentGroups: [
                    "ha:ranged_mode_minion"
                ]
            }
        },

        "ha:switch_to_magic": {
            playSound: {
                sound: "prepare.wololo"
            },
            queueCommand: {
                command: [
                    "particle ha:illusioner_spawn_mirrors ~~~"
                ]
            },
            remove: {
                componentGroups: [
                    "ha:invi_mode",
                    "ha:backtopivot",
                    ...variantsSeats.map(({ id }) => id),
                ]
            },
            add: {
                componentGroups: [
                    "ha:magic_mode"
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
                            "ha:magic_mode",
                            "ha:can_join_raid",
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
                    "ha:magic_mode",
                    "ha:can_join_raid",
                    "minecraft:illager_squad_captain"
                ]
            }
        },
        "minecraft:spawn_as_patrol_follower": {
            add: {
                componentGroups: [
                    "ha:magic_mode",
                    "ha:can_join_raid",
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

/**
 * Todas las variantes de minios a crear.
 * @author HaJuegos - 18-11-2026
 */
type VariantID = `ha:variant_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}_rideable`;

/**
 * Funcion auxiliar que genera las variantes disponibles aleatorias de los ilusionadores falsos.
 * @returns {{ id: VariantID; seats: { position: [number, number, number] }[] }[]} 
 * @author HaJuegos - 18-11-2026
 */
function createVariantsSeats(): { id: VariantID; seats: { position: [number, number, number]; }[]; }[] {
    /**
     * Funcion auxiliar que cambia y convierte los seats aleatorios de los minios.
     * @returns {{ position: [number, number, number]; }} 
     * @author HaJuegos - 18-11-2026
     */
    const randomSeat = (): { position: [number, number, number]; } => {
        const angle = Math.random() * Math.PI * 2;
        const radius = minRad + Math.random() * (maxRad - minRad);

        return {
            position: [Number((Math.cos(angle) * radius).toFixed(2)), 1, Number((Math.sin(angle) * radius).toFixed(2))] as [number, number, number]
        };
    };

    return Array.from({ length: seatsVarsTotal }, (_, i) => ({
        id: `ha:variant_${i + 1}_rideable` as VariantID,
        seats: Array.from({ length: seatsPerVars }, randomSeat),
    }));
}