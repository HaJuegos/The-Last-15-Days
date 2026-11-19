import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const ArrowEntity = BPEntityTemplates.ArrowTemplate({
    add: {
        componentsGroups: {
            "ha:illusioner_arrow": [
                new BPEntityComponents.SetProjectile({
                    anchor: "eye_height",
                    gravity: 0.05,
                    power: 1.6,
                    hitSound: "bow.hit",
                    onHit: {
                        arrowEffect: {
                            applyEffectToBlockingTargets: false
                        },
                        impactDamage: {
                            applyKnockbackToBlockingTargets: true,
                            damage: {
                                min: 0,
                                max: 0
                            },
                            powerMultiplier: 2.0,
                            ceilPreCriticalDamage: true,
                            knockback: true,
                            destroyOnHit: true,
                            difficultyRandomization: "multiplicative"
                        },
                        stickInGround: {},
                        removeOnHit: {}
                    },
                    offset: [0, -0.1, 0],
                    shouldBounce: "if_no_damage_dealt",
                    uncertaintyBase: 16,
                    uncertaintyMultiplier: 4,
                    isolatedPhysics: false,
                    ignoredEntities: [
                        "ha:illusioner"
                    ]
                })
            ],
            "ha:evoker_angry_arrow": [
                new BPEntityComponents.SetProjectile({
                    onHit: {
                        arrowEffect: {
                            applyEffectToBlockingTargets: true
                        },
                        impactDamage: {
                            damage: {
                                min: 0,
                                max: 0
                            },
                            powerMultiplier: 2,
                            applyKnockbackToBlockingTargets: true,
                            knockback: true,
                            destroyOnHit: true,
                            ceilPreCriticalDamage: true,
                            difficultyRandomization: "multiplicative"
                        },
                        removeOnHit: {}
                    },
                    anchor: "eye_height",
                    gravity: 0.035,
                    power: 7,
                    hitSound: "bow.hit",
                    offset: [0, -0.1, 0],
                    shouldBounce: "if_no_damage_dealt",
                    isolatedPhysics: false
                })
            ],
            "ha:evoker_arrow": [
                new BPEntityComponents.SetProjectile({
                    onHit: {
                        arrowEffect: {
                            applyEffectToBlockingTargets: true
                        },
                        impactDamage: {
                            damage: {
                                min: 0,
                                max: 0
                            },
                            powerMultiplier: 2,
                            applyKnockbackToBlockingTargets: true,
                            knockback: true,
                            destroyOnHit: true,
                            ceilPreCriticalDamage: true,
                            difficultyRandomization: "multiplicative"
                        },
                        removeOnHit: {}
                    },
                    anchor: "eye_height",
                    gravity: 0.05,
                    power: 1.6,
                    hitSound: "bow.hit",
                    offset: [0, -0.1, 0],
                    shouldBounce: "if_no_damage_dealt",
                    isolatedPhysics: false,
                    uncertaintyBase: 16,
                    uncertaintyMultiplier: 4
                })
            ]
        },
        events: {
            "ha:evoker_arrow": {
                add: {
                    componentGroups: [
                        "ha:evoker_arrow"
                    ]
                }
            },
            "ha:evoker_angry_arrow": {
                add: {
                    componentGroups: [
                        "ha:evoker_angry_arrow"
                    ]
                }
            },
            "ha:illusioner_arrow": {
                add: {
                    componentGroups: [
                        "ha:illusioner_arrow"
                    ]
                }
            }
        }
    }
});