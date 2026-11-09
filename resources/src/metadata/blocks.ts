import { MetadataGeneratorManager } from "../../utils/MetadataGenerator";

export const BlockDefs = new MetadataGeneratorManager([
    {
        idData: "ha:dynamite_block",
        typeData: "block",
        texts: {
            spanish: {
                "tile.ha:dynamite_block.name": "Bloque de Dinamita Lanzable"
            },
            english: {
                "tile.ha:dynamite_block.name": "Throwable Dynamite Block"
            }
        },
        sound: "grass",
        terrainTextures: {
            "dynamite_off": {
                textures: [
                    "textures/entity/dynamite_off"
                ]
            },
            "dynamite_on": {
                textures: [
                    "textures/entity/dynamite"
                ]
            }
        },
        textures: {}
    },
    {
        idData: "ha:toxic_puddle",
        typeData: "block",
        texts: {
            spanish: {
                "tile.ha:toxic_puddle.name": "Charco Tóxico"
            },
            english: {
                "tile.ha:toxic_puddle.name": "Toxic Puddle"
            }
        },
        sound: "slime",
        terrainTextures: {
            "toxic_puddle": {
                textures: [
                    "textures/blocks/custom/acid_pool"
                ]
            }
        },
        textures: {}
    },
    {
        idData: "ha:generator_mobs_nurse",
        typeData: "block",
        texts: {
            spanish: {
                "tile.ha:generator_mobs_nurse.name": "Generador de Mobs del End"
            },
            english: {
                "tile.ha:generator_mobs_nurse.name": "End Mob Generator"
            }
        },
        sound: "stone",
        terrainTextures: {},
        textures: {}
    }
]).finalBuild();