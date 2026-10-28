import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const TrialRuinsDrop5 = BPLootTableTemplates.Entities.WarmOceanRuinsBrushableBlockTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.0625,
                        chance: 0.0625
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