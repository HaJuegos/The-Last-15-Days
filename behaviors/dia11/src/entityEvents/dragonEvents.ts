import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { TL15DBaseManager } from "../base";
import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from 'simplified-mojang-api';

/**
 * Clase principal que controla los eventos principales contra la pelea del dragon.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 08-06-2026
 */
class DragonEvents extends TL15DBaseManager {
    /**
     * Eventos principales de la clase cuando es inicialiada o llamada.
     * @constructor
     */
    constructor () {
        super();

        this.debuffEntites();
        this.dragonSensors();
    }

    /**
     * Metodo principal que controla los debuffs principales de la entidad custom de los timers del dragon.
     * @returns {void}
     * @author HaJuegos - 09-06-2026
     * @private
     */
    private debuffEntites(): void {
        afterEventsSimplified.onEntitySpawns((args) => {
            const { entity } = args;

            if (!entity?.isValid || entity.typeId != 'ha:debuff_timer') return;

            const variant = entity.getComponent(mc.EntityComponentTypes.Variant);

            if (!variant) return;

            switch (variant.value) {
                // Nauseas
                case 0: {
                    this.nauseasTimerLogic(entity);
                } break;
                // Conduit
                case 1: {
                    this.conduitTimerLogic(entity);
                } break;
                // Totems
                case 2: {
                    this.rainItemsLogic(entity, 'totem_rain', vanilla.MinecraftBlockTypes.EmeraldBlock, 'chat.system.spawn_totems_rain');
                } break;
                // Items
                case 3: {
                    this.rainItemsLogic(entity, 'items_rain', vanilla.MinecraftBlockTypes.GoldBlock, 'chat.system.spawn_items_rain');
                } break;
            }
        });
    }

