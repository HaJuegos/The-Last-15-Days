import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const WitchEntity = BPEntityTemplates.WitchTemplate({
    properties: {
        "ha:is_glow": {
            type: "bool",
            clientSync: true,
            default: false
        }
    },
    components: {
        "minecraft:shooter": new BPEntityComponents.SetShooter({
            magic: true,
            sound: "throw",
            power: 0.75,
            projectiles: [
                {
                    auxVal: 21, // healing
                    def: "minecraft:splash_potion",
                    filters: EntityFilters.allOf(
                        EntityFilters.isRaider(true, 'other'),
                        EntityFilters.actorHealth(4, 'other', '<='),
                    ),
                    loseTarget: true
                },
                {
                    auxVal: 28, // regeneration
                    def: "minecraft:splash_potion",
                    filters: EntityFilters.allOf(
                        EntityFilters.isRaider(true, 'other'),
                        EntityFilters.noneOf(
                            EntityFilters.hasMobEffect('regeneration', 'other')
                        )
                    ),
                    loseTarget: true
                },
                {
                    auxVal: 7, // invisibility
                    def: "minecraft:splash_potion",
                    filters: EntityFilters.allOf(
                        EntityFilters.isRaider(true, 'other'),
                        EntityFilters.noneOf(
                            EntityFilters.hasMobEffect('invisibility', 'other')
                        )
                    ),
                    loseTarget: true
                },
                {
                    auxVal: 17, // slowness
                    def: "minecraft:splash_potion",
                    filters: EntityFilters.allOf(
                        EntityFilters.targetDistance(8, 'self', '>='),
                        EntityFilters.noneOf(
                            EntityFilters.hasMobEffect('slowness', 'other')
                        )
                    )
                },
                {
                    auxVal: 25, // poison
                    def: "minecraft:splash_potion",
                    filters: EntityFilters.allOf(
                        EntityFilters.targetDistance(8, 'self', '>='),
                        EntityFilters.noneOf(
                            EntityFilters.hasMobEffect('poison', 'other')
                        )
                    )
                },
                {
                    auxVal: 34, // weakness
                    chance: 0.25,
                    def: "minecraft:splash_potion",
                    filters: EntityFilters.allOf(
                        EntityFilters.targetDistance(3, 'self', '<='),
                        EntityFilters.noneOf(
                            EntityFilters.hasMobEffect('weakness', 'other')
                        )
                    )
                },
                {
                    auxVal: 23, // harming
                    def: "minecraft:splash_potion"
                }
            ]
        })
    },
    add: {
        componentsGroups: {
            "ha:timer_glowing": [
                new BPEntityComponents.SetBehaviorTimerFlagOne({
                    priority: 0,
                    cooldownRange: {
                        min: 0,
                        max: 0
                    },
                    durationRange: {
                        min: 10,
                        max: 10
                    },
                    onEnd: {
                        event: "ha:remove_glow",
                        target: "self"
                    }
                })
            ],

            "ha:teleport": [
                new BPEntityComponents.SetTeleport({
                    randomTeleports: true,
                    maxRandomTeleportTime: 30,
                    randomTeleportCube: [10, 30, 10],
                    targetDistance: 5,
                    targetTeleportChance: 1,
                    lightTeleportChance: 0.05,
                    teleportsOnProjectileHit: false
                })
            ]
        },
        components: [
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        onDamage: {
                            filters: EntityFilters.isFamily('bomber_pillager', 'other')
                        },
                        cause: "all",
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                entityTypes: [
                    {
                        filters: EntityFilters.noneOf(
                            EntityFilters.isFamily('illager', 'other'),
                            EntityFilters.isFamily('witch', 'other')
                        )
                    }
                ]
            }),
            new BPEntityComponents.SetSpellEffects({
                addEffects: [
                    {
                        effect: "invisibility",
                        duration: "infinite",
                        amplifier: 0,
                        visible: true,
                        ambient: false
                    }
                ]
            })
        ],
        events: {
            "minecraft:entity_spawned": {
                add: {
                    componentGroups: [
                        "ha:teleport"
                    ]
                }
            },
            "minecraft:spawn_for_raid": {
                remove: {
                    componentGroups: [
                        "ha:teleport"
                    ]
                }
            },

            "ha:set_glow": {
                setProperty: {
                    "ha:is_glow": true
                },
                add: {
                    componentGroups: [
                        "ha:timer_glowing"
                    ]
                }
            },
            "ha:remove_glow": {
                setProperty: {
                    "ha:is_glow": false
                },
                remove: {
                    componentGroups: [
                        "ha:timer_glowing"
                    ]
                }
            },
        }
    }
});