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
        this.blockPortals();
        this.breakBlocks();
        this.itemsSystem();
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

            if (block.typeId == vanilla.MinecraftBlockTypes.DiamondOre || block.typeId == vanilla.MinecraftBlockTypes.DeepslateDiamondOre) {
                worldToolsSimplified.setRun(() => {
                    ply.applyDamage(4, { cause: mc.EntityDamageCause.sonicBoom });
                });
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

        worldToolsSimplified.setLoop(() => {
            const plys = mc.world.getAllPlayers();

            for (const ply of plys) {
                const dime = ply.dimension;

                for (const [item, tag] of Object.entries(infernalItems)) {
                    if (customEventsManager.plyHasItems(ply, item, true) && !ply.hasTag(tag)) {
                        const score = worldToolsSimplified.changeScoreInObj(ply, 'infernalCount', 'add', 1);

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
                        ply.addEffect('resistance', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });
                    }

                    ply.addTag('crownInInv');
                    ply.addEffect('strength', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });
                    ply.addEffect('fire_resistance', worldToolsSimplified.convertSecondsToTicks(15), { amplifier: 1, showParticles: false });
                } else {
                    ply.removeTag('crownInInv');
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(1));
    }
}

new PlyEventsManager();