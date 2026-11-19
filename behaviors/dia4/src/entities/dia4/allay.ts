import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const AllayEntity = BPEntityTemplates.AllayTemplate({
    add: {
        componentsGroups: {
            "ha:drop_dust": [
                new BPEntityComponents.SetLoot({
                    table: "loot_tables/entities/custom/allay_dust_drop.json"
                })
            ]
        },
        components: [
            new BPEntityComponents.SetEnvironmentSensor({
                triggers: [
                    {
                        filters: EntityFilters.onFire(),
                        event: "ha:set_fire_drop",
                        target: "self"
                    },
                    {
                        filters: EntityFilters.onFire(false),
                        event: "ha:remove_fire_drop",
                        target: "self"
                    }
                ]
            })
        ],
        events: {
            "ha:set_fire_drop": {
                add: {
                    componentGroups: [
                        "ha:drop_dust"
                    ]
                }
            },
            "ha:remove_fire_drop": {
                remove: {
                    componentGroups: [
                        "ha:drop_dust"
                    ]
                }
            }
        }
    }
});