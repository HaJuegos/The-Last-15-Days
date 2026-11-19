import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { createBPRecipe, TypeRecipesVanillaEnums } from "simplified-mojang-jsons";

export const FurnaceAllayDust = createBPRecipe({
    idRecipe: "ha:furnace_allay_dust",
    typeRecipe: TypeRecipesVanillaEnums.RecipeFurnace,
    furnace: {
        targetBlocks: ["furnace", "campfire", "soul_campfire"],
        input: "ha:allay_dust",
        output: MinecraftItemTypes.Charcoal,
        unlock: [
            {
                item: "ha:allay_dust"
            }
        ]
    }
});