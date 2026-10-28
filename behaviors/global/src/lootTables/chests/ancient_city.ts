import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const AncientCityDrops = BPLootTableTemplates.Chests.AncientCityTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.02,
                        chance: 0.02
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