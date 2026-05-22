import * as mc from "@minecraft/server";

import { afterEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";

/**
 * Clase que controla los eventos de los debuffs de la marca de los abismos y sus combos.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 01-05-2026
 */
class AbbysDebuffsEvents extends TL15DBaseManager {
    /**
     * Lista de jugadores con el sistema de furia activo para controlar su funcionamiento.
     * @type {Set<string>}
     * @author HaJuegos - 21-05-2026
     * @private
     */
    private globalFurySystem: Set<string> = new Set<string>();

    /**
     * Lista de variables posibles para los debuffs a obtener.
     * @type {Record<string, string>}
     * @private
     */
    private possibleDebuffs: DebuffData[] = [
        {
            id: 'abyssal',
            idTitleUI: 'abyssal:combo',
            maxComboUI: 6,
            timerScoreboard: 'abyssalTimer',
            comboScoreboard: 'abyssalCombo',
            translationKey: 'chat.system.debuff_name.abyssal',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.abyssal_text_combo1" }] } },
                { idCombo: 2, msg: { rawtext: [{ translate: "chat.system.abyss_text.abyssal_text_combo2" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        this.abyssSystem(ply, true);
                    }
                },
                {
                    minRangeCombo: 2,
                    events: (ply) => {
                        this.abyssSystem(ply);
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                ply.runCommand(`clear @s ha:void_item`);
            }
        },
        {
            id: 'colossus',
            idTitleUI: 'colossus:combo',
            maxComboUI: 6,
            timerScoreboard: 'colossusTimer',
            comboScoreboard: 'colossusCombo',
            translationKey: 'chat.system.debuff_name.colossus',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.colossus_text_combo1" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_colossus_one');
                    }
                },
                {
                    specificCombo: 2,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_colossus_two');
                    }
                },
                {
                    specificCombo: 3,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_colossus_three');
                    }
                },
                {
                    specificCombo: 4,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_colossus_four');
                    }
                },
                {
                    specificCombo: 5,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_colossus_five');
                    }
                },
                {
                    minRangeCombo: 6,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_colossus_six');
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                ply.triggerEvent(`ha:set_colossus_normal`);
            }
        },
        {
            id: 'hunger',
            idTitleUI: 'hunger:combo',
            maxComboUI: 6,
            timerScoreboard: 'hungerTimer',
            comboScoreboard: 'hungerCombo',
            translationKey: 'chat.system.debuff_name.hunger',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.hunger_text_combo1" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.addTag('hungerDebuff1');
                        ply.removeTag('hungerDebuff2');
                        ply.removeTag('hungerDebuff3');
                        ply.removeTag('hungerDebuff4');
                        ply.removeTag('hungerDebuff5');
                        ply.removeTag('hungerDebuff6');
                    }
                },
                {
                    specificCombo: 2,
                    events: (ply) => {
                        ply.removeTag('hungerDebuff1');
                        ply.addTag('hungerDebuff2');
                        ply.removeTag('hungerDebuff3');
                        ply.removeTag('hungerDebuff4');
                        ply.removeTag('hungerDebuff5');
                        ply.removeTag('hungerDebuff6');
                    }
                },
                {
                    specificCombo: 3,
                    events: (ply) => {
                        ply.removeTag('hungerDebuff1');
                        ply.removeTag('hungerDebuff2');
                        ply.addTag('hungerDebuff3');
                        ply.removeTag('hungerDebuff4');
                        ply.removeTag('hungerDebuff5');
                        ply.removeTag('hungerDebuff6');
                    }
                },
                {
                    specificCombo: 4,
                    events: (ply) => {
                        ply.removeTag('hungerDebuff1');
                        ply.removeTag('hungerDebuff2');
                        ply.removeTag('hungerDebuff3');
                        ply.addTag('hungerDebuff4');
                        ply.removeTag('hungerDebuff5');
                        ply.removeTag('hungerDebuff6');
                    }
                },
                {
                    specificCombo: 5,
                    events: (ply) => {
                        ply.removeTag('hungerDebuff1');
                        ply.removeTag('hungerDebuff2');
                        ply.removeTag('hungerDebuff3');
                        ply.removeTag('hungerDebuff4');
                        ply.addTag('hungerDebuff5');
                        ply.removeTag('hungerDebuff6');
                    }
                },
                {
                    minRangeCombo: 6,
                    events: (ply) => {
                        ply.removeTag('hungerDebuff1');
                        ply.removeTag('hungerDebuff2');
                        ply.removeTag('hungerDebuff3');
                        ply.removeTag('hungerDebuff4');
                        ply.removeTag('hungerDebuff5');
                        ply.addTag('hungerDebuff6');
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                ply.removeTag('hungerDebuff1');
                ply.removeTag('hungerDebuff2');
                ply.removeTag('hungerDebuff3');
                ply.removeTag('hungerDebuff4');
                ply.removeTag('hungerDebuff5');
                ply.removeTag('hungerDebuff6');

                ply.runCommand(`effect @s clear hunger`);
            }
        },
        {
            id: 'shadows',
            idTitleUI: 'shadows:combo',
            maxComboUI: 6,
            timerScoreboard: 'shadowsTimer',
            comboScoreboard: 'shadowsCombo',
            translationKey: 'chat.system.debuff_name.shadows',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.shadows_text_combo1" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.addTag('shedowsDebuff1');
                        ply.removeTag('shedowsDebuff2');
                        ply.removeTag('shedowsDebuff3');
                        ply.removeTag('shedowsDebuff4');
                        ply.removeTag('shedowsDebuff5');
                        ply.removeTag('shedowsDebuff6');
                    }
                },
                {
                    specificCombo: 2,
                    events: (ply) => {
                        ply.removeTag('shedowsDebuff1');
                        ply.addTag('shedowsDebuff2');
                        ply.removeTag('shedowsDebuff3');
                        ply.removeTag('shedowsDebuff4');
                        ply.removeTag('shedowsDebuff5');
                        ply.removeTag('shedowsDebuff6');
                    }
                },
                {
                    specificCombo: 3,
                    events: (ply) => {
                        ply.removeTag('shedowsDebuff1');
                        ply.removeTag('shedowsDebuff2');
                        ply.addTag('shedowsDebuff3');
                        ply.removeTag('shedowsDebuff4');
                        ply.removeTag('shedowsDebuff5');
                        ply.removeTag('shedowsDebuff6');
                    }
                },
                {
                    specificCombo: 4,
                    events: (ply) => {
                        ply.removeTag('shedowsDebuff1');
                        ply.removeTag('shedowsDebuff2');
                        ply.removeTag('shedowsDebuff3');
                        ply.addTag('shedowsDebuff4');
                        ply.removeTag('shedowsDebuff5');
                        ply.removeTag('shedowsDebuff6');
                    }
                },
                {
                    specificCombo: 5,
                    events: (ply) => {
                        ply.removeTag('shedowsDebuff1');
                        ply.removeTag('shedowsDebuff2');
                        ply.removeTag('shedowsDebuff3');
                        ply.removeTag('shedowsDebuff4');
                        ply.addTag('shedowsDebuff5');
                        ply.removeTag('shedowsDebuff6');
                    }
                },
                {
                    minRangeCombo: 6,
                    events: (ply) => {
                        ply.removeTag('shedowsDebuff1');
                        ply.removeTag('shedowsDebuff2');
                        ply.removeTag('shedowsDebuff3');
                        ply.removeTag('shedowsDebuff4');
                        ply.removeTag('shedowsDebuff5');
                        ply.addTag('shedowsDebuff6');
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                ply.removeTag('shedowsDebuff1');
                ply.removeTag('shedowsDebuff2');
                ply.removeTag('shedowsDebuff3');
                ply.removeTag('shedowsDebuff4');
                ply.removeTag('shedowsDebuff5');
                ply.removeTag('shedowsDebuff6');
            },
        },
        {
            id: 'soul',
            idTitleUI: 'soul:combo',
            maxComboUI: 6,
            timerScoreboard: 'soulTimer',
            comboScoreboard: 'soulCombo',
            translationKey: 'chat.system.debuff_name.decay',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.decay_text_combo1" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_soul_one');
                    }
                },
                {
                    specificCombo: 2,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_soul_two');
                    }
                },
                {
                    specificCombo: 3,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_soul_three');
                    }
                },
                {
                    specificCombo: 4,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_soul_four');
                    }
                },
                {
                    specificCombo: 5,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_soul_five');
                    }
                },
                {
                    minRangeCombo: 6,
                    events: (ply) => {
                        ply.triggerEvent('ha:set_soul_six');
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                ply.triggerEvent('ha:set_soul_normal');
            }
        },
        {
            id: 'fury',
            idTitleUI: 'fury:combo',
            maxComboUI: 6,
            timerScoreboard: 'furyTimer',
            comboScoreboard: 'furyCombo',
            translationKey: 'chat.system.debuff_name.fury',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.fury_text_combo1" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.addTag('furyDebuff1');
                        ply.removeTag('furyDebuff2');
                        ply.removeTag('furyDebuff3');
                        ply.removeTag('furyDebuff4');
                        ply.removeTag('furyDebuff5');
                        ply.removeTag('furyDebuff6');

                        ply.runCommand(`fog @s push ha:fury_fog_lvl_one furyFogID1`);
                        ply.runCommand(`fog @s remove furyFogID2`);
                        ply.runCommand(`fog @s remove furyFogID3`);
                        ply.runCommand(`fog @s remove furyFogID4`);
                        ply.runCommand(`fog @s remove furyFogID5`);
                        ply.runCommand(`fog @s remove furyFogID6`);
                    }
                },
                {
                    specificCombo: 2,
                    events: (ply) => {
                        ply.removeTag('furyDebuff1');
                        ply.addTag('furyDebuff2');
                        ply.removeTag('furyDebuff3');
                        ply.removeTag('furyDebuff4');
                        ply.removeTag('furyDebuff5');
                        ply.removeTag('furyDebuff6');

                        ply.runCommand(`fog @s remove furyFogID1`);
                        ply.runCommand(`fog @s push ha:fury_fog_lvl_two furyFogID2`);
                        ply.runCommand(`fog @s remove furyFogID3`);
                        ply.runCommand(`fog @s remove furyFogID4`);
                        ply.runCommand(`fog @s remove furyFogID5`);
                        ply.runCommand(`fog @s remove furyFogID6`);
                    }
                },
                {
                    specificCombo: 3,
                    events: (ply) => {
                        ply.removeTag('furyDebuff1');
                        ply.removeTag('furyDebuff2');
                        ply.addTag('furyDebuff3');
                        ply.removeTag('furyDebuff4');
                        ply.removeTag('furyDebuff5');
                        ply.removeTag('furyDebuff6');

                        ply.runCommand(`fog @s remove furyFogID1`);
                        ply.runCommand(`fog @s remove furyFogID2`);
                        ply.runCommand(`fog @s push ha:fury_fog_lvl_three furyFogID3`);
                        ply.runCommand(`fog @s remove furyFogID4`);
                        ply.runCommand(`fog @s remove furyFogID5`);
                        ply.runCommand(`fog @s remove furyFogID6`);
                    }
                },
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.removeTag('furyDebuff1');
                        ply.removeTag('furyDebuff2');
                        ply.removeTag('furyDebuff3');
                        ply.addTag('furyDebuff4');
                        ply.removeTag('furyDebuff5');
                        ply.removeTag('furyDebuff6');

                        ply.runCommand(`fog @s remove furyFogID1`);
                        ply.runCommand(`fog @s remove furyFogID2`);
                        ply.runCommand(`fog @s remove furyFogID3`);
                        ply.runCommand(`fog @s push ha:fury_fog_lvl_four furyFogID4`);
                        ply.runCommand(`fog @s remove furyFogID5`);
                        ply.runCommand(`fog @s remove furyFogID6`);
                    }
                },
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.removeTag('furyDebuff1');
                        ply.removeTag('furyDebuff2');
                        ply.removeTag('furyDebuff3');
                        ply.removeTag('furyDebuff4');
                        ply.addTag('furyDebuff5');
                        ply.removeTag('furyDebuff6');

                        ply.runCommand(`fog @s remove furyFogID1`);
                        ply.runCommand(`fog @s remove furyFogID2`);
                        ply.runCommand(`fog @s remove furyFogID3`);
                        ply.runCommand(`fog @s remove furyFogID4`);
                        ply.runCommand(`fog @s push ha:fury_fog_lvl_five furyFogID5`);
                        ply.runCommand(`fog @s remove furyFogID6`);
                    }
                },
                {
                    specificCombo: 1,
                    events: (ply) => {
                        ply.removeTag('furyDebuff1');
                        ply.removeTag('furyDebuff2');
                        ply.removeTag('furyDebuff3');
                        ply.removeTag('furyDebuff4');
                        ply.removeTag('furyDebuff5');
                        ply.addTag('furyDebuff6');

                        ply.runCommand(`fog @s remove furyFogID1`);
                        ply.runCommand(`fog @s remove furyFogID2`);
                        ply.runCommand(`fog @s remove furyFogID3`);
                        ply.runCommand(`fog @s remove furyFogID4`);
                        ply.runCommand(`fog @s remove furyFogID5`);
                        ply.runCommand(`fog @s push ha:fury_fog_lvl_one furyFogID6`);
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                ply.removeTag('furyDebuff1');
                ply.removeTag('furyDebuff2');
                ply.removeTag('furyDebuff3');
                ply.removeTag('furyDebuff4');
                ply.removeTag('furyDebuff5');
                ply.removeTag('furyDebuff6');

                ply.runCommand(`fog @s remove furyFogID1`);
                ply.runCommand(`fog @s remove furyFogID2`);
                ply.runCommand(`fog @s remove furyFogID3`);
                ply.runCommand(`fog @s remove furyFogID4`);
                ply.runCommand(`fog @s remove furyFogID5`);
                ply.runCommand(`fog @s remove furyFogID6`);
            },
        },
        {
            id: 'void',
            idTitleUI: 'void:combo',
            maxComboUI: 6,
            timerScoreboard: 'voidTimer',
            comboScoreboard: 'voidCombo',
            translationKey: 'chat.system.debuff_name.void',
            rawMsgCombos: [
                { idCombo: 1, msg: { rawtext: [{ translate: "chat.system.abyss_text.void_text_combo1" }] } },
                { idCombo: 2, msg: { rawtext: [{ translate: "chat.system.abyss_text.void_text_combo2" }] } },
                { idCombo: 3, msg: { rawtext: [{ translate: "chat.system.abyss_text.void_text_combo5" }] } }
            ],
            eventsCombo: [
                {
                    specificCombo: 1,
                    events: (ply) => {
                        this.voidSystem(ply);
                    }
                },
                {
                    specificCombo: 2,
                    events: (ply) => {
                        this.voidSystem(ply, false, 2);
                    }
                },
                {
                    specificCombo: 3,
                    events: (ply) => {
                        this.voidSystem(ply, false, 3);
                    }
                },
                {
                    specificCombo: 4,
                    events: (ply) => {
                        this.voidSystem(ply, true, 3, 1);
                    }
                },
                {
                    minRangeCombo: 5,
                    events: (ply) => {
                        this.voidSystem(ply, true, 3, 2);
                    }
                }
            ],
            eventsEndTimer: (ply) => {
                customEventsManager.lockItemsPly({
                    ply: ply,
                    invType: 'inv',
                    lockMethod: mc.ItemLockMode.none,
                    itemsSelection: {
                        allSlots: true,
                        whitelistItems: ['ha:void_item']
                    }
                });
            },
        }
    ];

    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

        // Eventos loops de los debuffs

        worldToolsSimplified.setRun(() => {
            for (const ply of mc.world.getAllPlayers()) {
                this.loopTimersDebuff(ply);
            }
        });

        worldToolsSimplified.setLoop(() => {
            for (const ply of mc.world.getAllPlayers()) {
                this.checkNetheriteArmor(ply);
                this.shadowsSystem(ply);
                this.furySystem(ply, true);
            }
        }, 1);

        worldToolsSimplified.setLoop(() => {
            for (const ply of mc.world.getAllPlayers()) {
                this.hungerSystem(ply);
            }
        }, worldToolsSimplified.convertSecondsToTicks(10));

        // Eventos para asignar y detectar los debuffs.

        afterEventsSimplified.onEntityDie((args) => {
            const ply = args.deadEntity;

            if (ply instanceof mc.Player) {
                this.changeTotalDebuff();
            }
        });

        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;

            if (!ply.hasTag('death')) {
                worldToolsSimplified.setDelay(() => {
                    this.checkPendingDebuffs(ply);
                }, worldToolsSimplified.convertSecondsToTicks(3));
            }
        });

        // Eventos para la furia

        afterEventsSimplified.onHitEntity((args) => {
            const sourceEntity = args.damagingEntity;

            if (sourceEntity.typeId == 'minecraft:player') {
                this.furySystem(sourceEntity as mc.Player);
            }
        });

        afterEventsSimplified.onHurtEntity((args) => {
            const sourceEntity = args.damageSource.damagingEntity;

            if (sourceEntity && sourceEntity.typeId == 'minecraft:player') {
                this.furySystem(sourceEntity as mc.Player);
            }
        });

        afterEventsSimplified.onEntityDie((args) => {
            const sourceEntity = args.damageSource.damagingEntity;

            if (sourceEntity && sourceEntity.typeId == 'minecraft:player') {
                this.furySystem(sourceEntity as mc.Player);
            }
        });
    }

    /**
     * Metodo principal encargado de los timers locales de los debuffs por jugador para ir restandolos poco a poco.
     * @param {mc.Player} ply Jugador en concreto afectado.
     * @returns {void}
     * @author HaJuegos - 20-05-2026
     * @private
     */
    private loopTimersDebuff(ply: mc.Player): void {
        for (const debuff of this.possibleDebuffs) {
            const totalMinutes = worldToolsSimplified.getPlyScoreInObj(ply, debuff.timerScoreboard);
            const realTimer = ply.getDynamicProperty(`ha:debuff_timer_${debuff.id}`) as number | undefined;

            if (totalMinutes <= 0 && (!realTimer || (realTimer - Date.now()) <= 0)) {
                continue;
            }

            let forceSync = false;

            if (realTimer != undefined) {
                const remainMs = realTimer - Date.now();

                if (remainMs > 0) {
                    const remainMns = Math.floor(remainMs / 60000);

                    if (remainMns != totalMinutes) {
                        if (totalMinutes == 0 && remainMns == 0) {
                            forceSync = false;
                        } else {
                            forceSync = true;
                        }
                    }
                }
            }

            customEventsManager.startTimerLocal({
                timerId: `ha:debuff_timer_${debuff.id}`,
                sourcePly: ply,
                initialMns: totalMinutes,
                forceRestart: forceSync,
                onMinutePass: (ply) => {
                    const actualTime = worldToolsSimplified.getPlyScoreInObj(ply, debuff.timerScoreboard);

                    if (actualTime > 0) {
                        worldToolsSimplified.changePlyScoreInObj(ply, debuff.timerScoreboard, 'add', -1);
                    }
                },
                onTimerEnds: (ply) => {
                    const finalTime = worldToolsSimplified.getPlyScoreInObj(ply, debuff.timerScoreboard);

                    if (finalTime <= 0) {
                        debuff.eventsEndTimer(ply);

                        worldToolsSimplified.changePlyScoreInObj(ply, debuff.timerScoreboard, 'set', 0);
                        worldToolsSimplified.changePlyScoreInObj(ply, debuff.comboScoreboard, 'set', 0);

                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.debuff_end_timer', with: { rawtext: [{ translate: `${debuff.translationKey}` }] } }] });
                        ply.playSound('mob.guardian.death');
                    }
                }
            });
        }
    }

    /**
     * Metodo auxiliar que asigna el nuevo total de debuffs asignados al mundo y a los jugadores online y offline.
     * @returns {void}
     * @author HaJuegos - 18-05-2026
     * @private
     */
    private changeTotalDebuff(): void {
        const debuffStacks = mc.world.getDynamicProperty('ha:stack_debuffs') as number | undefined;
        const plys = mc.world.getAllPlayers().filter(p => !p.hasTag('death'));

        if (debuffStacks) {
            mc.world.setDynamicProperty('ha:stack_debuffs', debuffStacks + 1);
        } else {
            mc.world.setDynamicProperty('ha:stack_debuffs', 1);
        }

        for (const ply of plys) {
            this.checkPendingDebuffs(ply);
        }
    }

    /**
     * Metodo principal que calcula los debuffs de un jugador en concreto para asignarle todos los pendientes que tenga respecto a estos mismos. De forma asincrona.
     * @param {mc.Player} ply Jugador en concreto a analizar si tiene todos los debuffs pendientes. 
     * @returns {void}
     * @author HaJuegos - 18-05-2026
     * @private
     */
    private checkPendingDebuffs(ply: mc.Player): void {
        const totalDebuffsGlobal = mc.world.getDynamicProperty('ha:stack_debuffs') as number | undefined;
        const totalDebuffsPly = (ply.getDynamicProperty('ha:stack_debuffs') as number | undefined) ?? 0;
        const deathCounter = mc.world.getDynamicProperty('ha:death_counter') as number | undefined;
        let isLinked = false;

        this.loopTimersDebuff(ply);

        if (!totalDebuffsGlobal || (totalDebuffsGlobal == totalDebuffsPly)) return;

        if (deathCounter && !ply.hasTag('linkedDebuffSaved')) {
            for (let i = 1; i <= deathCounter; i++) {
                const propKey = `ha:player_death_data_${i}`;
                const dataPlys = mc.world.getDynamicProperty(propKey) as string | undefined;

                if (dataPlys) {
                    const [name, id, linked] = dataPlys.split(':');

                    if (id == ply.id) {
                        if (linked == 'linked') {
                            isLinked = true;
                            break;
                        }
                    }
                }
            }
        }

        if (isLinked) return;

        const totalNewDebuffs = totalDebuffsGlobal - totalDebuffsPly;

        ply.setDynamicProperty('ha:stack_debuffs', totalDebuffsGlobal);

        for (let i = 1; i <= totalNewDebuffs; i++) {
            const randomDebuffI = Math.floor(Math.random() * this.possibleDebuffs.length);
            const randomDebuff = this.possibleDebuffs[randomDebuffI];
            const finalCombo = worldToolsSimplified.changePlyScoreInObj(ply, randomDebuff.comboScoreboard, 'add', 1) as number;

            worldToolsSimplified.changePlyScoreInObj(ply, randomDebuff.timerScoreboard, 'add', 4);

            const baseDelay = worldToolsSimplified.convertSecondsToTicks(1);
            const constantDelay = i == 1 ? baseDelay : baseDelay + worldToolsSimplified.convertSecondsToTicks(i - 1);

            worldToolsSimplified.setDelay(() => {
                ply.playSound('ui.abyss_attack.start');
                ply.onScreenDisplay.setTitle(`${randomDebuff.idTitleUI}${(finalCombo >= 6) ? 6 : finalCombo}`);

                worldToolsSimplified.setDelay(() => {
                    this.setDebuffEvents(ply, randomDebuff, finalCombo);
                }, worldToolsSimplified.convertSecondsToTicks(1));
            }, constantDelay);
        }
    }

    /**
     * Metodo auxiliar que inserta los efectos de todos los debuffs disponibles a afectar a los usuarios.
     * @param {mc.Player} ply Jugador en concreto a afectar. 
     * @param {DebuffData} debuffData Los datos del debuff a conciderar.
     * @param {number} combo El combo asignado al jugador.
     * @returns {void}
     * @author HaJuegos - 19-05-2026
     * @private
     */
    private setDebuffEvents(ply: mc.Player, debuffData: DebuffData, combo: number): void {
        let msgData = debuffData.rawMsgCombos.find(msg => msg.idCombo === combo);
        let debuffEvent = debuffData.eventsCombo.find(ev => ev.specificCombo === combo || (ev.minRangeCombo && combo >= ev.minRangeCombo));

        if (!msgData) {
            msgData = debuffData.rawMsgCombos[debuffData.rawMsgCombos.length - 1];
        }

        if (!debuffEvent) {
            debuffEvent = debuffData.eventsCombo[debuffData.eventsCombo.length - 1];
        }

        ply.playSound('ui.abyss_attack.text_desc');

        if (debuffEvent) {
            debuffEvent.events(ply);
        }

        if (msgData) {
            ply.sendMessage(msgData.msg);
        }
    };

    /**
     * Metodo auxiliar que inserta los efectos en concreto de los Ojos del Abismo.
     * @param {mc.Player} ply Jugador en concreto al cual le afectara los efectos.
     * @param {boolean} [isFirstCombo] (Opcional) Aplicar un efecto unico si es el primer combo del efecto. Por defecto esta en false.
     * @returns {void}
     * @author HaJuegos - 19-05-2026
     * @private
     */
    private abyssSystem(ply: mc.Player, isFirstCombo: boolean = false): void {
        const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const lockItem = new mc.ItemStack('ha:void_item');

        lockItem.lockMode = mc.ItemLockMode.slot;
        lockItem.keepOnDeath = true;

        if (isFirstCombo) {
            customEventsManager.dropItemsPly(ply, [9, 10, 11, 12, 13, 14, 15, 16, 17], lockItem, [lockItem]);
        } else {
            let selectSlots = [];

            for (let i = 0; i < inv.size; i++) {
                const item = inv.getItem(i);

                if (!item || (item && item.typeId != 'ha:void_item')) {
                    selectSlots.push(i);
                }
            }

            if (selectSlots.length > 0) {
                const randomI = Math.floor(Math.random() * selectSlots.length);
                const randomSlot = selectSlots[randomI];

                customEventsManager.dropItemsPly(ply, randomSlot, lockItem, [lockItem]);
            }
        }
    }

    /**
     * Metodo auxiliar que inserta los bloqueos y efectos de las Garras del Vacio.
     * @param {mc.Player} ply Jugador en concreto al cual le afectara los efectos. 
     * @param {boolean} [lockMode] (Opcional) Por defecto esta en false, pero si es true, un item con bloqueo inv pasara a ser slot.
     * @returns {void}
     * @author HaJuegos - 19-05-2026 
     * @private
     */
    private voidSystem(ply: mc.Player, lockMode: boolean = false, specificLockAmount: number = 1, specificBlockAmount: number = 1): void {
        const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;

        let itemSlots: number[] = [];
        let previewLockSlots: number[] = [];

        for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);

            if (item) {
                const itemLockMode = item.lockMode;

                if (itemLockMode == mc.ItemLockMode.none) {
                    itemSlots.push(i);
                } else if (itemLockMode == mc.ItemLockMode.inventory) {
                    previewLockSlots.push(i);
                }
            }
        }

        if (lockMode && previewLockSlots.length > 0) {
            previewLockSlots.sort(() => Math.random() - 0.5);

            const finalLockSlots = previewLockSlots.slice(0, specificLockAmount);

            customEventsManager.lockItemsPly({
                ply: ply,
                lockMethod: mc.ItemLockMode.slot,
                invType: 'inv',
                itemsSelection: {
                    specificSlots: finalLockSlots,
                    whitelistItems: ['ha:void_item']
                }
            });
        }

        if (itemSlots.length > 0) {
            itemSlots.sort(() => Math.random() - 0.5);

            const finalBlockSlots = itemSlots.slice(0, specificBlockAmount);

            customEventsManager.lockItemsPly({
                ply: ply,
                lockMethod: mc.ItemLockMode.inventory,
                invType: 'inv',
                itemsSelection: {
                    specificSlots: finalBlockSlots,
                    whitelistItems: ['ha:void_item']
                }
            });
        }
    }

    /**
     * Metodo auxiliar que controla los eventos del debuff de Hambre Insasiable.
     * @param {mc.Player} ply Jugador en concreto afectado.
     * @returns {void}
     * @author HaJuegos - 20-05-2026
     * @private
     */
    private hungerSystem(ply: mc.Player): void {
        const hungerTag = ply.getTags().find(tag => tag.startsWith('hungerDebuff'));

        if (hungerTag) {
            const combo = parseInt(hungerTag.replace('hungerDebuff', ''));

            /**
             * Funcion auxiliar que controla los eventos para que un jugador consuma sus items de su inventario aleatoriamente.
             * @param {mc.Player} ply Jugador en concreto.
             * @param {number} [totalItems] (Opcional, por defecto: 1) Si se establece, sera el total de items a conciderar.
             * @param {number} [totalToConsume] (Opcional, por defecto: 1) Si se establece, sera el total de items a eliminar de un stack.
             * @returns {void}
             * @author HaJuegos - 20-05-2026
             */
            const eatRandomItem = (ply: mc.Player, totalItems: number = 1, totalToConsume: number = 1): void => {
                const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                const vanillaFoods = [
                    'apple', 'potato', 'beetroot', 'bread', 'carrot', 'chorus',
                    'chicken', 'cod', 'mutton', 'porkchop', 'rabbit', 'salmon',
                    'cookie', 'kelp', 'berries', 'honey', 'pufferfish', 'pumpkin_pie',
                    'rotten_flesh', 'spider_eye', 'beef', 'melon', 'stew', 'soup'
                ];

                let selectSlots = [];

                for (let i = 0; i < inv.size; i++) {
                    const item = inv.getItem(i);

                    if (item) {
                        const isCustomFood = item.hasComponent(mc.ItemComponentTypes.Food);
                        const isVanillaFood = vanillaFoods.some(food => item.typeId.includes(food));

                        if (isCustomFood || isVanillaFood) {
                            selectSlots.push(i);
                        }
                    }
                }

                if (selectSlots.length == 0) return;

                selectSlots.sort(() => Math.random() - 0.5);

                const finalSlots = selectSlots.slice(0, totalItems);

                for (const slot of finalSlots) {
                    const item = inv.getItem(slot);

                    if (!item) continue;

                    customEventsManager.manualDamageItem({
                        ply: ply,
                        item: item,
                        specificInv: 'inv',
                        specificSlot: slot,
                        specificAmount: totalToConsume
                    });
                }

                ply.playSound('random.eat');
                ply.playSound('random.burp');
            };

            switch (combo) {
                case 1: {
                    ply.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(60));
                } break;
                case 2: {
                    ply.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(300));
                } break;
                case 3: {
                    eatRandomItem(ply);
                    ply.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(600), { amplifier: 1 });
                } break;
                case 4: {
                    eatRandomItem(ply, 2);
                    ply.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(900), { amplifier: 1 });
                } break;
                case 5: {
                    eatRandomItem(ply, 3, 2);
                    ply.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(1200), { amplifier: 2 });
                } break;
                case 6: {
                    eatRandomItem(ply, 4, 3);
                    ply.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(1500), { amplifier: 3 });
                } break;
            }
        }
    }

    /**
     * Metodo auxiliar que controla los eventos del debuff de Somrbas Voraces.
     * @param {mc.Player} ply Jugador en concreto a considerar.
     * @returns {void}
     * @author HaJuegos - 20-05-2026
     * @private
     */
    private shadowsSystem(ply: mc.Player): void {
        const shedowsTag = ply.getTags().find(tag => tag.startsWith('shedowsDebuff'));

        if (!shedowsTag) return;

        const combo = parseInt(shedowsTag.replace('shedowsDebuff', ''));
        const effectAmp = Math.max(0, combo - 1);
        const effectDuration = worldToolsSimplified.convertSecondsToTicks(1);
        const dime = ply.dimension;
        const coords = ply.location;
        const nearEntities = dime.getEntities({ location: coords, maxDistance: 15, excludeFamilies: ['player'] });

        for (const entity of nearEntities) {
            if (!entity.isValid) continue;

            const targetEntity = entity.target;

            if (targetEntity && targetEntity.isValid && targetEntity.typeId == 'minecraft:player') {
                entity.addEffect('speed', effectDuration, { amplifier: effectAmp });
                entity.addEffect('strength', effectDuration, { amplifier: effectAmp });
            }
        }
    }

    /**
     * Metodo auxiliar que controla los eventos del debuff de la Furia Desquiciada.
     * @param {mc.Player} ply Jugador en concreto.
     * @param {boolean} [onlyEffect] (Opcional, por defecto en false) Si es true, entonces solo se ejecutara el efecto de fuerza. Pero no los demas eventos.
     * @returns {void}
     * @author HaJuegos - 20-05-2026
     * @private
     */
    private furySystem(ply: mc.Player, onlyEffect: boolean = false): void {
        if (this.globalFurySystem.has(ply.id)) return;

        this.globalFurySystem.add(ply.id);

        worldToolsSimplified.setRun(() => {
            this.globalFurySystem.delete(ply.id);
        });

        const furyTag = ply.getTags().find(tag => tag.startsWith('furyDebuff'));

        if (!furyTag) return;

        const combo = parseInt(furyTag.replace('furyDebuff', ''));

        let effectAmp = 0;
        let handChance = 0;
        let invItems = 0;
        let invRandomChance = 0;
        let armorItems = 0;
        let armorChance = 0;

        switch (combo) {
            case 1: {
                effectAmp = 0;
                handChance = 5;
            } break;
            case 2: {
                effectAmp = 0;
                handChance = 10;
            } break;
            case 3: {
                effectAmp = 1;
                handChance = 15;
                invItems = 1;
                invRandomChance = 5;
            } break;
            case 4: {
                effectAmp = 1;
                handChance = 20;
                invItems = 1;
                invRandomChance = 10;
            } break;
            case 5: {
                effectAmp = 2;
                handChance = 55;
                invItems = 1;
                invRandomChance = 10;
                armorItems = 1;
                armorChance = 20;
            } break;
            case 6: {
                effectAmp = 2;
                handChance = 100;
                invItems = 3;
                invRandomChance = 25;
                armorItems = 4;
                armorChance = 40;
            } break;
        }

        ply.addEffect('strength', worldToolsSimplified.convertSecondsToTicks(1), { amplifier: effectAmp });

        if (onlyEffect) return;

        const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const armorInv = ply.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
        const selectSlot = ply.selectedSlotIndex;

        /**
         * Funcion auxiliar que calcula y quita daño o resta stack a los items seleccionados.
         * @param {(mc.ItemStack | undefined)} item El item en concreto a analizar.
         * @param {number} pct El chance a conciderar que haya tocado. 
         * @param {'inv' | 'armor'} inv El inventario en concreto a considerar.
         * @param {number | mc.EquipmentSlot} [slot] (Opcional, por defecto siempre sera el slot de la mano) Si se define, se elejira el item de este slot en concreto. 
         * @returns {void}
         * @author HaJuegos - 20-05-2026
         */
        const damageItemPly = (item: mc.ItemStack | undefined, pct: number, inv: 'inv' | 'armor', slot?: number | mc.EquipmentSlot): void => {
            if (!item) return;

            const durability = item.getComponent(mc.ItemComponentTypes.Durability);

            if (!durability) return;

            const maxDurability = durability.maxDurability;
            const damage = Math.max(1, Math.floor(maxDurability * (pct / 100)));

            if (durability.unbreakable) {
                durability.unbreakable = false;
            }

            customEventsManager.manualDamageItem({ ply: ply, item: item, specificInv: inv, specificDamageDurability: damage, specificSlot: slot });
        };

        if (handChance > 0) {
            const item = inv.getItem(selectSlot);

            damageItemPly(item, handChance, 'inv');
        }

        if (invRandomChance > 0) {
            let slots: number[] = [];

            for (let i = 0; i < inv.size; i++) {
                const item = inv.getItem(i);

                if (i == selectSlot) continue;

                if (item) {
                    slots.push(i);
                }
            }

            slots.sort(() => Math.random() - 0.5);

            const finalSlots = slots.slice(0, invItems);

            for (const slot of finalSlots) {
                const item = inv.getItem(slot);

                damageItemPly(item, invRandomChance, 'inv', slot);
            }
        }

        if (armorChance > 0) {
            const allSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet];

            let selectSlots: mc.EquipmentSlot[] = [];

            for (const slot of allSlots) {
                const item = armorInv.getEquipment(slot);

                if (item) {
                    selectSlots.push(slot);
                }
            }

            selectSlots.sort(() => Math.random() - 0.5);

            const finalSlots = selectSlots.slice(0, armorItems);

            for (const slot of finalSlots) {
                const item = armorInv.getEquipment(slot);

                damageItemPly(item, armorChance, 'armor', slot);
            }
        }
    }

    /**
     * Metodo encargado de analizar la armadura del jugador para validar si tienen armadura de netherite o armaduras irrombiples para ponerles el componente de irropible vanilla.
     * @param {mc.Player} ply Jugador en concreto a analizar el item.
     * @returns {void}
     * @author HaJuegos - 22-05-2026
     * @private
     */
    private checkNetheriteArmor(ply: mc.Player): void {
        const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const armorInv = ply.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
        const furyTag = ply.getTags().find(tag => tag.startsWith('furyDebuff'));

        if (furyTag) return;

        const netheriteItemsArmor = [
            'minecraft:netherite_helmet',
            'minecraft:netherite_chestplate',
            'minecraft:netherite_leggings',
            'minecraft:netherite_boots'
        ];
        const equipSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet];

        /**
         * Metodo que valida si un item es una armadura de netherite y de paso le añade la irrompibilidad al mismo.
         * @param {(mc.ItemStack | undefined)} item El item en cuestion a considerar.
         * @returns {(mc.ItemStack | undefined)} Devuelve el item con la irrompibilidad integrada en caso de que todo sea correcto.
         * @author HaJuegos - 22-05-2026
         */
        const addUnbreak = (item: mc.ItemStack | undefined): mc.ItemStack | undefined => {
            if (!item || !netheriteItemsArmor.includes(item.typeId)) return undefined;

            const durability = item.getComponent(mc.ItemComponentTypes.Durability);

            if (!durability) return undefined;

            durability.unbreakable = true;

            return item;
        };

        for (let i = 0; i < inv.size; i++) {
            const newItem = addUnbreak(inv.getItem(i));

            if (newItem) {
                inv.setItem(i, newItem);
            }
        }

        for (const slot of equipSlots) {
            const newItem = addUnbreak(armorInv.getEquipment(slot));

            if (newItem) {
                armorInv.setEquipment(slot, newItem);
            }
        }
    }
}

new AbbysDebuffsEvents();