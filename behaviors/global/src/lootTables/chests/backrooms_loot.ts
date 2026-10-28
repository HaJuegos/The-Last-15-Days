import { createBPLootTable } from "simplified-mojang-jsons";

export const BackroomsLootCustom = createBPLootTable({
    pools: [
        {
            rolls: {
                min: 2,
                max: 8
            },
            entries: [
                {
                    type: "item",
                    name: "minecraft:splash_potion",
                    weight: 3,
                    functions: [
                        {
                            function: "set_potion",
                            id: "long_swiftness"
                        }
                    ]
                },
                {
                    type: "item",
                    name: "minecraft:splash_potion",
                    weight: 3,
                    functions: [
                        {
                            function: "set_potion",
                            id: "long_fire_resistance"
                        }
                    ]
                },
                {
                    type: "item",
                    name: "minecraft:splash_potion",
                    weight: 3,
                    functions: [
                        {
                            function: "set_potion",
                            id: "strong_healing"
                        }
                    ]
                },
                {
                    type: "item",
                    name: "minecraft:splash_potion",
                    weight: 3,
                    functions: [
                        {
                            function: "set_potion",
                            id: "long_strength"
                        }
                    ]
                },
                {
                    type: "item",
                    name: "minecraft:golden_apple",
                    weight: 5,
                    functions: [
                        {
                            function: "set_count",
                            count: {
                                min: 1,
                                max: 64
                            }
                        }
                    ]
                },
                {
                    type: "item",
                    name: "minecraft:enchanted_golden_apple",
                    weight: 3,
                    functions: [
                        {
                            function: "set_count",
                            count: {
                                min: 1,
                                max: 20
                            }
                        }
                    ]
                },
                {
                    type: "item",
                    name: "ha:iron_apple",
                    weight: 1,
                    functions: [
                        {
                            function: "set_count",
                            count: {
                                min: 1,
                                max: 20
                            }
                        }
                    ]
                },
                {
                    type: "item",
                    name: "ha:surprise_bundle",
                    weight: 2,
                    functions: [
                        {
                            function: "set_lore",
                            lore: [
                                "",
                                "Este saco tiene ítems únicos que no están en otros lados...",
                                "This bag has unique items you won't find anywhere else..."
                            ]
                        }
                    ]
                },
                {
                    type: "empty",
                    weight: 4
                }
            ]
        }
    ]
});