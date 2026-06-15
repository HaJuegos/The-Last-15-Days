import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { TL15DBaseManager } from "../base";
import { beforeEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que se encarga de los eventos principales de los componentes custom de los items custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 23-03-2026
 */
class ItemCustomComponentsManager extends TL15DBaseManager {
    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        super();

        this.surpriseBundle();
    }

    /**
     * Metodo principal que controla los eventos principales de los componentes custom del surpriseBundle.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private surpriseBundle(): void {
        const bundleComponent: mc.ItemCustomComponent = {
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
        };

        beforeEventsSimplified.createItemComponent('ha:surprise_bundle_events', bundleComponent);
    };
}

new ItemCustomComponentsManager();