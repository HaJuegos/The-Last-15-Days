import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { createBPRecipe, TypeRecipesVanillaEnums } from "simplified-mojang-jsons";

export const IronAppleRecipe = createBPRecipe({
    idRecipe: "ha:iron_apple_recipe",
    typeRecipe: TypeRecipesVanillaEnums.RecipeShaped,
    shaped: {
        tags: ["crafting_table"],
        pattern: [
            "HHH",
            "HMH",
            "HHH",
        ],
        key: {
            "H": {
                item: MinecraftItemTypes.IronBlock
            },
            "M": {
                item: MinecraftItemTypes.GoldenApple
            }
        },
        unlock: [
            { item: "ha:iron_apple" },
            { item: MinecraftItemTypes.IronBlock },
            { item: MinecraftItemTypes.GoldenApple },
        ],
        result: {
            item: "ha:iron_apple",
            count: 1
        }
    }
});