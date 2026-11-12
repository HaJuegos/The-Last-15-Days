import { BPEntityComponents, BPEntityTemplates, EntityFilters } from "simplified-mojang-jsons";

export const OcelotEntity = BPEntityTemplates.OcelotTemplate({
    components: {
        "minecraft:behavior.nearest_attackable_target": new BPEntityComponents.SetBehaviorNearestAttackableTarget({
            priority: 2,
            reselectTargets: true,
            entityTypes: [
                {
                    filters: EntityFilters.anyOf(
                        EntityFilters.isFamily('player', 'other'),
                        EntityFilters.isFamily('snowgolem', 'other'),
                        EntityFilters.isFamily('irongolem', 'other'),
                    ),
                    maxDist: 20
                },
                {
                    filters: EntityFilters.anyOf(
                        EntityFilters.isFamily('player', 'other'),
                        EntityFilters.isFamily('snowgolem', 'other'),
                        EntityFilters.isFamily('irongolem', 'other'),
                    ),
                    maxDist: 20
                },
                {
                    filters: EntityFilters.isFamily('chicken', 'other'),
                    maxDist: 20
                },
                {
                    filters: EntityFilters.allOf(
                        EntityFilters.isFamily('baby_turtle', 'other'),
                        EntityFilters.inWater(true, 'other', '!='),
                    ),
                    maxDist: 20
                }
            ]
        })
    },
    remove: {
        componentsGroups: {
            "minecraft:ocelot_wild": [
                "minecraft:behavior.avoid_mob_type"
            ]
        },
        components: [
            "minecraft:behavior.panic"
        ]
    },
    add: {
        components: [
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                hurtOwner: true
            })
        ]
    }
});