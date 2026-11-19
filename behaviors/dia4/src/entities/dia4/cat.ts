import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const CatEntity = BPEntityTemplates.CatTemplate({
    remove: {
        components: [
            "minecraft:nameable"
        ]
    },
    add: {
        componentsGroups: {
            "ha:become_garfield": [
                new BPEntityComponents.SetSpawnEntity({
                    entities: [
                        {
                            minWaitTime: 0,
                            maxWaitTime: 0.1,
                            numToSpawn: 1,
                            shouldLeash: false,
                            singleUse: true,
                            spawnEntity: "ha:garfield",
                            spawnEvent: "minecraft:entity_spawned"
                        }
                    ]
                }),
                new BPEntityComponents.SetInstantDespawn()
            ]
        },
        components: [
            new BPEntityComponents.SetNameable({
                nameActions: [
                    {
                        nameFilter: "Garfield",
                        onNamed: {
                            event: "ha:become_garfield",
                            target: "self"
                        }
                    }
                ]
            })
        ],
        events: {
            "ha:become_garfield": {
                add: {
                    componentGroups: [
                        "ha:become_garfield"
                    ]
                }
            },
        }
    }
});