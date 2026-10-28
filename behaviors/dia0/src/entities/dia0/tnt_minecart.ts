import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const TnTMinecartChanges = BPEntityTemplates.TntMinecartTemplate({
    componentsGroups: {
        "minecraft:instant_explode_tnt": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                causesFire: false,
                fuseLit: true,
                power: 3,
                fuseLength: 0,
                allowUnderwater: true
            })
        },
        "minecraft:primed_tnt": {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                causesFire: false,
                fuseLit: true,
                power: 3,
                fuseLength: 4,
                allowUnderwater: true
            })
        }
    }
});