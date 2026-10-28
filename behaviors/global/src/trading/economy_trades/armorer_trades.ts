import { BPTradingTemplates, EntityFilters } from "simplified-mojang-jsons";

export const RebalanceArmorerTrades = BPTradingTemplates.EconomyTrades.ArmorerTradesTemplate({
    clearAllData: true,
    add: {
        tiers: [
            {
                totalExpRequired: 0,
                groups: [
                    {
                        numToSelect: 2,
                        trades: [
                            {
                                wants: [
                                    {
                                        item: "minecraft:coal",
                                        quantity: 15,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 1
                                    }
                                ],
                                traderExp: 2,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:iron_ingot",
                                        quantity: 5,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:emerald",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(0),
                                                    EntityFilters.isMarkVariant(1),
                                                    EntityFilters.isMarkVariant(2),
                                                    EntityFilters.isMarkVariant(3),
                                                    EntityFilters.isMarkVariant(4),
                                                    EntityFilters.isMarkVariant(5),
                                                    EntityFilters.isMarkVariant(6)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 2,
                                maxUses: 12,
                                rewardExp: true
                            }
                        ]
                    }
                ]
            },
            {
                totalExpRequired: 10,
                groups: [
                    {
                        numToSelect: 2,
                        trades: [
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 4,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_boots",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(0),
                                                    EntityFilters.isMarkVariant(1),
                                                    EntityFilters.isMarkVariant(3),
                                                    EntityFilters.isMarkVariant(4),
                                                    EntityFilters.isMarkVariant(6)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 4,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_boots",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(2),
                                                    EntityFilters.isMarkVariant(5)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 5,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_helmet",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(0),
                                                    EntityFilters.isMarkVariant(1),
                                                    EntityFilters.isMarkVariant(3),
                                                    EntityFilters.isMarkVariant(4),
                                                    EntityFilters.isMarkVariant(6)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 5,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_helmet",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(2),
                                                    EntityFilters.isMarkVariant(5)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 7,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_leggings",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(0),
                                                    EntityFilters.isMarkVariant(1),
                                                    EntityFilters.isMarkVariant(3),
                                                    EntityFilters.isMarkVariant(4),
                                                    EntityFilters.isMarkVariant(6)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 7,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_leggings",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(2),
                                                    EntityFilters.isMarkVariant(5)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_chestplate",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(0),
                                                    EntityFilters.isMarkVariant(1),
                                                    EntityFilters.isMarkVariant(3),
                                                    EntityFilters.isMarkVariant(4),
                                                    EntityFilters.isMarkVariant(6)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_chestplate",
                                                quantity: 1,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(2),
                                                    EntityFilters.isMarkVariant(5)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 5,
                                maxUses: 12,
                                rewardExp: true
                            }
                        ]
                    }
                ]
            },
            {
                totalExpRequired: 70,
                groups: [
                    {
                        numToSelect: 2,
                        trades: [
                            {
                                wants: [
                                    {
                                        item: "minecraft:lava_bucket",
                                        quantity: 1,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 1
                                    }
                                ],
                                traderExp: 20,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 5,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        item: "minecraft:shield",
                                        quantity: 1
                                    }
                                ],
                                traderExp: 10,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 36,
                                        priceMultiplier: 0.2
                                    }
                                ],
                                gives: [
                                    {
                                        item: "minecraft:bell",
                                        quantity: 1
                                    }
                                ],
                                traderExp: 10,
                                maxUses: 12,
                                rewardExp: true
                            }
                        ]
                    }
                ]
            },
            {
                totalExpRequired: 150,
                groups: [
                    {
                        numToSelect: 2,
                        trades: [
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "thorns",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(1)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "thorns",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(1)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 11,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "thorns",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(1)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 13,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "thorns",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(1)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(0)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(0)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 11,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(0)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 13,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(0)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 2,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "binding",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(3)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 3,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "binding",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(3)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 5,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "binding",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(3)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 7,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "binding",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(3)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "frost_walker",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(4)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:iron_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "aqua_affinity",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(4)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "unbreaking",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(2)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "unbreaking",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(2)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 11,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "unbreaking",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(2)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 13,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "unbreaking",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(2)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "mending",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(5)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "mending",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(5)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 11,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "mending",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(5)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 13,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "mending",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(5)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 4,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond_boots",
                                        quantity: 1
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_leggings",
                                                quantity: 1,
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 4,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond_leggings",
                                        quantity: 1
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_chestplate",
                                                quantity: 1,
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 4,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond_helmet",
                                        quantity: 1
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_boots",
                                                quantity: 1,
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 2,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond_chestplate",
                                        quantity: 1
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_helmet",
                                                quantity: 1,
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 15,
                                maxUses: 3,
                                rewardExp: true
                            }
                        ]
                    }
                ]
            },
            {
                totalExpRequired: 250,
                groups: [
                    {
                        numToSelect: 2,
                        trades: [
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 16,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 4
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "thorns",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(1)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 16,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 3
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "thorns",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(1)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 16,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 3
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(0)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 12,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 2
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(0)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 6,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 2
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "binding",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(3)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 3
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "binding",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(3)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 12,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 2
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "frost_walker",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(4)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 12,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 3
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "aqua_affinity",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(4)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "projectile_protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(2)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "feather_falling",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(2)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 9,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_helmet",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "respiration",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(5)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 8,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:chainmail_boots",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "depth_strider",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(5)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 18,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 4
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_chestplate",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "blast_protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:emerald",
                                        quantity: 18,
                                        priceMultiplier: 0.05
                                    },
                                    {
                                        item: "minecraft:diamond",
                                        quantity: 3
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:diamond_leggings",
                                                quantity: 1,
                                                functions: [
                                                    {
                                                        function: "specific_enchants",
                                                        enchants: {
                                                            id: "blast_protection",
                                                            level: [1, 1]
                                                        }
                                                    }
                                                ],
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 3,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:diamond_block",
                                        quantity: 1,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:emerald",
                                                quantity: 42,
                                                filters: EntityFilters.isMarkVariant(6)
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 12,
                                rewardExp: true
                            },
                            {
                                wants: [
                                    {
                                        item: "minecraft:iron_block",
                                        quantity: 1,
                                        priceMultiplier: 0.05
                                    }
                                ],
                                gives: [
                                    {
                                        choice: [
                                            {
                                                item: "minecraft:emerald",
                                                quantity: 4,
                                                filters: EntityFilters.anyOf(
                                                    EntityFilters.isMarkVariant(0),
                                                    EntityFilters.isMarkVariant(1),
                                                    EntityFilters.isMarkVariant(2),
                                                    EntityFilters.isMarkVariant(3),
                                                    EntityFilters.isMarkVariant(4),
                                                    EntityFilters.isMarkVariant(5)
                                                )
                                            }
                                        ]
                                    }
                                ],
                                traderExp: 30,
                                maxUses: 12,
                                rewardExp: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
});