import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const SkeletonChanges = BPEntityTemplates.SkeletonTemplate({
    componentsGroups: {
        "minecraft:ranged_attack": {
            "minecraft:behavior.ranged_attack": new BPEntityComponents.SetBehaviorRangedAttack({
                priority: 0,
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
                priority: 0,
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
    },
    components: {
        "minecraft:behavior.ranged_attack": new BPEntityComponents.SetBehaviorRangedAttack({
            priority: 0,
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
    add: {
        componentsGroups: {
            "ha:become_stray": [
                new BPEntityComponents.SetIsShaking(),
                new BPEntityComponents.SetTransformation({
                    into: `${MinecraftEntityTypes.Stray}<minecraft:entity_spawned>`,
                    delay: {
                        value: 10
                    },
                    transformationSound: "convert_to_drowned",
                    dropEquipment: false,
                    dropInventory: false,
                    preserveEquipment: true
                })
            ],
            "ha:become_bogged": [
                new BPEntityComponents.SetIsShaking(),
                new BPEntityComponents.SetTransformation({
                    into: `${MinecraftEntityTypes.Bogged}<minecraft:entity_spawned>`,
                    delay: {
                        value: 10
                    },
                    transformationSound: "convert_to_drowned",
                    dropEquipment: false,
                    dropInventory: false,
                    preserveEquipment: true
                })
            ],
            "ha:become_parched": [
                new BPEntityComponents.SetIsShaking(),
                new BPEntityComponents.SetTransformation({
                    into: `${MinecraftEntityTypes.Parched}<minecraft:entity_spawned>`,
                    delay: {
                        value: 10
                    },
                    transformationSound: "convert_to_drowned",
                    dropEquipment: false,
                    dropInventory: false,
                    preserveEquipment: true
                })
            ]
        },
        events: {
            "minecraft:entity_spawned": {
                trigger: "ha:random_transform"
            },

            "ha:random_transform": {
                randomize: [
                    {
                        weight: 85
                    },
                    {
                        weight: 15,
                        add: {
                            componentGroups: [
                                "ha:become_stray"
                            ]
                        }
                    },
                    {
                        weight: 15,
                        add: {
                            componentGroups: [
                                "ha:become_bogged"
                            ]
                        }
                    },
                    {
                        weight: 15,
                        add: {
                            componentGroups: [
                                "ha:become_parched"
                            ]
                        }
                    }
                ]
            }
        }
    }
});