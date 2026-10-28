import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const NpcChanges = BPEntityTemplates.NpcTemplate({
    add: {
        componentsGroups: {
            "ha:set_tick": [
                new BPEntityComponents.SetSkinId({
                    value: 1
                }),
                new BPEntityComponents.SetTickWorld({
                    neverDespawn: true,
                    radius: 4
                })
            ],
            "ha:self_explode": [
                new BPEntityComponents.SetExplode({
                    power: 5,
                    fuseLength: [0, 0],
                    fuseLit: true,
                    allowUnderwater: true,
                    breaksBlocks: true,
                    causesFire: true,
                    destroyAffectedByGriefing: true,
                    fireAffectedByGriefing: true,
                    knockbackScaling: 3,
                    togglesBlocks: true
                })
            ]
        },
        components: [
            new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.allOf(
                            EntityFilters.isSkinId(1),
                            EntityFilters.hasComponent('minecraft:tick_world', 'self', 'not')
                        ),
                        target: "self",
                        event: "ha:set_tick"
                    }
                ]
            })
        ],
        events: {
            "minecraft:entity_spawned": {},
            "ha:set_tick": {
                add: {
                    componentGroups: [
                        "ha:set_tick"
                    ]
                }
            },
            "ha:explode": {
                add: {
                    componentGroups: [
                        "ha:self_explode"
                    ]
                }
            }
        }
    }
});