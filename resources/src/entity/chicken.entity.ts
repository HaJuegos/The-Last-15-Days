import { RPClientEntityTemplates } from "simplified-mojang-jsons";

export const ChickenClientEntity = RPClientEntityTemplates.ChickenEntity({
    add: {
        materials: {
            skuartu: "entity_alphatest"
        },
        textures: {
            skuartu: "textures/entity/skuartu/skuartu",
            skuartu_baby: "textures/entity/skuartu/baby_skuartu"
        },
        geometry: {
            skuartu: "geometry.skuartu",
            skuartu_baby: "geometry.skuartu.baby"
        }
    }
});