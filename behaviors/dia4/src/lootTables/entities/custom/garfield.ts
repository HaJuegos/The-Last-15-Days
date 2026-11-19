import { createBPLootTable } from "simplified-mojang-jsons";

export const GarfieldDrops = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: "minecraft:golden_apple",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 64 }
                        },
                        {
                            function: "looting_enchant",
                            count: { min: 0, max: 1 }
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            conditions: [
                {
                    condition: "random_chance_with_looting",
                    chance: 0.40,
                    lootingMultiplier: 0.05
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "minecraft:iron_block",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 64 }
                        },
                        {
                            function: "looting_enchant",
                            count: { min: 0, max: 1 }
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            conditions: [
                {
                    condition: "random_chance_with_looting",
                    chance: 0.25,
                    lootingMultiplier: 0.05
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "minecraft:gold_block",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 64 }
                        },
                        {
                            function: "looting_enchant",
                            count: { min: 0, max: 1 }
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            conditions: [
                {
                    condition: "random_chance_with_looting",
                    chance: 0.02,
                    lootingMultiplier: 0.01
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "ha:iron_apple",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 3 }
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            conditions: [
                {
                    condition: "random_chance_with_looting",
                    chance: 0.05,
                    lootingMultiplier: 0.01
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "ha:lasagna",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 1 }
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            conditions: [
                {
                    condition: "random_chance_with_looting",
                    chance: 0.10,
                    lootingMultiplier: 0.03
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "minecraft:totem_of_undying",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 1 }
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            conditions: [
                {
                    condition: "random_chance_with_looting",
                    chance: 0.01,
                    lootingMultiplier: 0.01
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "minecraft:enchanted_golden_apple",
                    functions: [
                        {
                            function: "set_count",
                            count: { min: 1, max: 10 }
                        }
                    ]
                }
            ]
        }
    ]
});