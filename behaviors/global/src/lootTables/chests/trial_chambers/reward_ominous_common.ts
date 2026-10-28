import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const VaultTrialOminousDropCommmon = BPLootTableTemplates.Chests.TrialChambers.RewardOminousCommonTemplate({
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
                        maxChance: 0.0017,
                        chance: 0.0017
                    }
                ],
                entries: [
                    {
                        type: "item",
                        name: "ha:banana",
                        functions: [
                            {
                                function: "set_count",
                                count: 1
                            }
                        ]
                    }
                ]
            }
        ]
    }
});