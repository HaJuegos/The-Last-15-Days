import { MetadataGeneratorManager } from "../../utils/MetadataGenerator";

export const EntityDefs = new MetadataGeneratorManager([
    {
        idData: "creeper",
        typeData: "entity",
        texts: {
            spanish: {},
            english: {},
        },
        entitySounds: {
            entities: {
                "__molang_version": 13,
                variants: {
                    key: "q.property('ha:creeper_variant')",
                    map: {
                        is_baby: {
                            events: {
                                death: "mob.creeper.death",
                                fuse: {
                                    pitch: 0.50,
                                    sound: "random.fuse",
                                    volume: 1.0
                                },
                                hurt: "mob.creeper.say"
                            },
                            pitch: [0.65, 1],
                            volume: 1.0
                        },
                        is_ninja: {
                            events: {
                                ambient: "",
                                death: "mob.creeper.death",
                                fuse: "",
                                hurt: ""
                            },
                            pitch: [0.80, 1.20],
                            volume: 1.0
                        }
                    }
                },
                events: {
                    death: "mob.creeper.death",
                    fuse: {
                        pitch: 0.50,
                        sound: "random.fuse",
                        volume: 1.0
                    },
                    hurt: "mob.creeper.say"
                },
                pitch: [0.80, 1.20],
                volume: 1.0
            }
        }
    },
    {
        idData: "magma_cube",
        typeData: "entity",
        texts: {
            spanish: {},
            english: {},
        },
        entitySounds: {
            entities: {
                "__molang_version": 13,
                variants: {
                    key: "q.skin_id == 1 ? 'copter' : 'default'",
                    map: {
                        default: {},
                        copter: {
                            events: {
                                "ambient": "mob.magma_copter.fly"
                            },
                            pitch: [0.80, 1.20],
                            volume: 1.0
                        }
                    }
                },
                events: {
                    ambient: "",
                    attack: {
                        pitch: [0.80, 1.20],
                        sound: "mob.attack"
                    },
                    death: "mob.magmacube.small",
                    hurt: "mob.magmacube.small",
                    "squish.big": {
                        pitch: [0.640, 0.960],
                        sound: "mob.magmacube.big"
                    },
                    "squish.small": {
                        pitch: [0.640, 0.960],
                        sound: "mob.magmacube.small"
                    }
                },
                pitch: [0.80, 1.20],
                volume: 1.0
            }
        }
    },

    // Custom
    {
        idData: "ha:player_ghost",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:player_ghost.name": "Fantasma de un Jugador"
            },
            english: {
                "entity.ha:player_ghost.name": "Player Ghost"
            },
        },
        entitySounds: {
            entities: {
                events: {
                    death: "mob.player_ghost.death_sound",
                    reflect: {
                        pitch: 1.0,
                        sound: "mob.breeze.deflect",
                        volume: 1.0
                    }
                },
                pitch: [0.80, 1.20],
                volume: 1.0
            }
        }
    },
    {
        idData: "ha:bomber_pillager",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:bomber_pillager.name": "Saqueador Bombardero",
                "item.spawn_egg.entity.ha:bomber_pillager.name": "Generador de Saqueador Bombardero"
            },
            english: {
                "entity.ha:bomber_pillager.name": "Bomber Pillager",
                "item.spawn_egg.entity.ha:bomber_pillager.name": "Bomber Pillager Spawn Egg"
            },
        },
        entitySounds: {
            entities: {
                events: {
                    ambient: "mob.pillager.idle",
                    "ambient.in.raid": {
                        "pitch": [0.80, 1.20],
                        "sound": "mob.pillager.idle",
                        "volume": 3.0
                    },
                    celebrate: "mob.pillager.celebrate",
                    death: "mob.pillager.death",
                    hurt: "mob.pillager.hurt"
                },
                pitch: [0.80, 1.20],
                volume: 1.0
            }
        }
    },
    {
        idData: "ha:soul_ghast",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:soul_ghast.name": "§3Soul Ghast§r",
                "item.spawn_egg.entity.ha:soul_ghast.name": "Generador de §3Soul Ghast§r"
            },
            english: {
                "entity.ha:soul_ghast.name": "§3Soul Ghast§r",
                "item.spawn_egg.entity.ha:soul_ghast.name": "§3Soul Ghast§r Spawn Egg"
            },
        },
        entitySounds: {
            entities: {
                events: {
                    ambient: "mob.ghast.moan",
                    death: "mob.ghast.death",
                    hurt: "mob.ghast.scream",
                    shoot: {
                        sound: "mob.ghast.fireball",
                        volume: 0.70
                    }
                },
                pitch: [0.2, 0.35],
                volume: 5.0
            }
        }
    },
    {
        idData: "ha:lord_blaze",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:lord_blaze.name": "§pLord Blaze§r",
                "item.spawn_egg.entity.ha:lord_blaze.name": "Generador de §pLord Blaze§r"
            },
            english: {
                "entity.ha:lord_blaze.name": "§pLord Blaze§r",
                "item.spawn_egg.entity.ha:lord_blaze.name": "§pLord Blaze§r Spawn Egg"
            },
        },
        entitySounds: {
            entities: {
                events: {
                    ambient: "mob.blaze.breathe",
                    death: {
                        sound: "mob.blaze.death",
                        pitch: [0.80, 1.20]
                    },
                    hurt: "mob.blaze.hit",
                    shoot: "mob.blaze.shoot"
                },
                pitch: [0.45, 0.55],
                volume: 2.0
            }
        }
    },
    {
        idData: "ha:armorer_piglin",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:armorer_piglin.name": "Piglin Armado",
                "item.spawn_egg.entity.ha:armorer_piglin.name": "Generador de Piglin Bruto Armado"
            },
            english: {
                "entity.ha:armorer_piglin.name": "Armorer Piglin",
                "item.spawn_egg.entity.ha:armorer_piglin.name": "Armorer Piglin Brute Spawn Egg"
            },
        },
        entitySounds: {
            entities: {
                events: {
                    ambient: "mob.piglin_brute.ambient",
                    angry: "mob.piglin_brute.angry",
                    death: "mob.piglin_brute.death",
                    hurt: "mob.piglin_brute.hurt",
                    step: {
                        sound: "mob.piglin_brute.step",
                        volume: 0.350
                    }
                },
                pitch: [0.80, 0.95],
                volume: 1.0
            }
        }
    },
    {
        idData: "ha:socrates_npc",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:socrates_npc.name": "Sócrates, sí, ese mismo."
            },
            english: {
                "entity.ha:socrates_npc.name": "Socrates. Yes, that's right."
            },
        },
        entitySounds: {
            entities: {
                events: {
                    ambient: "mob.villager.idle",
                    death: "mob.villager.death",
                    haggle: "mob.villager.haggle",
                    "haggle.no": "mob.villager.no",
                    "haggle.yes": "mob.villager.yes"
                },
                pitch: [0.80, 1.20],
                volume: 1.0
            }
        }
    },
    {
        idData: "ha:nurse_npc",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:nurse_npc.name": "Enfermera brillante"
            },
            english: {
                "entity.ha:nurse_npc.name": "Shimmered Nurse"
            },
        },
        entitySounds: {
            entities: {
                events: {
                    ambient: "mob.nurse_npc.idle",
                    hurt: "mob.nurse_npc.hurt",
                    death: "mob.nurse_npc.hurt"
                },
                pitch: [0.75, 1],
                volume: 1.0
            }
        }
    },
    {
        idData: "ha:garfield",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:garfield.name": "§v§lLord Garfield§r",
                "item.spawn_egg.entity.ha:garfield.name": "Generador de §v§lLord Garfield§r"
            },
            english: {
                "entity.ha:garfield.name": "§v§lLord Garfield§r",
                "item.spawn_egg.entity.ha:garfield.name": "§v§lLord Garfield§r Spawn Egg"
            },
        },
        entitySounds: {
            entities: {
                variants: {
                    key: "q.skin_id == 0 ? 'normal' : 'angry'",
                    map: {
                        normal: {
                            events: {
                                ambient: "mob.garfield.ambient_normal"
                            },
                            pitch: [0.80, 1.20],
                            volume: 1
                        },
                        angry: {
                            events: {
                                ambient: "mob.garfield.ambient_angry"
                            },
                            pitch: [0.80, 1.20],
                            volume: 1
                        }
                    }
                },
                events: {
                    death: "mob.garfield.death",
                    hurt: "mob.garfield.hit"
                },
                pitch: [0.80, 1.20],
                volume: 1
            }
        }
    },

    // Non-entities
    {
        idData: "ha:soul_fireball",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:soul_fireball.name": "Soul Fireball"
            },
            english: {
                "entity.ha:soul_fireball.name": "Soul Fireball"
            },
        }
    },
    {
        idData: "ha:custom_damage_area",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:custom_damage_area.name": "Una nube tóxica de un Creeper"
            },
            english: {
                "entity.ha:custom_damage_area.name": "A toxic cloud from a Creeper"
            },
        }
    },
    {
        idData: "ender_dragon",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ender_dragon.name": "§g§lRoyerBot§r"
            },
            english: {
                "entity.ender_dragon.name": "§g§lRoyerBot§r"
            },
        }
    },
    {
        idData: "ha:bear_trap",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:bear_trap.name": "Trampa de Oso"
            },
            english: {
                "entity.ha:bear_trap.name": "Bear Trap"
            },
        }
    },
    {
        idData: "ha:spawned_trader_llama",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:spawned_trader_llama.name": "Generador de Llamas del End"
            },
            english: {
                "entity.ha:spawned_trader_llama.name": "End Llama Generator"
            },
        }
    },
    {
        idData: "ha:crystal_llama_generator",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:crystal_llama_generator.name": "Controlador de Debuffos del End"
            },
            english: {
                "entity.ha:crystal_llama_generator.name": "End Debuff Controller"
            },
        }
    },
    {
        idData: "ha:data_world",
        typeData: "entity",
        texts: {
            spanish: {
                "entity.ha:data_world.name": "Datos del Mundo"
            },
            english: {
                "entity.ha:data_world.name": "World Data"
            },
        }
    }
]).finalBuild();