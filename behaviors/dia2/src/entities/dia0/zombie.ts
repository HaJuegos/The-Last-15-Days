import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const ZombieChanges = BPEntityTemplates.ZombieTemplate({
    add: {
        componentsGroups: {
            "ha:zombie_sieger_leader": [
                new BPEntityComponents.SetBehaviorSummonEntity({
                    priority: 2,
                    summonChoices: [
                        {
                            minActivationRange: 0,
                            maxActivationRange: 30,
                            doCasting: false,
                            castDuration: 0.1,
                            cooldownTime: 20,
                            weight: 1,
                            sequence: [
                                {
                                    delayPerSummon: 0,
                                    entityType: "minecraft:zombie<ha:spawn_sieger_patrol>",
                                    numEntitiesSpawned: 20,
                                    shape: "circle",
                                    size: 1,
                                    summonCap: 20,
                                    summonCapRadius: 200,
                                    target: "self"
                                }
                            ]
                        }
                    ]
                })
            ],
            "ha:zombie_sieger": [
                new BPEntityComponents.SetBehaviorMoveToVillage({
                    priority: 4,
                    goalRadius: 2,
                    speedMultiplier: 1.15
                }),
                new BPEntityComponents.SetDweller({
                    canFindPoi: false,
                    canMigrate: true,
                    dwellingType: "village",
                    dwellerRole: "hostile",
                    updateIntervalBase: 60,
                    updateIntervalVariant: 40,
                    firstFoundingReward: 0
                })
            ]
        },
        events: {
            "ha:spawn_sieger_leader": {
                sequence: [
                    {
                        add: {
                            componentGroups: [
                                "ha:zombie_sieger_leader",
                                "ha:zombie_sieger"
                            ]
                        }
                    },
                    {
                        trigger: "minecraft:entity_spawned"
                    }
                ]
            },
            "ha:spawn_sieger_patrol": {
                sequence: [
                    {
                        add: {
                            componentGroups: [
                                "ha:zombie_sieger"
                            ]
                        }
                    },
                    {
                        trigger: "minecraft:entity_spawned"
                    }
                ]
            },
        }
    }
});