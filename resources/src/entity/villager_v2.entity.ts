import { FormatVersionListEntities, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const VillagerV2ClientEntity = RPClientEntityTemplates.VillagerV2Entity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        textures: {
            base_villager_dark: "textures/entity/villager2/villager_dark",
            base_villager_middark: "textures/entity/villager2/villager_middark",
            base_villager_light: "textures/entity/villager2/villager_light",
            base_villager_midlight: "textures/entity/villager2/villager_midlight",

            base_baby_villager_dark: "textures/entity/villager2/villager_baby_dark",
            base_baby_villager_middark: "textures/entity/villager2/villager_baby_middark",
            base_baby_villager_light: "textures/entity/villager2/villager_baby_light",
            base_baby_villager_midlight: "textures/entity/villager2/villager_baby_midlight"
        }
    }
});