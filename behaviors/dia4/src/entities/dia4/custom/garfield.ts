import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
import { unlink } from "fs";
import { BPEntityComponents, createBPEntity, EntityFilters, MoLang, SpawnCategoryEntities } from "simplified-mojang-jsons";

/**
 * Variable general que contiene los tiempos por dialogos de Garfield.
 * @type {{ id: string; time: number; next: string; }[]}
 * @author HaJuegos - 17-11-2026
 */
const timerStepsDialogs: { id: string; time: number; next: string; }[] = [
    { id: "ha:pre_one", time: 10, next: "ha:pre_two" },
    { id: "ha:pre_two", time: 9, next: "ha:pre_three" },
    { id: "ha:pre_three", time: 9, next: "ha:pre_four" },
    { id: "ha:pre_four", time: 9, next: "ha:pre_five" },
    { id: "ha:pre_five", time: 15, next: "ha:pre_final" },
    { id: "ha:pre_final", time: 2.5, next: "ha:start_boss" }
];

type DialogEventConfig = {
    queueCommand: { command: string[]; };
    remove: { componentGroups: string[]; };
    add: { componentGroups: string[]; };
};

/**
 * Variable general que contiene los eventos relacionados a ejecutar respecto a los dialogos de Garfield.
 * @type {Record<string, DialogEventConfig>}
 * @author HaJuegos - 17-11-2026
 */
const dialogEvents: Record<string, DialogEventConfig> = Object.fromEntries(timerStepsDialogs.slice(1).map((timer, index) => {
    const previous = timerStepsDialogs[index];

    return [timer.id, {
        queueCommand: {
            command: [
                `playsound mob.garfield.pre-dialog.dialog${index + 2} @a ~~~`,
                `scriptevent ha:garfield_pre-dialog ${index + 2}`
            ]
        },
        remove: {
            componentGroups: [previous.id]
        },
        add: {
            componentGroups: [timer.id]
        }
    }];
}));

