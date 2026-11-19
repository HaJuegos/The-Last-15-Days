import { createBPLootTable } from "simplified-mojang-jsons";

export const DynamiteBlockDropOn = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: "ha:dynamite_item",
                    weight: 1,
                    count: 1
                }
            ]
        }
    ]
});