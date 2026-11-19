import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const PillagerCaptainGear = BPLootTableTemplates.Entities.PillagerCaptainEquipmentTemplate({
    clearAllData: true,
    add: {
        pools: [
            {
                rolls: 1,
                entries: [
                    {
                        type: "item",
                        name: "minecraft:banner",
                        weight: 1,
                        functions: [
                            {
                                function: "set_banner_details",
                                type: 1
                            }
                        ]
                    }
                ]
            },
            {
                rolls: 1,
                entries: [
                    {
                        type: "item",
                        name: "minecraft:crossbow",
                        weight: 1,
                        functions: [
                            {
                                function: "looting_enchant",
                                count: {
                                    min: 0,
                                    max: 1
                                }
                            },
                            {
                                function: "specific_enchants",
                                enchants: {
                                    id: "quick_charge",
                                    level: [2, 2]
                                }
                            },
                            {
                                function: "enchant_random_gear",
                                chance: 0.28
                            }
                        ]
                    }
                ]
            }
        ]
    }
});