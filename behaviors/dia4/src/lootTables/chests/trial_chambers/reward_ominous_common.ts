import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const VaultTrialOminousDropCommmon = BPLootTableTemplates.Chests.TrialChambers.RewardOminousCommonTemplate({
    remove: {
        pools: [
            {
                entries: [
                    {
                        name: "minecraft:ominous_bottle"
                    }
                ]
            }
        ]
    }
});