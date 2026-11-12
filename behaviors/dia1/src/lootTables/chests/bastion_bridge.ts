import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const BastionNetheriteRemoval3 = BPLootTableTemplates.Chests.BastionBridgeTemplate({
    remove: {
        pools: {
            4: {
                entries: [
                    { name: "minecraft:netherite_upgrade_smithing_template" }
                ]
            }
        }
    }
});