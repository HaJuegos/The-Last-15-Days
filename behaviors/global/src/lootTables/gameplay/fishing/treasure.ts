import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const FishingTreasureDrops = BPLootTableTemplates.Gameplay.Fishing.TreasureTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.1134,
                        chance: 0.0069
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
                                    max: 1
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});