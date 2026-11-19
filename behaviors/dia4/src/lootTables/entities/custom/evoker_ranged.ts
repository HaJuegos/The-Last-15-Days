import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { createBPLootTable } from "simplified-mojang-jsons";

export const EvokerRangedGear = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    weight: 80,
                    type: "item",
                    name: MinecraftItemTypes.Bow,
                    functions: [
                        {
                            function: "enchant_random_gear",
                            chance: 0.28
                        }
                    ]
                },
                {
                    weight: 20,
                    type: "item",
                    name: MinecraftItemTypes.Bow,
                    functions: [
                        {
                            function: "enchant_with_levels",
                            levels: {
                                min: 30,
                                max: 65
                            }
                        }
                    ]
                }
            ]
        }
    ]
});