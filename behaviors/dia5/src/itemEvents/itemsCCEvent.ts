import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { beforeEventsSimplified, ButtonFormBase, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from '../base';

/**
 * Clase hijo que se encarga de los eventos principales de los componentes custom de los items custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 23-03-2026
 */
class ItemCustomComponentsManager extends TL15DBaseManager {
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
        },
        // Allay Dust Events
        {
            idComponent: 'ha:allay_dust_events',
            events: {
                onConsume: (args) => {
                    const sourceEntity = args.source;

                    worldToolsSimplified.setRun(() => {
                        sourceEntity.addEffect('levitation', worldToolsSimplified.convertSecondsToTicks(20), { amplifier: 0 });
                    });
                }
            }
        },
        // Allay Essence Events
        {
            idComponent: 'ha:allay_essence_events',
            events: {
                onConsume: (args) => {
                    const sourceEntity = args.source;

                    worldToolsSimplified.setRun(() => {
                        sourceEntity.addEffect('levitation', worldToolsSimplified.convertSecondsToTicks(20), { amplifier: 2 });
                        sourceEntity.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(10), { amplifier: 4 });
                    });
                }
            }
        },
        // Soul Link Events
        {
            idComponent: 'ha:soul_link_events',
            events: {
                onUse: async (args) => {
                    const sourceEntity = args.source;
                    const entityWorldData = await this.getEntityDataWorld();
                    const totalDeaths = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:death_counter');
                    const objDeaths = worldToolsSimplified.getOrCreateScorebordObj('ha:list_deaths') as mc.ScoreboardObjective;

                    if (sourceEntity.hasTag('isLinked')) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.alr_used' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    if (!totalDeaths || totalDeaths <= 0) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.no_plys_deaths' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    const deathDataPre = objDeaths.getParticipants().map(data => data.displayName);
                    const uniquePlys = new Map<string, string>();

                    for (const data of deathDataPre) {
                        const [name, id, linked] = data.split(':');

                        if ((name && id && linked == 'false') || (name && id && !linked)) {
                            uniquePlys.set(id, name);
                        }
                    }

                    if (uniquePlys.size <= 0) {
                        worldToolsSimplified.setRun(() => {
                            sourceEntity.sendMessage({ rawtext: [{ translate: 'chat.system.soul_link.no_plys_deaths' }] });
                            sourceEntity.playSound('ui.error_item');
                        });

                        return;
                    }

                    const buttons: ButtonFormBase[] = [];
                    const btnInds: string[] = [];

                    uniquePlys.forEach((name, id) => {
                        buttons.push({ buttomText: name, iconButtomUI: 'textures/ui/custom/default_headsteve' });
                        btnInds.push(id);
                    });

                    customEventsManager.createCustomClassicFormUI({
                        titleForm: { rawtext: [{ translate: 'ui.list_players_death.title' }] },
                        bodyText: { rawtext: [{ translate: 'ui.list_players_death.body' }] },
                        buttonsForm: buttons,
                        showPly: {
                            targetPly: sourceEntity,
                            onCreate: (ply) => {
                                worldToolsSimplified.setRun(() => {
                                    ply.playSound('random.enderchestopen');
                                    ply.playSound('ambient.soul_link');
                                    ply.addEffect('slowness', worldToolsSimplified.convertSecondsToTicks(99999), { amplifier: 7, showParticles: false });
                                    ply.runCommand(`fog @s push ha:fog_soul_linked_start soullink`);
                                });
                            },
                            onClickBtn: (ply, btn) => {
                                const targetPlayerId = btnInds[btn];

                                worldToolsSimplified.setRun(async () => {
                                    const dime = ply.dimension;
                                    const coords = ply.location;
                                    const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                                    const selectSlot = ply.selectedSlotIndex;
                                    const healthPly = ply.getComponent(mc.EntityComponentTypes.Health) as mc.EntityHealthComponent;
                                    const currentHealth = healthPly.currentValue;
                                    const damageAmount = Math.floor(currentHealth / 2);

                                    const entityWorldData = await this.getEntityDataWorld();
                                    const participants = objDeaths.getParticipants().map(data => data.displayName);
                                    const objTotal = worldToolsSimplified.getOrCreateScorebordObj('totalLives', 'ui.scoreboard.obj.title') as mc.ScoreboardObjective;

                                    let targetName;
                                    let targetID;
                                    let targetLink;

                                    for (const data of participants) {
                                        const [name, id, linked] = data.split(':');
                                        const bugLink = linked == undefined;

                                        if (id == targetPlayerId) {
                                            targetName = name;
                                            targetID = id;
                                            targetLink = bugLink ? ':false' : linked;
                                            break;
                                        }
                                    }

                                    const actualLinkeds = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:linkeds_counter');
                                    const newLinkeds = (actualLinkeds <= 0) ? 1 : actualLinkeds + 1;

                                    objDeaths.removeParticipant(`${targetName}:${targetID}:${targetLink}`);

                                    objTotal.addScore('ui.scoreboard.scores.deaths', -1);

                                    worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:linkeds_counter', 'add', 1);
                                    worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:death_counter', 'add', -1);

                                    worldToolsSimplified.changeScoreInObj(`${targetName}:${targetID}`, 'ha:pending_revive', 'set', newLinkeds);
                                    worldToolsSimplified.changeScoreInObj(`${targetName}:${targetID}:false:${ply.name}:${ply.id}:false`, 'ha:plys_linkeds', 'set', newLinkeds);

                                    if (targetID) {
                                        this.reviveInSpectator(targetID);
                                    }

                                    ply.addTag('isLinked');
                                    inv.setItem(selectSlot, undefined);
                                    ply.spawnParticle('ha:totem_link_particle', coords);
                                    ply.spawnParticle('minecraft:totem_particle', coords);
                                    ply.runCommand(`damage @s 0 override `);
                                    healthPly.setCurrentValue(damageAmount);
                                    ply.playSound('ui.soul_linked_used');
                                    ply.playSound('random.totem', { volume: 0.35 });

                                    worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.soul_link.select_player', with: { rawtext: [{ text: `${targetName}` }, { text: `${ply.name}` }] } }] });
                                    dime.runCommand(`playsound ui.soul_linked_used @a ${coords.x} ${coords.y} ${coords.z}`);
                                    dime.runCommand(`playsound random.totem @a ${coords.x} ${coords.y} ${coords.z} 0.35`);

                                    ply.stopSound('ambient.soul_link');
                                    ply.removeEffect('slowness');
                                    ply.runCommand(`fog @s remove soullink`);
                                });
                            },
                            onClose: (ply) => {
                                worldToolsSimplified.setRun(() => {
                                    ply.playSound('random.enderchestclosed');
                                    ply.stopSound('ambient.soul_link');
                                    ply.removeEffect('slowness');
                                    ply.runCommand(`fog @s remove soullink`);
                                });
                            }
                        },
                    });
                }
            }
        },
        // Lasagna Events
        {
            idComponent: 'ha:lasagna_events',
            events: {
                onConsume: (args) => {
                    const source = args.source;
                    const effects: Record<string, number> = {
                        'absorption': 4,
                        'haste': 4,
                        'speed': 2,
                        'health_boost': 2,
                        'resistance': 1
                    };

                    for (const [effect, level] of Object.entries(effects)) {
                        source.addEffect(effect, worldToolsSimplified.convertSecondsToTicks(60), { amplifier: level });
                    }
                }
            }
        }
    ];

    /**
     * Metodo auxiliar que revisa y revive a jugadores que esten vinculados y ya esten dentro del servidor sin necesidad de relogear.
     * @param {string} targetID ID del jugador en concreto a considerar.
     * @returns {void}
     * @author HaJuegos - 24-08-2026
     * @private
     */
    private reviveInSpectator(targetID: string): void {
        const plys = mc.world.getPlayers();
        const targetPly = plys.find((p) => p.id == targetID);

        if (!targetPly || !targetPly.isValid) return;

        const over = worldToolsSimplified.getDimension(vanilla.MinecraftDimensionTypes.Overworld) as mc.Dimension;

        let reviveData!: { coords: mc.Vector3, dime: mc.Dimension; } | undefined;

        try {
            const plySpawn = targetPly.getSpawnPoint();

            if (plySpawn) {
                reviveData = {
                    coords: { x: plySpawn.x, y: plySpawn.y, z: plySpawn.z },
                    dime: plySpawn.dimension
                };
            } else {
                const topBlock = over.getTopmostBlock({ x: 0, z: 0 });

                if (topBlock) {
                    reviveData = {
                        coords: { x: topBlock.x, y: topBlock.y, z: topBlock.z },
                        dime: topBlock.dimension
                    };
                }
            }
        } catch {
            reviveData = { coords: { x: 0, y: 70, z: 0 }, dime: over };
        }

        if (reviveData) {
            targetPly.tryTeleport(reviveData.coords, { dimension: reviveData.dime });
        } else {
            targetPly.tryTeleport(mc.world.getDefaultSpawnLocation(), { dimension: over });
            targetPly.runCommand(`spreadplayers ~ ~ 0 10 @s ~`);
        }

        targetPly.runCommand(`function system/revive_ply_system`);
        worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.form_revival_ply.success.player_revive', with: { rawtext: [{ text: `${targetPly.name}` }] } }] });

        const objPendingRevive = worldToolsSimplified.getOrCreateScorebordObj('ha:pending_revive') as mc.ScoreboardObjective;
        const participantsRevive = objPendingRevive.getParticipants().map(data => data.displayName);

        for (const data of participantsRevive) {
            const [name, id] = data.split(':');

            if (id == targetID) {
                objPendingRevive.removeParticipant(data);
                break;
            }
        }
    }

    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        super();

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