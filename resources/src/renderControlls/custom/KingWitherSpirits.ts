import {createRPRenderController, MoLang} from "simplified-mojang-jsons";

const spiritVariants: { color: string, variant: number; }[] = [
    { color: "red", variant: 1 },
    { color: "blue", variant: 2 },
    { color: "orange", variant: 3 },
    { color: "yellow", variant: 4 },
];

export const [
    RedSpiritKingWither,
    BlueSpiritKingWither,
    OrangeSpiritKingWither,
    YellowSpiritKingWither,
] = spiritVariants.map(({ color, variant }) => createRPRenderController({
    renderControllers: [
        {
            idRender: `king_wither.spirit_${color}`,
            arrays: {
                materials: {
                    "Array.materials": [
                        "Material.spirit_normal",
                        "Material.spirit_trans",
                    ],
                },
                textures: {
                    "Array.skins": [
                        `Texture.spirit_${color}`,
                        `Texture.spirit_${color}_trans`,
                    ],
                },
            },
            geometry: `Geometry.spirit_${color}`,
            materials: [
                {
                    "*": `Array.materials[${MoLang.variant()} == ${variant} ? 0 : ${MoLang.variant()} == 0 ? 0 : 1]`,
                },
            ],
            textures: [
                `Array.skins[${MoLang.variant()} == ${variant} ? 0 : ${MoLang.variant()} == 0 ? 0 : 1]`,
            ],
            isHurtColor: { r: 0, g: 0, b: 0, a: 0 },
            onFireColor: { r: 0, g: 0, b: 0, a: 0 },
            ignoreLighting: true,
        },
    ],
}));