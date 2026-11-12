import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const SulfurCubeChanges = BPEntityTemplates.SulfurCubeTemplate({
    componentsGroups: {
        "minecraft:sulfur_cube_medium_primed": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                causesFire: false,
                destroyAffectedByGriefing: true,
                fuseLit: true,
                power: 3,
                fuseLength: 6,
                allowUnderwater: true
            })
        },
        "minecraft:sulfur_cube_medium_primed_by_explosion": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                causesFire: false,
                destroyAffectedByGriefing: true,
                fuseLit: true,
                power: 3,
                fuseLength: {
                    rangeMax: 3.0,
                    rangeMin: 0.75
                },
                allowUnderwater: true
            })
        }
    }
});