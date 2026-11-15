import { BPSpawnRuleComponents, createBPSpawnRule, EntityFilters } from "simplified-mojang-jsons";

export const PufferfishSpawnRule = createBPSpawnRule({
    idSpawnRule: "minecraft:pufferfish",
    categoryControl: "water_animal",
    conditions: [
        [
            new BPSpawnRuleComponents.SetSpawnsOnSurface(),
            new BPSpawnRuleComponents.SetSpawnsUnderground(),
            new BPSpawnRuleComponents.SetSpawnsUnderwater(),
            new BPSpawnRuleComponents.SetWeight({
                default: 30
            }),
            new BPSpawnRuleComponents.SetHerd({
                minSize: 1,
                maxSize: 3
            }),
            new BPSpawnRuleComponents.SetBrightnessFilter({
                min: 0,
                max: 15,
                adjustForWeather: true
            }),
            new BPSpawnRuleComponents.SetDifficultyFilter({
                min: "easy",
                max: "hard"
            }),
            new BPSpawnRuleComponents.SetHeightFilter({
                min: -64,
                max: 320
            }),
            new BPSpawnRuleComponents.SetBiomeFilter(EntityFilters.hasBiomeTag('overworld'))
        ],
        [
            new BPSpawnRuleComponents.SetSpawnsOnSurface(),
            new BPSpawnRuleComponents.SetSpawnsUnderground(),
            new BPSpawnRuleComponents.SetSpawnsUnderwater(),
            new BPSpawnRuleComponents.SetWeight({
                default: 30
            }),
            new BPSpawnRuleComponents.SetHerd({
                minSize: 1,
                maxSize: 3
            }),
            new BPSpawnRuleComponents.SetBrightnessFilter({
                min: 0,
                max: 15,
                adjustForWeather: true
            }),
            new BPSpawnRuleComponents.SetDifficultyFilter({
                min: "easy",
                max: "hard"
            }),
            new BPSpawnRuleComponents.SetBiomeFilter(EntityFilters.hasBiomeTag('the_end'))
        ]
    ]
});