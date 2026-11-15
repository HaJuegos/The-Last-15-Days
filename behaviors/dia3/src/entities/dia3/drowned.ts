import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const DrownedEntity = BPEntityTemplates.DrownedTemplate({
    componentsGroups: {
        "minecraft:drowned_rider": {
            "minecraft:equipment": new BPEntityComponents.SetEquipment({
                table: "loot_tables/entities/drowned_rider_equipment.json",
                slotDropChance: [
                    {
                        slot: "slot.weapon.mainhand",
                        dropChance: -1
                    }
                ]
            })
        },
        "minecraft:melee_equipment": {
            "minecraft:equipment": new BPEntityComponents.SetEquipment({
                "table": "loot_tables/entities/drowned_equipment.json",
                slotDropChance: [
                    {
                        slot: "slot.weapon.mainhand",
                        dropChance: -1
                    },
                    {
                        slot: "slot.weapon.offhand",
                        dropChance: 1.0,
                    }
                ]
            })
        },
        "minecraft:ranged_equipment": {
            "minecraft:equipment": new BPEntityComponents.SetEquipment({
                table: "loot_tables/entities/drowned_ranged_equipment.json",
                slotDropChance: [
                    {
                        slot: "slot.weapon.mainhand",
                        dropChance: -1
                    },
                    {
                        slot: "slot.weapon.offhand",
                        dropChance: 1.0,
                    }
                ]
            })
        }
    },
    remove: {
        componentsGroups: {
            "minecraft:mode_switcher": []
        },
        events: {
            "minecraft:switch_to_melee": true,
            "minecraft:switch_to_ranged": true,
            "minecraft:as_adult": {
                add: {
                    componentGroups: [
                        "minecraft:melee_equipment",
                        "minecraft:melee_mode",
                    ]
                }
            },
            "minecraft:as_baby": {
                add: {
                    componentGroups: [
                        "minecraft:melee_equipment",
                        "minecraft:melee_mode",
                    ]
                }
            },
            "minecraft:as_baby_jockey": {
                add: {
                    componentGroups: [
                        "minecraft:melee_equipment",
                        "minecraft:melee_mode",
                    ]
                }
            }
        }
    },
    add: {
        events: {
            "minecraft:as_adult": {
                add: {
                    componentGroups: [
                        "minecraft:ranged_equipment",
                        "minecraft:ranged_mode"
                    ]
                }
            },
            "minecraft:as_baby": {
                add: {
                    componentGroups: [
                        "minecraft:ranged_equipment",
                        "minecraft:ranged_mode"
                    ]
                }
            },
            "minecraft:as_baby_jockey": {
                add: {
                    componentGroups: [
                        "minecraft:ranged_equipment",
                        "minecraft:ranged_mode"
                    ]
                }
            }
        }
    }
});