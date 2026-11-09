import { MetadataGeneratorManager } from "../../utils/MetadataGenerator";

export const SoundsDefs = new MetadataGeneratorManager([
    {
        idData: "credits.click.ha",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.click_btn_ha": "§6Clic en el botón de Ha en los créditos§r"
            },
            english: {
                "ui.subtitle_custom.click_btn_ha": "§6Click the Ha button in the credits§r"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                name: "sounds/ui/miau",
                stream: false,
                volume: 3.0,
                pitch: 1
            }
        ]
    },
    {
        idData: "credits.click.astral",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.click_btn_astral": "§dClic en el botón de Astral en los créditos§r"
            },
            english: {
                "ui.subtitle_custom.click_btn_astral": "§dClick the Astral button in the credits§r"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                name: "sounds/ui/pipe_sound",
                stream: false,
                volume: 0.35,
                pitch: 1
            }
        ]
    },
    {
        idData: "credits.click.royer",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.click_btn_royer": "§eClic en el botón de Royer en los créditos§r"
            },
            english: {
                "ui.subtitle_custom.click_btn_royer": "§eClick the Royer button in the credits§r"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                name: "sounds/ui/advancements/normal",
                volume: 3.0,
                stream: false,
                pitch: 1
            }
        ]
    },

    {
        idData: "ui.advancements.normal",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.get_normal_advancement": "Se obtiene un logro"
            },
            english: {
                "ui.subtitle_custom.get_normal_advancement": "Got an achievement"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ui/advancements/normal",
                volume: 3.0,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.advancements.rare",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.get_rare_advancement": "Se obtiene un logro raro"
            },
            english: {
                "ui.subtitle_custom.get_rare_advancement": "Got an rare achievement"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ui/advancements/challenge",
                volume: 0.85,
                pitch: 1
            }
        ]
    },

    {
        idData: "ui.login_first_time",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.intro_sound": "¡Bienvenido!"
            },
            english: {
                "ui.subtitle_custom.intro_sound": "Welcome!"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                name: "sounds/ui/intro_sound",
                stream: false,
                volume: 1.0,
                pitch: 1.0
            }
        ]
    },
    {
        idData: "ui.player.death_sound",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.game_over": "§c¡Fin del juego!§r"
            },
            english: {
                "ui.subtitle_custom.game_over": "§cGame Over!§r"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ui/death_sounds/player_death",
                volume: 4.5,
                pitch: 1.0
            }
        ]
    },
    {
        idData: "ui.player.death_sound_global",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.death_ply": "§cUn jugador ha muerto§r"
            },
            english: {
                "ui.subtitle_custom.death_ply": "§cA player just died§r"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/ui/death_sounds/player_death_global",
                volume: 0.75,
                pitch: 1.0
            }
        ]
    },
    {
        idData: "ui.error_sound",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.no_perms": "No puedes hacer eso"
            },
            english: {
                "ui.subtitle_custom.no_perms": "You can't do that yet"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ui/errorsound",
                volume: 2,
                pitch: 1.0
            }
        ]
    },
    {
        idData: "ui.get_debuff.wither",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.get_wither_debuff": "Obtienes un debuff de un King Wither"
            },
            english: {
                "ui.subtitle_custom.get_wither_debuff": "You got a debuff from King Wither."
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/mob/king_wither/get_debuff",
                volume: 1,
                pitch: 1.0
            }
        ]
    },
    {
        idData: "ui.error_item",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.no_perms_item": "No puedes usar este ítem"
            },
            english: {
                "ui.subtitle_custom.no_perms_item": "You can't use this item."
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ui/error_item",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.abyss_attack.start",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.abyss_attack": "Recibiste un debuff malo"
            },
            english: {
                "ui.subtitle_custom.abyss_attack": "You got a nasty debuff"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ui/abyss_sounds/attack",
                volume: 2,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.abyss_attack.text_desc",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.abyss_desc": "Explicación del debuff"
            },
            english: {
                "ui.subtitle_custom.abyss_desc": "Debuff explanation"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                weight: 1,
                is3D: false,
                stream: false,
                name: "sounds/ui/abyss_sounds/text_desc1",
                volume: 2,
                pitch: 1
            },
            {
                loadOnLowMemory: true,
                weight: 1,
                is3D: false,
                stream: false,
                name: "sounds/ui/abyss_sounds/text_desc2",
                volume: 2,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.dragon_attack_nausea.start",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.ambient_dragon_attack.nausea": "§2Inicia el ataque de Nauseas§r"
            },
            english: {
                "ui.subtitle_custom.ambient_dragon_attack.nausea": "§2Nauseas' attack begins§r"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ambient/nausea_attack_started",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.dragon_attack_conduit.start",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.ambient_dragon_attack.conduit": "§bInicia el ataque del Conduit§r"
            },
            english: {
                "ui.subtitle_custom.ambient_dragon_attack.conduit": "§bThe Conduit's attack begins§r"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: false,
                name: "sounds/ambient/conduit_attack_started",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.dragon_attack.damage_nausea",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.ambient_dragon_attack.nausea.damaged": "§cNo te agachaste esta vez§r"
            },
            english: {
                "ui.subtitle_custom.ambient_dragon_attack.nausea.damaged": "§cYou didn't bend down this time§r"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/mob/player_ghost/rare_death",
                volume: 1.25,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.pickupthephone",
        typeData: "sound",
        category: "ui",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {},
            english: {}
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/ui/pickupthephone",
                volume: 1,
                pitch: 1
            }
        ]
    },

    {
        idData: "ui.slime_pearl.hit",
        typeData: "sound",
        __use_legacy_max_distance: "true",
        category: "player",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.slime_pearl_used": "Se ha usado una Slime Pearl"
            },
            english: {
                "ui.subtitle_custom.slime_pearl_used": "Slime Pearl has been used."
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ui/slimepearl",
                volume: 2,
                pitch: 1.0
            }
        ]
    },
    {
        idData: "ui.soul_linked_used",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "player",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.soul_linked": "§3Vinculación de almas correcta§r"
            },
            english: {
                "ui.subtitle_custom.soul_linked": "§3Soul Link done right§r"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ui/soul_linked",
                volume: 2,
                pitch: 1
            }
        ]
    },
    {
        idData: "ui.banana_eated",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "player",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.player_eat_banana": "A alguien le gusta la banana"
            },
            english: {
                "ui.subtitle_custom.player_eat_banana": "Someone likes bananas"
            }
        },
        sounds: [
            {
                allowConcurrentStreaming: true,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ui/banana_sound",
                volume: 1,
                pitch: 1
            }
        ]
    },

    {
        idData: "mob.player_ghost.death_sound",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "neutral",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.player_ghost_death": "Un fantasma de jugador ha muerto"
            },
            english: {
                "ui.subtitle_custom.player_ghost_death": "A player's ghost just died"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/player_ghost/ded",
                stream: false,
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.nurse_npc.idle",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "neutral",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.nurse_npc.idle": "Una enfermera brillante quejándose"
            },
            english: {
                "ui.subtitle_custom.nurse_npc.idle": "A Shimmered Nurse complaining"
            }
        },
        sounds: [
            {
                weight: 90,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/idle_v1",
                stream: false,
                volume: 1,
                pitch: 1
            },
            {
                weight: 90,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/idle_v2",
                stream: false,
                volume: 1,
                pitch: 1
            },
            {
                weight: 90,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/idle_v3",
                stream: false,
                volume: 1,
                pitch: 1
            },
            {
                weight: 10,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/idle_v4",
                stream: false,
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.nurse_npc.hurt",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "neutral",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.nurse_npc.hurt": "Una enfermera brillante siendo lastimada"
            },
            english: {
                "ui.subtitle_custom.nurse_npc.hurt": "A Shimmered Nurse getting hurt"
            }
        },
        sounds: [
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/death_v1",
                stream: false,
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/death_v2",
                stream: false,
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/nurse_npc/death_v3",
                stream: false,
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.nurse_npc.purchased",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "neutral",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.nurse_npc.purchased": "Alguien le compró a una enfermera brillante"
            },
            english: {
                "ui.subtitle_custom.nurse_npc.purchased": "Someone bought something for a Shimmered Nurse"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/purched_nurse",
                stream: false,
                volume: 1,
                pitch: 1
            }
        ]
    },

    {
        idData: "mob.soul_ghast.charge_and_shot",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 50,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.soul_ghast_charging": "Soul Ghast cargando su ataque"
            },
            english: {
                "ui.subtitle_custom.soul_ghast_charging": "Soul Ghast is charging its attack"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/soul_ghast/laser_start_change",
                stream: false,
                volume: 0.95,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.lord_piglin.start_gem",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.lord_piglin_gem": "Habilidad de Lord Piglin ejecutada"
            },
            english: {
                "ui.subtitle_custom.lord_piglin_gem": "Lord Piglin skill activated"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/piglin/start_gem",
                stream: false,
                volume: 2,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.piglin.get_armor",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.piglin_get_armor": "Un piglin ha cambiado de armadura"
            },
            english: {
                "ui.subtitle_custom.piglin_get_armor": "A piglin swapped armor"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/piglin/start_gem",
                stream: false,
                volume: 0.65,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.magma_copter.fly",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.magmacopter_start": "Un MagmaCopter está volando"
            },
            english: {
                "ui.subtitle_custom.magmacopter_start": "A MagmaCopter is flying"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/magma_copter/copter_start",
                stream: false,
                volume: 1.35,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.king_wither.start_spirit",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 65,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.wither_king_start": "King Wither ha cambiado de habilidad"
            },
            english: {
                "ui.subtitle_custom.wither_king_start": "King Wither switched ability"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/king_wither/start_spirit",
                stream: false,
                volume: 1.5,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.start_exploding.sound",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.mob_explodes": "Un mob a explotado"
            },
            english: {
                "ui.subtitle_custom.mob_explodes": "A mob is about to explode"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/king_wither/start_spirit",
                stream: false,
                volume: 3,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.betray_tamed.start",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 30,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.mob_betray": "Un mob domesticado ha cambiado"
            },
            english: {
                "ui.subtitle_custom.mob_betray": "A tamed mob just turned"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                name: "sounds/mob/betray_tamed",
                stream: false,
                volume: 1.55,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.cat.start_summon",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 25,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.mob_summon_attack": "Un mob ha generado otros mobs"
            },
            english: {
                "ui.subtitle_custom.mob_summon_attack": "A mob spawned more mobs"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ui/summon_mob",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.bear_trap.start_attack",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.bear_trap.attacks": "Una trampa de oso ataca"
            },
            english: {
                "ui.subtitle_custom.bear_trap.attacks": "A bear trap strikes"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/bear_trap/start_trap",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.dynamite.parried",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.tnt_parried": "Una dinamita fue desviada por un jugador"
            },
            english: {
                "ui.subtitle_custom.tnt_parried": "A dynamite was deflected by a player"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ambient/parry",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.ambient_normal",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.neutral_meow": "Maullido de Garfield"
            },
            english: {
                "ui.subtitle_custom.garfield.neutral_meow": "Garfield's meow"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/ambient_idle",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.ambient_angry",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.angry_meow": "Maullido furioso de Garfield"
            },
            english: {
                "ui.subtitle_custom.garfield.angry_meow": "Garfield's angry meow"
            }
        },
        sounds: [
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/ambient_idle",
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/random_dialogs/random1",
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/random_dialogs/random2",
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/random_dialogs/random3",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.hit",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.damage": "Garfield siendo atacado"
            },
            english: {
                "ui.subtitle_custom.garfield.damage": "Garfield is being attacked"
            }
        },
        sounds: [
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/damage_sounds/hit1",
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/damage_sounds/hit2",
                volume: 1,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/damage_sounds/hit3",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.death",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.death": "Garfield ha muerto"
            },
            english: {
                "ui.subtitle_custom.garfield.death": "Garfield has died"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/damage_sounds/death1",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.pre-dialog.dialog1",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 100,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield está dando una advertencia"
            },
            english: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield is issuing a warning"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/pre_dialogs/dialogue_1",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.pre-dialog.dialog2",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 100,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield está dando una advertencia"
            },
            english: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield is issuing a warning"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/pre_dialogs/dialogue_2",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.pre-dialog.dialog3",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 100,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield está dando una advertencia"
            },
            english: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield is issuing a warning"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/pre_dialogs/dialogue_3",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.pre-dialog.dialog4",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 100,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield está dando una advertencia"
            },
            english: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield is issuing a warning"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/pre_dialogs/dialogue_4",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.pre-dialog.dialog5",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 100,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield está dando una advertencia"
            },
            english: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield is issuing a warning"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/pre_dialogs/dialogue_5",
                volume: 1,
                pitch: 1
            }
        ]
    },
    {
        idData: "mob.garfield.pre-dialog.dialogfinal",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "hostile",
        minDistance: null,
        maxDistance: 100,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield está dando una advertencia"
            },
            english: {
                "ui.subtitle_custom.garfield.pre-dialog": "Garfield is issuing a warning"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/mob/garfield/pre_dialogs/dialogue_final",
                volume: 1,
                pitch: 1
            }
        ]
    },

    {
        idData: "record.athazagoraphobia.dragon_fight",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "record",
        minDistance: null,
        maxDistance: 64.0,
        subtitle: {
            spanish: {
                "ui.music_start.dragon_fight": "Música del dragón sonando"
            },
            english: {
                "ui.music_start.dragon_fight": "Dragon music playing"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: true,
                name: "sounds/music/athazagoraphobia",
                volume: 1,
                pitch: 1,
            }
        ]
    },
    {
        idData: "record.final_music",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "record",
        minDistance: null,
        maxDistance: 64.0,
        subtitle: {
            spanish: {
                "ui.music_start.final_music": "Música de los créditos sonando"
            },
            english: {
                "ui.music_start.final_music": "Credits music playing"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: true,
                name: "sounds/music/goodbye_music",
                volume: 1,
                pitch: 1,
            }
        ]
    },
    {
        idData: "record.party_starts",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "record",
        minDistance: null,
        maxDistance: 64.0,
        subtitle: {
            spanish: {
                "ui.music_start.party_starts": "Música de fiesta sonando"
            },
            english: {
                "ui.music_start.party_starts": "Party music playing"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: true,
                name: "sounds/music/omg",
                volume: 1,
                pitch: 1,
            }
        ]
    },
    {
        idData: "record.remix_de_una_silla",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "record",
        minDistance: null,
        maxDistance: 64.0,
        subtitle: {
            spanish: {
                "ui.music_start.remix_de_una_silla": "¡¡¡REMIX DE UNA SILLA!?!?!?"
            },
            english: {
                "ui.music_start.remix_de_una_silla": "A CHAIR REMIX!?!?!?"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: true,
                name: "sounds/music/remix_de_una_silla",
                volume: 1,
                pitch: 1,
            }
        ]
    },

    {
        idData: "music.garfield_boss",
        typeData: "sound",
        category: "music",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.music_start.garfield_boss": "§eLord Garfield has appeared§r"
            },
            english: {
                "ui.music_start.garfield_boss": "§eLord Garfield has appeared§r"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/mob/garfield/ambient_boss",
                volume: 0.75,
                pitch: 1
            }
        ]
    },
    {
        idData: "music.athazagoraphobia.dragon_fight",
        typeData: "sound",
        category: "music",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.music_start.dragon_fight": "Música del dragón sonando"
            },
            english: {
                "ui.music_start.dragon_fight": "Dragon music playing"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/music/athazagoraphobia",
                volume: 0.75,
                pitch: 1
            }
        ]
    },
    {
        idData: "music.game.end",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "music",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {},
            english: {}
        },
        sounds: [
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/music/game/end/end",
                volume: 0.20,
                pitch: 1
            },
            {
                weight: 1,
                loadOnLowMemory: true,
                is3D: false,
                stream: true,
                name: "sounds/music/end_ambient",
                volume: 0.20,
                pitch: 1
            }
        ]
    },

    {
        idData: "ambient.respawned_ply",
        typeData: "sound",
        category: "player",
        "__use_legacy_max_distance": "true",
        minDistance: null,
        maxDistance: 45,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.ply_respawned_soul": "Un jugador ha revivido"
            },
            english: {
                "ui.subtitle_custom.ply_respawned_soul": "A player respawned"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ambient/respawned_player",
                volume: 2,
                pitch: 1
            }
        ]
    },
    {
        idData: "ambient.soul_link",
        typeData: "sound",
        category: "player",
        "__use_legacy_max_distance": "true",
        minDistance: null,
        maxDistance: null,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.ambient_soullink": "§4Elige a tu víctima§r"
            },
            english: {
                "ui.subtitle_custom.ambient_soullink": "§4Pick your victim§r"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ambient/choose_soullink",
                volume: 0.76,
                pitch: 1
            }
        ]
    },
    {
        idData: "ambient.reveal_raid",
        typeData: "sound",
        category: "player",
        "__use_legacy_max_distance": "true",
        minDistance: null,
        maxDistance: 50,
        subtitle: {
            spanish: {
                "ui.subtitle_custom.raid_reveal": "§4Elige a tu víctima§r"
            },
            english: {
                "ui.subtitle_custom.raid_reveal": "§4Pick your victim§r"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                is3D: true,
                stream: false,
                name: "sounds/ambient/reveal_raid",
                volume: 3,
                pitch: 1
            }
        ]
    },
    {
        idData: "ambient.weather.rain",
        typeData: "sound",
        "__use_legacy_max_distance": "true",
        category: "weather",
        minDistance: 100.0,
        maxDistance: null,
        subtitle: {
            spanish: {
                "subtitles.weather.rain": "La lluvia cae"
            },
            english: {
                "subtitles.weather.rain": "Rain falls"
            }
        },
        sounds: [
            {
                loadOnLowMemory: true,
                name: "sounds/ambient/weather/rain1",
                is3D: false,
                stream: false,
                volume: 0.001,
                pitch: 1
            },
            {
                loadOnLowMemory: true,
                name: "sounds/ambient/weather/rain2",
                is3D: false,
                stream: false,
                volume: 0.001,
                pitch: 1
            },
            {
                loadOnLowMemory: true,
                name: "sounds/ambient/weather/rain3",
                is3D: false,
                stream: false,
                volume: 0.001,
                pitch: 1
            },
            {
                loadOnLowMemory: true,
                name: "sounds/ambient/weather/rain4",
                is3D: false,
                stream: false,
                volume: 0.001,
                pitch: 1
            }
        ]
    }
]).finalBuild();