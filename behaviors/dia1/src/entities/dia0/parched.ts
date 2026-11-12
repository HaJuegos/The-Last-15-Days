import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const ParchedChanges = BPEntityTemplates.ParchedTemplate({
    componentsGroups: {
        "minecraft:ranged_attack": {
            "minecraft:behavior.ranged_attack": new BPEntityComponents.SetBehaviorRangedAttack({
                priority: 1,
                attackInterval: {
                    min: 1,
                    max: 3
                },
                attackRange: {
                    min: 0,
                    max: 20
                },
                rangedFov: 360
            })
        },
        "minecraft:ranged_attack_hard": {
            "minecraft:behavior.ranged_attack": new BPEntityComponents.SetBehaviorRangedAttack({
                priority: 1,
                attackInterval: {
                    min: 1,
                    max: 3
                },
                attackRange: {
                    min: 0,
                    max: 20
                },
                rangedFov: 360
            })
        }
    }
});