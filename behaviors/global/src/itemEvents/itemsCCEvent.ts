import * as mc from '@minecraft/server';

import { TL15DBaseManager } from "../base";
import { beforeEventsSimplified, ButtonFormBase, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";

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
        // Banana events
        {
            idComponent: 'ha:banana_events',
            events: {
                onConsume(args) {
                    const entity = args.source;
                    const name = (entity instanceof mc.Player) ? entity.name : entity.typeId.split(':').pop()!.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');;

                    worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.banana_eated', with: { rawtext: [{ text: `${name}` }] } }] });

                    entity.addEffect('absorption', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 3 });
                    entity.addEffect('regeneration', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 4 });
                    entity.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 2 });
                    entity.addEffect('haste', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 9 });
                    entity.addEffect('health_boost', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 3 });
                    entity.addEffect('strength', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 4 });
                    entity.addEffect('bad_omen', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 10 });

                    if (entity instanceof mc.Player) {
                        entity.spawnParticle('ha:banana_confetti', entity.location);
                        entity.playSound('ui.banana_eated');
                    }
                }
            }
        },
        // Suprise Bundle Events
        {
            idComponent: 'ha:surprise_bundle_events',
            events: {
                onUse: (args) => {
                    const sourcePly = args.source;
                    const item = args.itemStack;

                    if (item) {
                        sourcePly.playSound(`armor.equip_generic`);
                        sourcePly.runCommand(`structure load ha:books ~~1~`);

                        worldToolsSimplified.setRun(() => {
                            const bundle = new mc.ItemStack('minecraft:bundle');
                            const inv = sourcePly.getComponent(mc.EntityComponentTypes.Inventory)?.container;
                            const slot = sourcePly.selectedSlotIndex;

                            if (inv) {
                                inv.setItem(slot, undefined);
                                inv.addItem(bundle);
                            }
                        });
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