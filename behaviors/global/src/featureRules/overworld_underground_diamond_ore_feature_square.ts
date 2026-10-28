import { BPFeatureRuleTemplates } from "simplified-mojang-jsons";

export const DiamondOreUnderground2 = BPFeatureRuleTemplates.OverworldUndergroundDiamondOreFeatureSquare({
    changeDistributions: {
        iterations: 10,
        coordinateEvalOrder: "zyx",
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