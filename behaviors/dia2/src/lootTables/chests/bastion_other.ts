import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const BastionNetheriteRemoval2 = BPLootTableTemplates.Chests.BastionOtherTemplate({
    remove: {
        pools: {
            0: {
                entries: [
                    { name: "minecraft:netherite_scrap" },
                ]
            },
            4: {
                entries: [
                    { name: "minecraft:netherite_upgrade_smithing_template" }
                ]
            }
        }
    }
});