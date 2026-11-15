import { BPSpawnRuleComponents, BPSpawnRuleTemplates, EntityFilters } from "simplified-mojang-jsons";

export const WitherSkeletonSpawnRule = BPSpawnRuleTemplates.WitherSkeletonTemplate({
    add: {
        conditions: [
            [
                new BPSpawnRuleComponents.SetSpawnsOnSurface(),
                new BPSpawnRuleComponents.SetSpawnsUnderground(),
                new BPSpawnRuleComponents.SetBrightnessFilter({
                    min: 0,
                    max: 7,
                    adjustForWeather: true
                }),
                new BPSpawnRuleComponents.SetDifficultyFilter({
                    min: "easy",
                    max: "hard",
                }),
                new BPSpawnRuleComponents.SetWeight({
                    default: 50
                }),
                new BPSpawnRuleComponents.SetHerd({
                    minSize: 1,
                    maxSize: 2
                }),
                new BPSpawnRuleComponents.SetBiomeFilter(EntityFilters.anyOf(
                    EntityFilters.hasBiomeTag('monster'),
                    EntityFilters.hasBiomeTag('soulsand_valley'),
                ))
            ]
        ]
    }
});