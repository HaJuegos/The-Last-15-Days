import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const BastionNetheriteRemoval4 = BPLootTableTemplates.Chests.BastionHoglinStableTemplate({
    remove: {
        pools: {
            0: {
                entries: [
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