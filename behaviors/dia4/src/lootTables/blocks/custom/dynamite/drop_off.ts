import { createBPLootTable } from "simplified-mojang-jsons";

export const DynamiteBlockDropOff = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: "ha:dynamite_off_item",
                    weight: 1,
                    count: 1
                }
            ]
        }
    ]
});