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
            'arrow',
            'firework',
        ]);

        this.plySpawnEvents();
        this.deathEvents();
        this.blockPortals();
        this.chatManager();
        this.totemSystem();
        this.breakBlocks();
        this.itemsSystem();
        this.loopTimerDolphin();
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
     * Metodo auxiliar que controla los eventos de un jugador cuando spawnea en el mundo.
     * @author HaJuegos - 13-03-2026
     * @private
     */
    private plySpawnEvents(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;

            this.setCustomRank(ply);
            ply.triggerEvent('ha:set_normal_breath');

            if (ply.hasTag('banned')) {
                ply.runCommand(`kick "${ply.name}"`);
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

                    plyInv.addItem(item);
                }

                ply.addTag('kit');
                ply.addEffect(vanilla.MinecraftEffectTypes.Resistance, worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 100, showParticles: true });
            }
        });
    };

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

            const isEndAttempt = block.typeId == vanilla.MinecraftBlockTypes.EndPortalFrame && item.typeId == vanilla.MinecraftItemTypes.EnderEye;

            if (isEndAttempt) {
                args.cancel = true;

                worldToolsSimplified.setRun(() => {
                    ply.playSound('ui.error_sound');
                    ply.sendMessage({ translate: 'chat.system.error_no_perms' });
                });
            }
        });
    }

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
            }
        });
    }

    /**
     * Metodo principal que controla los eventos principales de los items vanilla en caso de usarse en un jugador.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private itemsSystem(): void {
        const infernalItems: Record<string, string> = {
            'ha:infernal_gem_blaze': 'hasBlaze',
            'ha:infernal_gem_piglin': 'hasPiglin',
            'ha:infernal_gem_magma': 'hasMagma',
            'ha:soul_fire': 'hasGhast',
            'ha:infernal_crown_empty': 'hasWither'
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

                plyEntity.runCommand(`function system/death_effects`);

                this.spawnInventory(plyEntity as mc.Player, lastLocation, lastDimension);
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

                const displayRank = rankData ? `${rankData.colorCode}${rankData.rank}` : `§4§lSobreviviente`;

                worldToolsSimplified.sendMessageGlobal(`§7§l[§r${displayRank}§7§l]§r ${name} §7§l>>§r ${msg}`);
            });
        });

        afterEventsSimplified.onHealthEntityChange((args) => {
            const entity = args.entity;
            const newValue = args.newValue;

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
        customEventsManager.onPlayerUseTotem((ply) => {
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
                ghostInvContainer.addItem(item);
            }
        }

        for (const slot of armorSlots) {
            const item = plyArmorContainer.getEquipment(slot);

            if (item) {
                ghostInvContainer.addItem(item);
            }
        }

        ghostEntity.nameTag = nameGhost;
        ply.runCommand(`clear @s`);
    }
}

new PlyEventsManager();