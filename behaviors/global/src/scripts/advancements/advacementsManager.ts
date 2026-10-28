import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { TL15DBaseManager } from "../base";
import { CustomDimensionsTypes } from '../customTypes';

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from 'simplified-mojang-api';

/**
 * CLase hijo que controla los eventos para el sistema de logros vanilla y custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 19-03-2026
 */
class AdvancementManager extends TL15DBaseManager {
    /**
     * Mapa precomputado para los items requeridos en logros. Para no recorrer toda la lista de logros nuevamente.
     * @type {Map<string, ListOfAdvs[]>}
     * @author HaJuegos - 31-08-2026
     * @private
     */
    private itemsToAdvs: Map<string, ListOfAdvs[]> = new Map();

    /**
     * Todos los logros disponibles del add-on para obtener.
     * @type {ListOfAdvs[]}
     * @author HaJuegos - 20-03-2026
     * @private
     */
    private listOfAdvancements: ListOfAdvs[] = [
        { textAdv: 'advacement.wood_pick', tagAdv: 'advStoneAge', items: [vanilla.MinecraftItemTypes.Cobblestone, vanilla.MinecraftItemTypes.Blackstone, vanilla.MinecraftItemTypes.CobbledDeepslate], isRare: false },
        { textAdv: 'advacement.stone_pick', tagAdv: 'advUpgrade', items: vanilla.MinecraftItemTypes.StonePickaxe, isRare: false },
        { textAdv: 'advacement.iron_ingot', tagAdv: 'advHardware', items: vanilla.MinecraftItemTypes.IronIngot, isRare: false },
        { textAdv: 'advacement.suit_up', tagAdv: 'advSuitUp', items: [vanilla.MinecraftItemTypes.IronHelmet, vanilla.MinecraftItemTypes.IronChestplate, vanilla.MinecraftItemTypes.IronLeggings, vanilla.MinecraftItemTypes.IronBoots], isRare: false },
        { textAdv: 'advacement.hot_stuff', tagAdv: 'advLava', items: vanilla.MinecraftItemTypes.LavaBucket, isRare: false },
        { textAdv: 'advacement.iron_pick', tagAdv: 'advIronPick', items: vanilla.MinecraftItemTypes.IronPickaxe, isRare: false },
        { textAdv: 'advacement.not_today', tagAdv: 'advShield', items: vanilla.MinecraftItemTypes.Shield, isRare: false, isAction: true }, // 6
        { textAdv: 'advacement.obsidian', tagAdv: 'advObsidian', items: vanilla.MinecraftItemTypes.Obsidian, isRare: false },
        { textAdv: 'advacement.diamonds', tagAdv: 'advDiamonds', items: vanilla.MinecraftItemTypes.Diamond, isRare: false },
        { textAdv: 'advacement.nether', tagAdv: 'advNether', items: [], isRare: false, isAction: true }, // 9
        { textAdv: 'advacement.diamods_armor', tagAdv: 'advArmorDiamond', items: [vanilla.MinecraftItemTypes.DiamondHelmet, vanilla.MinecraftItemTypes.DiamondChestplate, vanilla.MinecraftItemTypes.DiamondLeggings, vanilla.MinecraftItemTypes.DiamondBoots], isRare: false },
        { textAdv: 'advacement.zombie_doctor', tagAdv: 'advZombieDoctor', items: [], isRare: false, isAction: true },  // 11
        { textAdv: 'advacement.the_end', tagAdv: 'advtheend', items: [], isRare: false, isAction: true }, // 12
        { textAdv: 'advacement.return_sender', tagAdv: 'advReturnSender', items: [], isRare: true, isAction: true }, // 13
        { textAdv: 'advacement.debris', tagAdv: 'advdebris', items: vanilla.MinecraftItemTypes.AncientDebris, isRare: false },
        { textAdv: 'advacement.crying_obsi', tagAdv: 'advCryingObs', items: vanilla.MinecraftItemTypes.CryingObsidian, isRare: false },
        { textAdv: 'advacement.ghast_over', tagAdv: 'advGhastOver', items: [], isRare: true, isAction: true }, // 16
        { textAdv: 'advacement.netherite', tagAdv: 'advAllNetherite', items: [vanilla.MinecraftItemTypes.NetheriteHelmet, vanilla.MinecraftItemTypes.NetheriteChestplate, vanilla.MinecraftItemTypes.NetheriteLeggings, vanilla.MinecraftItemTypes.NetheriteBoots], isRare: true, allItemsRequired: true },
        { textAdv: 'advacement.wither_skull', tagAdv: 'advWitherSkull', items: vanilla.MinecraftItemTypes.WitherSkeletonSkull, isRare: false },
        { textAdv: 'advacement.blaze', tagAdv: 'advBlaze', items: vanilla.MinecraftItemTypes.BlazeRod, isRare: false },
        { textAdv: 'advacement.wither', tagAdv: 'advWither', items: [], isRare: false, isAction: true }, // 20
        { textAdv: 'advacement.beacon', tagAdv: 'advBeacon', items: vanilla.MinecraftItemTypes.Beacon, isRare: true },
        { textAdv: 'advacement.all_effects', tagAdv: 'advAllEffects', items: [], isRare: true, isAction: true }, // 22
        { textAdv: 'advacement.free_end', tagAdv: 'advDragon', items: [], isRare: true, isAction: true }, // 23
        { textAdv: 'advacement.next_generation', tagAdv: 'advNextEgg', items: vanilla.MinecraftItemTypes.DragonEgg, isRare: true },
        { textAdv: 'advacement.mint', tagAdv: 'advMintDragon', items: vanilla.MinecraftItemTypes.DragonBreath, isRare: false },
        { textAdv: 'advacement.shulker', tagAdv: 'advShulker', items: vanilla.MinecraftItemTypes.ShulkerShell, isRare: true },
        { textAdv: 'advacement.elytra', tagAdv: 'advElytra', items: vanilla.MinecraftItemTypes.Elytra, isRare: true },
        { textAdv: 'advacement.bad_omen', tagAdv: 'advBadomen', items: [], isRare: false, isAction: true }, // 28
        { textAdv: 'advacement.compass_block', tagAdv: 'advCompassBlock', items: [], isRare: false, isAction: true }, // 29
        { textAdv: 'advacement.monster_hunter', tagAdv: 'advMonsterKill', items: [], isRare: false, isAction: true }, // 30
        { textAdv: 'advacement.dreams', tagAdv: 'advDreams', items: [], isRare: false, isAction: true }, // 31
        { textAdv: 'advacement.hero_village', tagAdv: 'advHero', items: [], isRare: true, isAction: true }, // 32
        { textAdv: 'advacement.trident', tagAdv: 'advTrident', items: [], isRare: false, isAction: true }, // 33
        { textAdv: 'advacement.bow', tagAdv: 'advBow', items: [], isRare: false, isAction: true }, // 34
        { textAdv: 'advacement.totem', tagAdv: 'advTotem', items: [], isRare: false, isAction: true }, // 35
        { textAdv: 'advacement.pillager_now', tagAdv: 'advPillagerNow', items: [], isRare: false, isAction: true }, // 36
        { textAdv: 'advacement.sniper_duel', tagAdv: 'advSniper', items: [], isRare: true, isAction: true }, // 37
        { textAdv: 'advacement.bullseye', tagAdv: 'advBullEye', items: [], isRare: true, isAction: true }, // 38
        { textAdv: 'advacement.under_lock', tagAdv: 'advKey1', items: [], isRare: false, isAction: true }, // 39
        { textAdv: 'advacement.revault', tagAdv: 'advKey2', items: [], isRare: false, isAction: true }, // 40
        { textAdv: 'advacement.blowback', tagAdv: 'advKillBreeze', items: [], isRare: true, isAction: true }, // 41
        { textAdv: 'advacement.hydrated', tagAdv: 'advStayHydrated', items: [], isRare: false, isAction: true }, // 42
        { textAdv: 'advacement.bee_guest', tagAdv: 'advBee', items: vanilla.MinecraftItemTypes.HoneyBottle, isRare: false },
        { textAdv: 'advacement.bukki', tagAdv: 'advBukkit', items: vanilla.MinecraftItemTypes.TadpoleBucket, isRare: false },
        { textAdv: 'advacement.sniffer', tagAdv: 'advSniffer', items: vanilla.MinecraftItemTypes.SnifferEgg, isRare: false },
        { textAdv: 'advacement.tactical_fish', tagAdv: 'advFish', items: [vanilla.MinecraftItemTypes.CodBucket, vanilla.MinecraftItemTypes.SalmonBucket, vanilla.MinecraftItemTypes.PufferfishBucket, vanilla.MinecraftItemTypes.TropicalFishBucket], isRare: false },
        { textAdv: 'advacement.little_sniffs', tagAdv: 'advLittherSnifs', items: [], isRare: false, isAction: true }, // 47
        { textAdv: 'advacement.serius_dedication', tagAdv: 'advSerius', items: vanilla.MinecraftItemTypes.NetheriteHoe, isRare: true },
        { textAdv: 'advacement.wax_off', tagAdv: 'advWax', items: [], isRare: false, isAction: true }, // 49
        { textAdv: 'advacement.axolotl', tagAdv: 'advAxolotl', items: vanilla.MinecraftItemTypes.AxolotlBucket, isRare: false }, // 50
        { textAdv: 'advacement.all_frogs', tagAdv: 'advAllFrogs', items: [vanilla.MinecraftItemTypes.OchreFroglight, vanilla.MinecraftItemTypes.VerdantFroglight, vanilla.MinecraftItemTypes.PearlescentFroglight], isRare: true, allItemsRequired: true }, // 51
        { textAdv: 'advacement.infernal_crown', tagAdv: 'advInfernalCrown', items: 'ha:infernal_crown', isRare: true, allItemsRequired: true, isCustom: true }, // 52
        { textAdv: 'advacement.hoglin_tusk', tagAdv: 'advHoglinTusk', items: 'ha:hoglin_fang', isRare: true, allItemsRequired: true, isCustom: true }, // 53
        { textAdv: 'advacement.cautious_armor', tagAdv: 'advCautiousArmor', items: ['ha:cautious_helmet', 'ha:cautious_chestplate', 'ha:cautious_leggings', 'ha:cautious_boots'], isRare: true, allItemsRequired: true }, // 54
        { textAdv: 'advacement.backrooms', tagAdv: 'advBackrooms', items: [], isRare: true, isAction: true, isCustom: true }, // 55
        { textAdv: 'advacement.garfield', tagAdv: 'advGarfield', items: [], isRare: true, isAction: true, isCustom: true }, // 56
        { textAdv: 'advacement.ha', tagAdv: 'advHa', items: [], isRare: false, isAction: true, isCustom: true }, // 57
        { textAdv: 'advacement.royer', tagAdv: 'advRoyer', items: [], isRare: false, isAction: true, isCustom: true }, // 58
        { textAdv: 'advacement.convex', tagAdv: 'advConvex', items: [], isRare: true, isAction: true, isCustom: true }, // 59
        { textAdv: 'advacement.riding_llama', tagAdv: 'advLlama', items: [], isRare: false, isAction: true, isCustom: true }, // 60
    ];

    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        super();

