import { createRPEntityMaterial } from "simplified-mojang-jsons";

export const NewEntityMaterials = createRPEntityMaterial({
    materials: [
        // Raid glow
        {
            idMaterial: "raid_glow",
            idMaterialReference: "entity_alphatest",
            "+defines": [
                "USE_COLOR_MASK"
            ],
            "+states": [
                "DisableCulling",
                "DisableDepthWrite"
            ],
            depthFunc: "Always"
        },
        {
            idMaterial: "raid_base",
            idMaterialReference: "entity_alphatest",
            depthFunc: "LessEqual"
        },

        // Fox changes
        {
            idMaterial: "fox",
            idMaterialReference: "entity_alphatest"
        },
        {
            idMaterial: "mask_fox",
            idMaterialReference: "entity_alphatest",
            "+defines": [
                "USE_COLOR_MASK"
            ],
            "+states": [
                "Blending"
            ],
            depthFunc: "Equal",
            blendSrc: "SourceAlpha",
            blendDst: "OneMinusSrcAlpha"
        },

        // Player Ghost
        {
            idMaterial: "player_ghost",
            idMaterialReference: "entity_alphatest",
            "+states": [
                "Blending",
                "DisableCulling"
            ]
        },

        // Soul Ghast
        {
            idMaterial: "soul_ghast_body",
            idMaterialReference: "entity_alphatest",
        },
        {
            idMaterial: "soul_ghast_brillant",
            idMaterialReference: "entity_emissive_alpha",
        }
    ]
});