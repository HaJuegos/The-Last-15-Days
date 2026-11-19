import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const ZombieGear = BPLootTableTemplates.Entities.ZombieEquipmentTemplate({
    remove: {
        pools: {
            1: true
        }
    },
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