import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from 'simplified-mojang-api';

import { TL15DBaseManager } from "../base";
import { CustomDimensionsTypes } from '../customTypes';

/**
 * Clase hijo que controla los eventos relacionados con los jugadores.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 08-07-2026
 */
class PlyEventsManager extends TL15DBaseManager {
    /**
     * Variable global que contiene todos los datos de los jugadores al morir.
     * @type {Map<string, { coords: mc.Vector3, dime: mc.Dimension; viewCoords: mc.Vector3; }>}
     * @author HaJuegos - 18-06-2026
     * @private
     */
    private dataDeath = new Map<string, { coords: mc.Vector3, dime: mc.Dimension; viewCoords: mc.Vector3; }>;

    /**
     * Lista estatica de los slots de la armadura vanilla de forma tipica.
     * @type {mc.EquipmentSlot[]}
     * @author HaJuegos - 18-06-2026
     * @private
     * @readonly
     */
    private readonly armorSlots = [
        mc.EquipmentSlot.Head,
        mc.EquipmentSlot.Chest,
        mc.EquipmentSlot.Legs,
        mc.EquipmentSlot.Feet,
        mc.EquipmentSlot.Offhand
    ];

    /**
    * Eventos iniciales de la clase cuando es llamada o inicializada.
    * @constructor
    */
    constructor () {
        super();

        this.plySpawnEvents();
        this.deathEvents();
        this.chatManager();
        this.totemSystem();
    }

