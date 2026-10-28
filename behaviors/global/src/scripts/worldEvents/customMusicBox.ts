import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { TL15DBaseManager } from "../base";
import { beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hija principal encargada de la logica de las musicas custom en los bloques de musica.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 20-08-2026
 */
class CustomMusicBoxManager extends TL15DBaseManager {
    /**
     * Variable local que almacena temporalmente la data de los bloques de musica que esten reproduciendo musica en todas las dimensiones.
     * @type {Map<string, { dime: mc.Dimension; coords: mc.Vector3; soundID: string; isPlaying: Set<string>; }>}
     * @author HaJuegos - 20-08-2026
     * @private
     */
    private jukeboxTracks: Map<string, { dime: mc.Dimension; coords: mc.Vector3; soundID: string; isPlaying: Set<string>; }> = new Map();

    /**
     * Eventos principales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

        this.managerMusicBox();
    }

    /**
     * Metodo principal que calcula a tiempo real si un disco debe o no reproducir musica custom a todos los jugadores y validar dicha accion.
     * @returns {void}
     * @author HaJuegos - 20-08-2026
     * @private
     */
    private managerMusicBox(): void {
        const radMusic = 64;

        /**
         * Todos los discos custom con su respectiva musica a conciderar.
         * @type {Record<string, string>}
         * @author HaJuegos - 20-08-2026
         */
        const customDiscs: Record<string, string> = {
            'ha:dragon_disc': 'record.athazagoraphobia.dragon_fight',
            'ha:final_disc': 'record.final_music',
            'ha:party_disc': 'record.party_starts',
            'ha:silla_disc': 'record.remix_de_una_silla'
        };

        /**
         * Metodo auxiliar que crea un ID temporal para identificar la caja de musica ejecutandose ahora mismo.
         * @param {mc.Vector3} coords Las coordenadas del bloque.
         * @param {string} dimeID El ID de la dimension del bloque.
         * @returns {string} Devuelve un ID temporal unico por bloque a identificar.
         * @author HaJuegos - 20-08-2026
         */
        const keyOf = (coords: mc.Vector3, dimeID: string) => `${dimeID}_${coords.x}_${coords.y}_${coords.z}`;

        beforeEventsSimplified.onInteractBlock((args) => {
            const block = args.block;
            const item = args.itemStack;
            const oneUse = args.isFirstEvent;

            if (!block.isValid || block.typeId != vanilla.MinecraftBlockTypes.Jukebox) return;

            const coords = block.location;
            const dime = block.dimension;
            const key = keyOf(coords, dime.id);
            const recordComponent = block.getComponent(mc.BlockComponentTypes.RecordPlayer) as mc.BlockRecordPlayerComponent;

            if (!recordComponent.getRecord()) {
                if (item && oneUse && customDiscs[item.typeId]) {
                    worldToolsSimplified.setRun(() => {
                        const soundID = customDiscs[item.typeId];
                        const nearPlys = dime.getPlayers({ location: coords, maxDistance: radMusic });
                        const isPlaying = new Set<string>();

                        for (const ply of nearPlys) {
                            ply.runCommand(`playsound ${soundID} @s ${coords.x} ${coords.y} ${coords.z}`);
                            isPlaying.add(ply.name);
                        }

                        this.jukeboxTracks.set(key, {
                            dime: dime,
                            coords: coords,
                            soundID: soundID,
                            isPlaying: isPlaying
                        });
                    });
                }
            } else {
                const itemBlock = recordComponent.getRecord();

                if (!itemBlock) return;

                const actualMusic = customDiscs[itemBlock.typeId];

                if (actualMusic) {
                    worldToolsSimplified.setRun(() => {
                        const tracker = this.jukeboxTracks.get(key);

                        if (tracker) {
                            for (const plyName of tracker.isPlaying) {
                                const ply = mc.world.getPlayers({ name: plyName })[0];

                                if (ply) {
                                    ply.runCommand(`stopsound @s ${actualMusic}`);
                                }
                            }

                            this.jukeboxTracks.delete(key);
                        }
                    });
                }
            }
        });

        beforeEventsSimplified.onBreakBlock((args) => {
            const block = args.block;

            if (!block || block.typeId != vanilla.MinecraftBlockTypes.Jukebox) return;

            const key = keyOf(block.location, block.dimension.id);
            const tracker = this.jukeboxTracks.get(key);

            if (!tracker) return;

            worldToolsSimplified.setRun(() => {
                for (const plyName of tracker.isPlaying) {
                    const ply = mc.world.getPlayers({ name: plyName })[0];

                    if (ply) {
                        ply.runCommand(`stopsound @s ${tracker.soundID}`);
                    }
                }

                this.jukeboxTracks.delete(key);
            });
        });

        worldToolsSimplified.setLoop(() => {
            for (const [key, tracker] of this.jukeboxTracks) {
                if (!tracker.dime) continue;

                const block = tracker.dime.getBlock(tracker.coords);
                const recordComponent = block?.isValid ? (block.getComponent(mc.BlockComponentTypes.RecordPlayer) as mc.BlockRecordPlayerComponent) : undefined;

                if (!block?.isValid || !recordComponent?.getRecord()) {
                    for (const plyName of tracker.isPlaying) {
                        const ply = mc.world.getPlayers({ name: plyName })[0];

                        if (ply) {
                            ply.runCommand(`stopsound @s ${tracker.soundID}`);
                        }
                    }

                    this.jukeboxTracks.delete(key);

                    continue;
                }

                const nearPlys = new Set(tracker.dime.getPlayers({ location: tracker.coords, maxDistance: radMusic }).map((ply) => ply.name));

                for (const namePly of nearPlys) {
                    if (!tracker.isPlaying.has(namePly)) {
                        const ply = mc.world.getPlayers({ name: namePly })[0];

                        if (ply) {
                            ply.runCommand(`playsound ${tracker.soundID} @s ${tracker.coords.x} ${tracker.coords.y} ${tracker.coords.z}`);

                            tracker.isPlaying.add(namePly);
                        }
                    }
                }

                for (const namePly of Array.from(tracker.isPlaying)) {
                    if (!nearPlys.has(namePly)) {
                        const ply = mc.world.getPlayers({ name: namePly })[0];

                        if (ply) {
                            ply.runCommand(`stopsound @s ${tracker.soundID}`);
                            tracker.isPlaying.delete(namePly);
                        }
                    }
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
    }
}

new CustomMusicBoxManager();