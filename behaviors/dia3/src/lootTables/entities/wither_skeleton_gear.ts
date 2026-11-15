import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const WitherSkeletonEquipment = BPLootTableTemplates.Entities.WitherSkeletonGearTemplate({
    clearAllData: true,
    add: {
        pools: [
            {
                rolls: 1,
                entries: [
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronHelmet,
                        weight: 70,
                        functions: [
                            {
                                function: "enchant_random_gear",
                                chance: 0.25
                            }
                        ]
                    },
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronHelmet,
                        weight: 30,
                        functions: [
                            {
                                function: "enchant_with_levels",
                                levels: {
                                    min: 22,
                                    max: 38
                                },
                                treasure: true
                            }
                        ]
                    }
                ]
            },
            {
                rolls: 1,
                entries: [
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronChestplate,
                        weight: 70,
                        functions: [
                            {
                                function: "enchant_random_gear",
                                chance: 0.25
                            }
                        ]
                    },
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronChestplate,
                        weight: 30,
                        functions: [
                            {
                                function: "enchant_with_levels",
                                levels: {
                                    min: 22,
                                    max: 38
                                },
                                treasure: true
                            }
                        ]
                    }
                ]
            },
            {
                rolls: 1,
                entries: [
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronLeggings,
                        weight: 70,
                        functions: [
                            {
                                function: "enchant_random_gear",
                                chance: 0.25
                            }
                        ]
                    },
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronLeggings,
                        weight: 30,
                        functions: [
                            {
                                function: "enchant_with_levels",
                                levels: {
                                    min: 22,
                                    max: 38
                                },
                                treasure: true
                            }
                        ]
                    }
                ]
            },
            {
                rolls: 1,
                entries: [
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronBoots,
                        weight: 70,
                        functions: [
                            {
                                function: "enchant_random_gear",
                                chance: 0.25
                            }
                        ]
                    },
                    {
                        type: 'item',
                        name: MinecraftItemTypes.IronBoots,
                        weight: 30,
                        functions: [
                            {
                                function: "enchant_with_levels",
                                levels: {
                                    min: 22,
                                    max: 38
                                },
                                treasure: true
                            }
                        ]
                    }
                ]
            },
            {
                rolls: 1,
                entries: [
                    {
                        type: 'item',
                        name: MinecraftItemTypes.DiamondSword,
                        weight: 70,
                        functions: [
                            {
                                function: "specific_enchants",
                                enchants: [
                                    {
                                        id: "sharpness",
                                        level: [5, 5]
                                    }
                                ]
                            },
                            {
                                function: "enchant_random_gear",
                                chance: 0.25
                            }
                        ]
                    },
                    {
                        type: 'item',
                        name: MinecraftItemTypes.DiamondSword,
                        weight: 30,
                        functions: [
                            {
                                function: "specific_enchants",
                                enchants: [
                                    {
                                        id: "sharpness",
                                        level: [5, 5]
                                    }
                                ]
                            },
                            {
                                function: "enchant_with_levels",
                                levels: {
                                    min: 22,
                                    max: 38
                                },
                                treasure: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
});