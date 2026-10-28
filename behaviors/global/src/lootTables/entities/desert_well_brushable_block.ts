import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const TrialRuinsDrop3 = BPLootTableTemplates.Entities.DesertWellBrushableBlockTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                conditions: [
                    {
                        condition: "random_chance",
                        maxChance: 0.1111,
                        chance: 0.1111
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