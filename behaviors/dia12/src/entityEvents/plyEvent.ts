import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";

/**
 * Clase hijo que controla los eventos relacionados con los jugadores.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 11-03-2026
 */
class PlyEventsManager extends TL15DBaseManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

        customEventsManager.fastItemsSystem([
            'totem',
            'shield',
            'arrow'
        ]);

        this.plySpawnEvents();
        this.deathEvents();
        this.chatManager();
        this.totemSystem();
        this.breakBlocks();
        this.itemsSystem();
        this.loopTimerDolphin();
        this.loopTimerBearTrap();
        this.customMusicBox();
    }

    /**
     * Timer que controla el tiempo de estadia de una trampa de oso pegada a un jugador y sus respectivos eventos.
     * @returns {void}
     * @author HaJuegos - 09-06-2026
     * @private
     */
    private loopTimerBearTrap(): void {
        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                const scnds = (worldToolsSimplified.getPlyScoreInObj(ply, 'timerBearTrap') as number ?? 0);
                const hasTag = ply.hasTag('hasBearTrap');

                if (!hasTag && scnds <= 0) continue;

                let reset = false;

                if (hasTag) {
                    ply.removeTag('hasBearTrap');
                    ply.setDynamicProperty('ha:timer_bear_trap', undefined);
                    reset = true;
                }

                customEventsManager.startTimerLocal({
                    timerId: 'ha:timer_bear_trap',
                    sourcePly: ply,
                    initialScnds: scnds,
                    forceRestart: reset,
                    onTimerStarts: (ply) => {
                        ply.sendMessage({ translate: 'chat.system.timer_bear_trap.starts', with: { rawtext: [{ text: `${scnds}` }] } });
                        ply.triggerEvent('ha:set_in_trap_mode');
                    },
                    onSecondPass: (ply) => {
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, false);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Sneak, false);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Mount, false);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Jump, false);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Dismount, false);

                        ply.playSound('random.click', { pitch: 1.5 });
                        ply.applyDamage(2, { cause: mc.EntityDamageCause.thorns, damagingEntity: ply });

                        worldToolsSimplified.changePlyScoreInObj(ply, 'timerBearTrap', 'add', -1);
                    },
                    onTimerEnds: (ply) => {
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, true);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Sneak, true);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Mount, true);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Jump, true);
                        ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Dismount, true);

                        ply.playSound('mob.guardian.death');
                        ply.triggerEvent('ha:remove_in_trap_mode');
                    }
                });
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
    }

    /**
     * Metodo principal que controla los eventos del timer del delfin en caso de ser necesario.
     * @author HaJuegos - 05-04-2026
     * @private
     */
    private loopTimerDolphin(): void {
        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                const minutes = (worldToolsSimplified.getPlyScoreInObj(ply, 'dolphinTimer') as number ?? 0);
                const hasTag = ply.hasTag('hasDolphinDamage');

                if (!hasTag && minutes <= 0) continue;

                let restart = false;

                if (hasTag) {
                    ply.removeTag('hasDolphinDamage');
                    ply.setDynamicProperty('ha:timer_dolphin', undefined);
                    restart = true;
                }

                customEventsManager.startTimerLocal({
                    sourcePly: ply,
                    timerId: 'ha:timer_dolphin',
                    initialMns: minutes ?? 0,
                    forceRestart: restart,
                    onTimerStarts: (ply) => {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.hit_by_dolphin', with: { rawtext: [{ text: `${minutes}` }] } }] });
                    },
                    onSecondPass: (ply, timer) => {
                        ply.onScreenDisplay.setActionBar({
                            rawtext: [
                                {
                                    translate: 'ui.system.dolphin_timer',
                                    with: { rawtext: [{ text: `${timer}` }] }
                                }
                            ]
                        });

                        ply.playSound('random.click', { pitch: 1.5 });
                        ply.triggerEvent('ha:set_remove_breath');
                    },
                    onMinutePass: (ply) => {
                        worldToolsSimplified.changePlyScoreInObj(ply, 'dolphinTimer', 'add', -1);
                    },
                    onTimerEnds: (ply) => {
                        ply.triggerEvent('ha:set_normal_breath');
                    }
                });
            }
        }, 10);
    }

    /**
     * Metodo privado auxiliar que controla las musicas custom en la jukebox por items custom para evitar errores.
     * @returns {void}
     * @author HaJuegos - 13-06-2026
     * @private
     */
    private customMusicBox(): void {
        beforeEventsSimplified.onInteractBlock((args) => {
            const block = args.block;
            const item = args.itemStack;
            const oneUse = args.isFirstEvent;
            const validDiscs: Record<string, string> = {
                'ha:dragon_disc': 'record.athazagoraphobia.dragon_fight',
                'ha:final_disc': 'record.final_music',
                'ha:party_disc': 'record.party_starts',
                'ha:silla_disc': 'record.remix_de_una_silla'
            };

            if (block.isValid && block.typeId == vanilla.MinecraftBlockTypes.Jukebox) {
                const coords = block.location;
                const dime = block.dimension;
                const record = block.getComponent(mc.BlockComponentTypes.RecordPlayer) as mc.BlockRecordPlayerComponent;

                if (!record.getRecord()) {
                    if (item && oneUse && validDiscs[item.typeId]) {
                        worldToolsSimplified.setRun(() => {
                            const soundId = validDiscs[item.typeId];

                            dime.runCommand(`playsound ${soundId} @a ${coords.x} ${coords.y} ${coords.z}`);
                        });
                    }
                } else {
                    const itemRecord = record.getRecord() as mc.ItemStack;
                    const actualMusic = validDiscs[itemRecord.typeId];

                    worldToolsSimplified.setRun(() => {
                        dime.runCommand(`execute positioned ${coords.x} ${coords.y} ${coords.z} run stopsound @a[r=64] ${actualMusic}`);
                    });
                }
            }
        });
    }

    /**
     * Metodo auxiliar que controla los eventos de un jugador cuando spawnea en el mundo.
     * @author HaJuegos - 13-03-2026
     * @private
     */
    private plySpawnEvents(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;
            const deathCounter = mc.world.getDynamicProperty('ha:death_counter') as number | undefined;
            const pendingDeath = mc.world.getDynamicProperty(`ha:pending_death_${ply.id}`);

            this.setCustomRank(ply);
            ply.triggerEvent('ha:set_normal_breath');

            if (pendingDeath) {
                mc.world.setDynamicProperty(`ha:pending_death_${ply.id}`, undefined);

                worldToolsSimplified.setRun(() => {
                    worldToolsSimplified.setDelay(() => {
                        ply.runCommand(`function system/death_linked`);
                        ply.kill();
                    }, worldToolsSimplified.convertSecondsToTicks(0.5));
                });

                return;
            }

            if (ply.hasTag('banned')) {
                let isLinked = false;

                ply.removeTag('isLinked');

                if (deathCounter) {
                    for (let i = 1; i <= deathCounter; i++) {
                        const propKey = `ha:player_death_data_${i}`;
                        const dataPlys = mc.world.getDynamicProperty(propKey) as string | undefined;

                        if (dataPlys) {
                            const [name, id, linked] = dataPlys.split(':');

                            if (id == ply.id) {
                                if (linked == 'linked') {
                                    isLinked = true;
                                    mc.world.setDynamicProperty(propKey, undefined);
                                    break;
                                }
                            }
                        }
                    }
                }

                if (isLinked) {
                    ply.runCommand(`function system/revive_ply_system`);
                } else {
                    ply.runCommand(`kick "${ply.name}" `);
                }
            }

            if (!ply.hasTag('kit')) {
                const plyInv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                const listOfItems: mc.ItemStack[] = [
                    new mc.ItemStack(vanilla.MinecraftItemTypes.TotemOfUndying),
                    new mc.ItemStack(vanilla.MinecraftItemTypes.GoldenCarrot, 15),
                    new mc.ItemStack(vanilla.MinecraftItemTypes.WaterBucket)
                ];

                for (const item of listOfItems) {
                    item.lockMode = mc.ItemLockMode.inventory;
                    item.keepOnDeath = true;

                    plyInv.addItem(item);
                }

                ply.addTag('kit');
                ply.addEffect(vanilla.MinecraftEffectTypes.Resistance, worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 100, showParticles: true });
            }
        });
    };

    /**
     * Metodo principal que contiene la logicas de cuando un jugador rompe un bloque en concreto y pasan cosas.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private breakBlocks(): void {
        beforeEventsSimplified.onBreakBlock((args) => {
            const block = args.block;
            const ply = args.player;

            switch (block.typeId) {
                case vanilla.MinecraftBlockTypes.DeepslateDiamondOre:
                case vanilla.MinecraftBlockTypes.DiamondOre: {
                    ply.applyDamage(4, { cause: mc.EntityDamageCause.sonicBoom, damagingEntity: ply });
                } break;
                case vanilla.MinecraftBlockTypes.AncientDebris: {
                    const dime = block.dimension;
                    const coords = block.location;

                    worldToolsSimplified.setRun(() => {
                        dime.setBlockType(coords, vanilla.MinecraftBlockTypes.FlowingLava);
                        dime.spawnEntity('minecraft:silverfish', coords, { spawnEvent: 'minecraft:entity_spawned' });
                    });
                } break;
                case vanilla.MinecraftBlockTypes.Potatoes: {
                    args.cancel = true;

                    const coords = block.location;
                    const dime = block.dimension;

                    worldToolsSimplified.setRun(() => {
                        dime.setBlockType(coords, vanilla.MinecraftBlockTypes.Air);
                    });
                } break;
            }
        });
    }

    /**
     * Metodo principal que controla los eventos principales de los items vanilla en caso de usarse en un jugador.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private itemsSystem(): void {
        /**
         * Lista de items infernales a obtener en el evento del nether.
         * @type {Record<string, string>}
         * @author HaJuegos - 07-06-2026
         */
        const infernalItems: Record<string, string> = {
            'ha:infernal_gem_blaze': 'hasBlaze',
            'ha:infernal_gem_piglin': 'hasPiglin',
            'ha:infernal_gem_magma': 'hasMagma',
            'ha:soul_fire': 'hasGhast',
            'ha:infernal_crown_empty': 'hasWither'
        };

        /**
         * Todos los items de la armadura cautelosa a conseguir.
         * @type {Record<string, string>}
         * @author HaJuegos - 07-06-2026
         */
        const cautiousItems: Record<string, string> = {
            'ha:cautious_helmet': 'hasCHelmet',
            'ha:cautious_chestplate': 'hasCChestplate',
            'ha:cautious_leggings': 'hasCLeggings',
            'ha:cautious_boots': 'hasCBoots'
        };

        beforeEventsSimplified.onUseItem((args) => {
            const item = args.itemStack;
            const ply = args.source;

            switch (item.typeId) {
                case vanilla.MinecraftItemTypes.EnderPearl: {
                    worldToolsSimplified.setRun(() => {
                        const cooldownCompo = item.getComponent('cooldown') as mc.ItemCooldownComponent;
                        const remainsColdown = cooldownCompo.getCooldownTicksRemaining(ply);

                        if (remainsColdown > 0) return;

                        ply.applyDamage(4, { cause: mc.EntityDamageCause.fall });
                    });
                } break;
                case 'ha:invocation_skull': {
                    const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                    const actualSlot = ply.selectedSlotIndex;

                    worldToolsSimplified.setRun(() => {
                        inv.setItem(actualSlot, undefined);

                        ply.spawnParticle('minecraft:totem_particle', ply.location);
                        ply.dimension.playSound('random.totem', ply.location);
                        ply.applyDamage(2, { cause: mc.EntityDamageCause.fall });
                        ply.triggerEvent('minecraft:gain_raid_omen');
                        ply.addEffect('trial_omen', worldToolsSimplified.convertSecondsToTicks(900));
                    });
                } break;
            }
        });

        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                const dime = ply.dimension;

                for (const [item, tag] of Object.entries(infernalItems)) {
                    if (customEventsManager.plyHasItems(ply, item, true) && !ply.hasTag(tag)) {
                        const score = worldToolsSimplified.changePlyScoreInObj(ply, 'infernalCount', 'add', 1);

                        ply.addTag(tag);

                        worldToolsSimplified.sendMessageGlobal({
                            rawtext: [{
                                translate: 'chat.system.get_infernal_item', with: {
                                    rawtext: [
                                        { text: `${ply.name}` },
                                        { translate: `item.${item}.name` },
                                        { text: `${score}` }
                                    ]
                                }
                            }]
                        });

                        ply.runCommand(`execute as @a at @s run playsound random.orb @s ~~~ 1 0.85`);
                    }
                }

                for (const [item, tag] of Object.entries(cautiousItems)) {
                    if (customEventsManager.plyHasItems(ply, item, true) && !ply.hasTag(tag)) {
                        const score = worldToolsSimplified.changePlyScoreInObj(ply, 'cautiousCount', 'add', 1);

                        ply.addTag(tag);

                        worldToolsSimplified.sendMessageGlobal({
                            rawtext: [{
                                translate: 'chat.system.get_cautious_item', with: {
                                    rawtext: [
                                        { text: `${ply.name}` },
                                        { translate: `item.${item}.name` },
                                        { text: `${score}` }
                                    ]
                                }
                            }]
                        });

                        ply.runCommand(`execute as @a at @s run playsound random.orb @s ~~~ 1 0.85`);
                    }
                }

                if (customEventsManager.plyHasItems(ply, 'ha:infernal_crown', true)) {
                    if (!ply.hasTag('hasCrown')) {
                        ply.addTag('hasCrown');
                        worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.get_infernal_crown', with: { rawtext: [{ text: `${ply.name}` }, { translate: `item.ha:infernal_crown.name` }] } }] });
                        ply.runCommand(`execute as @a at @s run playsound mob.guardian.death`);
                    }

                    if (dime.id == 'minecraft:nether') {
                        ply.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(5), { amplifier: 1 });
                    }

                    ply.addTag('crownInInv');
                    ply.addEffect('strength', worldToolsSimplified.convertSecondsToTicks(5), { amplifier: 1 });
                    ply.addEffect('fire_resistance', worldToolsSimplified.convertSecondsToTicks(5), { amplifier: 1 });
                } else {
                    ply.removeTag('crownInInv');
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
    }

    /**
     * Metodo auxiliar que controla los eventos relacionados con la muerte de los jugadores.
     * @private
     */
    private deathEvents(): void {
        let lastLocation: mc.Vector3;
        let lastDimension: mc.Dimension;
        let lastViewDirection: mc.Vector3;

        afterEventsSimplified.onEntityDie((args) => {
            const plyEntity = args.deadEntity;

            if (plyEntity.typeId == 'minecraft:player' && !plyEntity.hasTag('death')) {
                lastLocation = plyEntity.location;
                lastDimension = plyEntity.dimension;
                lastViewDirection = plyEntity.getViewDirection();

                plyEntity.runCommand(`scriptevent ha:tp_spawn`);
                plyEntity.runCommand(`function system/death_effects`);

                this.spawnInventory(plyEntity as mc.Player, lastLocation, lastDimension);

                if (!plyEntity.hasTag('isLinked')) {
                    this.savePlyID(plyEntity as mc.Player);
                } else {
                    this.soulLinkedEvents(plyEntity as mc.Player);
                }
            }
        });

        afterEventsSimplified.onPlayerSpawns((args) => {
            const plyEntity = args.player;
            const isFirstSpawn = args.initialSpawn;

            if (isFirstSpawn == false && (plyEntity.hasTag('death') && !plyEntity.hasTag('banned'))) {
                worldToolsSimplified.sendMessageGlobal(
                    {
                        rawtext: [
                            {
                                translate: "chat.system.last_location_player", with: {
                                    rawtext: [
                                        { text: `${plyEntity.name}` },
                                        { text: `${this.simplifiedCoords(lastLocation)}` },
                                        { text: `${this.simplifiedDimension(lastDimension)}` }
                                    ]
                                }
                            }
                        ]
                    }
                );

                plyEntity.tryTeleport(lastLocation, { dimension: lastDimension });

                worldToolsSimplified.setDelay(() => {
                    const knockbackForce = 1.35;
                    const horizontalVector = { x: lastViewDirection.x * knockbackForce, z: lastViewDirection.z * knockbackForce };
                    const verticalStrength = lastViewDirection.y * knockbackForce;

                    plyEntity.applyKnockback(horizontalVector, verticalStrength);

                    worldToolsSimplified.setDelay(() => {
                        plyEntity.addTag('banned');
                        plyEntity.runCommand(`kick "${plyEntity.name}"`);
                    }, 1);
                }, worldToolsSimplified.convertSecondsToTicks(0.75));
            }
        });
    };

    /**
     * Metodo auxiliar que guarda los datos del jugador muerto en el mundo, esto con el fin de usarse para futuros dias.
     * @param {mc.Player} ply Jugador en concreto a guardar datos.
     * @author HaJuegos - 15-04-2026
     * @private
     */
    private savePlyID(ply: mc.Player): void {
        let currentIndex = mc.world.getDynamicProperty('ha:death_counter') as number | undefined;

        if (currentIndex == undefined) {
            currentIndex = 0;
        }

        const newIndex = currentIndex + 1;

        mc.world.setDynamicProperty('ha:death_counter', newIndex);

        const propertyId = `ha:player_death_data_${newIndex}`;
        const propertyValue = `${ply.name}:${ply.id}`;

        mc.world.setDynamicProperty(propertyId, propertyValue);
    }

    /**
     * Metodo auxiliar que revisa y ejecuta la logica para matar a un jugador cuando el otro jugador muere y estan linkeados.
     * @param {mc.Player} ply Jugador en concreto cuando muere.
     * @author HaJuegos - 19-04-2026
     * @private
     */
    private soulLinkedEvents(ply: mc.Player): void {
        ply.removeTag('isLinked');

        const currentSoulLinkeds = mc.world.getDynamicProperty('ha:linkeds_counter') as number | undefined;

        if (currentSoulLinkeds) {
            for (let i = 1; i <= currentSoulLinkeds; i++) {
                const propKey = `ha:soul_linkeds_${i}`;
                const dataPlys = mc.world.getDynamicProperty(propKey) as string | undefined;

                if (dataPlys) {
                    const [sourcePly, targetPly] = dataPlys.split(':');
                    let partnerId: string | undefined = undefined;

                    if (sourcePly && sourcePly.includes(ply.id)) {
                        partnerId = targetPly.split('_').pop();
                    } else if (targetPly && targetPly.includes(ply.id)) {
                        partnerId = sourcePly.split('_').pop();
                    }

                    if (partnerId) {
                        mc.world.setDynamicProperty(propKey, undefined);

                        const deathCounter = mc.world.getDynamicProperty('ha:death_counter') as number | undefined;

                        if (deathCounter) {
                            for (let j = 1; j <= deathCounter; j++) {
                                const deathKey = `ha:player_death_data_${j}`;
                                const deathData = mc.world.getDynamicProperty(deathKey) as string | undefined;

                                if (deathData) {
                                    const [, id] = deathData.split(':');

                                    if (id == ply.id || id == partnerId) {
                                        mc.world.setDynamicProperty(deathKey, undefined);
                                    }
                                }
                            }
                        }

                        const plys = mc.world.getAllPlayers();
                        const partnerPly = plys.find(p => p.id == partnerId);

                        if (partnerPly) {
                            worldToolsSimplified.setRun(() => {
                                worldToolsSimplified.setDelay(() => {
                                    partnerPly.runCommand(`function system/death_linked`);
                                    partnerPly.kill();
                                }, worldToolsSimplified.convertSecondsToTicks(0.5));
                            });
                        } else {
                            mc.world.setDynamicProperty(`ha:pending_death_${partnerId}`, true);
                        }

                        break;
                    }
                }
            }
        }
    }

    /**
     * Metodo principal que controla los eventos del chat cuando un usuario envia un mensaje.
     * @author HaJuegos - 19-03-2026
     * @private
     */
    private chatManager(): void {
        beforeEventsSimplified.chatManager((args) => {
            const msg = args.message;
            const ply = args.sender;

            args.cancel = true;

            worldToolsSimplified.setRun(() => {
                const name = ply.name;
                const rankData = this.customRanks.find((data) => {
                    if (Array.isArray(data.namePly)) {
                        return data.namePly.includes(name);
                    }

                    return data.namePly == name;
                });

                const isLinked = ply.hasTag('isLinked');
                const displayRank = rankData ? `${rankData.colorCode}${rankData.rank}` : `§4§lSobreviviente`;

                worldToolsSimplified.sendMessageGlobal(`§7§l[§r${displayRank}§7§l]§r${isLinked ? '' : ''} ${name} §7§l>>§r ${msg}`);
            });
        });

        afterEventsSimplified.onHealthEntityChange((args) => {
            const entity = args.entity;
            const newValue = Math.floor(args.newValue);

            if (entity instanceof mc.Player) {
                this.setCustomRank(entity, newValue, undefined, true);
            }
        });
    }

    /**
     * Metodo que maneja el sistema del uso de totems.
     * @author HaJuegos - 19-03-2026
     * @private
     */
    private totemSystem(): void {
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
        const plyInvContainer = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const plyArmorContainer = ply.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
        const ghostInvContainer = ghostEntity.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const armorSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet, mc.EquipmentSlot.Offhand];
        const nameGhost = `§g§l${ply.name}'s Inventory§r`;

        for (let i = 0; i < plyInvContainer.size; i++) {
            const item = plyInvContainer.getItem(i);

            if (item) {
                if (item.typeId == 'ha:void_item') continue;

                ghostInvContainer.addItem(item);
            }
        }

        for (const slot of armorSlots) {
            const item = plyArmorContainer.getEquipment(slot);

            if (item) {
                if (item.typeId == 'ha:void_item') continue;

                ghostInvContainer.addItem(item);
            }
        }

        ghostEntity.nameTag = nameGhost;
        ply.runCommand(`clear @s`);
    }
}

new PlyEventsManager();