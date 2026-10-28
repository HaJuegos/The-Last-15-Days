import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const CreeperChanges = BPEntityTemplates.CreeperTemplate({
    componentsGroups: {
        "minecraft:charged_exploding": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                power: 6,
                fuseLit: true,
                fuseLength: 1.5,
                causesFire: false,
                destroyAffectedByGriefing: true,
                allowUnderwater: true
            })
        },
        "minecraft:exploding": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                power: 3,
                fuseLit: true,
                fuseLength: 1.5,
                causesFire: false,
                destroyAffectedByGriefing: true,
                allowUnderwater: true
            })
        },
        "minecraft:forced_charged_exploding": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                power: 6,
                fuseLit: true,
                fuseLength: 1.5,
                causesFire: false,
                destroyAffectedByGriefing: true,
                allowUnderwater: true
            })
        },
        "minecraft:forced_exploding": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                power: 3,
                fuseLit: true,
                fuseLength: 1.5,
                causesFire: false,
                destroyAffectedByGriefing: true
            })
        }
    }
});