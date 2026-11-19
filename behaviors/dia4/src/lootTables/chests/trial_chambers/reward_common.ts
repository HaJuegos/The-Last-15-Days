import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const VaultTrialDropCommmon = BPLootTableTemplates.Chests.TrialChambers.RewardCommonTemplate({
    remove: {
        pools: [
            {
                entries: [
                    {
                        name: "minecraft:ominous_bottle"
                    }
                ]
            }
        ]
    },
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.0417,
                        chance: 0.0417
                    }
                ],
                entries: [
                    {
                        type: "item",
                        name: "ha:surprise_bundle",
                        functions: [
                            {
                                function: "set_count",
                                count: {
                                    min: 1,
                                    max: 2
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});