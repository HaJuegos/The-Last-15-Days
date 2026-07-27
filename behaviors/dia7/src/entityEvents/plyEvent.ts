import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que controla los eventos relacionados con los jugadores.
 * @author HaJuegos - 11-03-2026
 */
class PlyEventsManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        this.plySpawnEvents();
        this.blockPortals();
        this.breakBlocks();
        this.itemsSystem();
        this.dolphinSystem();
        this.plySpawnEvents();
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
     * Metodo auxiliar que controla los eventos de un jugador cuando spawnea en el mundo.
     * @author HaJuegos - 13-03-2026
     * @private
     */
    private plySpawnEvents(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;

            ply.triggerEvent('ha:set_normal_breath');
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
        * Lista de items infernales a conseguir.
        * @type {Record<string, string>}
        * @author HaJuegos - 26-06-2026
        */
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

                    ply.addEffect('strength', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });
                    ply.addEffect('fire_resistance', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });

                    if (ply.dimension.id == 'minecraft:nether') {
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