import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { TL15DBaseManager } from "../base";
import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from 'simplified-mojang-api';

/**
 * CLase hijo que controla los eventos para el sistema de logros vanilla y custom.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 19-03-2026
 */
class AdvancementManager extends TL15DBaseManager {
    /**
    * Una variable global para obtener dimensiones en concreto de la clase.
    * @type {!mc.Dimension}
    * @private
    */
    private dime!: mc.Dimension;

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
        { textAdv: 'advacement.axolotl', tagAdv: 'advAxolotl', items: vanilla.MinecraftItemTypes.AxolotlBucket, isRare: false },
        { textAdv: 'advacement.all_frogs', tagAdv: 'advAllFrogs', items: [vanilla.MinecraftItemTypes.OchreFroglight, vanilla.MinecraftItemTypes.VerdantFroglight, vanilla.MinecraftItemTypes.PearlescentFroglight], isRare: true, allItemsRequired: true },
    ];

    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        super();

        worldToolsSimplified.setRun(() => {
            this.dime = mc.world.getDimension('overworld');
        });

        this.loopCheckItems();
        this.actionAdvancements();
    }

    /**
     * Metodo principal que detecta los logros basados en items, con deteccion automatica con un tick.
     * @author HaJuegos - 20-03-2026
     * @private
     */
    private loopCheckItems(): void {
        const itemAdvancements = this.listOfAdvancements.filter(adv => !adv.isAction);

        worldToolsSimplified.setLoop(() => {
            const plys = this.dime.getPlayers();

            for (const ply of plys) {
                for (const adv of itemAdvancements) {
                    if (ply.hasTag(adv.tagAdv)) {
                        continue;
                    }

                    let hasCompletedAdv = false;

                    if (adv.allItemsRequired && Array.isArray(adv.items)) {
                        hasCompletedAdv = adv.items.every(singleItem =>
                            customEventsManager.plyHasItems(ply, singleItem, true)
                        );
                    } else {
                        hasCompletedAdv = customEventsManager.plyHasItems(ply, adv.items, true);
                    }

                    if (hasCompletedAdv) {
                        const textAdvBase = adv.isRare ? 'chat.advan.rare_base' : 'chat.advan.normal_base';
                        const soundAdvBase = adv.isRare ? 'ui.advancements.rare' : 'ui.advancements.normal';
                        const levelsGiven = Math.floor(Math.random() * 7) + (adv.isRare ? 5 : 1);

                        worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: `${textAdvBase}`, with: { rawtext: [{ text: `${ply.name}` }, { translate: `${adv.textAdv}` }] } }] });
                        ply.playSound(soundAdvBase);
                        ply.addTag(adv.tagAdv);
                        ply.addLevels(levelsGiven);
                    }
                }
            }
        }, 1);
    }

    /**
     * Metodo principal que tiene los eventos que se obtienen por medio de acciones en concreto.
     * @author HaJuegos - 20-03-2026
     * @private
     */
    private actionAdvancements(): void {
        afterEventsSimplified.onEntityDie((args) => {
            const source = args.damageSource;
            const sourceEntity = source.damagingEntity;
            const projectile = source.damagingProjectile;
            const deathEntity = args.deadEntity;

            if ((deathEntity && deathEntity.typeId == vanilla.MinecraftEntityTypes.Ghast) && (projectile && projectile.typeId == 'minecraft:fireball') && (sourceEntity && sourceEntity instanceof mc.Player)) {
                this.executeAdvan(sourceEntity, 13);

                if (deathEntity.dimension.id == 'minecraft:overworld') {
                    this.executeAdvan(sourceEntity, 16);
                }
            } else if ((deathEntity && deathEntity.typeId == vanilla.MinecraftEntityTypes.Ghast) && (sourceEntity && sourceEntity instanceof mc.Player)) {
                if (deathEntity.dimension.id == 'minecraft:overworld') {
                    this.executeAdvan(sourceEntity, 16);
                }
            }

            if ((deathEntity && deathEntity.typeId == vanilla.MinecraftEntityTypes.EnderDragon) && (sourceEntity && sourceEntity instanceof mc.Player)) {
                this.executeAdvan(sourceEntity, 23);
            }

            if ((sourceEntity && sourceEntity instanceof mc.Player) && deathEntity.typeId == vanilla.MinecraftEntityTypes.Pillager && (projectile && projectile.typeId == 'minecraft:arrow')) {
                const inv = sourceEntity.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                const selectSlot = sourceEntity.selectedSlotIndex;
                const hasCrossbow = inv.getItem(selectSlot);

                if (hasCrossbow && hasCrossbow.typeId == vanilla.MinecraftItemTypes.Crossbow) {
                    this.executeAdvan(sourceEntity, 36);
                }
            }

            if ((sourceEntity && sourceEntity instanceof mc.Player) && deathEntity.typeId == vanilla.MinecraftEntityTypes.Breeze && (projectile && projectile.typeId == vanilla.MinecraftEntityTypes.BreezeWindChargeProjectile)) {
                this.executeAdvan(sourceEntity, 41);
            }

            if ((deathEntity && deathEntity.isValid) && (sourceEntity && sourceEntity instanceof mc.Player)) {
                const familyComp = deathEntity.getComponent(mc.EntityComponentTypes.TypeFamily) as mc.EntityTypeFamilyComponent;

                if (familyComp.hasTypeFamily('monster')) {
                    this.executeAdvan(sourceEntity, 30);
                }
            }
        });

        afterEventsSimplified.onEntitySpawns((args) => {
            const entity = args.entity;

            if (entity.typeId == vanilla.MinecraftEntityTypes.Wither) {
                const dime = entity.dimension;
                const plys = dime.getPlayers({ location: entity.location, maxDistance: 100 });

                for (const ply of plys) {
                    this.executeAdvan(ply, 20);
                }
            }
        });

        afterEventsSimplified.onProjectileHitEntity((args) => {
            const sourceEntity = args.source;
            const hitEntity = args.getEntityHit().entity;
            const projectile = args.projectile;

            if ((hitEntity && hitEntity instanceof mc.Player) && projectile.typeId == 'minecraft:arrow' && !(sourceEntity && sourceEntity.id == hitEntity.id)) {
                const armorInv = hitEntity.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
                const offItem = armorInv.getEquipment(mc.EquipmentSlot.Offhand);

                if (offItem && offItem.typeId == 'minecraft:shield' && hitEntity.isSneaking) {
                    this.executeAdvan(hitEntity, 6);
                }
            }

            if ((sourceEntity && sourceEntity instanceof mc.Player) && projectile.typeId == vanilla.MinecraftEntityTypes.ThrownTrident) {
                this.executeAdvan(sourceEntity, 33);
            }

            if ((sourceEntity && sourceEntity instanceof mc.Player) && projectile.typeId == 'minecraft:arrow') {
                this.executeAdvan(sourceEntity, 34);

                if (hitEntity && hitEntity.typeId == vanilla.MinecraftEntityTypes.Skeleton) {
                    const pos1 = sourceEntity.location;
                    const pos2 = hitEntity.location;
                    const dx = pos2.x - pos1.x;
                    const dy = pos2.y - pos1.y;
                    const dz = pos2.z - pos1.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

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
                const pos1 = sourceEntity.location;
                const pos2 = block.location;
                const dx = pos2.x - pos1.x;
                const dy = pos2.y - pos1.y;
                const dz = pos2.z - pos1.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance >= 30) {
                    this.executeAdvan(sourceEntity, 38);
                }
            }
        });

        afterEventsSimplified.onChangeDimension((args) => {
            const ply = args.player;
            const toDime = args.toDimension;

            if (toDime.id == 'minecraft:nether') {
                this.executeAdvan(ply, 9);
            }

            if (toDime.id == 'minecraft:the_end') {
                this.executeAdvan(ply, 12);
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

            this.executeAdvan(ply, 35);
        });

        afterEventsSimplified.onAddsEffect((args) => {
            const entity = args.entity;
            const effect = args.effect;
            const requiredEffects = [
                'minecraft:night_vision', 'minecraft:invisibility', 'minecraft:jump_boost', 'minecraft:fire_resistance',
                'minecraft:speed', 'minecraft:slowness', 'minecraft:water_breathing', 'minecraft:poison', 'minecraft:regeneration',
                'minecraft:strength', 'minecraft:weakness', 'minecraft:wither', 'minecraft:resistance', 'minecraft:slow_falling',
                'minecraft:wind_charged', 'minecraft:weaving', 'minecraft:oozing', 'minecraft:infested'
            ];

            if (entity instanceof mc.Player) {
                const hasAllEffects = requiredEffects.every((effectId) => entity.getEffect(effectId));

                if (hasAllEffects) {
                    this.executeAdvan(entity, 22);
                }

                if (effect.typeId == vanilla.MinecraftEffectTypes.RaidOmen) {
                    this.executeAdvan(entity, 28);
                }

                if (effect.typeId == vanilla.MinecraftEffectTypes.VillageHero) {
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
    }

    /**
     * Metodo auxiliar que ejecuta la logica de dar un logro basado en el index de la lista de logros.
     * @param {mc.Player} ply Jugador que consiguio el logro.
     * @param {number} advIndex Index del logro en concreto.
     * @author HaJuegos - 20-03-2026 
     * @private
     */
    private executeAdvan(ply: mc.Player, advIndex: number): void {
        const adv = this.listOfAdvancements[advIndex];

        if (ply.hasTag(adv.tagAdv)) {
            return;
        }

        const textAdvBase = adv.isRare ? 'chat.advan.rare_base' : 'chat.advan.normal_base';
        const soundAdvBase = adv.isRare ? 'ui.advancements.rare' : 'ui.advancements.normal';
        const levelsGiven = Math.floor(Math.random() * 7) + (adv.isRare ? 5 : 1);

        worldToolsSimplified.sendMessageGlobal({ rawtext: [{ translate: `${textAdvBase}`, with: { rawtext: [{ text: `${ply.name}` }, { translate: `${adv.textAdv}` }] } }] });
        ply.playSound(soundAdvBase);
        ply.addTag(adv.tagAdv);
        ply.addLevels(levelsGiven);
    }
}

new AdvancementManager();