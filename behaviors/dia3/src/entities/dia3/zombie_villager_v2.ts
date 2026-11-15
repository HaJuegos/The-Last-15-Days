import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const ZombieVillagerChanges = BPEntityTemplates.ZombieVillagerV2Template({
    componentsGroups: {
        to_villager: {
            "minecraft:transformation": new BPEntityComponents.SetTransformation({
                beginTransformSound: "remedy",
                keepLevel: true,
                delay: {
                    blockAssistChance: 0.01,
                    blockRadius: 4,
                    blockChance: 0.3,
                    rangeMax: 200,
                    blockTypes: [
                        "minecraft:bed",
                        "minecraft:iron_bars"
                    ],
                    rangeMin: 80,
                    value: 100
                },
                dropEquipment: false,
                preserveEquipment: true,
                into: "minecraft:villager_v2",
                transformationSound: "unfect"
            })
        }
    },
    remove: {
        componentsGroups: {
            librarian: {}
        },
        events: {
            "minecraft:entity_spawned": {
                sequence: [
                    {
                        randomize: [
                            {
                                add: {
                                    componentGroups: [
                                        "librarian"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:entity_transformed": {
                sequence: [
                    {
                        sequence: [
                            {
                                add: {
                                    componentGroups: [
                                        "librarian"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:spawn_skilled_adult": {
                sequence: [
                    {
                        randomize: [
                            {
                                add: {
                                    componentGroups: [
                                        "librarian"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    },
    add: {
        components: [
            new BPEntityComponents.SetEquipment({
                table: "loot_tables/entities/zombie_equipment.json"
            })
        ]
    }
});