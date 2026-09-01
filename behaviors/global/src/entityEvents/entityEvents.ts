import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { afterEventsSimplified, beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase global que controla los eventos principales del add-on respecto a entidades.
 * @typedef {EntityEventsManager}
 * @author HaJuegos - 26-07-2026
 */
class EntityEventsManager {
    /**
     * Eventos principales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        this.bellRaidGlowing();
        this.staticEvents();
    }

    /**
     * Metodo auxiliar que calcula si un jugador puede interactuar y activar el efecto de glowing en una campana.
     * @returns {void}
     * @author HaJuegos - 01-09-2026
     * @private
     */
    private bellRaidGlowing(): void {
        const raidMobs: vanilla.MinecraftEntityTypes[] | string[] = [
            vanilla.MinecraftEntityTypes.Pillager,
            vanilla.MinecraftEntityTypes.Vindicator,
            vanilla.MinecraftEntityTypes.EvocationIllager,
            vanilla.MinecraftEntityTypes.Vex,
            vanilla.MinecraftEntityTypes.Ravager,
            vanilla.MinecraftEntityTypes.Witch,
            'ha:bomber_pillager',
        ];

        beforeEventsSimplified.onInteractBlock(async (args) => {
            const { block, isFirstEvent: firstAttp, player: ply } = args;

            if (block.isValid && block.typeId == vanilla.MinecraftBlockTypes.Bell && firstAttp) {
                await null;

                const canInteract = block.permutation.getState('toggle_bit');

                if (!canInteract) return;

                const cooldownBell = 24;
                const lastUse = ply.getDynamicProperty('ha:cooldown_bell') as number ?? 0;
                const elapsed = (Date.now() - lastUse) / 1000;

                if (elapsed < cooldownBell) return;

                block.setPermutation(block.permutation.withState('toggle_bit', false));

                const coords = block.location;
                const dime = block.dimension;
                const center = {
                    x: coords.x + 0.5,
                    y: coords.y + 0.5,
                    z: coords.z + 0.5
                };

                const entitiesNear = dime.getEntities({
                    location: center,
                    maxDistance: 75
                }).filter(e => raidMobs.includes(e.typeId));

                if (entitiesNear.length == 0) return;

                ply.setDynamicProperty('ha:cooldown_bell', Date.now());
                dime.playSound('ambient.reveal_raid', coords);

                worldToolsSimplified.setDelay(() => {
                    for (const entity of entitiesNear) {
                        if (!entity.isValid) continue;

                        try {
                            entity.triggerEvent('ha:set_glow');
                        } catch { }
                    }
                }, worldToolsSimplified.convertSecondsToTicks(2));
            }
        });
    }

    /**
     * Metodo principal que controla los eventos estaticos que pasen en los add-ons en general.
     * @returns {void}
     * @author HaJuegos - 26-07-2026
     * @private
     */
    private staticEvents(): void {
        worldToolsSimplified.listenerScriptEvents((args) => {
            const entity = args.sourceEntity as mc.Entity;

            if (!entity) return;
            if (!entity.isValid) return;

            const dime = entity.dimension;
            const nearPlys = (() => {
                return dime.getPlayers({ location: entity.location, maxDistance: 100 });
            });

            const id = args.id;
            const msg = Number(args.message);

            if (id == 'ha:garfield_pre-dialog') {
                const dialogs = [
                    'dialogue.garfield.pre-dialog1',
                    'dialogue.garfield.pre-dialog2',
                    'dialogue.garfield.pre-dialog3',
                    'dialogue.garfield.pre-dialog4',
                    'dialogue.garfield.pre-dialog5',
                    'dialogue.garfield.pre-dialogfinal',
                ];

                for (const ply of nearPlys()) {
                    ply.sendMessage({ rawtext: [{ translate: `${dialogs[msg - 1]}` }] });
                }
            } else if (id == 'ha:garfield_start_fight') {
                let musicPlys: string[] = [];

                /**
                 * Lista de mobs que genera garfield en concreto.
                 * @type {({ type: vanilla.MinecraftEntityTypes | string; amount: number; }[])}
                 * @author HaJuegos - 29-07-2026
                 */
                const summonChoices: { type: vanilla.MinecraftEntityTypes | string; amount: number; }[] = [
                    { type: vanilla.MinecraftEntityTypes.Tnt, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Fox, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Bee, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Bogged, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.WitherSkeleton, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Witch, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Pillager, amount: 4 },
                    { type: "ha:bomber_pillager", amount: 2 },
                    { type: vanilla.MinecraftEntityTypes.Ravager, amount: 2 },
                    { type: vanilla.MinecraftEntityTypes.Creeper, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Vindicator, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.Zombie, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.CaveSpider, amount: 4 },
                    { type: vanilla.MinecraftEntityTypes.ElderGuardian, amount: 4 }
                ];

                const loopId = worldToolsSimplified.setLoop(() => {
                    if (!entity.isValid) return;

                    const currentPlts = nearPlys();
                    const idsPlys = currentPlts.map(p => p.id);

                    for (let i = musicPlys.length - 1; i >= 0; i--) {
                        if (!idsPlys.includes(musicPlys[i])) {
                            const ply = dime.getPlayers().find(p => p.id == musicPlys[i]);

                            if (ply) {
                                ply.stopMusic();
                            }

                            musicPlys.splice(i, 1);
                        }
                    }

                    for (const ply of currentPlts) {
                        if (!musicPlys.includes(ply.id)) {
                            ply.playMusic('music.garfield_boss', { loop: true });
                            musicPlys.push(ply.id);
                        }
                    }
                }, worldToolsSimplified.convertSecondsToTicks(1));

                const loopExplodes = worldToolsSimplified.setLoop(() => {
                    if (!entity.isValid) return;

                    dime.createExplosion(entity.location, 4, { allowUnderwater: true, breaksBlocks: true, source: entity });
                }, worldToolsSimplified.convertSecondsToTicks(10));

                const loopEntities = worldToolsSimplified.setLoop(() => {
                    if (!entity.isValid) return;

                    const target = entity.target;
                    const centerLoc = (target && target.isValid && Math.random() < 0.5) ? target.location : entity.location;
                    const choice = summonChoices[Math.floor(Math.random() * summonChoices.length)];

                    for (let i = 0; i < choice.amount; i++) {
                        const angle = (i / choice.amount) * Math.PI * 2;
                        const offsetX = Math.cos(angle) * 3;
                        const offsetZ = Math.sin(angle) * 3;
                        const spawnLoc = {
                            x: centerLoc.x + offsetX,
                            y: centerLoc.y,
                            z: centerLoc.z + offsetZ
                        };
                        dime.spawnEntity(choice.type as mc.VanillaEntityIdentifier, spawnLoc, { spawnEvent: 'minecraft:entity_spawned' });
                    }
                }, worldToolsSimplified.convertSecondsToTicks(10));

                afterEventsSimplified.onEntityDie((args) => {
                    const entity = args.deadEntity;

                    if (!entity.isValid) return;

                    const dime = entity.dimension;
                    const plys = dime.getPlayers();

                    if (entity.typeId == 'ha:garfield') {
                        worldToolsSimplified.stopLoop(loopExplodes);
                        worldToolsSimplified.stopLoop(loopId);
                        worldToolsSimplified.stopLoop(loopEntities);

                        for (const ply of plys) {
                            ply.stopMusic();
                        }
                    }
                });
            }
        });
    }
}

new EntityEventsManager();