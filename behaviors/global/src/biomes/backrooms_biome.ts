import { BPBiomeComponents, createBPBiome } from "simplified-mojang-jsons";

export const BackroomsBiome = createBPBiome({
    idBiome: "ha:backrooms_biome",
    components: [
        new BPBiomeComponents.SetClimate({
            snowAccumulation: [-1, 0],
            temperature: 0,
            downfall: 0
        }),
        new BPBiomeComponents.SetTags({
            tags: [
                "backrooms"
            ]
        })
    ]
});