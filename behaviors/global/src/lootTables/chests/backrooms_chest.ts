import { createBPLootTable } from "simplified-mojang-jsons";

export const allDropsChanceBackrooms = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "loot_table",
                    weight: 1,
                    name: "loot_tables/chests/ancient_city.json"
                },
                {
                    type: "loot_table",
                    weight: 1,
                    name: "loot_tables/chests/trial_chambers/reward_common.json"
                },
                {
                    type: "loot_table",
                    weight: 1,
                    name: "loot_tables/chests/bastion_hoglin_stable.json"
                },
                {
                    type: "loot_table",
                    weight: 1,
                    name: "loot_tables/chests/bastion_treasure.json"
                },
                {
                    type: "loot_table",
                    weight: 1,
                    name: "loot_tables/chests/shipwrecktreasure.json"
                },
                {
                    type: "loot_table",
                    weight: 1,
                    name: "loot_tables/chests/backrooms_loot.json"
                }
            ]
        }
    ]
});