    /**
     * Metodo auxiliar que controla los eventos de un jugador cuando spawnea en el mundo.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @private
     */
    private plySpawnEvents(): void {
        afterEventsSimplified.onPlayerSpawns(async (args) => {
            const ply = args.player;
            const firstSpawn = args.initialSpawn;
            const dime = ply.dimension;
            const over = mc.world.getDimension(vanilla.MinecraftDimensionTypes.Overworld);
            const entityWorldData = await this.getEntityDataWorld();

            const objLinkeds = worldToolsSimplified.getOrCreateScorebordObj('ha:plys_linkeds') as mc.ScoreboardObjective;
            const participantsDeaths = objLinkeds.getParticipants().map(data => data.displayName);

            const objPendingRevive = worldToolsSimplified.getOrCreateScorebordObj('ha:pending_revive') as mc.ScoreboardObjective;
            const participantsRevive = objPendingRevive.getParticipants().map(data => data.displayName);

            const objPendingRemove = worldToolsSimplified.getOrCreateScorebordObj('ha:pending_remove_link') as mc.ScoreboardObjective;
            const participantsPendingRemove = objPendingRemove.getParticipants().map(data => data.displayName);

            this.setCustomRank(ply);

            if (participantsPendingRemove.length > 0) {
                for (const data of participantsPendingRemove) {
                    const [name, id] = data.split(':');

                    if (id == ply.id) {
                        ply.removeTag('isLinked');
                        objPendingRemove.removeParticipant(data);
                        break;
                    }
                }
            }

            if (participantsDeaths.length > 0) {
                let finalScore: string = "";
                let isMe: boolean = false;

                for (const data of participantsDeaths) {
                    const [namePlt1, idPly1, isDeath1, namePlt2, idPly2, isDeath2] = data.split(':');

                    if (idPly1 == ply.id && isDeath1 != 'true' && isDeath2 == 'true') {
                        finalScore = `${namePlt1}:${idPly1}:true:${namePlt2}:${idPly2}:${isDeath2}`;
                        objLinkeds.removeParticipant(data);
                        isMe = true;
                        break;
                    }

                    if (idPly2 == ply.id && isDeath2 != 'true' && isDeath1 == 'true') {
                        finalScore = `${namePlt1}:${idPly1}:${isDeath1}:${namePlt2}:${idPly2}:true`;
                        objLinkeds.removeParticipant(data);
                        isMe = true;
                        break;
                    }
                }

                if (isMe) {
                    worldToolsSimplified.changeScoreInObj(finalScore, 'ha:plys_linkeds', 'set', 1);
                    ply.runCommand(`function system/death_linked`);
                    ply.kill();
                }
            }

            if (ply.hasTag('banned') && TL15DBaseManager.banState) {
                let isLinked = false;

                if (participantsRevive.length > 0) {
                    for (const data of participantsRevive) {
                        const [name, id] = data.split(':');

                        if (id == ply.id) {
                            isLinked = true;
                            objPendingRevive.removeParticipant(data);
                        }
                    }
                }

                if (isLinked) {
                    let spawnAgain!: { coords: mc.Vector3, dime: mc.Dimension; } | undefined;

                    try {
                        const plySpawn = ply.getSpawnPoint();

                        if (plySpawn) {
                            spawnAgain = { coords: { x: plySpawn.x, y: plySpawn.y, z: plySpawn.z }, dime: plySpawn.dimension };
                        } else {
                            const topBlock = over.getTopmostBlock({ x: 0, z: 0 });

                            if (topBlock) {
                                spawnAgain = { coords: { x: topBlock.location.x, y: topBlock.location.y + 1, z: topBlock.location.z }, dime: over };
                            }
                        }
                    } catch {
                        spawnAgain = { coords: { x: 0, y: 100, z: 0 }, dime: over };
                    }

                    if (spawnAgain) {
                        ply.tryTeleport(spawnAgain.coords, { dimension: spawnAgain.dime });
                    } else {
                        ply.tryTeleport(mc.world.getDefaultSpawnLocation(), { dimension: over });
                        ply.runCommand(`spreadplayers ~ ~ 0 10 @s ~`);
                    }

                    ply.runCommand(`function system/revive_ply_system`);
                } else {
                    ply.runCommand(`kick "${ply.name}"`);
                }
            }

            if (!ply.hasTag('kit')) {
                const obj = worldToolsSimplified.getOrCreateScorebordObj('totalLives', 'ui.scoreboard.obj.title');
                const plyInv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container;

                if (!plyInv) return;

                const listOfItems: mc.ItemStack[] = [
                    new mc.ItemStack(vanilla.MinecraftItemTypes.TotemOfUndying),
                    new mc.ItemStack(vanilla.MinecraftItemTypes.GoldenCarrot, 15),
                    new mc.ItemStack(vanilla.MinecraftItemTypes.WaterBucket)
                ];

                for (const item of listOfItems) {
                    plyInv.addItem(item);
                }

                if (ply.name == 'ShadowCat8651') {
                    const randomAmount = Math.floor(Math.random() * 4) + 1;

                    plyInv.addItem(new mc.ItemStack('ha:banana', randomAmount));
                }

                ply.addTag('kit');

                ply.addEffect(vanilla.MinecraftEffectTypes.Resistance, worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 100, showParticles: true });

                worldToolsSimplified.setObjInDisplay('totalLives', mc.DisplaySlotId.Sidebar);
                obj?.addScore('ui.scoreboard.scores.lives', 1);
            }

            if ((dime.id == CustomDimensionsTypes.BackRooms && firstSpawn) || ply.hasTag('inCutSceneBackrooms')) {
                if (ply.playerPermissionLevel == mc.PlayerPermissionLevel.Operator) return;

                let spawnAgain!: { coords: mc.Vector3, dime: mc.Dimension; } | undefined;

                try {
                    const plySpawn = ply.getSpawnPoint();

                    if (plySpawn) {
                        spawnAgain = { coords: { x: plySpawn.x, y: plySpawn.y, z: plySpawn.z }, dime: plySpawn.dimension };
                    } else {
                        const topBlock = over.getTopmostBlock({ x: 0, z: 0 });

                        if (topBlock) {
                            spawnAgain = { coords: { x: topBlock.location.x, y: topBlock.location.y + 1, z: topBlock.location.z }, dime: over };
                        }
                    }
                } catch {
                    spawnAgain = { coords: { x: 0, y: 100, z: 0 }, dime: over };
                }

                if (spawnAgain) {
                    ply.tryTeleport(spawnAgain.coords, { dimension: spawnAgain.dime });
                } else {
                    ply.tryTeleport(mc.world.getDefaultSpawnLocation(), { dimension: over });
                    ply.runCommand(`spreadplayers ~ ~ 0 10 @s ~`);
                }

                ply.removeTag('inCutSceneBackrooms');
                ply.removeEffect('fatal_poison');
                ply.setGameMode(mc.GameMode.Survival);
                ply.camera.clear();
                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, true);
                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Camera, true);
            }

            const royerBotSpawned = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:royerbot_spawned');

            if (royerBotSpawned == 0) {
                ply.runCommand(`structure load ha:royerbot ${ply.location.x} ${ply.location.y} ${ply.location.z}`);
                worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:royerbot_spawned', 'set', 1);
            }