    /**
     * Metodo principal que controla los sensores del dragon en la batalla del mismo
     * @returns {void}
     * @author HaJuegos - 09-06-2026
     * @private
     */
    private dragonSensors(): void {
        worldToolsSimplified.setLoop(() => {
            const end = worldToolsSimplified.getDimension(vanilla.MinecraftDimensionTypes.TheEnd) as mc.Dimension;
            const plys = end.getPlayers();
            const dragons = end.getEntities({ type: vanilla.MinecraftEntityTypes.EnderDragon });

            if (plys.length > 0) {
                const center = { x: 0, y: 88, z: 0 };
                const maxDistance = 150;

                for (const ply of plys) {
                    this.checkHasMace(ply);

                    const dx = ply.location.x - center.x;
                    const dz = ply.location.z - center.z;

                    if ((dx * dx) + (dz * dz) > (maxDistance * maxDistance)) {
                        ply.tryTeleport({
                            x: center.x + Math.floor(Math.random() * 11) - 5,
                            y: center.y,
                            z: center.z + Math.floor(Math.random() * 11) - 5
                        }, { dimension: ply.dimension });

                        worldToolsSimplified.setDelay(() => {
                            if (ply.isValid) {
                                ply.sendMessage({ translate: 'chat.system.no_end_islands' });
                                ply.playSound("ui.error_sound");
                            }
                        }, worldToolsSimplified.convertSecondsToTicks(0.25));
                    }
                }
            }

            if (dragons.length > 0) {
                let topY = 100;

                try {
                    const topBlock = end.getTopmostBlock({ x: 0, z: 0 });

                    if (topBlock) {
                        topY = topBlock.y;
                    }
                } catch { }

                for (const dragon of dragons) {
                    if (!dragon.isValid) {
                        continue;
                    }

                    const variant = dragon.getComponent(mc.EntityComponentTypes.SkinId);

                    if (!variant || variant.value != 1) {
                        continue;
                    }

                    const coords = dragon.location;
                    const centerRadius = 1;
                    const distanceX = coords.x;
                    const distanceZ = coords.z;
                    const isInCenter = Math.abs(distanceX) <= centerRadius && Math.abs(distanceZ) <= centerRadius;
                    const isLandingInCenter = isInCenter && coords.y <= topY;

                    if (!isLandingInCenter) {
                        continue;
                    }

                    try {
                        dragon.tryTeleport({ x: 0, y: topY + 1, z: 0 });
                    } catch { }
                }
            }
        }, 1);

        afterEventsSimplified.onEntitySpawns((args) => {
            const entity = args.entity;

            if (!entity.isValid) return;

            switch (entity.typeId) {
                case vanilla.MinecraftEntityTypes.EnderDragon: {
                    const dime = entity.dimension;
                    const plys = dime.getPlayers();

                    if (plys.length > 0) {
                        for (const ply of plys) {
                            ply.playMusic('music.athazagoraphobia.dragon_fight', { loop: true });
                        }
                    }
                } break;
                case 'ha:data_world': {
                    const defaultOnFlags = [
                        'ha:canDragonReflectDamage',
                        'ha:canDragonKnockback',
                        'ha:canSummonLightnings',
                        'ha:canBreakTowersOnCrystal',
                        'ha:canMobsSpawnOnCrystal'
                    ];

                    for (const flag of defaultOnFlags) {
                        const obj = worldToolsSimplified.getOrCreateScorebordObj(flag);

                        if (obj && !obj.hasParticipant(entity)) {
                            obj.setScore(entity, 1);
                        }
                    }
                } break;
            }
        });

        afterEventsSimplified.onPlayerSpawns((args) => {
            const ply = args.player;
            const dime = ply.dimension;
            const respawned = args.initialSpawn;

            if (dime.id == vanilla.MinecraftDimensionTypes.TheEnd) {
                const hasDragonYet = dime.getEntities().find(e => (e.typeId == vanilla.MinecraftEntityTypes.EnderDragon && e.isValid));

                if (hasDragonYet) {
                    ply.playMusic('music.athazagoraphobia.dragon_fight', { loop: true });
                }
            }

            if (!respawned) {
                ply.stopMusic();
            }
        });

        afterEventsSimplified.onChangeDimension((args) => {
            const ply = args.player;
            const fromDime = args.fromDimension;
            const toDime = args.toDimension;

            if (toDime.id == vanilla.MinecraftDimensionTypes.TheEnd) {
                const hasDragonYet = toDime.getEntities().find(e => (e.typeId == vanilla.MinecraftEntityTypes.EnderDragon && e.isValid));

                if (hasDragonYet) {
                    ply.playMusic('music.athazagoraphobia.dragon_fight', { loop: true });
                }
            }

            if (toDime.id != vanilla.MinecraftDimensionTypes.TheEnd && fromDime.id == vanilla.MinecraftDimensionTypes.TheEnd) {
                ply.stopMusic();
            }
        });

        afterEventsSimplified.onHurtEntity((args) => {
            const { damageSource: source, hurtEntity: hitEntity, damage } = args;
            const sourceEntity = source.damagingEntity as mc.Player | undefined;

            if (!sourceEntity?.isValid || !hitEntity?.isValid) return;

            const isHitDragon = hitEntity.typeId == vanilla.MinecraftEntityTypes.EnderDragon;
            const isSourceDragon = sourceEntity.typeId == vanilla.MinecraftEntityTypes.EnderDragon;

            if (!isHitDragon && !isSourceDragon) return;

            worldToolsSimplified.setRun(async () => {
                if (!hitEntity.isValid || !sourceEntity.isValid) return;

                let canReflect = true;
                let canKnockback = true;

                try {
                    const worldData = await this.getEntityDataWorld();

                    canReflect = worldToolsSimplified.getScoreInObj(worldData, 'ha:canDragonReflectDamage') == 1;
                    canKnockback = worldToolsSimplified.getScoreInObj(worldData, 'ha:canDragonKnockback') == 1;
                } catch { }

                if (isHitDragon && canReflect && source.cause != mc.EntityDamageCause.thorns && Math.random() < 0.5) {
                    sourceEntity.applyDamage(damage, { cause: mc.EntityDamageCause.sonicBoom, damagingEntity: hitEntity });
                    sourceEntity.playSound('damage.thorns');
                }

                if (isSourceDragon && canKnockback && source.cause == mc.EntityDamageCause.entityAttack && Math.random() <= 0.35) {
                    const dx = hitEntity.location.x - sourceEntity.location.x;
                    const dz = hitEntity.location.z - sourceEntity.location.z;
                    const distance = Math.hypot(dx, dz);
                    const dirX = distance > 0 ? (dx / distance) : (Math.random() - 0.5);
                    const dirZ = distance > 0 ? (dz / distance) : (Math.random() - 0.5);
                    const horizontalForce = (Math.random() * 2.0) + 1.5;
                    const verticalForce = (Math.random() * 1.5) + 1.0;

                    hitEntity.applyKnockback({ x: dirX * horizontalForce, z: dirZ * horizontalForce }, verticalForce);
                }
            });
        });

        afterEventsSimplified.onHealthEntityChange((args) => {
            const entity = args.entity;
            const newHealth = Math.floor(args.newValue);

            if (entity.isValid && entity.typeId == vanilla.MinecraftEntityTypes.EnderDragon) {
                const dime = entity.dimension;

                if (newHealth <= 2150 && !entity.hasTag('enragedMode')) {
                    entity.triggerEvent('ha:start_enraged_mode');
                    entity.addTag('enragedMode');

                    const plys = dime.getPlayers();

                    worldToolsSimplified.setRun(async () => {
                        let canSummonLightnings = true;

                        try {
                            const worldData = await this.getEntityDataWorld();

                            canSummonLightnings = worldToolsSimplified.getScoreInObj(worldData, 'ha:canSummonLightnings') == 1;
                        } catch { }

                        if (canSummonLightnings) {
                            const boltCount = Math.floor(Math.random() * 6) + 15;

                            for (let i = 0; i < boltCount; i++) {
                                const radius = 35 * Math.sqrt(Math.random());
                                const theta = Math.random() * 2 * Math.PI;
                                const randomX = Math.floor(radius * Math.cos(theta));
                                const randomZ = Math.floor(radius * Math.sin(theta));
                                const topBlock = dime.getTopmostBlock({ x: randomX, z: randomZ });
                                const targetY = topBlock ? topBlock.y : 65;

                                dime.runCommand(`summon lightning_bolt ${randomX} ${targetY} ${randomZ}`);

                                try {
                                    dime.createExplosion({ x: randomX, y: targetY, z: randomZ }, 4, { allowUnderwater: true, breaksBlocks: true, source: entity });
                                } catch { continue; }
                            }
                        }
                    });

                    for (const ply of plys) {
                        ply.playSound('mob.enderdragon.growl');
                    }
                } else if (newHealth > 2150 && entity.hasTag('enragedMode')) {
                    entity.triggerEvent('ha:start_normal_mode');
                    entity.removeTag('enragedMode');
                }
            }
        });

        beforeEventsSimplified.onExplosion((args) => {
            const entity = args.source;

            if ((entity && entity.isValid) && entity.typeId == vanilla.MinecraftEntityTypes.EnderCrystal) {
                const coords = entity.location;
                const dime = entity.dimension;
                const variant = entity.getComponent(mc.EntityComponentTypes.Variant);

                if (!variant) return;

                if (variant.value == 1) {
                    worldToolsSimplified.setRun(() => {
                        dime.runCommand(`summon ha:crystal_llama_generator ${coords.x} ${coords.y} ${coords.z}`);
                        this.crystalExplode(coords, dime);
                    });
                }
            }
        });

        afterEventsSimplified.onEntityDie((args) => {
            const entity = args.deadEntity;

            if (entity.isValid && entity.typeId == vanilla.MinecraftEntityTypes.EnderDragon) {
                const dime = entity.dimension;
                const remainEntities: string[] | vanilla.MinecraftEntityTypes[] = [
                    'ha:crystal_llama_generator',
                    'ha:debuff_timer',
                    'ha:bear_trap',
                    vanilla.MinecraftEntityTypes.EnderCrystal,
                ];

                const dragonEntitiesRemain = dime.getEntities({ excludeTypes: ['minecraft:player'] }).filter(e => remainEntities.includes(e.typeId));
                const plys = dime.getPlayers();

                for (const targetEntity of dragonEntitiesRemain) {
                    if (!targetEntity.isValid) continue;

                    if (targetEntity.typeId == vanilla.MinecraftEntityTypes.EnderCrystal) {
                        const variant = targetEntity.getComponent(mc.EntityComponentTypes.Variant);

                        if (!variant) continue;

                        if (variant.value == 1) {
                            this.crystalExplode(targetEntity.location, dime, true);

                            targetEntity.kill();
                        }
                    } else {
                        targetEntity.triggerEvent('ha:start_despawn');
                    }
                }

                for (const ply of plys) {
                    worldToolsSimplified.setDelay(() => {
                        if (ply.isValid) {
                            ply.onScreenDisplay.setTitle({ rawtext: [{ translate: 'ui.dragon_death.title' }] });
                            ply.onScreenDisplay.updateSubtitle({ rawtext: [{ translate: 'ui.dragon_death.subtitle' }] });

                            ply.playSound('ui.advancements.rare');
                            ply.stopMusic();
                        }
                    }, worldToolsSimplified.convertSecondsToTicks(3.5));
                }

                const item = new mc.ItemStack('ha:dragon_disc');

                dime.spawnItem(item, entity.location);
            }
        });

        afterEventsSimplified.onEntityLoadInWorld((args) => {
            const entity = args.entity;

            if (!entity.isValid) return;

            switch (entity.typeId) {
                case 'ha:data_world': {
                    const defaultOnFlags = [
                        'ha:canDragonReflectDamage',
                        'ha:canDragonKnockback',
                        'ha:canSummonLightnings',
                        'ha:canBreakTowersOnCrystal',
                        'ha:canMobsSpawnOnCrystal'
                    ];

                    for (const flag of defaultOnFlags) {
                        const obj = worldToolsSimplified.getOrCreateScorebordObj(flag);

                        if (obj && !obj.hasParticipant(entity)) {
                            obj.setScore(entity, 1);
                        }
                    }
                } break;
            }
        });
    }

