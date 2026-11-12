import * as mc from '@minecraft/server';
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
        this.staticEvents();
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

    /**
     * Metodo auxiliar que contiene los eventos estaticos por medio de scriptevents de jugadores.
     * @returns {void}
     * @author HaJuegos - 11-11-2026
     * @private
     */
    private staticEvents(): void {
        worldToolsSimplified.listenerScriptEvents((args) => {
            const id = args.id;
            const ply = args.sourceEntity as mc.Player;

            if (id == "ha:start_damage_biome") {
                const getActualProperty = ((prop: string) => {
                    return ply.getProperty(prop) as string | boolean;
                });

                const loopID = worldToolsSimplified.setLoop(() => {
                    const damageType = getActualProperty('ha:damage_biome') as string;
                    const isRunning = getActualProperty('ha:start_damage_biome') as boolean;

                    if (damageType == "cold") {
                        if (ply.isValid) {
                            ply.applyDamage(1, { cause: mc.EntityDamageCause.freezing });
                        }
                    } else if (damageType == "warm") {
                        if (ply.isValid) {
                            const applyDamage = ply.setOnFire(3, true);

                            if (!applyDamage) {
                                ply.applyDamage(1, { cause: mc.EntityDamageCause.override });
                            }
                        }
                    }

                    if (!isRunning) {
                        worldToolsSimplified.stopLoop(loopID);
                    }
                }, worldToolsSimplified.convertSecondsToTicks(1));
            }
        });
    }
}

new PlyEventsManager();