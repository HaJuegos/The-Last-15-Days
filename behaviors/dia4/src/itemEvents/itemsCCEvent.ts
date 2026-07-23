import * as mc from '@minecraft/server';

import { beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que se encarga de los eventos principales de los componentes custom de los items custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 23-03-2026
 */
class ItemCustomComponentsManager {
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
        }
    ];

    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
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