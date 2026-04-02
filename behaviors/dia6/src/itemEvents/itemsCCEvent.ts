import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { TL15DBaseManager } from "../base";
import { beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

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

        this.ironAppleEvents();
    }

    /**
     * Metodo principal que controla los eventos principales de los componentes custom de la iron apple.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private ironAppleEvents(): void {
        const ironComponents: mc.ItemCustomComponent = {
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
        };

        beforeEventsSimplified.createItemComponent('ha:iron_apple_events', ironComponents);
    };
}

new ItemCustomComponentsManager();