import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPEntityComponents, createBPEntity, EntityFilters, SpawnCategoryEntities } from "simplified-mojang-jsons";

export const DynamiteProyectileEntity = createBPEntity({
    id: "ha:dynamite",
    description: {
        runtimeIdentifier: MinecraftEntityTypes.WindChargeProjectile,
        spawnCategory: SpawnCategoryEntities.Misc,
        isExperimental: false,
        isSpawneable: false,
        isSummonable: true
    },
    componentsGroups: {
        "ha:from_bomber": [
            new BPEntityComponents.SetSkinId({
                value: 1
            }),
            new BPEntityComponents.SetProjectile({
                onHit: {
                    impactDamage: {
                        damage: {
                            min: 1,
                            max: 1,
                        },
                        destroyOnHit: false,
                        destroyOnHitRequiresDamage: false,
                        knockback: false,
                        powerMultiplier: 1.36
                    },
                    definitionEvent: {
                        affectProjectile: true,
                        eventTrigger: {
                            event: "ha:start_explode",
                            target: "self"
                        }
                    },
                    stickInGround: {}
                },
                reflectImmunity: 1,
                reflectOnHurt: true,
                stopOnHurt: true,
                offset: [0, 1, 0],
                power: 2,
                uncertaintyBase: 5,
                uncertaintyMultiplier: 2,
                anchor: "eye_height",
                shouldBounce: "if_no_damage_dealt",
                inertia: 0.95,
                liquidInertia: 0.4,
                isDangerous: true,
                multipleTargets: true,
                destroyOnHurt: false,
                isolatedPhysics: false,
                ignoredEntities: [
                    "boat",
                    "chest_boat",
                    "minecart",
                    "ha:bomber_pillager",
                    "ravager",
                    "pillager",
                    "ravager",
                    "witch",
                    "vex"
                ]
            })
        ],
        "ha:from_player": [
            new BPEntityComponents.SetProjectile({
                onHit: {
                    impactDamage: {
                        damage: {
                            min: 1,
                            max: 1,
                        },
                        destroyOnHit: false,
                        destroyOnHitRequiresDamage: false,
                        knockback: false,
                        powerMultiplier: 1.36
                    },
                    definitionEvent: {
                        affectProjectile: true,
                        eventTrigger: {
                            event: "ha:start_explode",
                            target: "self"
                        }
                    },
                    stickInGround: {}
                },
                reflectImmunity: 1,
                reflectOnHurt: true,
                stopOnHurt: true,
                offset: [0, 0, 0],
                power: 2,
                uncertaintyBase: 5,
                uncertaintyMultiplier: 2,
                anchor: "eye_height",
                shouldBounce: "if_no_damage_dealt",
                inertia: 0.95,
                liquidInertia: 0.4,
                isDangerous: true,
                multipleTargets: true,
                destroyOnHurt: false,
                isolatedPhysics: false,
                ignoredEntities: [
                    "boat",
                    "chest_boat",
                    "minecart"
                ]
            })
        ],
        "ha:explode": [
            new BPEntityComponents.SetIsIgnited(),
            new BPEntityComponents.SetExplode({
                power: 3,
                fuseLength: [0.75, 1],
                fuseLit: true,
                allowUnderwater: true,
                breaksBlocks: true,
                destroyAffectedByGriefing: true,
                fireAffectedByGriefing: true,
                togglesBlocks: true
            }),
        ],
        "ha:chain_explode": [
            new BPEntityComponents.SetProjectile({
                onHit: {
                    impactDamage: {
                        damage: {
                            min: 1,
                            max: 1,
                        },
                        destroyOnHit: false,
                        destroyOnHitRequiresDamage: false,
                        knockback: false,
                        powerMultiplier: 1.36
                    },
                    stickInGround: {}
                },
                reflectImmunity: 1,
                reflectOnHurt: true,
                stopOnHurt: true,
                offset: [0, 1, 0],
                power: 2,
                uncertaintyBase: 5,
                uncertaintyMultiplier: 2,
                anchor: "eye_height",
                shouldBounce: "if_no_damage_dealt",
                inertia: 0.95,
                liquidInertia: 0.4,
                isDangerous: true,
                multipleTargets: true,
                destroyOnHurt: false,
                isolatedPhysics: false,
                ignoredEntities: [
                    "boat",
                    "chest_boat",
                    "minecart"
                ]
            }),
            new BPEntityComponents.SetExplode({
                power: 3,
                fuseLength: [0.35, 0.75],
                fuseLit: true,
                allowUnderwater: true,
                breaksBlocks: true,
                destroyAffectedByGriefing: true,
                fireAffectedByGriefing: true,
                togglesBlocks: true
            })
        ]
    },
    components: [
        new BPEntityComponents.SetSkinId({
            value: 0
        }),
        new BPEntityComponents.SetTransient(),
        new BPEntityComponents.SetMobEffectImmunity({}),
        new BPEntityComponents.SetHealth({
            min: 1,
            max: 1,
            value: 1
        }),
        new BPEntityComponents.SetDamageSensor({
            triggers: [
                {
                    cause: "all",
                    dealsDamage: "no"
                }
            ],
        }),
        new BPEntityComponents.SetPushableByBlock(),
        new BPEntityComponents.SetPushableByEntity(),
        new BPEntityComponents.SetDimensionBound(),
        new BPEntityComponents.SetPhysics(),
        new BPEntityComponents.SetCollisionBox({
            height: 0.5,
            width: 0.5,
        }),
        new BPEntityComponents.SetConditionalBandwidthOptimization(),
    ],
    events: {
        "minecraft:entity_spawned": {
            add: {
                componentGroups: [
                    "ha:from_bomber"
                ]
            }

        },

        "ha:from_bomber": {
            add: {
                componentGroups: [
                    "ha:from_bomber"
                ]
            }
        },
        "ha:spawned_from_player": {
            add: {
                componentGroups: [
                    "ha:from_player"
                ]
            }
        },
        "ha:convert_to_player": {
            sequence: [
                {
                    trigger: "ha:spawned_from_player"
                },
                {
                    remove: {
                        componentGroups: [
                            "ha:from_bomber"
                        ]
                    }
                }
            ]
        },

        "ha:start_explode": {
            sequence: [
                {
                    filters: EntityFilters.hasComponent('minecraft:is_ignited', 'self', '!='),
                    add: {
                        componentGroups: [
                            "ha:explode"
                        ]
                    }
                }
            ]
        },
        "ha:from_chain_explodes": {
            sequence: [
                {
                    filters: EntityFilters.hasComponent('minecraft:is_ignited', 'self', '!='),
                    add: {
                        componentGroups: [
                            "ha:chain_explode"
                        ]
                    }
                }
            ]
        }
    }
});