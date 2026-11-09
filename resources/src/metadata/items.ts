import { MetadataGeneratorManager } from "../../utils/MetadataGenerator";

export const ItemsDef = new MetadataGeneratorManager([
    {
        idData: "dynamite_on",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:dynamite_item": "Dinamita Arrojadiza",
                "item.ha:dynamite_item.name": "Dinamita Arrojadiza"
            },
            english: {
                "item.ha:dynamite_item": "Throwing Dynamite",
                "item.ha:dynamite_item.name": "Throwing Dynamite"
            }
        },
        textures: [
            "textures/items/custom/dynamite"
        ]
    },
    {
        idData: "dynamite_off",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:dynamite_off_item": "Dinamita Arrojadiza Apagada",
                "item.ha:dynamite_off_item.name": "Dinamita Arrojadiza Apagada"
            },
            english: {
                "item.ha:dynamite_off_item": "Deactivated Throwing Dynamite",
                "item.ha:dynamite_off_item.name": "Deactivated Throwing Dynamite"
            }
        },
        textures: [
            "textures/items/custom/dynamite_off"
        ]
    },
    {
        idData: "iron_apple",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:iron_apple": "§iManzana de Hierro§r",
                "item.ha:iron_apple.name": "§iManzana de Hierro§r"
            },
            english: {
                "item.ha:iron_apple": "§iIron Apple§r",
                "item.ha:iron_apple.name": "§iIron Apple§r"
            }
        },
        textures: [
            "textures/items/custom/iron_apple"
        ]
    },
    {
        idData: "stone_skull",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:invocation_skull": "§7§lCalavera de Invocación§r",
                "item.ha:invocation_skull.name": "§7§lCalavera de Invocación§r"
            },
            english: {
                "item.ha:invocation_skull": "§7§lInvocation Skull§r",
                "item.ha:invocation_skull.name": "§7§lInvocation Skull§r"
            }
        },
        textures: [
            "textures/items/custom/skull_stone"
        ]
    },
    {
        idData: "invocation_skull",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:stone_skull": "Calavera de Piedra",
                "item.ha:stone_skull.name": "Calavera de Piedra"
            },
            english: {
                "item.ha:stone_skull": "Stone Skull",
                "item.ha:stone_skull.name": "Stone Skull"
            }
        },
        textures: [
            "textures/items/custom/skull_invocation"
        ]
    },
    {
        idData: "soul_fire",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:soul_fire": "§bAlma de Fuego§r",
                "item.ha:soul_fire.name": "§bAlma de Fuego§r"
            },
            english: {
                "item.ha:soul_fire": "§bSoul Fire§r",
                "item.ha:soul_fire.name": "§bSoul Fire§r"
            }
        },
        textures: [
            "textures/items/custom/nether_items/soul_fire"
        ]
    },
    {
        idData: "piglin_mace",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:piglin_mace": "§gMazo de Piglin§r",
                "item.ha:piglin_mace.name": "§gMazo de Piglin§r"
            },
            english: {
                "item.ha:piglin_mace": "§gPiglin Mace§r",
                "item.ha:piglin_mace.name": "§gPiglin Mace§r"
            }
        },
        textures: [
            "textures/items/custom/hammer_piglin"
        ]
    },
    {
        idData: "infernal_crown",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:infernal_crown": "§v§lCorona Infernal§r",
                "item.ha:infernal_crown.name": "§v§lCorona Infernal§r"
            },
            english: {
                "item.ha:infernal_crown": "§v§lInfernal Crown§r",
                "item.ha:infernal_crown.name": "§v§lInfernal Crown§r"
            }
        },
        textures: [
            "textures/items/custom/nether_items/infernal_crown_full"
        ]
    },
    {
        idData: "infernal_crown_off",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:infernal_crown_empty": "§vCorona Infernal Vacía§r",
                "item.ha:infernal_crown_empty.name": "§vCorona Infernal Vacía§r"
            },
            english: {
                "item.ha:infernal_crown_empty": "§vInfernal Crown Empty§r",
                "item.ha:infernal_crown_empty.name": "§vInfernal Crown Empty§r"
            }
        },
        textures: [
            "textures/items/custom/nether_items/infernal_crown_empty"
        ]
    },
    {
        idData: "infernal_gem_blaze",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:infernal_gem_blaze": "§6§lGema Infernal (Blaze)§r",
                "item.ha:infernal_gem_blaze.name": "§6§lGema Infernal (Blaze)§r"
            },
            english: {
                "item.ha:infernal_gem_blaze": "§6§lInfernal Gem (Blaze)§r",
                "item.ha:infernal_gem_blaze.name": "§6§lInfernal Gem (Blaze)§r"
            }
        },
        textures: [
            "textures/items/custom/nether_items/blaze"
        ]
    },
    {
        idData: "infernal_gem_piglin",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:infernal_gem_blaze": "§6§lGema Infernal (Piglin)§r",
                "item.ha:infernal_gem_blaze.name": "§6§lGema Infernal (Piglin)§r"
            },
            english: {
                "item.ha:infernal_gem_blaze": "§6§lInfernal Gem (Piglin)§r",
                "item.ha:infernal_gem_blaze.name": "§6§lInfernal Gem (Piglin)§r"
            }
        },
        textures: [
            "textures/items/custom/nether_items/piglin"
        ]
    },
    {
        idData: "infernal_gem_magma",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:infernal_gem_blaze": "§6§lGema Infernal (MagmaCube)§r",
                "item.ha:infernal_gem_blaze.name": "§6§lGema Infernal (MagmaCube)§r"
            },
            english: {
                "item.ha:infernal_gem_blaze": "§6§lInfernal Gem (MagmaCube)§r",
                "item.ha:infernal_gem_blaze.name": "§6§lInfernal Gem (MagmaCube)§r"
            }
        },
        textures: [
            "textures/items/custom/nether_items/magma"
        ]
    },
    {
        idData: "melted_slime",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:melted_slime": "Slime Derretido",
                "item.ha:melted_slime.name": "Slime Derretido"
            },
            english: {
                "item.ha:melted_slime": "Melted Slime",
                "item.ha:melted_slime.name": "Melted Slime"
            }
        },
        textures: [
            "textures/items/custom/melted_slime"
        ]
    },
    {
        idData: "slime_pearl",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:slime_pearl": "Perla Viscosa",
                "item.ha:slime_pearl.name": "Perla Viscosa"
            },
            english: {
                "item.ha:slime_pearl": "Slime Pearl",
                "item.ha:slime_pearl.name": "Slime Pearl"
            }
        },
        textures: [
            "textures/items/custom/viscous_pearl"
        ]
    },
    {
        idData: "hoglin_fang",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:hoglin_fang": "§n§lColmillo de Hoglin§r",
                "item.ha:hoglin_fang.name": "§n§lColmillo de Hoglin§r"
            },
            english: {
                "item.ha:hoglin_fang": "§n§lHoglin's Fang§r",
                "item.ha:hoglin_fang.name": "§n§lHoglin's Fang§r"
            }
        },
        textures: [
            "textures/items/custom/hoglin_tusk"
        ]
    },
    {
        idData: "surprise_bundle",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:surprise_bundle": "Saco Sorpresa",
                "item.ha:surprise_bundle.name": "Saco Sorpresa"
            },
            english: {
                "item.ha:surprise_bundle": "Surprise Bundle",
                "item.ha:surprise_bundle.name": "Surprise Bundle"
            }
        },
        textures: [
            "textures/items/custom/surprise_bundle"
        ]
    },
    {
        idData: "allay_dust",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:allay_dust": "§bPolvo de Allay§r",
                "item.ha:allay_dust.name": "§bPolvo de Allay§r"
            },
            english: {
                "item.ha:allay_dust": "§bAllay Dust§r",
                "item.ha:allay_dust.name": "§bAllay Dust§r"
            }
        },
        textures: [
            "textures/items/custom/allay_dust"
        ]
    },
    {
        idData: "allay_essence",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:allay_essence": "§b§lEsencia de Allay§r",
                "item.ha:allay_essence.name": "§b§lEsencia de Allay§r"
            },
            english: {
                "item.ha:allay_essence": "§b§lAllay Essence§r",
                "item.ha:allay_essence.name": "§b§lAllay Essence§r"
            }
        },
        textures: [
            "textures/items/custom/allay_essence"
        ]
    },
    {
        idData: "soul_link",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:soul_link": "§s§lUnión de Almas§r",
                "item.ha:soul_link.name": "§s§lUnión de Almas§r"
            },
            english: {
                "item.ha:soul_link": "§s§lSoul Link§r",
                "item.ha:soul_link.name": "§s§lSoul Link§r"
            }
        },
        textures: [
            "textures/items/custom/soul_link"
        ]
    },
    {
        idData: "void_item",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:void_item": "§sVacío§r",
                "item.ha:void_item.name": "§sVacío§r"
            },
            english: {
                "item.ha:void_item": "§sVoid§r",
                "item.ha:void_item.name": "§sVoid§r"
            }
        },
        textures: [
            "textures/items/custom/void_item"
        ]
    },
    {
        idData: "knowledge_book",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:knowledge_book": "§aEnciclopedia§r",
                "item.ha:knowledge_book.name": "§aEnciclopedia§r"
            },
            english: {
                "item.ha:knowledge_book": "§aKnowledge Book§r",
                "item.ha:knowledge_book.name": "§aKnowledge Book§r"
            }
        },
        textures: [
            "textures/items/knowledge_book"
        ]
    },
    {
        idData: "fake_n_helmet",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:fake_netherite_helmet": "Casco de Netherita",
                "item.ha:fake_netherite_helmet.name": "Casco de Netherita"
            },
            english: {
                "item.ha:fake_netherite_helmet": "Netherite Helmet",
                "item.ha:fake_netherite_helmet.name": "Netherite Helmet"
            }
        },
        textures: [
            "textures/items/netherite_helmet"
        ]
    },
    {
        idData: "fake_n_chestplate",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:fake_netherite_chestplate": "Pechera de Netherita",
                "item.ha:fake_netherite_chestplate.name": "Pechera de Netherita"
            },
            english: {
                "item.ha:fake_netherite_chestplate": "Netherite Chestplate",
                "item.ha:fake_netherite_chestplate.name": "Netherite Chestplate"
            }
        },
        textures: [
            "textures/items/netherite_chestplate"
        ]
    },
    {
        idData: "fake_n_leggings",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:fake_netherite_leggings": "Mallas de Netherita",
                "item.ha:fake_netherite_leggings.name": "Mallas de Netherita"
            },
            english: {
                "item.ha:fake_netherite_leggings": "Netherite Leggings",
                "item.ha:fake_netherite_leggings.name": "Netherite Leggings"
            }
        },
        textures: [
            "textures/items/netherite_leggings"
        ]
    },
    {
        idData: "fake_n_boots",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:fake_netherite_boots": "Botas de Netherita",
                "item.ha:fake_netherite_boots.name": "Botas de Netherita"
            },
            english: {
                "item.ha:fake_netherite_boots": "Netherite Boots",
                "item.ha:fake_netherite_boots.name": "Netherite Boots"
            }
        },
        textures: [
            "textures/items/netherite_boots"
        ]
    },
    {
        idData: "cautious_helmet",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:cautious_helmet": "§h§lCasco Cauteloso§r",
                "item.ha:cautious_helmet.name": "§h§lCasco Cauteloso§r"
            },
            english: {
                "item.ha:cautious_helmet": "§h§lCautious Helmet§r",
                "item.ha:cautious_helmet.name": "§h§lCautious Helmet§r"
            }
        },
        textures: [
            "textures/items/custom/cautious_armor/helmet"
        ]
    },
    {
        idData: "cautious_chestplate",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:cautious_chestplate": "§h§lPechera Cautelosa§r",
                "item.ha:cautious_chestplate.name": "§h§lPechera Cautelosa§r"
            },
            english: {
                "item.ha:cautious_chestplate": "§h§lCautious Chestplate§r",
                "item.ha:cautious_chestplate.name": "§h§lCautious Chestplate§r"
            }
        },
        textures: [
            "textures/items/custom/cautious_armor/chestplate"
        ]
    },
    {
        idData: "cautious_leggings",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:cautious_leggings": "§h§lPantalones Cautelosos§r",
                "item.ha:cautious_leggings.name": "§h§lPantalones Cautelosos§r"
            },
            english: {
                "item.ha:cautious_leggings": "§h§lCautious Leggings§r",
                "item.ha:cautious_leggings.name": "§h§lCautious Leggings§r"
            }
        },
        textures: [
            "textures/items/custom/cautious_armor/leggings"
        ]
    },
    {
        idData: "cautious_boots",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:cautious_boots": "§h§lBotas Cautelosas§r",
                "item.ha:cautious_boots.name": "§h§lBotas Cautelosas§r"
            },
            english: {
                "item.ha:cautious_boots": "§h§lCautious Boots§r",
                "item.ha:cautious_boots.name": "§h§lCautious Boots§r"
            }
        },
        textures: [
            "textures/items/custom/cautious_armor/boots"
        ]
    },
    {
        idData: "dragon_disc",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:dragon_disc": "Batalla del Dragon",
                "item.ha:dragon_disc.name": "Batalla del Dragon"
            },
            english: {
                "item.ha:dragon_disc": "Battle of the Dragon",
                "item.ha:dragon_disc.name": "Battle of the Dragon"
            }
        },
        textures: [
            "textures/items/custom/disks_randoms/dragon_disc"
        ]
    },
    {
        idData: "final_disc",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:final_disc": "Musica de Creditos",
                "item.ha:final_disc.name": "Musica de Creditos"
            },
            english: {
                "item.ha:final_disc": "Credits Music",
                "item.ha:final_disc.name": "Credits Music"
            }
        },
        textures: [
            "textures/items/custom/disks_randoms/final_disc"
        ]
    },
    {
        idData: "party_disc",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:party_disc": "Musica movida",
                "item.ha:party_disc.name": "Musica movida"
            },
            english: {
                "item.ha:party_disc": "Upbeat Music",
                "item.ha:party_disc.name": "Upbeat Music"
            }
        },
        textures: [
            "textures/items/custom/disks_randoms/party_disc"
        ]
    },
    {
        idData: "silla_disc",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:silla_disc": "Un remix de una silla",
                "item.ha:silla_disc.name": "Un remix de una silla"
            },
            english: {
                "item.ha:silla_disc": "A Chair Remix",
                "item.ha:silla_disc.name": "A Chair Remix"
            }
        },
        textures: [
            "textures/items/custom/disks_randoms/silla_disc"
        ]
    },
    {
        idData: "banana",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:banana": "Banana",
                "item.ha:banana.name": "Banana"
            },
            english: {
                "item.ha:banana": "Banana",
                "item.ha:banana.name": "Banana"
            }
        },
        textures: [
            "textures/items/custom/banana"
        ]
    },
    {
        idData: "lasagna",
        typeData: "item",
        texts: {
            spanish: {
                "item.ha:lasagna": "Lasaña",
                "item.ha:lasagna.name": "Lasaña"
            },
            english: {
                "item.ha:lasagna": "Lasagna",
                "item.ha:lasagna.name": "Lasagna"
            }
        },
        textures: [
            "textures/items/custom/lasagna"
        ]
    }
]).finalBuild();