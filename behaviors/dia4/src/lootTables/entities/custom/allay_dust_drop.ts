import { createBPLootTable } from "simplified-mojang-jsons";

export const AllayDustDrop = createBPLootTable({
    pools: [
        {
            rolls: 1,
            conditions: [
                {
                    condition: "killed_by_player_or_pets"
                }
            ],
            entries: [
                {
                    type: "item",
                    name: "ha:allay_dust",
                    weight: 1,
                    functions: [
                        {
                            function: "set_count",
                            count: {
                                min: 0,
                                max: 1
                            }
                        },
                        {
                            function: "looting_enchant",
                            count: {
                                min: 0,
                                max: 1
                            }
                        }
                    ]
                }
            ]
        }
    ]
});