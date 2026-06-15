import * as mc from "@minecraft/server";
import { afterEventsSimplified } from "simplified-mojang-api";

import { TL15DBaseManager } from "../base";

/**
 * Metodo principal que controla los eventos al momento de crear o ejecutar el mundo.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 12-03-2026
 */
class InitialWorldEventsManager extends TL15DBaseManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

        this.initEvents();
    }

    /**
     * Metodo auxiliar que carga los eventos principales cuando el mundo se carga.
     * @author HaJuegos - 12-03-2026
     * @private
     */
    private initEvents(): void {
        afterEventsSimplified.onWorldReady((args) => {
            Object.entries(this.initialGameRules).forEach(([rule, value]) => {
                // @ts-ignore no acepta string en este aspecto xd
                mc.world.gameRules[rule] = value;
            });
        });
    }
}

new InitialWorldEventsManager();