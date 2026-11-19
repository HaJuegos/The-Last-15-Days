import { BPSpawnRuleComponents, BPSpawnRuleTemplates, EntityFilters } from "simplified-mojang-jsons";

export const WitchSpawnRule = BPSpawnRuleTemplates.WitchTemplate({
    conditions: [
        {
            "minecraft:biome_filter": new BPSpawnRuleComponents.SetBiomeFilter(
                EntityFilters.anyOf(
                    EntityFilters.hasBiomeTag('mooshroom_island'),
                    EntityFilters.allOf(
                        EntityFilters.hasBiomeTag('monster'),
                        EntityFilters.hasBiomeTag('sulfur_caves'),
                    )
                )
            )
        },
        {
            "minecraft:biome_filter": new BPSpawnRuleComponents.SetBiomeFilter(
                EntityFilters.anyOf(
                    EntityFilters.hasBiomeTag('mooshroom_island'),
                    EntityFilters.allOf(
                        EntityFilters.hasBiomeTag('monster'),
                        EntityFilters.hasBiomeTag('sulfur_caves', 'self', '!='),
                    )
                )
            )
        }
    ]
});