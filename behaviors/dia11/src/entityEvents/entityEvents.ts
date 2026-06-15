import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { TL15DBaseManager } from "../base";
import { afterEventsSimplified, beforeEventsSimplified, worldToolsSimplified, customEventsManager } from "simplified-mojang-api";

/**
 * Clase hijo que maneja los eventos principales o mecanicas de las entidades.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 22-03-2026
 */
class EntityEventsManager extends TL15DBaseManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

        this.onHitSystem();
        this.onSpawnEntitysSystem();
        this.onExplodesSystem();
        this.staticEventsEntity();
        this.bruteDetailsEvents();
    }

    /**
     * Metodo principal donde se maneja las logicas principales cuando una entidad golpea a otra.
     * @author HaJuegos - 23-03-2026 
     * @private
     */
    private onHitSystem(): void {
        afterEventsSimplified.onHitEntity((args) => {
            const hitEntity = args.hitEntity;
            const sourceEntity = args.damagingEntity;

            if (hitEntity && sourceEntity) {
                switch (sourceEntity.typeId) {
                    case vanilla.MinecraftEntityTypes.Husk: {
                        hitEntity.addEffect('hunger', worldToolsSimplified.convertSecondsToTicks(30), { amplifier: 3, showParticles: true });
                    } break;
                    case vanilla.MinecraftEntityTypes.Fox: {
                        if (hitEntity instanceof mc.Player) {
                            this.stealItemsSystem(hitEntity, sourceEntity);

                            const noDropItems = sourceEntity.getComponent(mc.EntityComponentTypes.IsCharged);

                            if (!noDropItems) {
                                sourceEntity.triggerEvent('ha:set_persistance_items');
                            }
                        }
                    } break;
                    case vanilla.MinecraftEntityTypes.Hoglin: {
                        const hitDime = hitEntity.dimension;
                        const hitCoords = hitEntity.location;
                        const boatsNear = hitDime.getEntities({ location: hitCoords, maxDistance: 10, families: ['boat', 'minecart'] });

                        for (const boat of boatsNear) {
                            boat.runCommand(`playsound mob.wither.break_block @a ~~~`);
                            boat.remove();
                        }
                    } break;
                    case vanilla.MinecraftEntityTypes.Dolphin: {
                        if (hitEntity instanceof mc.Player) {
                            worldToolsSimplified.changePlyScoreInObj(hitEntity, 'dolphinTimer', 'add', 3);
                            hitEntity.addTag('hasDolphinDamage');
                        }
                    } break;
                    case vanilla.MinecraftEntityTypes.ZombieHorse:
                    case vanilla.MinecraftEntityTypes.SkeletonHorse: {
                        const dime = hitEntity.dimension;
                        const coords = hitEntity.location;

                        hitEntity.addEffect('slowness', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });
                        hitEntity.addEffect('nausea', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });
                        hitEntity.addEffect('mining_fatigue', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });

                        dime.spawnEntity((sourceEntity.typeId == vanilla.MinecraftEntityTypes.SkeletonHorse) ? vanilla.MinecraftEntityTypes.Skeleton : vanilla.MinecraftEntityTypes.Zombie, coords);
                    } break;
                    case vanilla.MinecraftEntityTypes.CamelHusk: {
                        const dime = hitEntity.dimension;
                        const coords = hitEntity.location;

                        hitEntity.addEffect('slowness', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });
                        hitEntity.addEffect('nausea', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });
                        hitEntity.addEffect('mining_fatigue', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });

                        dime.spawnEntity(vanilla.MinecraftEntityTypes.Husk, coords);
                    } break;
                    case vanilla.MinecraftEntityTypes.Spider:
                    case vanilla.MinecraftEntityTypes.CaveSpider: {
                        const isRiderZombie = sourceEntity.getComponent(mc.EntityComponentTypes.TypeFamily)?.hasTypeFamily('zombie_jockey');

                        hitEntity.runCommand(`fill ~3 ~3 ~-3 ~-3 ~-3 ~3 web replace air`);

                        if (isRiderZombie) {
                            hitEntity.runCommand(`effect @s clear`);
                        }
                    } break;
                    case vanilla.MinecraftEntityTypes.Zombie: {
                        if (hitEntity instanceof mc.Player) {
                            customEventsManager.randomizeInvPly(hitEntity);
                        }
                    } break;
                    case vanilla.MinecraftEntityTypes.PiglinBrute: {
                        if (!sourceEntity.hasTag('bruteCritic')) return;

                        const coords = hitEntity.location;
                        const dime = hitEntity.dimension;

                        dime.playSound('game.player.attack.critical', coords);
                        dime.spawnParticle('minecraft:critical_hit_emitter', { x: coords.x, y: coords.y + 2, z: coords.z });
                    } break;
                }
            }
        });

        afterEventsSimplified.onHurtEntity((args) => {
            const source = args.damageSource;
            const sourceEntity = source.damagingEntity;
            const hitEntity = args.hurtEntity;

            if (hitEntity && sourceEntity) {
                switch (sourceEntity.typeId) {
                    case vanilla.MinecraftEntityTypes.Slime: {
                        hitEntity.addEffect('oozing', worldToolsSimplified.convertSecondsToTicks(30), { amplifier: 3, showParticles: true });
                    } break;
                    case vanilla.MinecraftEntityTypes.MagmaCube: {
                        hitEntity.setOnFire(30);
                    } break;
                    case 'ha:soul_ghast': {
                        hitEntity.addEffect('slowness', worldToolsSimplified.convertSecondsToTicks(10), { amplifier: 3, showParticles: true });
                    } break;
                    case 'ha:bear_trap': {
                        sourceEntity.triggerEvent('ha:start_despawn');

                        worldToolsSimplified.changePlyScoreInObj(hitEntity as mc.Player, 'timerBearTrap', 'add', 5);

                        hitEntity.triggerEvent('ha:set_in_trap_mode');
                        hitEntity.addTag('hasBearTrap');
                    } break;
                }
            }
        });

        afterEventsSimplified.onProjectileHitEntity((args) => {
            const sourceEntity = args.source;
            const hitEntity = args.getEntityHit().entity;
            const projectile = args.projectile;

            if (hitEntity && sourceEntity) {
                switch (projectile.typeId) {
                    case 'ha:slime_pearl': {
                        if (!sourceEntity.isValid || !hitEntity.isValid || !projectile.isValid) return;

                        const coords = hitEntity.location;
                        const dime = hitEntity.dimension;

                        sourceEntity.tryTeleport(coords, { dimension: dime });

                        hitEntity.applyDamage(2, { damagingEntity: sourceEntity, damagingProjectile: projectile });
                        projectile.remove();
                        sourceEntity.runCommand(`playsound ui.slime_pearl.hit @a ${coords.x} ${coords.y} ${coords.z}`);
                    } break;
                    case 'minecraft:arrow': {
                        if (!sourceEntity.isValid || !hitEntity.isValid || !projectile.isValid) return;

                        const variant = projectile.getComponent(mc.EntityComponentTypes.Variant);

                        if (!variant) return;

                        if (variant.value == 1) {
                            hitEntity.addEffect('nausea', worldToolsSimplified.convertSecondsToTicks(60), { amplifier: 0 });
                        }
                    } break;
                }

                switch (sourceEntity.typeId) {
                    case vanilla.MinecraftEntityTypes.Parched: {
                        hitEntity.addEffect('weakness', worldToolsSimplified.convertSecondsToTicks(30), { amplifier: 3, showParticles: true });
                    } break;
                    case vanilla.MinecraftEntityTypes.Bogged: {
                        hitEntity.addEffect('poison', worldToolsSimplified.convertSecondsToTicks(30), { amplifier: 3, showParticles: true });
                    } break;
                    case vanilla.MinecraftEntityTypes.Stray: {
                        hitEntity.addEffect('slowness', worldToolsSimplified.convertSecondsToTicks(30), { amplifier: 3, showParticles: true });
                    } break;
                }
            }
        });

        afterEventsSimplified.onProjectileHitBlock((args) => {
            const sourceEntity = args.source;
            const hitInfo = args.getBlockHit();
            const projectile = args.projectile;

            if (sourceEntity && hitInfo) {
                switch (projectile.typeId) {
                    case 'ha:slime_pearl': {
                        const hitBlock = args.getBlockHit().block;

                        if (!sourceEntity.isValid || !hitBlock.isValid || !projectile.isValid) return;

                        const dime = hitBlock.dimension;
                        const face = hitInfo.face;

                        let { x, y, z } = hitBlock.location;

                        x += 0.5;
                        z += 0.5;

                        switch (face) {
                            case mc.Direction.Up: y += 1.0; break;
                            case mc.Direction.Down: y -= 2.0; break;
                            case mc.Direction.North: z -= 1.0; break;
                            case mc.Direction.South: z += 1.0; break;
                            case mc.Direction.East: x += 1.0; break;
                            case mc.Direction.West: x -= 1.0; break;
                        }

                        sourceEntity.tryTeleport({ x, y, z }, { dimension: dime });
                        projectile.remove();
                        sourceEntity.runCommand(`playsound ui.slime_pearl.hit @a ${x} ${y} ${z}`);
                    } break;
                }
            }
        });

        beforeEventsSimplified.onInteractEntity((args) => {
            const hitEntity = args.target;
            const sourcePly = args.player;

            if (hitEntity.typeId == 'ha:socrates_npc') {
                const chance = Math.random() < 0.25;

                if (chance) {
                    args.cancel = true;

                    const randomDialogueIndex = Math.floor(Math.random() * 4) + 1;

                    worldToolsSimplified.setRun(() => {
                        hitEntity.triggerEvent('ha:set_npc_mode');
                        hitEntity.nameTag = 'Socrates';

                        worldToolsSimplified.setDelay(() => {
                            sourcePly.runCommand(`dialogue open @e[type=ha:socrates_npc,c=1] @s socrates_bullshit${randomDialogueIndex}`);
                        }, worldToolsSimplified.convertSecondsToTicks(1));
                    });
                }
            }
        });
    }

    /**
     * Metodo principal que controla los eventos de entidades que explotan.
     * @author HaJuegos - 25-03-2026
     * @private
     */
    private onExplodesSystem(): void {
        beforeEventsSimplified.onExplosion((args) => {
            const entity = args.source;
            const dime = args.dimension;

            if (entity && entity.typeId == 'ha:soul_fireball') {
                const damageBlocks = args.getImpactedBlocks();
                const blacklistedBlocks = [
                    vanilla.MinecraftBlockTypes.Bedrock,
                    vanilla.MinecraftBlockTypes.Obsidian,
                    vanilla.MinecraftBlockTypes.CryingObsidian,
                    vanilla.MinecraftBlockTypes.EndPortalFrame,
                    vanilla.MinecraftBlockTypes.EndPortal
                ];

                const validCoords: mc.Vector3[] = [];

                for (const block of damageBlocks) {
                    if (block && !block.isValid) {
                        continue;
                    }

                    if (block.isAir || blacklistedBlocks.includes(block.typeId as vanilla.MinecraftBlockTypes)) {
                        continue;
                    }

                    validCoords.push(block.location);
                }

                worldToolsSimplified.setRun(() => {
                    const randomBlocks = [vanilla.MinecraftBlockTypes.SoulSand, vanilla.MinecraftBlockTypes.SoulSoil];
                    const randomSpawns = [
                        vanilla.MinecraftEntityTypes.Skeleton,
                        vanilla.MinecraftEntityTypes.WitherSkeleton,
                        vanilla.MinecraftBlockTypes.SoulFire
                    ];

                    for (const coords of validCoords) {
                        if (Math.random() < 0.60) {
                            const randomI = Math.floor(Math.random() * randomBlocks.length);

                            dime.setBlockType(coords, randomBlocks[randomI]);
                            dime.spawnParticle('ha:soul_fireball_particle', coords);
                            dime.playSound('dig.soul_sand', coords);

                            const aboveCoords = { x: coords.x, y: coords.y + 1, z: coords.z };
                            const blockAbove = dime.getBlock(aboveCoords);

                            if (blockAbove && blockAbove.isAir) {
                                if (Math.random() < 0.05) {
                                    const randomSpawnIndex = Math.floor(Math.random() * randomSpawns.length);
                                    const spawnChoice = randomSpawns[randomSpawnIndex];

                                    if (spawnChoice == vanilla.MinecraftBlockTypes.SoulFire) {
                                        blockAbove.setType(spawnChoice);
                                    } else {
                                        dime.spawnEntity(spawnChoice as vanilla.MinecraftEntityTypes, aboveCoords);
                                    }
                                }
                            }
                        }
                    }
                });
            }

            if (entity && entity.typeId == vanilla.MinecraftEntityTypes.Creeper) {
                const blocks = args.getImpactedBlocks();
                const dime = entity.dimension;
                const coords = entity.location;
                const compVariant = entity.getComponent(mc.EntityComponentTypes.Variant);

                if (compVariant) {
                    switch (compVariant.value) {
                        case 1: {
                            worldToolsSimplified.setRun(() => {
                                dime.spawnEntity('ha:custom_damage_area' as mc.VanillaEntityIdentifier, coords, { spawnEvent: 'ha:spawned_by_radioactive' });

                                for (const blockLoc of blocks) {
                                    if (Math.random() <= 0.50) {
                                        const targetBlock = dime.getBlock(blockLoc);

                                        if (targetBlock) {
                                            targetBlock.setType('ha:toxic_puddle');
                                        }
                                    }
                                }
                            });
                        } break;
                        case 2: {
                            worldToolsSimplified.setRun(() => {
                                const offset = 5;
                                const centerX = Math.floor(coords.x);
                                const centerY = Math.floor(coords.y);
                                const centerZ = Math.floor(coords.z);

                                const unbreakableBlocks = [
                                    'minecraft:bedrock',
                                    'minecraft:barrier',
                                    'minecraft:border_block',
                                    'minecraft:command_block'
                                ];

                                for (let dx = -offset; dx <= offset; dx++) {
                                    for (let dy = -offset; dy <= offset; dy++) {
                                        for (let dz = -offset; dz <= offset; dz++) {
                                            const targetLoc = {
                                                x: centerX + dx,
                                                y: centerY + dy,
                                                z: centerZ + dz
                                            };

                                            if (targetLoc.y < -64 || targetLoc.y > 320) {
                                                continue;
                                            }

                                            try {
                                                const targetBlock = dime.getBlock(targetLoc);

                                                if (targetBlock && !unbreakableBlocks.includes(targetBlock.typeId)) {
                                                    targetBlock.setType(vanilla.MinecraftBlockTypes.Obsidian);
                                                }
                                            } catch (e) {
                                                continue;
                                            }
                                        }
                                    }
                                }
                            });
                        } break;
                        case 3: {
                            worldToolsSimplified.setRun(() => {
                                dime.spawnEntity('ha:custom_damage_area' as mc.VanillaEntityIdentifier, coords, { spawnEvent: 'ha:spawned_by_debuff' });
                            });
                        } break;
                        case 4: {
                            const isBaby = entity.getComponent(mc.EntityComponentTypes.IsBaby);

                            if (isBaby) return;

                            worldToolsSimplified.setRun(() => {
                                for (let i = 0; i < 4; i++) {
                                    dime.spawnEntity('minecraft:creeper', coords, { spawnEvent: 'ha:spawn_mommy_baby' });
                                }
                            });
                        } break;
                    }
                }
            }
        });
    }

    /**
     * Metodo principal que maneja las logicas de cuando una entidad spawnea en el mundo.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private onSpawnEntitysSystem(): void {
        afterEventsSimplified.onEntitySpawns((args) => {
            const entity = args.entity;

            if (!entity.isValid) return;

            switch (entity.typeId) {
                case vanilla.MinecraftEntityTypes.LightningBolt: {
                    const coords = entity.location;
                    const dime = entity.dimension;

                    let block;
                    let blockDown;

                    try {
                        block = dime.getBlock(coords);
                        blockDown = dime.getBlockBelow(coords);
                    } catch (e) {
                        if (e instanceof Error && e.message.includes("outside of the world boundaries")) {
                            break;
                        }

                        throw e;
                    }

                    if ((block && block.typeId.includes(vanilla.MinecraftBlockTypes.LightningRod)) || (blockDown && blockDown.typeId.includes(vanilla.MinecraftBlockTypes.LightningRod))) {
                        dime.createExplosion(coords, 3, { allowUnderwater: true, breaksBlocks: true });
                    }
                } break;
                case 'minecraft:item': {
                    const namesEN = [
                        `testfor @s[name="§bSoul Fire§r"]`,
                        `testfor @s[name="§bAlma de Fuego§r"]`,

                        `testfor @s[name="§h§lCasco Cauteloso§r"]`,
                        `testfor @s[name="§h§lPechera Cautelosa§r"]`,
                        `testfor @s[name="§h§lPantalones Cautelosos§r"]`,
                        `testfor @s[name="§h§lBotas Cautelosas§r"]`,

                        `testfor @s[name="§h§lCautious Helmet Armor§r"]`,
                        `testfor @s[name="§h§lCautious Chestplate Armor§r"]`,
                        `testfor @s[name="§h§lCautious Leggings Armor§r"]`,
                        `testfor @s[name="§h§lCautious Boots Armor§r"]`,
                    ];

                    for (const name of namesEN) {
                        const cmd = entity.runCommand(`${name}`);

                        if (cmd.successCount > 0) {
                            entity.triggerEvent('ha:no_damage');
                            break;
                        }
                    }
                } break;
                case vanilla.MinecraftEntityTypes.MagmaCube: {
                    entity.triggerEvent('ha:set_initial_data');
                } break;
                case 'ha:socrates_npc': {
                    entity.nameTag = 'Socrates';
                } break;
                case vanilla.MinecraftEntityTypes.Sheep: {
                    entity.nameTag = `§bPolly§r`;
                } break;
            }
        });
    }

    /**
     * Metodo principal que controla los eventos estaticos por medio de comandos o scriptevent de las entidades.
     * @author HaJuegos - 30-03-2026
     * @private
     */
    private staticEventsEntity(): void {
        worldToolsSimplified.listenerScriptEvents((args) => {
            const id = args.id;
            const entity = args.sourceEntity as mc.Entity;

            switch (id) {
                case 'ha:give_bad_effects_wither': {
                    const dime = entity.dimension;
                    const coords = entity.location;
                    const nearEntities = dime.getEntities({ location: coords, maxDistance: 30 });
                    const badEffects = [
                        'blindness',
                        'darkness',
                        'fatal_poison',
                        'hunger',
                        'infested',
                        'mining_fatigue',
                        'nausea',
                        'oozing',
                        'poison',
                        'slowness',
                        'weakness',
                        'weaving',
                        'wither'
                    ];

                    for (const target of nearEntities) {
                        if (target.id == entity.id) {
                            continue;
                        }

                        const randomEffectIndex = Math.floor(Math.random() * badEffects.length);
                        const randomEffect = badEffects[randomEffectIndex];
                        const randomSeconds = Math.floor(Math.random() * (300 - 60 + 1)) + 60;
                        const randomLvl = Math.floor(Math.random() * 3);

                        target.addEffect(randomEffect, worldToolsSimplified.convertSecondsToTicks(randomSeconds), { amplifier: randomLvl });

                        if (target instanceof mc.Player) {
                            target.playSound('ui.get_debuff.wither');
                            target.sendMessage({ rawtext: [{ translate: 'chat.system.get_debuff_wither1' }] });
                        }
                    }
                } break;
                case 'ha:randomize_inventory_plys': {
                    const dime = entity.dimension;
                    const coords = entity.location;
                    const nearPlys = dime.getPlayers({ location: coords, maxDistance: 30 });

                    for (const ply of nearPlys) {
                        customEventsManager.randomizeInvPly(ply);
                        ply.playSound('ui.get_debuff.wither');
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.get_debuff_wither2' }] });
                    }
                } break;
                case 'ha:witch_potion_x': {
                    const typeEffect = entity.getProperty('ha:type_potion') as string;
                    const dimension = entity.dimension;
                    const potionLoc = entity.location;
                    const radius = 5.5;
                    const targets = dimension.getEntities({ location: potionLoc, maxDistance: radius }).filter(e => e.id !== entity.id);

                    for (const target of targets) {
                        const targetLoc = target.location;
                        const distance = Math.sqrt(Math.pow(potionLoc.x - targetLoc.x, 2) + Math.pow(potionLoc.y - targetLoc.y, 2) + Math.pow(potionLoc.z - targetLoc.z, 2));

                        let factor = 1 - (distance / radius);

                        if (factor < 0) factor = 0;

                        let effectCmd = ``;

                        switch (typeEffect) {
                            case 'damage': {
                                const amp = Math.floor(9 * factor);

                                effectCmd = `instant_damage 1 ${amp}`;
                            } break;
                            case 'health': {
                                const amp = Math.floor(9 * factor);

                                effectCmd = `instant_health 1 ${amp}`;
                            } break;
                            case 'regeneration': {
                                const duration = Math.max(1, Math.floor(45 * factor));

                                effectCmd = `regeneration ${duration} 9`;
                            } break;
                            case 'slowness': {
                                const duration = Math.max(1, Math.floor(150 * factor));

                                effectCmd = `slowness ${duration} 9`;
                            } break;
                            case 'poison': {
                                const duration = Math.max(1, Math.floor(45 * factor));

                                effectCmd = `poison ${duration} 9`;
                            } break;
                            case 'weakness': {
                                const duration = Math.max(1, Math.floor(150 * factor));

                                effectCmd = `weakness ${duration} 9`;
                            } break;
                        }

                        target.runCommand(`effect @s ${effectCmd}`);
                    }

                    entity.remove();
                } break;
            }
        });
    }

    /**
     * Metodo auxiliar principal encargado de poner los detalles de un Brute como el rango, vida y demas cosas.
     * @returns {void}
     * @author HaJuegos - 01-06-2026
     * @private
     */
    private bruteDetailsEvents(): void {
        afterEventsSimplified.onEntitySpawns((args) => {
            const entity = args.entity;

            if (!entity.isValid) return;

            if (entity.typeId == vanilla.MinecraftEntityTypes.PiglinBrute) {
                this.setCustomRank(entity);
            }
        });

        afterEventsSimplified.onHealthEntityChange((args) => {
            const entity = args.entity;
            const newVal = Math.floor(args.newValue);

            if (!entity.isValid) return;

            if (entity.typeId == vanilla.MinecraftEntityTypes.PiglinBrute) {
                this.setCustomRank(entity, newVal, undefined, true);
            }
        });

        customEventsManager.onEntityUseTotem((entity) => {
            if (entity.isValid && entity.typeId == vanilla.MinecraftEntityTypes.PiglinBrute) {
                const name = entity.typeId.split(':').pop()!.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

                worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: 'chat.system.use_totem', with: { rawtext: [{ text: `${name}` }] } }] });
            }
        });
    }

    /**
     * Metodo auxiliar con la logica de robo de items cuando una entidad golpea a un jugador en concreto.
     * @param {mc.Player} ply Jugador en concreto. 
     * @param {mc.Entity} entitySteal Entidad que va a robar y golpeo.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private stealItemsSystem(ply: mc.Player, entitySteal: mc.Entity): void {
        const dime = entitySteal.dimension;
        const otherEntity = entitySteal.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const invPly = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const armorPly = ply.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
        const armorSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet, mc.EquipmentSlot.Offhand];
        const validSlotsEntity = otherEntity.emptySlotsCount;

        const validInvSlots: number[] = [];
        for (let i = 0; i < invPly.size; i++) {
            const item = invPly.getItem(i);

            if (item) {
                validInvSlots.push(i);
            }
        }

        const validArmorSlots: mc.EquipmentSlot[] = [];
        for (const slot of armorSlots) {
            const item = armorPly.getEquipment(slot);

            if (item) {
                validArmorSlots.push(slot);
            }
        }

        if (validInvSlots.length == 0 && validArmorSlots.length == 0) {
            return;
        }

        let targetInventory = Math.random() < 0.5;

        if (validInvSlots.length == 0) targetInventory = false;
        if (validArmorSlots.length == 0) targetInventory = true;

        if (targetInventory) {
            if (validInvSlots.length > 0) {
                const randomIndex = Math.floor(Math.random() * validInvSlots.length);
                const slotSelect = validInvSlots[randomIndex];
                const item = invPly.getItem(slotSelect) as mc.ItemStack;

                invPly.setItem(slotSelect, undefined);

                if (validSlotsEntity > 0) {
                    otherEntity.addItem(item);
                } else {
                    dime.spawnItem(item, entitySteal.location);
                }
            }
        } else {
            if (validArmorSlots.length > 0) {
                const randomIndex = Math.floor(Math.random() * validArmorSlots.length);
                const slotSelect = validArmorSlots[randomIndex];
                const item = armorPly.getEquipment(slotSelect) as mc.ItemStack;

                armorPly.setEquipment(slotSelect, undefined);

                if (validSlotsEntity > 0) {
                    otherEntity.addItem(item);
                } else {
                    dime.spawnItem(item, entitySteal.location);
                }

            }
        }
    }
}

new EntityEventsManager();