import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const AncientCityIceDrops = BPLootTableTemplates.Chests.AncientCityIceBoxTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.1818,
                        chance: 0.1818
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