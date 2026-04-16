import * as mc from '@minecraft/server';

import { TL15DBaseManager } from "../base";
import { beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

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