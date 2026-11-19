import { BPSpawnRuleComponents, BPSpawnRuleTemplates, EntityFilters } from "simplified-mojang-jsons";

export const BeeSpawnRule = BPSpawnRuleTemplates.BeeTemplate({
    add: {
        conditions: [
            [
                new BPSpawnRuleComponents.SetSpawnsOnSurface(),
                new BPSpawnRuleComponents.SetBrightnessFilter({
                    min: 7,
                    max: 15,
                    adjustForWeather: true
                }),
                new BPSpawnRuleComponents.SetDifficultyFilter({
                    min: "easy",
                    max: "hard",
                }),
                new BPSpawnRuleComponents.SetWeight({
                    default: 10
                }),
                new BPSpawnRuleComponents.SetHerd({
                    minSize: 1,
                    maxSize: 3,
                    event: "ha:natural_entity_spawned"
                }),
                new BPSpawnRuleComponents.SetBiomeFilter(
                    EntityFilters.hasBiomeTag('overworld')
                )
            ]
        ]
    }
});