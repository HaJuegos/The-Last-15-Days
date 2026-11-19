import { BPSpawnRuleComponents, BPSpawnRuleTemplates, EntityFilters } from "simplified-mojang-jsons";

export const FoxSpawnRule = BPSpawnRuleTemplates.FoxTemplate({
    conditions: [
        {
            "minecraft:brightness_filter": new BPSpawnRuleComponents.SetBrightnessFilter({
                min: 7,
                max: 15,
                adjustForWeather: true
            }),
            "minecraft:biome_filter": new BPSpawnRuleComponents.SetBiomeFilter(EntityFilters.anyOf(
                EntityFilters.isFamily('taiga'),
                EntityFilters.isFamily('mooshroom_island'),
            ))
        }
    ]
});