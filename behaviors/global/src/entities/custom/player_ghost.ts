import { BPEntityComponents, createBPEntity, MoLang, SpawnCategoryEntities } from "simplified-mojang-jsons";

export const PlayerGhostEntity = createBPEntity({
    id: 'ha:player_ghost',
    description: {
        spawnCategory: SpawnCategoryEntities.Creature,
        isExperimental: false,
        isSpawneable: true,
        isSummonable: true
    },
    componentsGroups: {
        "ha:start_go_home": [
            new BPEntityComponents.SetTimer({
                randomTimeChoices: [
                    {
                        weight: 1,
                        value: 5
                    },
                    {
                        weight: 1,
                        value: 6
                    },
                    {
                        weight: 1,
                        value: 7
                    },
                    {
                        weight: 1,
                        value: 14
                    }
                ],
                looping: true,
                timeDownEvent: {
                    event: "ha:go_home",
                    target: "self"
                }
            })
        ],
        "ha:go_home": [
            new BPEntityComponents.SetBehaviorGoHome({
                priority: 0,
                interval: 200,
                speedMultiplier: 1,
                goalRadius: 1.0,
                onFailed: [
                    {
                        event: "ha:end_home",
                        target: "self"
                    }
                ],
                onHome: [
                    {
                        event: "ha:end_home",
                        target: "self"
                    }
                ]
            })
        ]
    },
    components: [
        new BPEntityComponents.SetExperienceReward({
            onDeath: `Math.min(${MoLang.playerLevel()} * 7, 100)`
        }),
        new BPEntityComponents.SetPersistent(),
        new BPEntityComponents.SetTypeFamily({
            family: [
                "player_ghost"
            ]
        }),
        new BPEntityComponents.SetCollisionBox({
            height: 1.65,
            width: 0.75,
        }),
        new BPEntityComponents.SetNameable({
            allowNameTagRenaming: false,
            alwaysShow: true
        }),
        new BPEntityComponents.SetLeashable({
            canBeStolen: true,
            presets: [
                {
                    hardDistance: 6,
                    maxDistance: 6,
                    softDistance: 6,
                }
            ]
        }),
        new BPEntityComponents.SetLeashableTo(),
        new BPEntityComponents.SetHealth({
            value: 1,
            max: 1
        }),
        new BPEntityComponents.SetMovement({
            value: 0
        }),
        new BPEntityComponents.SetFlyingSpeed({
            value: 0.1
        }),
        new BPEntityComponents.SetNavigationHover({
            canPathOverWater: true,
            canSink: false,
            canPassDoors: false,
            canOpenDoors: true,
            canOpenIronDoors: true,
            canPathFromAir: true,
            avoidPortals: true,
            avoidDamageBlocks: true,
            canPathOverLava: true,
            canWalkInLava: true
        }),
        new BPEntityComponents.SetMovementHover(),
        new BPEntityComponents.SetFollowRange({
            value: 1024
        }),
        new BPEntityComponents.SetJumpStatic(),
        new BPEntityComponents.SetCanFly(),
        new BPEntityComponents.SetPushableByBlock(),
        new BPEntityComponents.SetPushableByEntity(),
        new BPEntityComponents.SetGameEventMovementTracking({
            emitFlap: true
        }),
        new BPEntityComponents.SetInventory({
            containerType: "inventory",
            inventorySize: 70,
            canBeSiphonedFrom: false,
            private: false,
            restrictToOwner: true
        }),
        new BPEntityComponents.SetPhysics({
            hasCollision: true,
            hasGravity: true
        }),
        new BPEntityComponents.SetBalloonable({
            maxDistance: 10,
            softDistance: 2,
            mass: 0.5,
        }),
        new BPEntityComponents.SetTickWorld({
            neverDespawn: true,
            radius: 4
        }),
        new BPEntityComponents.SetReflectProjectiles({
            reflectedProjectiles: [
                "xp_bottle",
                "thrown_trident",
                "shulker_bullet",
                "dragon_fireball",
                "arrow",
                "snowball",
                "egg",
                "fireball",
                "splash_potion",
                "ender_pearl",
                "wither_skull",
                "wither_skull_dangerous",
                "small_fireball",
                "lingering_potion",
                "llama_spit",
                "fireworks_rocket",
                "fishing_hook",
                "ha:dynamite",
                "ha:slime_pearl"
            ],
            azimuthAngle: "180.0 + Math.random(-20.0, 20.0)",
            reflectionScale: "0.5"
        }),
        new BPEntityComponents.SetRendersWhenInvisible(),
        new BPEntityComponents.SetMobEffectImmunity({
            mobEffects: []
        }),
        new BPEntityComponents.SetHome(),
        new BPEntityComponents.SetKnockbackResistance({
            value: 99999
        }),
        new BPEntityComponents.SetBodyRotationBlocked(),
        new BPEntityComponents.SetDimensionBound(),
        new BPEntityComponents.SetFireImmune(),
        new BPEntityComponents.SetCanClimb(),
        new BPEntityComponents.SetBlockClimber(),
        new BPEntityComponents.SetConditionalBandwidthOptimization(),
        new BPEntityComponents.SetBehaviorFloat({
            priority: 1,
            sinkWithPassengers: true
        }),
    ],
    events: {
        "minecraft:entity_spawned": {
            add: {
                componentGroups: [
                    "ha:start_go_home"
                ]
            }
        },
        "ha:go_home": {
            remove: {
                componentGroups: [
                    "ha:start_go_home"
                ]
            },
            add: {
                componentGroups: [
                    "ha:go_home"
                ]
            }
        },
        "ha:end_home": {
            remove: {
                componentGroups: [
                    "ha:go_home"
                ]
            },
            add: {
                componentGroups: [
                    "ha:start_go_home"
                ]
            }
        }
    }
});