            this.getEntityDataWorld();
        });
    };

    /**
     * Metodo auxiliar que controla los eventos relacionados con la muerte de los jugadores.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @version 2 Optimizacion de codigo.
     * @private
     */
    private deathEvents(): void {
        afterEventsSimplified.onEntityDie((args) => {
            const plyEntity = args.deadEntity;
            const obj = worldToolsSimplified.getOrCreateScorebordObj('totalLives', 'ui.scoreboard.obj.title');

            if (plyEntity.typeId == 'minecraft:player' && !plyEntity.hasTag('death')) {
                worldToolsSimplified.setObjInDisplay('totalLives', mc.DisplaySlotId.Sidebar);
                obj?.addScore('ui.scoreboard.scores.lives', -1);
                obj?.addScore('ui.scoreboard.scores.deaths', 1);

                this.dataDeath.set(plyEntity.id, {
                    coords: plyEntity.location,
                    dime: plyEntity.dimension,
                    viewCoords: plyEntity.getViewDirection()
                });

                plyEntity.runCommand(`function system/death_effects`);

                this.spawnInventory(plyEntity as mc.Player, plyEntity.location, plyEntity.dimension);
                this.savePlyID(plyEntity as mc.Player);

                if (plyEntity.hasTag('isLinked')) {
                    this.soulLinkedEvents(plyEntity as mc.Player);
                }
            }
        });

        afterEventsSimplified.onPlayerSpawns((args) => {
            const plyEntity = args.player;
            const isFirstSpawn = args.initialSpawn;

            if (isFirstSpawn == false && (plyEntity.hasTag('death') && !plyEntity.hasTag('banned'))) {
                const data = this.dataDeath.get(plyEntity.id);

                if (!data) return;

                worldToolsSimplified.sendMessageGlobal(
                    {
                        rawtext: [
                            {
                                translate: "chat.system.last_location_player", with: {
                                    rawtext: [
                                        { text: `${plyEntity.name}` },
                                        { text: `${this.simplifiedCoords(data.coords)}` },
                                        { text: `${this.simplifiedDimension(data.dime)}` }
                                    ]
                                }
                            }
                        ]
                    }
                );

                plyEntity.tryTeleport(data.coords, { dimension: data.dime });

                worldToolsSimplified.setDelay(() => {
                    if (!plyEntity.isValid) return;

                    const knockbackForce = 1.35;
                    const horizontalVector = { x: data.viewCoords.x * knockbackForce, z: data.viewCoords.z * knockbackForce };
                    const verticalStrength = data.viewCoords.y * knockbackForce;

                    plyEntity.applyKnockback(horizontalVector, verticalStrength);

                    worldToolsSimplified.setDelay(() => {
                        if (!plyEntity.isValid) return;

                        plyEntity.addTag('banned');

                        if (!TL15DBaseManager.banState) return;

                        plyEntity.runCommand(`kick "${plyEntity.name}"`);
                    }, 1);
                }, worldToolsSimplified.convertSecondsToTicks(0.75));

                this.dataDeath.delete(plyEntity.id);
            }
        });
    };

    /**
     * Metodo auxiliar que guarda los datos del jugador muerto en el mundo, esto con el fin de usarse para futuros dias.
     * @param {mc.Player} ply Jugador en concreto a guardar datos.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @private
     */
    private async savePlyID(ply: mc.Player): Promise<void> {
        const entityWorldData = await this.getEntityDataWorld();
        const totalDeaths = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:death_counter');
        const newTotal = totalDeaths + 1;
        const isLinked = ply.hasTag('isLinked');

        const scoreValue = `${ply.name}:${ply.id}${isLinked ? ':true' : ':false'}`;

        worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:death_counter', 'set', newTotal);
        worldToolsSimplified.changeScoreInObj(`${scoreValue}`, 'ha:list_deaths', 'add', newTotal);
    }

    /**
     * Metodo auxiliar que revisa y ejecuta la logica para matar a un jugador cuando el otro jugador muere y estan linkeados.
     * @param {mc.Player} ply Jugador en concreto cuando muere.
     * @returns {void}
     * @author HaJuegos - 19-04-2026
     * @private
     */
    private soulLinkedEvents(ply: mc.Player): void {
        const objLinkeds = worldToolsSimplified.getOrCreateScorebordObj('ha:plys_linkeds') as mc.ScoreboardObjective;
        const participants = objLinkeds.getParticipants().map(data => data.displayName);

        if (participants.length <= 0) return;

        let finalScore: string = "";
        let targetPlyID: string = "";
        let found: boolean = false;

        for (const data of participants) {
            const [namePlt1, idPly1, isDeath1, namePlt2, idPly2, isDeath2] = data.split(':');

            if (idPly1 == ply.id && isDeath1 != 'true') {
                targetPlyID = idPly2;
                finalScore = `${namePlt1}:${idPly1}:true:${namePlt2}:${idPly2}:${isDeath2}`;
                objLinkeds.removeParticipant(data);
                found = true;
                break;
            }

            if (idPly2 == ply.id && isDeath2 != 'true') {
                targetPlyID = idPly1;
                finalScore = `${namePlt1}:${idPly1}:${isDeath1}:${namePlt2}:${idPly2}:true`;
                objLinkeds.removeParticipant(data);
                found = true;
                break;
            }
        }

        if (!found) return;

        worldToolsSimplified.changeScoreInObj(finalScore, 'ha:plys_linkeds', 'set', 1);

        const targetPly = mc.world.getPlayers().find(p => p.id == targetPlyID);

        if (targetPly && targetPly.hasTag('isLinked')) {
            targetPly.runCommand(`function system/death_linked`);
            targetPly.kill();
        }
    }

    /**
     * Metodo principal que controla los eventos del chat cuando un usuario envia un mensaje.
     * @returns {void}
     * @author HaJuegos - 08-07-2026
     * @version 2 Optimizacion de codigo.
     * @private
     */
    private chatManager(): void {
        beforeEventsSimplified.chatManager((args) => {
            const msg = args.message;
            const ply = args.sender;

            args.cancel = true;

            worldToolsSimplified.setRun(() => {
                const name = ply.name;
                const finalRank = this.getRanksPlys(name);
                const isLinked = ply.hasTag('isLinked') ? '' : '';
                const finalMsg = `§7§l[§r${finalRank}§7§l]§r${isLinked} ${name} §7§l>>§r ${msg}`;

                worldToolsSimplified.sendMessageGlobal(finalMsg);
            });
        });

        afterEventsSimplified.onHealthEntityChange((args) => {
            const entity = args.entity;

            if (!(entity instanceof mc.Player)) return;

            const newValue = Math.floor(args.newValue);
            const oldValue = Math.floor(args.oldValue);

            if (newValue != oldValue) {
                this.setCustomRank(entity, newValue, undefined, true);
            }
        });
    }

    /**
     * Metodo que maneja el sistema del uso de totems y el fast items.
     * @returns {void}
     * @author HaJuegos - 19-03-2026
     * @private
     */
    private totemSystem(): void {
        customEventsManager.fastItemsSystem(() => TL15DBaseManager.listOfFastItems);

        customEventsManager.onEntityUseTotem((ply) => {
            if (!(ply instanceof mc.Player)) return;

            worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.use_totem', with: { rawtext: [{ text: `${ply.name}` }] } }] });
        });
    }

    /**
     * Metodo auxiliar que prepara el spawneo de la entidad que reemplaza al jugador al morir con su inventario.
     * @param {(mc.Player | mc.Entity)} ply Jugador o entidad que murio a considerar. 
     * @param {mc.Vector3} coords Ultima localizacion a considerar.
     * @param {mc.Dimension} dime Ultima dimension a considerar.
     * @author HaJuegos - 13-03-2026
     * @private
     */
    private spawnInventory(ply: mc.Player, coords: mc.Vector3, dime: mc.Dimension): void {
        const ghostEntity = dime.spawnEntity('ha:player_ghost' as mc.VanillaEntityIdentifier, coords, { spawnEvent: 'minecraft:entity_spawned' });
        const plyInvContainer = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container;
        const plyArmorContainer = ply.getComponent(mc.EntityComponentTypes.Equippable);
        const ghostInvContainer = ghostEntity.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const nameGhost = `§g§l${ply.name}'s Inventory§r`;

        if (plyInvContainer && ghostInvContainer) {
            for (let i = 0; i < plyInvContainer.size; i++) {
                const item = plyInvContainer.getItem(i);

                if (item) {
                    ghostInvContainer.addItem(item);
                }
            }
        }

        if (plyArmorContainer && ghostInvContainer) {
            for (const slot of this.armorSlots) {
                const item = plyArmorContainer.getEquipment(slot);

                if (item) {
                    ghostInvContainer.addItem(item);
                }
            }
        }

        if (!ghostEntity.isValid) return;

        ghostEntity.nameTag = nameGhost;

        ply.runCommand(`clear @s`);
    }
}

new PlyEventsManager();