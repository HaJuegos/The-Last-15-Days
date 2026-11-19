import { BPBlockComponents, createBPBlock, MoLang } from "simplified-mojang-jsons";

export const DynamiteBlock = createBPBlock({
    idBlock: "ha:dynamite_block",
    menuCategory: {
        category: "construction"
    },
    setTraitsBlock: {
        "minecraft:placement_direction": {
            enabledStates: [
                "minecraft:cardinal_direction"
            ]
        }
    },
    setStatesBlock: {
        "ha:is_on": [false, true]
    },
    permutations: [
        {
            condition: `${MoLang.blockState('minecraft:cardinal_direction')} == 'north'`,
            components: [
                new BPBlockComponents.SetTransformation({
                    rotation: [0, 0, 0]
                })
            ]
        },
        {
            condition: `${MoLang.blockState('minecraft:cardinal_direction')} == 'south'`,
            components: [
                new BPBlockComponents.SetTransformation({
                    rotation: [0, 180, 0]
                })
            ]
        },
        {
            condition: `${MoLang.blockState('minecraft:cardinal_direction')} == 'east'`,
            components: [
                new BPBlockComponents.SetTransformation({
                    rotation: [0, 90, 0]
                })
            ]
        },
        {
            condition: `${MoLang.blockState('minecraft:cardinal_direction')} == 'west'`,
            components: [
                new BPBlockComponents.SetTransformation({
                    rotation: [0, -90, 0]
                })
            ]
        },
        {
            condition: `${MoLang.blockState('ha:is_on')}`,
            components: [
                new BPBlockComponents.SetLightEmission(5),
                new BPBlockComponents.SetMaterialInstances({
                    "*": {
                        texture: "dynamite_on",
                        renderMethod: "alpha_test",
                        ambientOcclusion: 1,
                        faceDimming: true
                    }
                })
            ]
        },
        {
            condition: `!${MoLang.blockState('ha:is_on')}`,
            components: [
                new BPBlockComponents.SetLightEmission(0),
                new BPBlockComponents.SetMaterialInstances({
                    "*": {
                        texture: "dynamite_off",
                        renderMethod: "alpha_test",
                        ambientOcclusion: 1,
                        faceDimming: true
                    }
                })
            ]
        }
    ],
    components: [
        new BPBlockComponents.SetCustomComponent("ha:dynamite_interactions"),

        new BPBlockComponents.SetLoot("loot_tables/empty.json"),
        new BPBlockComponents.SetDisplayName("tile.ha:dynamite_block.name"),
        new BPBlockComponents.SetLiquidDetection({
            detectionRules: [
                {
                    liquidType: "water",
                    canContainLiquid: true,
                    onLiquidTouches: "no_reaction",
                    stopsLiquidFlowingFromDirection: []
                }
            ]
        }),
        new BPBlockComponents.SetMaterialInstances({
            "*": {
                texture: "dynamite_off",
                renderMethod: "alpha_test",
                ambientOcclusion: 1,
                faceDimming: true
            }
        }),
        new BPBlockComponents.SetCollisionBox({
            origin: [-1.1, 0, -1.1],
            size: [2.2, 8, 2.2]
        }),
        new BPBlockComponents.SetSelectionBox({
            origin: [-1.1, 0, -1.1],
            size: [2.2, 8, 2.2]
        }),
        new BPBlockComponents.SetDestructibleByExplosion(true),
        new BPBlockComponents.SetDestructibleByMining(true),
        new BPBlockComponents.SetGeometry("geometry.dynamite.block"),
        new BPBlockComponents.SetLightDampening(0),
        new BPBlockComponents.SetMovable({
            movementType: "push_pull"
        }),
    ]
});