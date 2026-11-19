import { createBPLootTable } from "simplified-mojang-jsons";

export const RaidDropBomber = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "loot_table",
                    name: "loot_tables/entities/custom/bomber/normal_drop.json"
                }
            ]
        },
        {
            rolls: 1,
            entries: [
                {
                    type: "loot_table",
                    name: "loot_tables/entities/raider_drops.json"
                }
            ]
        }
    ]
});