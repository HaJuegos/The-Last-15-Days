import * as mc from "@minecraft/server";

import { beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que se encarga de los eventos globales del mundo.
 * @author HaJuegos - 14-03-2026
 */
class GlobalWorldEventsManager {
    /**
     * Eventos principales de la clase cuando es inicialiada o llamada.
     * @constructor
     */
    constructor () {
        this.blockExploration();
    }

    /**
     * Metodo principal que controla los sensores para el bloqueo de exploracion hasta el limite.
     * @returns {void}
     * @author HaJuegos - 16-06-2026
     * @private
     */
    private blockExploration(): void {
        const limitExplorer = 900;
        const limitExplorerY = 120;

        /**
         * Funcion auxiliar que valida si el jugador esta en el limite de exploracion o no.
         * @param {{ x: number, y: number, z: number; }} coords Coordenadas a conciderar para calcular.
         * @returns {boolean} Devuelve true o false dependiendo la posicion.
         * @author HaJuegos - 16-06-2026 
         */
        const isOutOfBounds = (coords: { x: number, y: number, z: number; }): boolean => {
            return Math.abs(coords.x) > limitExplorer || Math.abs(coords.z) > limitExplorer || coords.y > limitExplorerY;
        };

        /**
         * Funcion auxiliar que cancela y avisa sobre el bloqueo del limite de exploracion cuando se llega a dicho limite.
         * @param {*} args Argumentos del evento en cuestion a considerar.
         * @param {mc.Player} ply Jugador en concreto a considerar.
         * @returns {void}
         * @author HaJuegos - 16-06-2026
         */
        const denyAction = (args: any, ply: mc.Player) => {
            args.cancel = true;

            worldToolsSimplified.setRun(() => {
                if (ply.isValid) {
                    ply.onScreenDisplay.setActionBar({ rawtext: [{ translate: 'chat.system.block_explorer' }] });
                    ply.playSound('ui.error_sound');
                }
            });
        };

        beforeEventsSimplified.onInteractBlock((args) => {
            if (isOutOfBounds(args.block.location)) {
                denyAction(args, args.player);
            }
        });

        beforeEventsSimplified.onPlaceBlock((args) => {
            if (isOutOfBounds(args.block.location)) {
                denyAction(args, args.player);
            }
        });

        beforeEventsSimplified.onBreakBlock((args) => {
            if (isOutOfBounds(args.block.location)) {
                denyAction(args, args.player);
            }
        });

        beforeEventsSimplified.onInteractEntity((args) => {
            const ply = args.player;
            const targetEntity = args.target;

            if (targetEntity && targetEntity.isValid && isOutOfBounds(targetEntity.location)) {
                denyAction(args, ply);
            }
        });
    }
}

new GlobalWorldEventsManager();