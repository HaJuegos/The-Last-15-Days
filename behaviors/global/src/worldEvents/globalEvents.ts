import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, debugToolsSimplified, fakePlysSimplified, worldToolsSimplified } from "simplified-mojang-api";

import { TL15DBaseManager } from "../base";

import { CustomDimensionsTypes } from "../customTypes";
import { MinecraftBiomeTypes } from "@minecraft/vanilla-data";

/**
 * Clase hijo que se encarga de los eventos globales del mundo.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 14-03-2026
 */
class GlobalWorldEventsManager extends TL15DBaseManager {
    /**
     * Eventos principales de la clase cuando es inicialiada o llamada.
     * @constructor
     */
    constructor () {
        super();

        this.checkBanState();
        this.checkHitboxesState();
        this.checkListOfFasItems();
        this.staticEvents();
    }

    /**
     * Metodo principal que revisa si hay un estado de baneo guardado en el mundo previamente.
     * @returns {void}
     * @author HaJuegos - 07-07-2026
     * @private
     */
    private checkBanState(): void {
        afterEventsSimplified.onPlayerSpawns(() => {
            const actualBanState = mc.world.getDynamicProperty('ha:ban_state') as boolean | undefined;

            if (actualBanState == undefined) return;

            TL15DBaseManager.banState = actualBanState;
        });
    }

