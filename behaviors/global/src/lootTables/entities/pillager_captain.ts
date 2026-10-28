import { BPLootTableTemplates } from "simplified-mojang-jsons";

export const CaptainDropPillager = BPLootTableTemplates.Entities.PillagerCaptainTemplate({
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