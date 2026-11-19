import { createBPRecipe, TypeRecipesVanillaEnums } from "simplified-mojang-jsons";

export const StoneSkullRecipe = createBPRecipe({
    idRecipe: "ha:stone_skull_recipe",
    typeRecipe: TypeRecipesVanillaEnums.RecipeShaped,
    shaped: {
        tags: ["crafting_table"],
        pattern: [
            "CCC",
            "PPP",
            "L L"
        ],
        key: {
            "C": {
                item: "minecraft:cobblestone"
            },
            "P": {
                item: "minecraft:stone"
            },
            "L": {
                item: "minecraft:smooth_stone"
            }
        },
        unlock: [
            {
                item: "minecraft:cobblestone"
            },
            {
                item: "minecraft:stone"
            },
            {
                item: "minecraft:smooth_stone"
            }
        ],
        result: {
            item: "ha:stone_skull",
            count: 1
        }
    }
});