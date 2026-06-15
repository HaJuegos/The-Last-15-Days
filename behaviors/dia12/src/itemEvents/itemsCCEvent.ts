import * as mc from '@minecraft/server';

import { TL15DBaseManager } from "../base";
import { beforeEventsSimplified, ButtonFormBase, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Plantilla general para regisrar un nuevo componente custom para los items.
 * @interface TemplateCustomItem
 * @author HaJuegos - 15-04-2026
 */
interface TemplateCustomItem {
    idComponent: string;
    componentEvents: mc.ItemCustomComponent;
}

/**
 * Clase hijo que se encarga de los eventos principales de los componentes custom de los items custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 23-03-2026
 */
class ItemCustomComponentsManager extends TL15DBaseManager {
    private itemComponents: TemplateCustomItem[] = [
        {
            // Iron Apple Events
            idComponent: 'ha:iron_apple_events',
            componentEvents: {
                onConsume(args) {
                    const entity = args.source;
                    const name = (entity instanceof mc.Player) ? entity.name : entity.typeId.split(':').pop()!.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                    const effects: { id: string; seconds: number; lvl: number; }[] = [
                        { id: 'health_boost', seconds: worldToolsSimplified.convertSecondsToTicks(30), lvl: 3 },
                        { id: 'instant_health', seconds: worldToolsSimplified.convertSecondsToTicks(5), lvl: 0 },
                        { id: 'resistance', seconds: worldToolsSimplified.convertSecondsToTicks(30), lvl: 2 },
                        { id: 'regeneration', seconds: worldToolsSimplified.convertSecondsToTicks(5), lvl: 2 }
                    ];

                    for (const effect of effects) {
                        entity.addEffect(effect.id, effect.seconds, { amplifier: effect.lvl, showParticles: true });
                    }

                    worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.eat_iron_apple', with: { rawtext: [{ text: `${name}` }, { translate: 'item.ha:iron_apple' }] } }] });
                }
            }
        },
        {
            // Surprise Bundle Events
            idComponent: 'ha:surprise_bundle_events',
            componentEvents: {
                onUse: (args) => {
                    const sourcePly = args.source;
                    const item = args.itemStack;

                    if (item) {
                        sourcePly.playSound(`armor.equip_generic`);
                        sourcePly.runCommand(`structure load ha:books ~~1~`);

                        worldToolsSimplified.setRun(() => {
                            const bundle = new mc.ItemStack('minecraft:bundle');
                            const inv = sourcePly.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                            const slot = sourcePly.selectedSlotIndex;

                            inv.setItem(slot, undefined);
                            inv.addItem(bundle);
                        });
                    }
                }
            }
        },
        {
            // Allay Dust Events
            idComponent: 'ha:allay_dust_events',
            componentEvents: {
                onConsume: (args) => {
                    const sourceEntity = args.source;

                    worldToolsSimplified.setRun(() => {
                        sourceEntity.addEffect('levitation', worldToolsSimplified.convertSecondsToTicks(20), { amplifier: 0 });
                    });
                }
            }
        },
        {
            // Allay Essence Events
            idComponent: 'ha:allay_essence_events',
            componentEvents: {
                onConsume: (args) => {
                    const sourceEntity = args.source;

                    worldToolsSimplified.setRun(() => {
                        sourceEntity.addEffect('levitation', worldToolsSimplified.convertSecondsToTicks(20), { amplifier: 2 });
                        sourceEntity.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(10), { amplifier: 4 });
                    });
                }
            }
        },
        {
            // Soul Link Events
            idComponent: 'ha:soul_link_events',
            componentEvents: {
                onUse: (args) => {
                    const sourceEntity = args.source;
                    const deathCounter = mc.world.getDynamicProperty('ha:death_counter') as number | undefined;

                    if (sourceEntity.hasTag('isLinked')) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.alr_used' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    if (!deathCounter || deathCounter <= 0) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.no_plys_deaths' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    const uniquePlys = new Map<string, string>();

                    for (let i = 1; i <= deathCounter; i++) {
                        const dataPlys = mc.world.getDynamicProperty(`ha:player_death_data_${i}`) as string | undefined;

                        if (dataPlys) {
                            const [name, id, linked] = dataPlys.split(':');

                            if (name && id && !linked) {
                                uniquePlys.set(id, name);
                            }
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

                                worldToolsSimplified.setRun(() => {
                                    const dime = ply.dimension;
                                    const coords = ply.location;
                                    const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                                    const selectSlot = ply.selectedSlotIndex;
                                    const healthPly = ply.getComponent(mc.EntityComponentTypes.Health) as mc.EntityHealthComponent;
                                    const currentHealth = healthPly.currentValue;
                                    const damageAmount = Math.floor(currentHealth / 2);

                                    const currentDeathCounter = mc.world.getDynamicProperty('ha:death_counter') as number | undefined;
                                    let targetName;
                                    let targetID;

                                    if (currentDeathCounter) {
                                        for (let i = 1; i <= currentDeathCounter; i++) {
                                            const propKey = `ha:player_death_data_${i}`;
                                            const dataPlys = mc.world.getDynamicProperty(propKey) as string | undefined;

                                            if (dataPlys) {
                                                const [name, id] = dataPlys.split(':');

                                                if (id == targetPlayerId) {
                                                    mc.world.setDynamicProperty(propKey, `${name}:${id}:linked`);
                                                    targetName = name;
                                                    targetID = id;
                                                }
                                            }
                                        }
                                    }

                                    const currentSoulLinkeds = mc.world.getDynamicProperty('ha:linkeds_counter') as number | undefined;
                                    const nextLinkIndex = (currentSoulLinkeds ?? 0) + 1;

                                    mc.world.setDynamicProperty('ha:linkeds_counter', nextLinkIndex);
                                    mc.world.setDynamicProperty(`ha:soul_linkeds_${nextLinkIndex}`, `${ply.name}_${ply.id}:${targetName}_${targetID}`);

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

                                    ply.stopMusic();
                                    ply.removeEffect('slowness');
                                    ply.runCommand(`fog @s remove soullink`);
                                });
                            },
                            onClose: (ply) => {
                                worldToolsSimplified.setRun(() => {
                                    ply.playSound('random.enderchestclosed');
                                    ply.stopMusic();
                                    ply.removeEffect('slowness');
                                    ply.runCommand(`fog @s remove soullink`);
                                });
                            }
                        },
                    });
                }
            }
        },
        {
            // Knowledge Book Events
            idComponent: 'ha:knowledge_book_events',
            componentEvents: {
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
     * Metodo auxiliar que registra todos los componentes custom para items de forma automatica.
     * @author HaJuegos - 15-04-2026
     * @private
     */
    private registerComponents(): void {
        for (const itemConfig of this.itemComponents) {
            beforeEventsSimplified.createItemComponent(itemConfig.idComponent, itemConfig.componentEvents);
        }
    }
}

new ItemCustomComponentsManager();