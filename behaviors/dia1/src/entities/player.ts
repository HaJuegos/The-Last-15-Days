import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const MainPlyEntity = BPEntityTemplates.PlayerTemplate({
    properties: {
        "ha:damage_biome": {
            type: "enum",
            clientSync: true,
            default: "none",
            values: [
                "cold",
                "warm",
                "none",
            ]
        },
        "ha:start_damage_biome": {
            type: "bool",
            clientSync: true,
            default: false
        }
    },
    animations: {
        "spawn_system": {
            idAnimation: "controller.animation.player.spawned_day"
        }
    },
    components: {
        "minecraft:environment_sensor": new BPEntityComponents.SetEnvironmentSensor({
            triggers: [
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.hasMobEffect('bad_omen'),
                        EntityFilters.isInVillage()
                    ),
                    event: "minecraft:gain_raid_omen"
                },

                // Para el sensor de dormir
                {
                    filters: EntityFilters.isSleeping(),
                    event: "ha:player_in_bed",
                    target: "self"
                },
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.isSleeping(false),
                        EntityFilters.hasTag('inBed')
                    ),
                    event: "ha:player_off_bed",
                    target: "self"
                },

                // Sensor de temperatura
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.enumProperty('ha:damage_biome', 'none'),
                        EntityFilters.anyOf(
                            EntityFilters.isTemperatureType('cold'),
                            EntityFilters.isTemperatureType('ocean')
                        ),
                    ),
                    event: "ha:start_cooldown_biome_damage_cold",
                    target: "self"
                },
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.enumProperty('ha:damage_biome', 'none'),
                        EntityFilters.anyOf(
                            EntityFilters.isTemperatureType('warm'),
                        ),
                    ),
                    event: "ha:start_cooldown_biome_damage_fire",
                    target: "self"
                },
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.enumProperty('ha:damage_biome', 'none', 'self', '!='),
                        EntityFilters.noneOf(
                            EntityFilters.isTemperatureType('cold'),
                            EntityFilters.isTemperatureType('ocean'),
                            EntityFilters.isTemperatureType('warm'),
                        )
                    ),
                    event: "ha:remove_biome_damage",
                    target: "self"
                }
            ]
        })
    },
    add: {
        componentsGroups: {
            "ha:start_biome_damage_cooldown": [
                new BPEntityComponents.SetTimer({
                    time: 300,
                    looping: false,
                    timeDownEvent: {
                        event: "ha:start_damage_biome",
                        target: "self"
                    }
                })
            ]
        },
        components: [
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        cause: "block_explosion",
                        dealsDamage: "yes",
                        damageMultiplier: 2.0
                    },
                    {
                        cause: "entity_explosion",
                        dealsDamage: "yes",
                        damageMultiplier: 2.0
                    }
                ]
            })
        ],
        events: {
            "minecraft:entity_spawned": {},


            "ha:start_cooldown_biome_damage_cold": {
                setProperty: {
                    "ha:damage_biome": "cold"
                },
                add: {
                    componentGroups: [
                        "ha:start_biome_damage_cooldown"
                    ]
                }
            },
            "ha:start_cooldown_biome_damage_fire": {
                setProperty: {
                    "ha:damage_biome": "warm"
                },
                add: {
                    componentGroups: [
                        "ha:start_biome_damage_cooldown"
                    ]
                }
            },

            "ha:start_damage_biome": {
                setProperty: {
                    "ha:start_damage_biome": true
                },
                queueCommand: {
                    command: [
                        "function damage_biome"
                    ]
                },
                remove: {
                    componentGroups: [
                        "ha:start_biome_damage_cooldown"
                    ]
                }
            },
            "ha:remove_biome_damage": {
                setProperty: {
                    "ha:start_damage_biome": false,
                    "ha:damage_biome": "none"
                },
                remove: {
                    componentGroups: [
                        "ha:start_biome_damage_cooldown"
                    ]
                }
            },

            "ha:player_in_bed": {
                queueCommand: {
                    command: [
                        "function system/sleeping_events"
                    ]
                }
            },
            "ha:player_off_bed": {
                queueCommand: {
                    command: [
                        "tag @s remove inBed"
                    ]
                }
            }
        }
    }
});