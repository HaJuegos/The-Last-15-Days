import { BPFeatureRuleTemplates } from "simplified-mojang-jsons";

export const DiamondOreUnderground4 = BPFeatureRuleTemplates.OverworldUndergroundDiamondOreLargeFeature({
    changeDistributions: {
        iterations: 10,
        coordinateEvalOrder: "zyx",
        scatterChance: {
            numerator: 1,
            denominator: 6
        },
        x: {
            distribution: "uniform",
            extent: [0, 16]
        },
        y: {
            distribution: "uniform",
            extent: [-64, 16]
        },
        z: {
            distribution: "uniform",
            extent: [0, 16]
        }
    }
});