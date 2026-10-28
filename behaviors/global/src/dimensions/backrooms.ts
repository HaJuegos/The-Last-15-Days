import { BPDimensionComponents, createBPDimension } from "simplified-mojang-jsons";

export const BackroomsCustomDime = createBPDimension({
    idDimension: 'ha:backrooms',
    components: [
        new BPDimensionComponents.SetDimensionHeight({
            minY: -16,
            heightRange: 32
        }),
        new BPDimensionComponents.SetGeneration({
            generatorType: "void"
        })
    ]
});