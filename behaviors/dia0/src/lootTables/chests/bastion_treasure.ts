import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const BastionNetheriteRemoval1 = BPLootTableTemplates.Chests.BastionTreasureTemplate({
    remove: {
        pools: {
            0: {
                entries: [
                    { name: "minecraft:netherite_ingot" },
                    { name: "minecraft:netherite_scrap" },
                ]
            },
            3: {
                entries: [
                    { name: "minecraft:netherite_upgrade_smithing_template" }
                ]
            }
        }
    }
});