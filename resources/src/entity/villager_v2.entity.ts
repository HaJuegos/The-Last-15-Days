import { FormatVersionListEntities, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const VillagerV2ClientEntity = RPClientEntityTemplates.VillagerV2Entity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        textures: {
            base_villager_dark: "textures/entity/villager2/villager_dark",
            base_villager_biracial_dark: "textures/entity/villager2/villager_biracial_dark",
            base_villager_light: "textures/entity/villager2/villager_dark",
            base_villager_biracial_light: "textures/entity/villager2/villager_light"
        }
    }
});