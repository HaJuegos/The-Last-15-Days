import * as mc from '@minecraft/server';

import { beforeEventsSimplified, ButtonFormBase, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";

import { TL15DBaseManager } from '../base';

/**
 * Clase hijo que se encarga de los eventos principales de los componentes custom de los items custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 23-03-2026
 */
class ItemCustomComponentsManager extends TL15DBaseManager {
    /**
     * Lista de todos los componentes custom a añadir respecto a items.
     * @type {ItemCustomCTemplate[]}
     * @author HaJuegos - 09-07-2026
     * @private
     * @readonly
     */
    private readonly listOfComponents: ItemCustomCTemplate[] = [
        // Iron Apple Events
        {
            idComponent: 'ha:iron_apple_events',
            events: {
                onConsume(args) {
                    const entity = args.source;
                    const effects: Record<string, number> = {
                        'resistance': 2,
                        'regeneration': 0,
                        'absorption': 0,
                    };

                    for (const [effect, level] of Object.entries(effects)) {
                        entity.addEffect(effect, worldToolsSimplified.convertSecondsToTicks(30), { amplifier: level, showParticles: true });
                    }
                }
            }
        },
        // Allay Dust Events
        {
            idComponent: 'ha:allay_dust_events',
            events: {
                onConsume: (args) => {
                    const sourceEntity = args.source;

                    worldToolsSimplified.setRun(() => {
                        sourceEntity.addEffect('levitation', worldToolsSimplified.convertSecondsToTicks(20), { amplifier: 0 });
                    });
                }
            }
        },
        // Allay Essence Events
        {
            idComponent: 'ha:allay_essence_events',
            events: {
                onConsume: (args) => {
                    const sourceEntity = args.source;

                    worldToolsSimplified.setRun(() => {
                        sourceEntity.addEffect('levitation', worldToolsSimplified.convertSecondsToTicks(20), { amplifier: 2 });
                        sourceEntity.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(10), { amplifier: 4 });
                    });
                }
            }
        },
        // Soul Link Events
        {
            idComponent: 'ha:soul_link_events',
            events: {
                onUse: async (args) => {
                    const sourceEntity = args.source;
                    const entityWorldData = await this.getEntityDataWorld();
                    const totalDeaths = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:death_counter');
                    const objDeaths = worldToolsSimplified.getOrCreateScorebordObj('ha:list_deaths') as mc.ScoreboardObjective;

                    if (sourceEntity.hasTag('isLinked')) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.alr_used' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    if (!totalDeaths || totalDeaths <= 0) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.no_plys_deaths' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    const deathDataPre = objDeaths.getParticipants().map(data => data.displayName);
                    const uniquePlys = new Map<string, string>();

                    for (const data of deathDataPre) {
                        const [name, id, linked] = data.split(':');

                        if ((name && id && linked == 'false') || (name && id && !linked)) {
                            uniquePlys.set(id, name);
                        }
                    }

                    if (uniquePlys.size <= 0) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.no_plys_deaths' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    const buttons: ButtonFormBase[] = [];
                    const btnInds: string[] = [];

                    uniquePlys.forEach((name, id) => {
                        buttons.push({ buttomText: name, iconButtomUI: 'textures/ui/custom/default_headsteve' });
                        btnInds.push(id);
                    });

                    customEventsManager.createCustomClassicFormUI({
                        titleForm: { rawtext: [{ translate: 'ui.list_players_death.title' }] },
                        bodyText: { rawtext: [{ translate: 'ui.list_players_death.body' }] },
                        buttonsForm: buttons,
                        showPly: {
                            targetPly: sourceEntity,
                            onCreate: (ply) => {
                                worldToolsSimplified.setRun(() => {
                                    ply.playSound('random.enderchestopen');
                                    ply.playSound('ambient.soul_link');
                                    ply.addEffect('slowness', worldToolsSimplified.convertSecondsToTicks(99999), { amplifier: 7, showParticles: false });
                                    ply.runCommand(`fog @s push ha:fog_soul_linked_start soullink`);
                                });
                            },
                            onClickBtn: (ply, btn) => {
                                const targetPlayerId = btnInds[btn];

                                worldToolsSimplified.setRun(async () => {
                                    const dime = ply.dimension;
                                    const coords = ply.location;
                                    const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                                    const selectSlot = ply.selectedSlotIndex;
                                    const healthPly = ply.getComponent(mc.EntityComponentTypes.Health) as mc.EntityHealthComponent;
                                    const currentHealth = healthPly.currentValue;
                                    const damageAmount = Math.floor(currentHealth / 2);

                                    const entityWorldData = await this.getEntityDataWorld();
                                    const participants = objDeaths.getParticipants().map(data => data.displayName);
                                    const objTotal = worldToolsSimplified.getOrCreateScorebordObj('totalLives', 'ui.scoreboard.obj.title') as mc.ScoreboardObjective;

                                    let targetName;
                                    let targetID;
                                    let targetLink;

                                    for (const data of participants) {
                                        const [name, id, linked] = data.split(':');
                                        const bugLink = linked == undefined;

                                        if (id == targetPlayerId) {
                                            targetName = name;
                                            targetID = id;
                                            targetLink = bugLink ? ':false' : linked;
                                            break;
                                        }
                                    }

                                    const actualLinkeds = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:linkeds_counter');
                                    const newLinkeds = (actualLinkeds <= 0) ? 1 : actualLinkeds + 1;

                                    objDeaths.removeParticipant(`${targetName}:${targetID}:${targetLink}`);

                                    objTotal.addScore('ui.scoreboard.scores.deaths', -1);

                                    worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:linkeds_counter', 'add', 1);
                                    worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:death_counter', 'add', -1);

                                    worldToolsSimplified.changeScoreInObj(`${targetName}:${targetID}`, 'ha:pending_revive', 'set', newLinkeds);
                                    worldToolsSimplified.changeScoreInObj(`${targetName}:${targetID}:false:${ply.name}:${ply.id}:false`, 'ha:plys_linkeds', 'set', newLinkeds);

                                    ply.addTag('isLinked');
                                    inv.setItem(selectSlot, undefined);
                                    ply.spawnParticle('ha:totem_link_particle', coords);
                                    ply.spawnParticle('minecraft:totem_particle', coords);
                                    ply.runCommand(`damage @s 0 override `);
                                    healthPly.setCurrentValue(damageAmount);
                                    ply.playSound('ui.soul_linked_used');
                                    ply.playSound('random.totem', { volume: 0.35 });

                                    worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.soul_link.select_player', with: { rawtext: [{ text: `${targetName}` }, { text: `${ply.name}` }] } }] });
                                    dime.runCommand(`playsound ui.soul_linked_used @a ${coords.x} ${coords.y} ${coords.z}`);
                                    dime.runCommand(`playsound random.totem @a ${coords.x} ${coords.y} ${coords.z} 0.35`);

                                    ply.stopSound('ambient.soul_link');
                                    ply.removeEffect('slowness');
                                    ply.runCommand(`fog @s remove soullink`);
                                });
                            },
                            onClose: (ply) => {
                                worldToolsSimplified.setRun(() => {
                                    ply.playSound('random.enderchestclosed');
                                    ply.stopSound('ambient.soul_link');
                                    ply.removeEffect('slowness');
                                    ply.runCommand(`fog @s remove soullink`);
                                });
                            }
                        },
                    });
                }
            }
        },
        // Knowledge Book Events
        {
            idComponent: 'ha:knowledge_book_events',
            events: {
                onUse: (args) => {
                    const ply = args.source;
                    const debuffMap: Record<string, string> = {
                        'abyssal': 'chat.system.debuff_name.abyssal',
                        'colossus': 'chat.system.debuff_name.colossus',
                        'hunger': 'chat.system.debuff_name.hunger',
                        'shadows': 'chat.system.debuff_name.shadows',
                        'soul': 'chat.system.debuff_name.decay',
                        'fury': 'chat.system.debuff_name.fury',
                        'void': 'chat.system.debuff_name.void'
                    };

                    const debuffIds = Object.keys(debuffMap);

                    let activeDebuffs: { transKey: string, timeTxt: string; }[] = [];

                    for (let i = 0; i < debuffIds.length; i++) {
                        const debuffID = debuffIds[i];
                        const endTime = ply.getDynamicProperty(`ha:debuff_timer_${debuffID}`) as number | undefined;

                        if (endTime == undefined) continue;

                        const remainMs = endTime - Date.now();

                        if (remainMs <= 0) continue;

                        const totalS = Math.floor(remainMs / 1000);
                        const minutes = Math.floor(totalS / 60);
                        const seconds = totalS % 60;
                        const mStr = minutes.toString().padStart(2, '0');
                        const sStr = seconds.toString().padStart(2, '0');
                        const timeFormatted = `§7${mStr}:${sStr}§r`;
                        const transKey = debuffMap[debuffID];

                        activeDebuffs.push({ transKey, timeTxt: timeFormatted });
                    }

                    if (activeDebuffs.length == 0) {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.ui.no_debuffs_timers' }] });
                        ply.playSound('ui.error_item');
                        return;
                    }

                    let finalText: any[] = [
                        { translate: 'ui.form_timers.main_text' }
                    ];

                    for (let i = 0; i < activeDebuffs.length; i++) {
                        finalText.push({ text: "- " });
                        finalText.push({ translate: activeDebuffs[i].transKey });
                        finalText.push({ text: `: ${activeDebuffs[i].timeTxt} ` });
                        finalText.push({ translate: 'ui.form_timers.time_remain' });

                        if (i < activeDebuffs.length - 1) {
                            finalText.push({ text: "\n\n" });
                        }
                    }

                    finalText.push({ text: "\n\n" });
                    finalText.push({ translate: 'ui.form_timers.final_title_form' });

                    customEventsManager.createCustomClassicFormUI({
                        titleForm: { rawtext: [{ translate: 'ui.form_timers.title_form' }] },
                        bodyText: { rawtext: finalText },
                        showPly: {
                            targetPly: ply,
                            onCreate: (ply) => {
                                ply.playSound('item.book.page_turn');
                                ply.playSound('particle.soul_escape');
                            }
                        }
                    });
                }
            }
        },
        // Lasagna Events
        {
            idComponent: 'ha:lasagna_events',
            events: {
                onConsume: (args) => {
                    const source = args.source;
                    const effects: Record<string, number> = {
                        'absorption': 4,
                        'haste': 4,
                        'speed': 2,
                        'health_boost': 2,
                        'resistance': 1
                    };

                    for (const [effect, level] of Object.entries(effects)) {
                        source.addEffect(effect, worldToolsSimplified.convertSecondsToTicks(60), { amplifier: level });
                    }
                }
            }
        }
    ];

    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        super();

        this.registerComponents();
    }

    /**
     * Metodo principal que registra los componentes custom de items especificos guardados en la variable.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @private
     */
    private registerComponents(): void {
        for (const component of this.listOfComponents) {
            beforeEventsSimplified.createItemComponent(component.idComponent, component.events);
        }
    }
}

new ItemCustomComponentsManager();