    /**
     * Metodo principal que analiza si el jugador tenia activado previamente las hitboxes para ponerselas denuevo dependiendo el estado.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @private
     */
    private checkHitboxesState(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;
            const stateHitboxes = ply.getDynamicProperty('ha:hitboxes_state') as boolean | undefined;

            if (stateHitboxes == undefined) return;

            if (stateHitboxes) {
                debugToolsSimplified.showHitboxes(ply);
            } else {
                debugToolsSimplified.stopHitboxes(ply);
            }
        });
    }

    /**
     * Metodo principal que calcula dinamicamente la lista de items rapidos en el mundo.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @private
     */
    private checkListOfFasItems(): void {
        afterEventsSimplified.onWorldReady(() => {
            const listOfItemsLocal = mc.world.getDynamicProperty('ha:fastitems_list') as string | undefined;

            if (listOfItemsLocal) {
                try {
                    TL15DBaseManager.listOfFastItems = JSON.parse(listOfItemsLocal);
                } catch (e) { }
            }

            customEventsManager.fastItemsSystem(() => TL15DBaseManager.listOfFastItems);
        });

        afterEventsSimplified.onPlayerSpawns(() => {
            const listOfItemsLocal = mc.world.getDynamicProperty('ha:fastitems_list') as string | undefined;

            if (listOfItemsLocal) {
                try {
                    TL15DBaseManager.listOfFastItems = JSON.parse(listOfItemsLocal);
                } catch (e) { }
            }

            customEventsManager.fastItemsSystem(() => TL15DBaseManager.listOfFastItems);
        });
    }

    /**
     * Eventos globales estaticos del mundo en general.
     * @returns {void}
     * @private
     * @author HaJuegos - 15-07-2026
     */
    private staticEvents(): void {
        worldToolsSimplified.listenerScriptEvents(async (args) => {
            const id = args.id;
            const sourceEntity = args.sourceEntity;
            const msg = args.message;

            if (!sourceEntity) return;
            if (!sourceEntity.isValid) return;

            switch (id) {
                case 'ha:spawn_fake': {
                    for (let i = 0; i < 2; i++) {
                        fakePlysSimplified.createFakePly(`Test${i}`, sourceEntity.dimension, mc.GameMode.Survival);
                    }
                } break;
                case 'ha:no_sleeping_system': {
                    const ply = sourceEntity as mc.Player;

                    if (ply.getGameMode() == mc.GameMode.Spectator) return;

                    ply.removeTag('noSleepingYet');

                    if (msg == 'dia5') {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.no_sleeping_alert' }] });
                        ply.playSound('mob.player_ghost.death_sound');

                        ply.addTag('alertSleep');
                    } else {
                        const newScore = worldToolsSimplified.changeScoreInObj(ply, 'ha:sleep_count', 'add', 1);

                        if (newScore && newScore >= 5) {
                            ply.sendMessage({ rawtext: [{ translate: 'chat.system.no_sleeping_alert' }] });
                            ply.playSound('mob.player_ghost.death_sound');

                            ply.addTag('alertSleep');
                        }
                    }
                } break;
                case 'ha:pickup_change': {
                    const chance = 0.01;

                    if (Math.random() > chance) return;

                    const ply = sourceEntity as mc.Player;

                    if (ply.hasTag('random1Picked')) return;

                    worldToolsSimplified.setDelay(() => {
                        if (!ply.isValid) return;

                        ply.addTag('random1Picked');
                        ply.playSound('ui.pickupthephone');
                        ply.onScreenDisplay.setTitle('random1');
                    }, worldToolsSimplified.convertSecondsToTicks(2));
                } break;
                case 'ha:chance_backrooms': {
                    const chanceEnter = 0.005;
                    const fallDistance = 30;
                    const fallDuration = 2.5;

                    const tumbleEffects = 9;
                    const lateralTumble = 1.5;

                    if (Math.random() > chanceEnter) return;

                    const ply = sourceEntity as mc.Player;

                    if (ply.playerPermissionLevel == mc.PlayerPermissionLevel.Operator) return;
                    if (ply.hasTag('backroomsVisited')) return;
                    if (ply.dimension.id == CustomDimensionsTypes.BackRooms) return;

                    const dime = mc.world.getDimension(CustomDimensionsTypes.BackRooms);
                    const startCoords = ply.getHeadLocation();
                    const startRot = ply.getRotation();

                    ply.nameplateRenderDistance = 0;
                    ply.addTag('inCutSceneBackrooms');
                    ply.playAnimation('animation.player.no_clip.tp');
                    ply.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(fallDuration), { amplifier: 100 });

                    ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, false);
                    ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Camera, false);

                    ply.camera.setCamera('minecraft:free', { location: startCoords, rotation: startRot });

                    const stepTime = fallDuration / tumbleEffects;
                    const tumbleEasings = [mc.EasingType.InOutBack, mc.EasingType.InExpo, mc.EasingType.InOutSine];

                    for (let step = 1; step <= tumbleEffects; step++) {
                        const progress = step / tumbleEffects;

                        worldToolsSimplified.setDelay(() => {
                            const jitterX = (Math.random() - 0.5) * lateralTumble;
                            const jitterZ = (Math.random() - 0.5) * lateralTumble;
                            const tumbleP = Math.random() * 180 - 90;
                            const tumbleYaw = startRot.y + (Math.random() * 360 - 180);
                            const easeType = tumbleEasings[Math.floor(Math.random() * tumbleEasings.length)];

                            ply.camera.setCamera('minecraft:free', {
                                location: {
                                    x: startCoords.x + jitterX,
                                    y: startCoords.y - fallDistance * progress,
                                    z: startCoords.z + jitterZ
                                },
                                rotation: { x: tumbleP, y: tumbleYaw },
                                easeOptions: {
                                    easeTime: stepTime,
                                    easeType: easeType
                                }
                            });
                        }, worldToolsSimplified.convertSecondsToTicks(stepTime * step));
                    }

                    worldToolsSimplified.setDelay(() => {
                        ply.removeEffect('resistance');
                        ply.nameplateRenderDistance = 64;
                        ply.setGameMode(mc.GameMode.Spectator);
                        ply.tryTeleport({ x: 0, y: 0, z: 0 }, { dimension: dime });
                    }, worldToolsSimplified.convertSecondsToTicks(fallDuration));

                    afterEventsSimplified.onChangeDimension((args) => {
                        const toDime = args.toDimension;
                        const ply = args.player;

                        if (ply.playerPermissionLevel == mc.PlayerPermissionLevel.Operator) return;

                        if (toDime.id == CustomDimensionsTypes.BackRooms) {
                            const landSettle = 0.3;
                            const standUpDuration = 1.3;
                            const impactDuration = 0.4;
                            const tickGap = 1.5;

                            const spawnLoc = { x: 0, y: 0, z: 0 };
                            const startFallCam = { x: spawnLoc.x, y: spawnLoc.y + 6, z: spawnLoc.z };
                            const groundCam = { x: spawnLoc.x, y: spawnLoc.y + 0.2, z: spawnLoc.z };
                            const eyeCam = { x: spawnLoc.x, y: spawnLoc.y + 1.62, z: spawnLoc.z };
                            const lieRotation = { x: -85, y: startRot.y };
                            const standRotation = { x: 0, y: startRot.y };

                            ply.addTag('backroomsVisited');
                            ply.camera.setCamera('minecraft:free', { location: startFallCam, rotation: lieRotation });

                            customEventsManager.startTimerLocal({
                                sourcePly: ply,
                                timerId: 'ha:timer_backrooms',
                                initialMns: 10,
                                forceRestart: true,
                                onTimerEnds: (ply) => {
                                    ply.addEffect('fatal_poison', worldToolsSimplified.convertSecondsToTicks(99999), { amplifier: 0, showParticles: false });
                                }
                            });

                            worldToolsSimplified.setDelay(() => {
                                ply.camera.setCamera('minecraft:free', {
                                    location: groundCam,
                                    rotation: lieRotation,
                                    easeOptions: {
                                        easeTime: impactDuration,
                                        easeType: mc.EasingType.InQuad
                                    }
                                });

                                worldToolsSimplified.setDelay(() => {
                                    worldToolsSimplified.setDelay(() => {
                                        ply.camera.setCamera('minecraft:free', {
                                            location: eyeCam,
                                            rotation: standRotation,
                                            easeOptions: {
                                                easeTime: standUpDuration,
                                                easeType: mc.EasingType.InOutSine
                                            }
                                        });

                                        worldToolsSimplified.setDelay(() => {
                                            ply.removeTag('inCutSceneBackrooms');
                                            ply.setGameMode(mc.GameMode.Survival);

                                            ply.camera.clear();

                                            ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, true);
                                            ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Camera, true);
                                        }, worldToolsSimplified.convertSecondsToTicks(standUpDuration));
                                    }, worldToolsSimplified.convertSecondsToTicks(landSettle));
                                }, worldToolsSimplified.convertSecondsToTicks(impactDuration));
                            }, worldToolsSimplified.convertSecondsToTicks(tickGap));
                        }
                    });
                } break;
            }
        });
    }
}

new GlobalWorldEventsManager();