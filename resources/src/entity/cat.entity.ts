import { FormatVersionListEntities, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const CatClientEntity = RPClientEntityTemplates.CatEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        textures: {
            member_cat: "textures/entity/cat/member_cat/adult",
            member_cat_baby: "textures/entity/cat/member_cat/baby",

            tamed_member_cat: "textures/entity/cat/member_cat/tame_adult",
            tamed_member_cat_baby: "textures/entity/cat/member_cat/tame_baby",
        }
    }
});