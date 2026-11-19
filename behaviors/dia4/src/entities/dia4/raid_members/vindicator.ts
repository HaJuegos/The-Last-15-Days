import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const VindicatorEntity = BPEntityTemplates.VindicatorTemplate({
    properties: {
        "ha:is_glow": {
            type: "bool",
            clientSync: true,
            default: false
        }
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
        ],
        events: {
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