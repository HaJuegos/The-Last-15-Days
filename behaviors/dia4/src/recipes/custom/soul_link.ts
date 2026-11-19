import { MinecraftItemTypes } from "@minecraft/vanilla-data";
import { createBPRecipe, TypeRecipesVanillaEnums } from "simplified-mojang-jsons";

export const SoulLinkRecipe = createBPRecipe({
    idRecipe: "ha:soul_link_recipe",
    typeRecipe: TypeRecipesVanillaEnums.RecipeShaped,
    shaped: {
        tags: ["crafting_table"],
        pattern: [
            "DDD",
            "DTD",
            "DDD",
        ],
        key: {
            "D": {
                item: "ha:allay_dust"
            },
            "T": {
                item: MinecraftItemTypes.TotemOfUndying
            }
        },
        unlock: [
            {
                item: "ha:allay_dust"
            },
            {
                item: MinecraftItemTypes.TotemOfUndying
            }
        ],
        result: {
            item: "ha:soul_link",
            count: 1
        }
    }
});