    /**
     * Metodo auxiliar que controla los efectos secundarios al explotar un ender crystal.
     * @param {mc.Vector3} coords Coordenadas en concreto a conciderar de la entidad.
     * @param {mc.Dimension} dime Dimension en concreto a conciderar donde esta la entidad.
     * @param {boolean} [dragonDeath] (Opcional) Siempre estara en false, pero en caso de estar en true, hara el efecto pero sin avisar a los jugadores.
     * @returns {void} 
     * @author HaJuegos - 10-06-2026
     * @private
     */
    private async crystalExplode(coords: mc.Vector3, dime: mc.Dimension, dragonDeath: boolean = false): Promise<void> {
        const plys = mc.world.getAllPlayers().filter(p => (p.dimension.id == 'minecraft:the_end'));

        let canSpawnMobs = true;
        let changeMob = false;
        let canBreakTowers = true;

        try {
            const worldData = await this.getEntityDataWorld();

            canSpawnMobs = worldToolsSimplified.getScoreInObj(worldData, 'ha:canMobsSpawnOnCrystal') == 1;
            changeMob = worldToolsSimplified.getScoreInObj(worldData, 'ha:changeMobSpawnOnCrystal') == 1;
            canBreakTowers = worldToolsSimplified.getScoreInObj(worldData, 'ha:canBreakTowersOnCrystal') == 1;
        } catch { }

        for (const ply of plys) {
            if (!dragonDeath) {
                let translationKey = 'chat.system.ender_crystal_explodes.default';

                if (!canSpawnMobs) {
                    translationKey = 'chat.system.ender_crystal_explodes.removed';
                } else if (changeMob) {
                    translationKey = 'chat.system.ender_crystal_explodes.custom_mob';
                }

                ply.sendMessage({ translate: translationKey, with: { rawtext: [{ text: `${this.simplifiedCoords(coords)}` }] } });
            };

            ply.playSound('mob.wither.spawn');
            ply.playSound('armor.break_wolf');
            ply.runCommand(`camerashake add @s 1 0.85`);
        }

        const rad = 7;
        let surfaceY = 62;
        let highestEndStoneY = -1;

        const checkOffsets = [
            { x: rad + 2, z: 0 },
            { x: -(rad + 2), z: 0 },
            { x: 0, z: rad + 2 },
            { x: 0, z: -(rad + 2) }
        ];

        for (const offset of checkOffsets) {
            for (let y = Math.floor(coords.y); y >= 40; y--) {
                const block = dime.getBlock({ x: coords.x + offset.x, y: y, z: coords.z + offset.z });

                if (block && block.typeId == vanilla.MinecraftBlockTypes.EndStone) {
                    if (y > highestEndStoneY) highestEndStoneY = y;
                    break;
                }
            }
        }

        if (highestEndStoneY !== -1) {
            surfaceY = highestEndStoneY;
        }

        surfaceY = Math.min(surfaceY, Math.floor(coords.y) - 2);

        const minCoordsAir = {
            x: Math.floor(coords.x - rad),
            y: surfaceY + 1,
            z: Math.floor(coords.z - rad)
        };

        const maxCoordsAir = {
            x: Math.floor(coords.x + rad),
            y: Math.floor(coords.y + 2),
            z: Math.floor(coords.z + rad)
        };

        const volumeAir = new mc.BlockVolume(minCoordsAir, maxCoordsAir);

        const minStoneCoords = {
            x: Math.floor(coords.x - rad),
            y: 40,
            z: Math.floor(coords.z - rad)
        };

        const maxStoneCoords = {
            x: Math.floor(coords.x + rad),
            y: surfaceY,
            z: Math.floor(coords.z + rad)
        };

        const volumeStone = new mc.BlockVolume(minStoneCoords, maxStoneCoords);
        const blocksToProtect = [
            vanilla.MinecraftBlockTypes.EmeraldBlock,
            vanilla.MinecraftBlockTypes.GoldBlock
        ];

        if (!canBreakTowers) {
            blocksToProtect.push(vanilla.MinecraftBlockTypes.Bedrock);
            blocksToProtect.push(vanilla.MinecraftBlockTypes.Obsidian);
            blocksToProtect.push(vanilla.MinecraftBlockTypes.IronBars);
        }

        const currentFilter: mc.BlockFillOptions = {
            blockFilter: {
                excludeTypes: blocksToProtect
            }
        };

        try {
            dime.fillBlocks(volumeAir, vanilla.MinecraftBlockTypes.Air, currentFilter);
            dime.fillBlocks(volumeStone, vanilla.MinecraftBlockTypes.EndStone, currentFilter);
        } catch (e) { }

        const effectTotal = 25;

        for (let i = 0; i < effectTotal; i++) {
            const randomX = minCoordsAir.x + Math.random() * (maxCoordsAir.x - minCoordsAir.x);
            const randomY = surfaceY + Math.random() * (maxCoordsAir.y - surfaceY);
            const randomZ = minCoordsAir.z + Math.random() * (maxCoordsAir.z - minCoordsAir.z);
            const randomLoc = { x: randomX, y: randomY, z: randomZ };

            dime.spawnParticle('minecraft:knockback_roar_particle', randomLoc);
            dime.playSound('mob.wither.break_block', randomLoc);
        }
    }

