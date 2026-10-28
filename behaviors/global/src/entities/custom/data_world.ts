import { BPEntityComponents, createBPEntity, SpawnCategoryEntities } from "simplified-mojang-jsons";

export const DataWorldEntity = createBPEntity({
    id: 'ha:data_world',
    description: {
        spawnCategory: SpawnCategoryEntities.Ambient,
        isExperimental: false,
        isSpawneable: false,
        isSummonable: true
    },
    componentsGroups: {},
    components: [
        new BPEntityComponents.SetHealth({
            value: 1,
            min: 1,
            max: 1
        }),
        new BPEntityComponents.SetDamageSensor({
            triggers: [
                {
                    cause: 'all',
                    dealsDamage: "no"
                }
            ]
        }),
        new BPEntityComponents.SetCollisionBox({
            height: 1,
            width: 1
        }),
        new BPEntityComponents.SetPhysics({
            hasCollision: false,
            hasGravity: false
        }),
        new BPEntityComponents.SetKnockbackResistance({
            value: 99999
        }),
        new BPEntityComponents.SetTickWorld({
            neverDespawn: true,
            radius: 4
        }),
        new BPEntityComponents.SetConditionalBandwidthOptimization(),
        new BPEntityComponents.SetDimensionBound(),
        new BPEntityComponents.SetPersistent()
    ],
    events: {
        "minecraft:entity_spawned": {
            queueCommand: {
                command: [
                    "tickingarea add circle ~~~ 4 data"
                ]
            }
        }
    }
});