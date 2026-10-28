import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const TrialRuinsDrop1 = BPLootTableTemplates.Entities.ColdOceanRuinsBrushableBlockTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.0769,
                        chance: 0.0769
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