import { createBPLootTable } from "simplified-mojang-jsons";

export const BomberDrop = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: "ha:dynamite_off_item",
                    functions: [
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