import { BPEntityTemplates } from "simplified-mojang-jsons";

export const ZombieVillagerChanges = BPEntityTemplates.ZombieVillagerV2Template({
    remove: {
        componentsGroups: {
            librarian: {}
        },
        events: {
            "minecraft:entity_spawned": {
                sequence: [
                    {
                        randomize: [
                            {
                                add: {
                                    componentGroups: [
                                        "librarian"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:entity_transformed": {
                sequence: [
                    {
                        sequence: [
                            {
                                add: {
                                    componentGroups: [
                                        "librarian"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            "minecraft:spawn_skilled_adult": {
                sequence: [
                    {
                        randomize: [
                            {
                                add: {
                                    componentGroups: [
                                        "librarian"
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
});