import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const MainPlyEntity = BPEntityTemplates.PlayerTemplate({
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
                }
            ]
        })
    },
    add: {
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