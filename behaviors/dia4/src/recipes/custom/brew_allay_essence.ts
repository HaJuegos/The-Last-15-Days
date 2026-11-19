import { createBPRecipe, TypeRecipesVanillaEnums } from "simplified-mojang-jsons";

export const BrewAllayEssence = createBPRecipe({
    idRecipe: "ha:brew_allay_essence",
    typeRecipe: TypeRecipesVanillaEnums.RecipeBrewingMix,
    brewingMix: {
        input: "minecraft:potion_type:awkward",
        reagent: "ha:allay_dust",
        output: "ha:allay_essence",
        unlock: [
            {
                item: "ha:allay_dust"
            }
        ]
    }
}) 