    /**
     * Metodo auxiliar que contiene la logica del ataque de nauseas y su respectivo timer.
     * @param {mc.Entity} entity Entidad en concreto a considerar y que activo el timer.
     * @returns {void}
     * @author HaJuegos - 02-09-2026 
     * @private
     */
    private nauseasTimerLogic(entity: mc.Entity): void {
        customEventsManager.startTimerLocal({
            timerId: 'ha:nausea_timer',
            sourcePly: entity as mc.Player,
            forceRestart: true,
            initialScnds: 9,
            onTimerStarts: (() => {
                for (const ply of this.getPlysInDime(entity)) {
                    ply.addEffect('nausea', worldToolsSimplified.convertSecondsToTicks(10));
                    ply.playSound('ui.dragon_attack_nausea.start');
                    ply.spawnParticle('ha:nausea_attack', ply.location);
                }
            }),
            onSecondPass: (() => {
                for (const ply of this.getPlysInDime(entity)) {
                    ply.playSound('random.click', { pitch: 2 });
                }
            }),
            onTimerEnds: ((entity: mc.Entity) => {
                const dime = entity.dimension;
                const dragon = dime.getEntities({ type: vanilla.MinecraftEntityTypes.EnderDragon }).find(e => e.isValid);

                if (!dragon) return;

                for (const ply of this.getPlysInDime(entity)) {
                    const inSurvivalValid = ply.getGameMode() == mc.GameMode.Survival || ply.getGameMode() == mc.GameMode.Adventure;

                    if (!ply.isSneaking && inSurvivalValid) {
                        ply.camera.fade({ fadeColor: worldToolsSimplified.convertHexToRGB('#000000'), fadeTime: { fadeInTime: 0, holdTime: 1, fadeOutTime: 0.15 } });

                        ply.runCommand(`titleraw @s times 0 1 0`);
                        ply.onScreenDisplay.setTitle({ translate: 'ui.system.dragon_damage_nausea.title' });
                        ply.onScreenDisplay.updateSubtitle({ translate: 'ui.system.dragon_damage_nausea.subtitle' });

                        ply.runCommand(`titleraw @s reset`);
                        ply.playSound('ui.dragon_attack.damage_nausea');
                    }

                    ply.sendMessage({ translate: 'chat.system.dragon_attack_finished.nausea' });
                    ply.playSound('mob.guardian.death');
                }

                entity.triggerEvent('ha:start_despawn');
            })
        });
    }