        this.loopCheckItems();
        this.actionAdvancements();
    }

    /**
     * Metodo auxiliar que construye el mapa de items requeridos por los logros que lo necesitan, computarizando todo de ante mano en vez de recorrer todo nuevamente.
     * @returns {void}
     * @author HaJuegos - 31-08-2026
     * @private
     */
    private buildItemsMap(): void {
        const itemsAdvs = this.listOfAdvancements.filter(adv => !adv.isAction);

        for (const adv of itemsAdvs) {
            const items = Array.isArray(adv.items) ? adv.items : [adv.items];

            for (const itemID of items) {
                const exist = this.itemsToAdvs.get(itemID as string) ?? [];

                exist.push(adv);
                this.itemsToAdvs.set(itemID as string, exist);
            }
        }
    }

    /**
     * Metodo principal que detecta los logros basados en items, con deteccion automatica por un segundo in game.
     * @version 3 Se cambia de loop a un evento especifico.
     * @version 2 Se optimiza el codigo.
     * @returns {void}
     * @author HaJuegos - 18-06-2026
     * @private
     */
    private loopCheckItems(): void {
        this.buildItemsMap();

        afterEventsSimplified.onPlyInvChange((args) => {
            const ply = args.player;
            const item = args.itemStack;

            if (!item) return;

            const idItem = item.typeId as vanilla.MinecraftItemTypes;
            const relevantAdvs = this.itemsToAdvs.get(idItem);

            if (!relevantAdvs) return;

            for (const adv of relevantAdvs) {
                if (ply.hasTag(adv.tagAdv)) return;

                let completed = false;

                if (adv.allItemsRequired && Array.isArray(adv.items)) {
                    const actualItems = this.checkPlyInv(ply);

                    completed = adv.items.every((tID) => (actualItems.has(tID)));
                } else if (Array.isArray(adv.items)) {
                    completed = adv.items.includes(idItem);
                } else {
                    completed = (idItem == adv.items);
                }

                if (completed) {
                    this.giveAdvancement(ply, adv);
                }
            }
        });
    }

    /**
     * Metodo auxiliar que revisa el inventario del jugador y devuelve los items del mismo.
     * @param {mc.Player} ply Jugador en concreto a analizar.
     * @returns {Set<string>} La lista de items pero en su ID.
     * @private
     * @author HaJuegos - 19-06-2026
     */
    private checkPlyInv(ply: mc.Player): Set<string> {
        const actualItems = new Set<string>();
        const inv = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container;
        const armorInv = ply.getComponent(mc.EntityComponentTypes.Equippable);

        if (inv) {
            for (let i = 0; i < inv.size; i++) {
                const item = inv.getItem(i);

                if (item) {
                    actualItems.add(item.typeId);
                }
            }
        }

        if (armorInv) {
            const armorSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet, mc.EquipmentSlot.Offhand];

            for (const slot of armorSlots) {
                const item = armorInv.getEquipment(slot);

                if (item) {
                    actualItems.add(item.typeId);
                }
            }
        }

        return actualItems;
    }

    /**
     * Metodo principal que tiene los eventos que se obtienen por medio de acciones en concreto.
     * @author HaJuegos - 20-03-2026
     * @private
     */
    private actionAdvancements(): void {
        afterEventsSimplified.onPlayerSpawns((args) => {
            const sourcePly = args.player;
            const firstSpawn = args.initialSpawn;

            if (!firstSpawn) return;

            const nameAdvs: { [key: string]: number; } = {
                'Ha Juegos': 57,
                'BigRoyer': 58,
                'llConvex38ll': 59
            };

            const allPlayers = mc.world.getAllPlayers();

            for (const onlinePly of allPlayers) {
                if (sourcePly.name == onlinePly.name) continue;

                const sourceAdv = nameAdvs[sourcePly.name];

                if (sourceAdv != undefined) {
                    this.executeAdvan(onlinePly, sourceAdv);
                }

                const onlineAdv = nameAdvs[onlinePly.name];

                if (onlineAdv != undefined) {
                    this.executeAdvan(sourcePly, onlineAdv);
                }
            }
        });

        afterEventsSimplified.onEntityDie((args) => {
            const sourceEntity = args.damageSource.damagingEntity;
            const projectile = args.damageSource.damagingProjectile;
            const deathEntity = args.deadEntity;

            if (!(sourceEntity instanceof mc.Player) || !deathEntity?.isValid) return;

            switch (deathEntity.typeId) {
                case vanilla.MinecraftEntityTypes.Ghast: {
                    if (projectile?.typeId == vanilla.MinecraftEntityTypes.Fireball) {
                        this.executeAdvan(sourceEntity, 13);
                    }

                    if (deathEntity.dimension.id == vanilla.MinecraftDimensionTypes.Overworld) {
                        this.executeAdvan(sourceEntity, 16);
                    }
                } break;
                case vanilla.MinecraftEntityTypes.EnderDragon: {
                    this.executeAdvan(sourceEntity, 23);
                } break;
                case vanilla.MinecraftEntityTypes.Pillager: {
                    if (projectile?.typeId == vanilla.MinecraftEntityTypes.Arrow) {
                        const armorInv = sourceEntity.getComponent(mc.EntityComponentTypes.Equippable);

                        if (armorInv) {
                            const hasCrossbow = armorInv.getEquipment(mc.EquipmentSlot.Mainhand);

                            if (hasCrossbow?.typeId == vanilla.MinecraftItemTypes.Crossbow) {
                                this.executeAdvan(sourceEntity, 36);
                            }
                        }
                    }
                } break;
                case vanilla.MinecraftEntityTypes.Breeze: {
                    if (projectile?.typeId == vanilla.MinecraftEntityTypes.BreezeWindChargeProjectile) {
                        this.executeAdvan(sourceEntity, 41);
                    }
                } break;
                case 'ha:garfield': {
                    this.executeAdvan(sourceEntity, 56);
                } break;
            }

            const familyComp = deathEntity.getComponent(mc.EntityComponentTypes.TypeFamily);

            if (familyComp?.hasTypeFamily('monster')) {
                this.executeAdvan(sourceEntity, 30);
            }
        });

        afterEventsSimplified.onEntitySpawns((args) => {
            const entity = args.entity;

            switch (entity.typeId) {
                case vanilla.MinecraftEntityTypes.Wither: {
                    const dime = entity.dimension;
                    const plys = dime.getPlayers({ location: entity.location, maxDistance: 100 });

                    for (const ply of plys) {
                        this.executeAdvan(ply, 20);
                    }
                } break;
            }
        });

        afterEventsSimplified.onProjectileHitEntity((args) => {
            const sourceEntity = args.source;
            const hitEntity = args.getEntityHit().entity;
            const projectile = args.projectile;
            const isPlySource = sourceEntity instanceof mc.Player;
            const isArrow = projectile.typeId == vanilla.MinecraftEntityTypes.Arrow;

            if (isArrow && hitEntity instanceof mc.Player && sourceEntity?.id != hitEntity.id) {
                if (hitEntity.isSneaking && customEventsManager.plyHasItems(hitEntity, vanilla.MinecraftItemTypes.Shield)) {
                    this.executeAdvan(hitEntity, 6);
                }
            }

            if (!isPlySource) return;

            if (projectile.typeId == vanilla.MinecraftEntityTypes.ThrownTrident) {
                this.executeAdvan(sourceEntity, 33);
                return;
            }

            if (isArrow) {
                this.executeAdvan(sourceEntity, 34);

                if (hitEntity?.typeId == vanilla.MinecraftEntityTypes.Skeleton) {
                    const distance = this.calculatorDistance(sourceEntity.location, hitEntity.location);

                    if (distance >= 50) {
                        this.executeAdvan(sourceEntity, 37);
                    }
                }
            }
        });

        afterEventsSimplified.onProjectileHitBlock((args) => {
            const sourceEntity = args.source;
            const block = args.getBlockHit().block;

            if (!block.isValid || (sourceEntity && !sourceEntity.isValid)) return;

            if ((sourceEntity && sourceEntity instanceof mc.Player) && block.typeId == vanilla.MinecraftBlockTypes.Target) {
                const distance = this.calculatorDistance(sourceEntity.location, block.location);

                if (distance >= 30) {
                    this.executeAdvan(sourceEntity, 38);
                }
            }
        });

        afterEventsSimplified.onChangeDimension((args) => {
            const ply = args.player;
            const toDime = args.toDimension;

            if (toDime.id == vanilla.MinecraftDimensionTypes.Nether) {
                this.executeAdvan(ply, 9);
            }

            if (toDime.id == vanilla.MinecraftDimensionTypes.TheEnd) {
                this.executeAdvan(ply, 12);
            }

            if (toDime.id == CustomDimensionsTypes.BackRooms) {
                this.executeAdvan(ply, 55);
            }
        });

        beforeEventsSimplified.onInteractEntity((args) => {
            const ply = args.player;
            const hitEntity = args.target;
            const item = args.itemStack;
            const compEffects = hitEntity.getEffect(vanilla.MinecraftEffectTypes.Weakness);

            if (hitEntity.typeId == vanilla.MinecraftEntityTypes.ZombieVillagerV2 && (item && item.typeId == vanilla.MinecraftItemTypes.GoldenApple) && compEffects) {
                worldToolsSimplified.setRun(() => {
                    this.executeAdvan(ply, 11);
                });
            }

            if ((hitEntity.typeId == vanilla.MinecraftEntityTypes.Sniffer && hitEntity.getComponent(mc.EntityComponentTypes.IsBaby)) && (item && item.typeId == vanilla.MinecraftItemTypes.TorchflowerSeeds)) {
                worldToolsSimplified.setRun(() => {
                    this.executeAdvan(ply, 47);
                });
            }
        });

        beforeEventsSimplified.onInteractBlock((args) => {
            const ply = args.player;
            const block = args.block;
            const item = args.itemStack;
            const dayTime = mc.world.getTimeOfDay();
            const isNightTime = dayTime >= 12542 && dayTime < 23458;

            if (block.typeId == vanilla.MinecraftBlockTypes.Lodestone && (item && item.typeId == vanilla.MinecraftItemTypes.Compass)) {
                worldToolsSimplified.setRun(() => {
                    this.executeAdvan(ply, 29);
                });
            }

            if (block.typeId == vanilla.MinecraftBlockTypes.Bed && isNightTime) {
                worldToolsSimplified.setRun(() => {
                    this.executeAdvan(ply, 31);
                });
            }

            if (block.typeId == vanilla.MinecraftBlockTypes.Vault) {
                const isOminous = block.permutation.getState('ominous');

                if (item && item.typeId == vanilla.MinecraftItemTypes.TrialKey) {
                    worldToolsSimplified.setRun(() => {
                        this.executeAdvan(ply, 39);
                    });
                }

                if (item && item.typeId == vanilla.MinecraftItemTypes.OminousTrialKey && isOminous) {
                    worldToolsSimplified.setRun(() => {
                        this.executeAdvan(ply, 40);
                    });
                }
            }

            if ((block.typeId.includes('exposed') || block.typeId.includes('weathered') || block.typeId.includes('oxidized')) && (item && item.typeId.includes('axe'))) {
                worldToolsSimplified.setRun(() => {
                    this.executeAdvan(ply, 49);
                });
            }
        });

        customEventsManager.onEntityUseTotem((ply) => {
            if (!(ply instanceof mc.Player)) return;

            worldToolsSimplified.setRun(() => {
                this.executeAdvan(ply, 35);
            });
        });

        afterEventsSimplified.onAddsEffect((args) => {
            const entity = args.entity;
            const effect = args.effect;

            if (!entity || !effect) return;

            let typeID: string;

            try {
                typeID = effect.typeId;
            } catch {
                return;
            }

            const requiredEffects = [
                'minecraft:night_vision', 'minecraft:invisibility', 'minecraft:jump_boost', 'minecraft:fire_resistance',
                'minecraft:speed', 'minecraft:slowness', 'minecraft:water_breathing', 'minecraft:poison', 'minecraft:regeneration',
                'minecraft:strength', 'minecraft:weakness', 'minecraft:wither', 'minecraft:resistance', 'minecraft:slow_falling',
                'minecraft:wind_charged', 'minecraft:weaving', 'minecraft:oozing', 'minecraft:infested'
            ];

            if (entity instanceof mc.Player) {
                if (requiredEffects.includes(typeID)) {
                    const hasAllEffects = requiredEffects.every((effectId) => entity.getEffect(effectId));

                    if (hasAllEffects) {
                        this.executeAdvan(entity, 22);
                    }
                }

                if (typeID == vanilla.MinecraftEffectTypes.RaidOmen) {
                    this.executeAdvan(entity, 28);
                }

                if (typeID == vanilla.MinecraftEffectTypes.VillageHero) {
                    this.executeAdvan(entity, 32);
                }
            }
        });

        afterEventsSimplified.onPlaceBlock((args) => {
            const ply = args.player;
            const block = args.block;

            if (block.typeId == vanilla.MinecraftBlockTypes.DriedGhast && block.isWaterlogged) {
                this.executeAdvan(ply, 42);
            }
        });

        afterEventsSimplified.onTamedEntity((args) => {
            const { entity, tamingEntity: sourceEntity } = args;

            if (!(sourceEntity instanceof mc.Player)) return;

            if (entity.typeId == vanilla.MinecraftEntityTypes.Llama || entity.typeId == vanilla.MinecraftEntityTypes.TraderLlama) {
                const isDay10 = entity.getProperty('ha:is_new_llama');

                if (isDay10) {
                    this.executeAdvan(sourceEntity, 60);
                }

            }
        });
    }

    /**
     * Metodo auxiliar que ejecuta la logica de los logros basado por index de la lista de logros mapeada.
     * @param {mc.Player} ply Jugador que consiguio el logro.
     * @param {number} advIndex Index del logro en concreto.
     * @author HaJuegos - 20-03-2026 
     * @private
     */
    private executeAdvan(ply: mc.Player, advIndex: number): void {
        this.giveAdvancement(ply, this.listOfAdvancements[advIndex]);
    }

    /**
     * Metodo auxiliar que contiene toda la logica de los logros obtenidos y mapeados.
     * @param {mc.Player} ply Jugador en cuestion.
     * @param {ListOfAdvs} adv Logro en cuestion.
     * @returns {void}
     * @author HaJuegos - 19-06-2026
     * @private
     */
    private giveAdvancement(ply: mc.Player, adv: ListOfAdvs): void {
        if (ply.hasTag(adv.tagAdv)) return;

        const txtAdvBase = adv.isRare ? 'chat.advan.rare_base' : 'chat.advan.normal_base';
        const soundAdvBase = adv.isRare ? 'ui.advancements.rare' : 'ui.advancements.normal';
        const lvlsGive = Math.floor(Math.random() * 7) + (adv.isRare ? 5 : 1);

        worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: `${txtAdvBase}`, with: { rawtext: [{ text: `${ply.name}` }, { translate: `${adv.textAdv}` }] } }] });

        ply.playSound(soundAdvBase);
        ply.addTag(adv.tagAdv);
        ply.addLevels(lvlsGive);

        const dynamicKey = adv.isCustom ? 'ha:total_advs_custom' : 'ha:total_advs';
        const totalActual = ply.getDynamicProperty(dynamicKey) as number ?? 0;

        ply.setDynamicProperty(dynamicKey, totalActual + 1);
    }

    /**
     * Metodo auxiliar que calcular la distancia que hay de un punto de coordenadas a otro punto.
     * @param {mc.Vector3} coords1 Punto inicial a calcular.
     * @param {mc.Vector3} coords2 Punto final a calcular.
     * @returns {number} Devuelve la distancia que hay entre los dos puntos.
     * @author HaJuegos - 31-08-2026 
     * @private
     */
    private calculatorDistance(coords1: mc.Vector3, coords2: mc.Vector3): number {
        const dx = coords2.x - coords1.x;
        const dy = coords2.y - coords1.y;
        const dz = coords2.z - coords1.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}

new AdvancementManager();