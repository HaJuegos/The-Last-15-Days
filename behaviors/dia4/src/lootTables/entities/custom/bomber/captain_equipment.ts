import { createBPLootTable } from "simplified-mojang-jsons";

export const BomberCaptainGear = createBPLootTable({
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
        }
    ]
});