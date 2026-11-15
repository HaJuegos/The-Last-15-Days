import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { createBPLootTable } from "simplified-mojang-jsons";

export const AllDiamondSetGear = createBPLootTable({
    pools: [
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: MinecraftItemTypes.DiamondHelmet,
                    functions: [
                        {
                            function: "enchant_with_levels",
                            levels: {
                                min: 22,
                                max: 38
                            },
                            treasure: true
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: MinecraftItemTypes.DiamondChestplate,
                    functions: [
                        {
                            function: "enchant_with_levels",
                            levels: {
                                min: 22,
                                max: 38
                            },
                            treasure: true
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: MinecraftItemTypes.DiamondLeggings,
                    functions: [
                        {
                            function: "enchant_with_levels",
                            levels: {
                                min: 22,
                                max: 38
                            },
                            treasure: true
                        }
                    ]
                }
            ]
        },
        {
            rolls: 1,
            entries: [
                {
                    type: "item",
                    name: MinecraftItemTypes.DiamondBoots,
                    functions: [
                        {
                            function: "enchant_with_levels",
                            levels: {
                                min: 22,
                                max: 38
                            },
                            treasure: true
                        }
                    ]
                }
            ]
        }
    ]
});