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
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;
            const firstSpawn = args.initialSpawn;
            const dime = ply.dimension;
            const over = mc.world.getDimension(vanilla.MinecraftDimensionTypes.Overworld);

            this.setCustomRank(ply);

            if (ply.hasTag('banned') && TL15DBaseManager.banState) {
                ply.runCommand(`kick "${ply.name}"`);
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

                if (ply.name == 'TheShadowcat318') {
                    const randomAmount = Math.floor(Math.random() * 4) + 1;

                    plyInv.addItem(new mc.ItemStack('ha:banana', randomAmount));
                }

                ply.addTag('kit');

                ply.addEffect(vanilla.MinecraftEffectTypes.Resistance, worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 100, showParticles: true });

                worldToolsSimplified.setObjInDisplay('totalLives', mc.DisplaySlotId.Sidebar);
                obj?.addScore('ui.scoreboard.scores.lives', 1);
            }

            if ((dime.id == CustomDimensionsTypes.BackRooms && firstSpawn) || ply.hasTag('inCutSceneBackrooms')) {
                ply.tryTeleport({ x: 0, y: 0, z: 0 }, { dimension: over });

                worldToolsSimplified.setDelay(() => {
                    ply.runCommand(`spreadplayers 0 0 1 10 @s`);
                    ply.removeTag('inCutSceneBackrooms');
                    ply.removeEffect('fatal_poison');
                    ply.setGameMode(mc.GameMode.Survival);

                    ply.camera.clear();

                    ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, true);
                    ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Camera, true);
                }, worldToolsSimplified.convertSecondsToTicks(2));
            }

            const spawnedSts = mc.world.getDynamicProperty('ha:royerbot_npc_spawned') as boolean | undefined;

            if (spawnedSts) return;

            mc.world.setDynamicProperty('ha:royerbot_npc_spawned', true);

            ply.runCommand(`structure load ha:royerbot ${ply.location.x} ${ply.location.y} ${ply.location.z}`);
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
        const scoreValue = `${ply.name}:${ply.id}${isLinked ? ':true' : ''}`;

        worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:death_counter', 'set', newTotal);
        worldToolsSimplified.changeScoreInObj(`${scoreValue}`, 'ha:list_deaths', 'add', newTotal);
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

            const dime = ply.dimension;
            const plys = dime.getPlayers();

            worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.use_totem', with: { rawtext: [{ text: `${ply.name}` }] } }] });

            for (const ply of plys) {
                ply.playSound('random.totem', { volume: 0.65 });
            }
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