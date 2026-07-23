import * as vanilla from '@minecraft/vanilla-data';

import { beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que controla los eventos relacionados con los jugadores.
 * @author HaJuegos - 11-03-2026
 */
class PlyEventsManager {
    /**
     * Lista estatica de los items que se usan para enceder un portal al nether.
     * @type {vanilla.MinecraftItemTypes[]}
     * @author HaJuegos - 18-06-2026
     * @private
     * @readonly
     */
    private readonly portalIgnitionItems: vanilla.MinecraftItemTypes[] = [
        vanilla.MinecraftItemTypes.FlintAndSteel,
        vanilla.MinecraftItemTypes.FireCharge
    ];

    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        this.blockPortals();
    }

    /**
     * Metodo auxiliar que controla el bloqueo de los portales, de forma temporal. 
     * @author HaJuegos - 15-03-2026
     * @private
     */
    private blockPortals(): void {
        beforeEventsSimplified.onInteractBlock((args) => {
            const ply = args.player;
            const block = args.block;
            const item = args.itemStack;

            if (!item) return;

            const isNetherAttempt = block.typeId == vanilla.MinecraftBlockTypes.Obsidian && this.portalIgnitionItems.includes(item.typeId as vanilla.MinecraftItemTypes);
            const isEndAttempt = block.typeId == vanilla.MinecraftBlockTypes.EndPortalFrame && item.typeId == vanilla.MinecraftItemTypes.EnderEye;

            if (isNetherAttempt || isEndAttempt) {
                args.cancel = true;

                worldToolsSimplified.setRun(() => {
                    ply.playSound('ui.error_sound');
                    ply.sendMessage({ translate: 'chat.system.error_no_perms' });
                });
            }
        });
    }
}

new PlyEventsManager();