    /**
     * Metodo auxiliar que contiene la logica del ataque del conduit y su respectivo timer.
     * @param {mc.Entity} entity Entidad en concreto a considerar y que activo el timer.
     * @returns {void}
     * @author HaJuegos - 02-09-2026 
     * @private
     */
    private conduitTimerLogic(entity: mc.Entity): void {
        customEventsManager.startTimerLocal({
            timerId: 'ha:conduit_timer',
            sourcePly: entity as mc.Player,
            forceRestart: true,
            initialScnds: 9,
            onTimerStarts: (() => {
                for (const ply of this.getPlysInDime(entity)) {
                    ply.addEffect('conduit_power', worldToolsSimplified.convertSecondsToTicks(10));
                    ply.playSound('ui.dragon_attack_conduit.start');
                    ply.spawnParticle('ha:conduit_attack', ply.location);
                }
            }),
            onSecondPass: (() => {
                for (const ply of this.getPlysInDime(entity)) {
                    ply.playSound('random.click', { pitch: 2 });
                }
            }),
            onTimerEnds: ((entity: mc.Entity) => {
                const dime = entity.dimension;
                const allEntitiesDime = dime.getEntities({
                    excludeTypes: [
                        'minecraft:ender_crystal',
                        'ha:crystal_llama_generator',
                        'minecraft:item',
                        'minecraft:npc',
                        'ha:data_world',
                        'ha:custom_damage_area',
                        'ha:player_ghost',
                        'ha:nurse_npc',
                        'ha:debuff_timer'
                    ]
                }).filter(e => e.isValid);

                for (const targetEntity of allEntitiesDime) {
                    const isPly = targetEntity instanceof mc.Player;
                    const inSurvivalValid = isPly ? (targetEntity.getGameMode() == mc.GameMode.Survival || targetEntity.getGameMode() == mc.GameMode.Adventure) : false;

                    if (isPly && !inSurvivalValid) continue;

                    const radius = 50 * Math.sqrt(Math.random());
                    const theta = Math.random() * 2 * Math.PI;
                    const targetX = radius * Math.cos(theta);
                    const targetZ = radius * Math.sin(theta);

                    let targetY = targetEntity.location.y;

                    try {
                        const topBlock = dime.getTopmostBlock({ x: targetX, z: targetZ });

                        if (topBlock && topBlock.isValid) {
                            targetY = topBlock.location.y + 1;
                        }
                    } catch { }

                    targetEntity.tryTeleport({ x: targetX, y: targetY, z: targetZ });

                    if (isPly) {
                        targetEntity.playSound('mob.guardian.death');
                        targetEntity.sendMessage({ translate: 'chat.system.dragon_attack_finished.conduit' });
                    }
                }

                entity.triggerEvent('ha:start_despawn');
            })
        });
    }

