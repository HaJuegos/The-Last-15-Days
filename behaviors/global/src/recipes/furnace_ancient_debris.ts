import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { BPRecipeTemplates } from "simplified-mojang-jsons";

export const FurnaceNetheriteRecipe = BPRecipeTemplates.FurnaceAncientDebrisTemplate({
    furnace: {
        targetBlocks: ["furnace", "blast_furnace"],
        input: MinecraftItemTypes.AncientDebris,
        output: MinecraftItemTypes.AncientDebris
    }
});