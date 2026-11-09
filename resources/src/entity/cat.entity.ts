import { FormatVersionListEntities, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const CatClientEntity = RPClientEntityTemplates.CatEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        textures: {
            member_cat: "textures/entity/cat/member_cat",
            member_cat_baby: "textures/entity/cat/member_cat_baby"
        }
    }
});