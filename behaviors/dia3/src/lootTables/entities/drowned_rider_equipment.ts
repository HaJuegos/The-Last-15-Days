import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const DrownedRiderEquip = BPLootTableTemplates.Entities.DrownedRiderEquipmentTemplate({
    add: {
        pools: [
            {
                rolls: 1,
                entries: [
                    {
                        type: "loot_table",
                        name: "loot_tables/entities/custom/all_diamond_set_gear.json"
                    }
                ]
            }
        ]
    }
});