export const GarfieldEntity = createBPEntity({
    id: "ha:garfield",
    description: {
        runtimeIdentifier: MinecraftEntityTypes.Cat,
        spawnCategory: SpawnCategoryEntities.Monster,
        isSpawneable: true,
        isExperimental: false,
        isSummonable: true
    },
    componentsGroups: {
        "ha:neutral_intro": [
            new BPEntityComponents.SetTypeFamily({
                family: [
                    "cat",
                    "mob",
                ]
            }),
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        cause: "all",
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetMovement({
                value: 0.3
            })
        ],
        ...Object.fromEntries(timerStepsDialogs.map(timer => [timer.id, [
            new BPEntityComponents.SetTimer({
                time: [timer.time, timer.time],
                looping: true,
                timeDownEvent: {
                    event: timer.next,
                    target: "self"
                }
            })
        ]])),
        "ha:boss_mode": [
            new BPEntityComponents.SetTypeFamily({
                family: [
                    "garfield",
                    "cat",
                    "monster",
                    "mob"
                ]
            }),
            new BPEntityComponents.SetDamageSensor({
                triggers: [
                    {
                        onDamage: {
                            filters: EntityFilters.noneOf(
                                EntityFilters.isFamily('player', 'other'),
                                EntityFilters.isFamily('player', 'damager'),
                            ),
                        },
                        dealsDamage: "no"
                    }
                ]
            }),
            new BPEntityComponents.SetSkinId({
                value: 1
            }),
            new BPEntityComponents.SetBoss({
                hudRange: 100,
                shouldDarkenSky: true,
                name: "entity.ha:garfield.name"
            }),
            new BPEntityComponents.SetMovement({
                value: 0.35
            }),
            new BPEntityComponents.SetBehaviorRandomStroll({
                priority: 12,
                speedMultiplier: 0.8
            }),
            new BPEntityComponents.SetAttack({
                damage: 14
            }),
            new BPEntityComponents.SetBehaviorMeleeAttack({
                priority: 0,
                canSpreadOnFire: true,
                meleeFov: 360,
                cooldownTime: 0.45,
                reachMultiplier: 3,
                requireCompletePath: true,
                trackTarget: false
            }),
            new BPEntityComponents.SetBehaviorHurtByTarget({
                priority: 1,
                hurtOwner: true,
                entityTypes: {
                    filters: EntityFilters.noneOf(
                        EntityFilters.isFamily('garfield', 'other')
                    )
                }
            }),
            new BPEntityComponents.SetBehaviorNearestPrioritizedAttackableTarget({
                priority: 0,
                reselectTargets: true,
                entityTypes: [
                    {
                        priority: 0,
                        filters: EntityFilters.isFamily('player', 'other'),
                        maxDist: 300
                    },
                    {
                        priority: 1,
                        filters: EntityFilters.anyOf(
                            EntityFilters.isFamily('irongolem', 'other'),
                            EntityFilters.isFamily('snowgolem', 'other'),
                            EntityFilters.isFamily('chicken', 'other'),
                            EntityFilters.isFamily('rabbit', 'other'),
                            EntityFilters.isFamily('baby_turtle', 'other'),
                        ),
                        maxDist: 300
                    }
                ]
            }),
            new BPEntityComponents.SetFollowRange({
                value: 300
            })
        ]
    },
    components: [
        new BPEntityComponents.SetExperienceReward({
            onDeath: `${MoLang.lastHitByPlayer()} ? Math.Random(50, 150) : 0`
        }),
        new BPEntityComponents.SetRideable({
            seatCount: 1,
            familyTypes: ["baby_undead"],
            seats: [
                {
                    position: [0, 0.55, 0]
                }
            ]
        }),
        new BPEntityComponents.SetBehaviorRiseToLiquidLevel({
            priority: 14,
            liquidYOffset: 0.01,
            riseDelta: 0.1,
            sinkDelta: 0.1
        }),
        new BPEntityComponents.SetUnderwaterMovement({
            value: 0.2
        }),
        new BPEntityComponents.SetLavaMovement({
            value: 0.2
        }),
        new BPEntityComponents.SetMobEffectImmunity({
            mobEffects: [
                "poison",
                "instant_damage",
                "fatal_poison",
            ]
        }),
        new BPEntityComponents.SetOnDeath({
            target: "self",
            event: "ha:death_garfield"
        }),
        new BPEntityComponents.SetLoot({
            table: "loot_tables/entities/custom/garfield.json"
        }),
        new BPEntityComponents.SetHealth({
            value: 850,
            max: 850,
        }),
        new BPEntityComponents.SetOffspring({
            offspringPairs: {
                "ha:garfield": "ha:garfield"
            }
        }),
        new BPEntityComponents.SetSpawnEggInteraction(),
        new BPEntityComponents.SetIsHiddenWhenInvisible(),
        new BPEntityComponents.SetNameable({
            allowNameTagRenaming: false,
            alwaysShow: true
        }),
        new BPEntityComponents.SetSkinId({
            value: 0
        }),
        new BPEntityComponents.SetPhysics(),
        new BPEntityComponents.SetBreathable({
            totalSupply: 15,
            suffocateTime: 0
        }),
        new BPEntityComponents.SetCollisionBox({
            height: 0.6,
            width: 0.7,
        }),
        new BPEntityComponents.SetHurtOnCondition({
            damageConditions: [
                {
                    filters: EntityFilters.inLava(),
                    cause: "lava",
                    damagePerTick: 4
                }
            ]
        }),
        new BPEntityComponents.SetNavigationWalk({
            canFloat: true,
            avoidWater: true,
            avoidDamageBlocks: true,
            avoidPortals: true
        }),
        new BPEntityComponents.SetMovementBasic(),
        new BPEntityComponents.SetJumpStatic(),
        new BPEntityComponents.SetCanClimb(),
        new BPEntityComponents.SetPersistent(),
        new BPEntityComponents.SetPushableByBlock(),
        new BPEntityComponents.SetPushableByEntity(),
        new BPEntityComponents.SetConditionalBandwidthOptimization(),
        new BPEntityComponents.SetBehaviorFloat({
            priority: 10
        }),
        new BPEntityComponents.SetBehaviorMountPathing({
            priority: 11,
            speedMultiplier: 1.25,
            targetDist: 0,
            trackTarget: false
        }),
        new BPEntityComponents.SetBehaviorLookAtPlayer({
            priority: 13
        })
    ],
    events: {
        "minecraft:entity_spawned": {
            queueCommand: {
                command: [
                    "playsound mob.garfield.pre-dialog.dialog1 @a ~~~",
                    "scriptevent ha:garfield_pre-dialog 1"
                ]
            },
            add: {
                componentGroups: [
                    "ha:neutral_intro",
                    // @ts-ignore
                    "ha:pre_one"
                ]
            }
        },
        "ha:death_garfield": {
            queueCommand: {
                command: [
                    "tellraw @a {\"rawtext\": [{ \"translate\": \"dialogue.garfield.death\" }]}"
                ]
            }
        },
        ...dialogEvents,
        "ha:start_boss": {
            queueCommand: {
                command: [
                    "scriptevent ha:garfield_start_fight"
                ]
            },
            remove: {
                componentGroups: [
                    // @ts-ignore
                    "ha:pre_final",
                    "ha:neutral_intro"
                ]
            },
            add: {
                componentGroups: [
                    "ha:boss_mode"
                ]
            }
        }
    }
});