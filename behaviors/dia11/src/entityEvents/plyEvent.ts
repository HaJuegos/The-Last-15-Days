import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";

/**
 * Clase hijo que controla los eventos relacionados con los jugadores.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 11-03-2026
 */
class PlyEventsManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        this.plySpawnEvents();
        this.breakBlocks();
        this.itemsSystem();
        this.dolphinSystem();
        this.bearTrapSystem();
        this.onHitSystem();
        this.customMusicBox();
        this.blockEnchants();
        this.parrySystem();
    }

    /**
     * Sistema de parrys curioso para los proyectiles que se pueden devolver.
     * @returns {void}
     * @author HaJuegos - 29-07-2026
     * @private
     */
    private parrySystem(): void {
        afterEventsSimplified.onHitEntity((args) => {
            const hitEntity = args.hitEntity;
            const sourceEntity = args.damagingEntity;

            if (!hitEntity.isValid) return;

            if (hitEntity.typeId == 'ha:dynamite' && (sourceEntity instanceof mc.Player)) {
                const variant = hitEntity.getComponent(mc.EntityComponentTypes.SkinId)?.value as number;
                const dime = hitEntity.dimension;

                if (variant != 1) return;
                if (hitEntity.isOnGround) return;

                const viewDirection = sourceEntity.getViewDirection();
                const parryPower = 2.5;

                const impulseVector = {
                    x: viewDirection.x * parryPower,
                    y: viewDirection.y * parryPower,
                    z: viewDirection.z * parryPower
                };

                hitEntity.clearVelocity();
                hitEntity.applyImpulse(impulseVector);

                dime.playSound("mob.dynamite.parried", sourceEntity.location);
                dime.spawnParticle("minecraft:critical_hit_emitter", hitEntity.location);
            }
        });
    }

    /**
     * Timer que controla el tiempo de estadia de una trampa de oso pegada a un jugador y sus respectivos eventos.
     * @returns {void}
     * @author HaJuegos - 09-06-2026
     * @private
     */
    private bearTrapSystem(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;
            const scnds = (worldToolsSimplified.getScoreInObj(ply, 'timerBearTrap') as number ?? 0);

            if (scnds > 0) {
                this.timerBearTrap(ply, scnds, false);
            }
        });

        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                if (ply.hasTag('hasBearTrap')) {
                    ply.removeTag('hasBearTrap');
                    ply.setDynamicProperty('ha:timer_bear_trap', undefined);

                    const scnds = (worldToolsSimplified.getScoreInObj(ply, 'timerBearTrap') as number ?? 0);

                    this.timerBearTrap(ply, scnds, true);
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
    }

    /**
     * Metodo principal que controla los eventos del timer del delfin en caso de ser necesario.
     * @author HaJuegos - 05-04-2026
     * @private
     */
    private dolphinSystem(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;
            const mns = (worldToolsSimplified.getScoreInObj(ply, 'dolphinTimer') as number ?? 0);

            if (mns > 0) {
                this.timerDolphinSystem(ply, mns, false);
            }
        });

        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                if (ply.hasTag('hasDolphinDamage')) {

                    ply.removeTag('hasDolphinDamage');
                    ply.setDynamicProperty('ha:timer_dolphin', undefined);

                    const mns = (worldToolsSimplified.getScoreInObj(ply, 'dolphinTimer') as number ?? 0);

                    this.timerDolphinSystem(ply, mns, true);
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
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
     * Metodo auxiliar que controla el bloqueo de los portales, de forma temporal. 
     * @author HaJuegos - 15-03-2026
     * @private
     */
    private blockEnchants(): void {
        beforeEventsSimplified.onInteractBlock((args) => {
            const ply = args.player;
            const block = args.block;
            const item = args.itemStack;

            if (!item) return;

            const enchantAttempt = block.typeId == vanilla.MinecraftBlockTypes.EnchantingTable;

            if (enchantAttempt) {
                args.cancel = true;

                worldToolsSimplified.setRun(() => {
                    ply.playSound('ui.error_sound');
                    ply.sendMessage({ translate: 'chat.system.error_no_perms' });
                });
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

            ply.triggerEvent('ha:set_normal_breath');
        });
    };;

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
                    worldToolsSimplified.setRun(() => {
                        ply.applyDamage(4, { cause: mc.EntityDamageCause.sonicBoom });
                    });
                } break;
                case vanilla.MinecraftBlockTypes.AncientDebris: {
                    const dime = block.dimension;
                    const coords = block.location;

                    worldToolsSimplified.setRun(() => {
                        dime.setBlockType(coords, vanilla.MinecraftBlockTypes.FlowingLava);
                        dime.spawnEntity('minecraft:silverfish', coords, { spawnEvent: 'minecraft:entity_spawned' });
                    });
                } break;
                case vanilla.MinecraftBlockTypes.ReinforcedDeepslate: {
                    const dime = ply.dimension;
                    const item = new mc.ItemStack(vanilla.MinecraftItemTypes.ReinforcedDeepslate, 1);

                    worldToolsSimplified.setRun(() => {
                        dime.spawnItem(item, block.location);
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
                    const health = ply.getComponent(mc.EntityComponentTypes.Health);

                    if (!health) return;

                    const actualH = health.currentValue;

                    worldToolsSimplified.setRun(() => {
                        const cooldownCompo = item.getComponent('cooldown') as mc.ItemCooldownComponent;
                        const remainsColdown = cooldownCompo.getCooldownTicksRemaining(ply);

                        if (remainsColdown < 18) return;

                        ply.applyDamage(actualH / 2, { cause: mc.EntityDamageCause.sonicBoom });
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

        afterEventsSimplified.onPlyInvChange((args) => {
            const ply = args.player;
            const newItem = args.itemStack;

            if (!newItem) return;

            const infernalTag = infernalItems[newItem.typeId];
            const cautiousTag = cautiousItems[newItem.typeId];

            if (infernalTag && !ply.hasTag(infernalTag)) {
                const score = worldToolsSimplified.changeScoreInObj(ply, 'infernalCount', 'add', 1);

                ply.addTag(infernalTag);

                worldToolsSimplified.sendMessageGlobal({
                    rawtext: [{
                        translate: 'chat.system.get_infernal_item', with: {
                            rawtext: [
                                { text: `${ply.name}` },
                                { translate: `item.${newItem.typeId}.name` },
                                { text: `${score}` }
                            ]
                        }
                    }]
                });

                ply.runCommand(`execute as @a at @s run playsound random.orb @s ~~~ 1 0.85`);
            }

            if (cautiousTag && !ply.hasTag(cautiousTag)) {
                const score = worldToolsSimplified.changeScoreInObj(ply, 'cautiousCount', 'add', 1);

                ply.addTag(cautiousTag);

                worldToolsSimplified.sendMessageGlobal({
                    rawtext: [{
                        translate: 'chat.system.get_cautious_item', with: {
                            rawtext: [
                                { text: `${ply.name}` },
                                { translate: `item.${newItem.typeId}.name` },
                                { text: `${score}` }
                            ]
                        }
                    }]
                });

                ply.runCommand(`execute as @a at @s run playsound random.orb @s ~~~ 1 0.85`);
            }

            if (newItem.typeId == 'ha:infernal_crown' && !ply.hasTag('hasCrown')) {
                ply.addTag('hasCrown');

                worldToolsSimplified.sendMessageGlobal({
                    rawtext: [{
                        translate: 'chat.system.get_infernal_crown',
                        with: { rawtext: [{ text: `${ply.name}` }, { translate: `item.ha:infernal_crown.name` }] }
                    }]
                });

                ply.runCommand(`execute as @a at @s run playsound mob.guardian.death`);
            }
        });

        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                if (customEventsManager.plyHasItems(ply, 'ha:infernal_crown', true)) {
                    if (!ply.hasTag('crownInInv')) {
                        ply.addTag('crownInInv');
                    }

                    ply.addEffect('fire_resistance', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });

                    if (ply.dimension.id == 'minecraft:nether') {
                        ply.addEffect('strength', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });
                        ply.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });
                    }
                } else {
                    if (ply.hasTag('crownInInv')) {
                        ply.removeTag('crownInInv');
                    };
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
    }

    /**
     * Metodo principal que controla los eventos de onHit en jugadores.
     * @returns {void}
     * @private
     * @author HaJuegos - 28-06-2026
     */
    private onHitSystem(): void {
        beforeEventsSimplified.onEntityHurt((args) => {
            const ply = args.hurtEntity;
            const sourcePly = args.damageSource.damagingEntity;

            if (ply instanceof mc.Player && (sourcePly && sourcePly instanceof mc.Player)) {
                const hasFuryTags = sourcePly.getTags().find(tag => tag.startsWith('furyDebuff'));

                if (!hasFuryTags) {
                    args.cancel = true;
                }
            }
        });
    }

    /**
     * Metodo auxiliar que controla la logica de los timers de la trampa de oso.
     * @param {mc.Player} ply Jugador en concreto al cual sera afectado.
     * @param {number} scnds Los segundos a conciderar para iniciar el timer.
     * @param {boolean} restart Si es necesario un reinicio forzado para iniciar desde un nuevo punto de partida.
     * @returns {void} 
     * @private
     * @author HaJuegos - 26-06-2026
     */
    private timerBearTrap(ply: mc.Player, scnds: number, restart: boolean): void {
        customEventsManager.startTimerLocal({
            timerId: 'ha:timer_bear_trap',
            sourcePly: ply,
            initialScnds: scnds,
            forceRestart: restart,
            onTimerStarts: (ply) => {
                ply.sendMessage({ translate: 'chat.system.timer_bear_trap.starts', with: { rawtext: [{ text: `${scnds}` }] } });
                ply.triggerEvent('ha:set_in_trap_mode');

                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Movement, false);
                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Sneak, false);
                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Mount, false);
                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Jump, false);
                ply.inputPermissions.setPermissionCategory(mc.InputPermissionCategory.Dismount, false);
            },
            onSecondPass: (ply) => {
                ply.playSound('random.click', { pitch: 1.5 });
                ply.applyDamage(2, { cause: mc.EntityDamageCause.thorns, damagingEntity: ply });

                worldToolsSimplified.changeScoreInObj(ply, 'timerBearTrap', 'add', -1);
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

    /**
     * Metodo auxiliar que controla la logica del timer del delfin en estado de loop para cada jugador.
     * @param {mc.Player} ply Jugador en concreto a analizar.
     * @param {number} mns Minutos a tener en cuenta.
     * @param {boolean} restart Si requiere o no un reinicio forzado para empezar desde un nuevo punto de partida.
     * @returns {void}
     * @private
     * @author HaJuegos - 26-06-2026
     */
    private timerDolphinSystem(ply: mc.Player, mns: number, restart: boolean): void {
        customEventsManager.startTimerLocal({
            sourcePly: ply,
            timerId: 'ha:timer_dolphin',
            initialMns: mns,
            forceRestart: restart,
            onTimerStarts: (ply) => {
                ply.sendMessage({ rawtext: [{ translate: 'chat.system.hit_by_dolphin', with: { rawtext: [{ text: `${mns}` }] } }] });
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
                worldToolsSimplified.changeScoreInObj(ply, 'dolphinTimer', 'add', -1);
            },
            onTimerEnds: (ply) => {
                ply.triggerEvent('ha:set_normal_breath');
            }
        });
    }
}

new PlyEventsManager();