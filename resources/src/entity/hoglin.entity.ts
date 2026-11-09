import { FormatVersionListEntities, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const HoglinClientEntity = RPClientEntityTemplates.HoglinEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        textures: {
            new: "textures/entity/hoglin/new_hoglin"
        },
        geometry: {
            new: "geometry.new_hoglin"
        }
    }
});