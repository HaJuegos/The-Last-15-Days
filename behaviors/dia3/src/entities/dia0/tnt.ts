import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const TNTChanges = BPEntityTemplates.TntTemplate({
    componentsGroups: {
        from_explosion: {
            "minecraft:explode": new BPEntityComponents.SetExplode({
                causesFire: false,
                fuseLit: true,
                power: 4,
                fuseLength: {
                    rangeMax: 2.0,
                    rangeMin: 0.5
                },
                allowUnderwater: true
            })
        }
    },
    components: {
        "minecraft:explode": new BPEntityComponents.SetExplode({
            causesFire: false,
            fuseLit: true,
            power: 4,
            fuseLength: 4,
            allowUnderwater: true
        })
    }
});