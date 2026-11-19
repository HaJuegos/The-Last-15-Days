import { createBPRecipe, TypeRecipesVanillaEnums } from "simplified-mojang-jsons";

export const InvocationSkullRecipe = createBPRecipe({
    idRecipe: "ha:invocation_skull_recipe",
    typeRecipe: TypeRecipesVanillaEnums.RecipeShaped,
    shaped: {
        tags: ["crafting_table"],
        pattern: [
            "EEE",
            "LSL",
            "BDB"
        ],
        key: {
            "S": {
                item: "ha:stone_skull"
            },
            "E": {
                item: "minecraft:emerald"
            },
            "L": {
                item: "minecraft:crossbow"
            },
            "D": {
                item: "minecraft:diamond_block"
            },
            "B": {
                item: "minecraft:emerald_block"
            }
        },
        unlock: [
            {
                item: "ha:stone_skull"
            },
            {
                item: "minecraft:emerald"
            },
            {
                item: "minecraft:crossbow"
            },
            {
                item: "minecraft:diamond_block"
            },
            {
                item: "minecraft:emerald_block"
            }
        ],
        result: {
            item: "ha:invocation_skull",
            count: 1
        }
    }
});