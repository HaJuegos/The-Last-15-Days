import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPSpawnRuleComponents, createBPSpawnRule, EntityFilters } from "simplified-mojang-jsons";

export const CaveSpiderSpawnRule = createBPSpawnRule({
    idSpawnRule: MinecraftEntityTypes.CaveSpider,
    categoryControl: "monster",
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
                default: 100
            }),
            new BPSpawnRuleComponents.SetBiomeFilter(EntityFilters.allOf(
                EntityFilters.hasBiomeTag('monster'),
                EntityFilters.hasBiomeTag('sulfur_caves', 'self', '!='),
            ))
        ]
    ]
});