    /**
     * Metodo auxiliar que controla la logica de la lluvia de items y totems del respectivo ataque de la entidad.
     * @param {mc.Entity} entity Entidad en cuestion a considerar y que activo el ataque.
     * @param {string} lootName El nombre de la loot table seleccionada.
     * @param {string} blockToReplace Bloque a reemplazar por donde spawneo la entidad.
     * @param {string} msgRain El mensaje correspondiente de la lluvia en cuestion.
     * @returns {void}
     * @author HaJuegos - 02-09-2026 
     * @private
     */
    private rainItemsLogic(entity: mc.Entity, lootName: string, blockToReplace: string, msgRain: string): void {
        const coords = entity.location;
        const dime = entity.dimension;

        worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: msgRain, with: [this.simplifiedCoords(coords)] }] });

        dime.spawnParticle('ha:emerald_rain_placement', { x: coords.x, y: coords.y + 0.5, z: coords.z });

        entity.runCommand(`loot spawn ~ ~25 ~ loot "entities/custom/dragon_drops/${lootName}"`);

        const blocksToChange = [
            vanilla.MinecraftBlockTypes.EndStone,
            vanilla.MinecraftBlockTypes.EndBricks,
            vanilla.MinecraftBlockTypes.GoldBlock,
            vanilla.MinecraftBlockTypes.EmeraldBlock,
            vanilla.MinecraftBlockTypes.Obsidian,
            vanilla.MinecraftBlockTypes.Bedrock
        ];

        for (const targetBlock of blocksToChange) {
            if (targetBlock != blockToReplace) {
                entity.runCommand(`fill ~3 ~-1 ~3 ~-3 ~-5 ~-3 ${blockToReplace} replace ${targetBlock}`);
            }
        }

        entity.triggerEvent('ha:start_despawn');
    }

    /**
     * Metodo auxiliar que obtiene a todos los jugadores en la respectiva dimension donde esta la entidad.
     * @throws En caso de errores, mandara una lista vacia.
     * @returns {mc.Player[]} Devuelve la lista de todos los jugadores obtenidos, en caso de errores, devolvera una lista vacia.
     * @author HaJuegos - 02-09-2026
     * @private
     */
    private getPlysInDime(entity: mc.Entity): mc.Player[] {
        const plysInWorld = worldToolsSimplified.getAllPlysGlobal();

        if (!plysInWorld) return [];

        return plysInWorld.filter(p => p.dimension.id == entity.dimension.id);
    }

    /**
     * Metodo auxiliar que banea items en concreto en el End.
     * @param {mc.Player} ply Jugador en concreto a considerar.
     * @returns {void}
     * @author HaJuegos - 10-06-2026
     * @private
     */
    private checkHasMace(ply: mc.Player): void {
        const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const armorInv = ply.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
        const mainHandItem = armorInv.getEquipment(mc.EquipmentSlot.Mainhand);

        const bannedItems = ['spear', 'mace'];
        const whitelistItems = 'ha:piglin_mace';
        let deleted = false;

        /**
         * Funcion auxiliar que verifica si el item es valido y si se puede eliminar o no para su respectivo baneo.
         * @param {(mc.ItemStack | undefined)} item Item en concreto a analizar.
         * @returns {boolean} Devuelve true si el item se debe banear, false si no es valido o no es para banear.
         * @author HaJuegos - 10-06-2026
         */
        const isBan = (item: mc.ItemStack | undefined): boolean => {
            if (!item) return false;

            if (item.typeId == whitelistItems) return false;

            return bannedItems.some(ban => item.typeId.includes(ban));
        };

        for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);

            if (isBan(item)) {
                inv.setItem(i, undefined);
                deleted = true;
            }
        }

        if (isBan(mainHandItem)) {
            armorInv.setEquipment(mc.EquipmentSlot.Mainhand, undefined);
            deleted = true;
        }

        if (deleted) {
            ply.sendMessage({ rawtext: [{ translate: 'chat.system.banned_items_end' }] });
            ply.playSound('ui.error_item');
        }
    }
}

new DragonEvents();