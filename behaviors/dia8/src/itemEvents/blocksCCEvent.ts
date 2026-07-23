import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { beforeEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo encargada de manejar los eventos principales de los componentes custom de bloques.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 17-03-2026
 */
class BlocksCustomComponentsManager {
    /**
     * Todos los componentes custom a registrar con sus respectivos eventos relacionados.
     * @type {BlockCustomCTemplate[]}
     * @author HaJuegos - 09-07-2026
     * @private
     * @readonly
     */
    private readonly listOfComponents: BlockCustomCTemplate[] = [
        // Dynamite Events
        {
            idComponent: 'ha:dynamite_interactions',
            events: {
                onPlayerInteract: (args) => {
                    const ply = args.player as mc.Player;
                    const block = args.block;
                    const dime = args.dimension;
                    const validItems: vanilla.MinecraftItemTypes[] = [vanilla.MinecraftItemTypes.FireCharge, vanilla.MinecraftItemTypes.FlintAndSteel];
                    const invPly = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
                    const slot = ply.selectedSlotIndex;
                    const item = invPly.getItem(slot);
                    const isOnState = block.permutation.getState('ha:is_on');

                    if (isOnState) return;

                    if (item && validItems.includes(item.typeId as vanilla.MinecraftItemTypes)) {
                        const newState = block.permutation.withState('ha:is_on', true);

                        block.setPermutation(newState);
                        dime.playSound('random.fuse', block.location);
                        customEventsManager.manualDamageItem({ ply: ply, item: item });
                        this.startExplosionDynamite(block, dime);
                    }
                }
            }
        },
        // Acid Poll Events
        {
            idComponent: 'ha:toxic_puddle_events',
            events: {
                onStepOn(args) {
                    const stepEntity = args.entity;

                    if (stepEntity) {
                        worldToolsSimplified.setRun(() => {
                            stepEntity.addEffect('fatal_poison', worldToolsSimplified.convertSecondsToTicks(99999), { amplifier: 3, showParticles: true });
                        });
                    }
                },
                onPlayerBreak: (args) => {
                    const ply = args.player;

                    if (ply) {
                        worldToolsSimplified.setRun(() => {
                            ply.addEffect('fatal_poison', worldToolsSimplified.convertSecondsToTicks(99999), { amplifier: 3, showParticles: true });
                        });
                    }
                },
                onRandomTick: (args) => {
                    const block = args.block;

                    if (Math.random() <= 0.5) {
                        worldToolsSimplified.setRun(() => {
                            const adjacentBlocks = [
                                block.above(),
                                block.below(),
                                block.north(),
                                block.east(),
                                block.west(),
                                block.south()
                            ];

                            const unbreakableBlocks = [
                                'minecraft:bedrock',
                                'minecraft:barrier',
                                'minecraft:border_block',
                                'minecraft:command_block'
                            ];

                            const validTargets = [];

                            for (const targetBlock of adjacentBlocks) {
                                if (targetBlock && !targetBlock.isAir && !unbreakableBlocks.includes(targetBlock.typeId) && targetBlock.typeId != block.typeId) {
                                    validTargets.push(targetBlock);
                                }
                            }

                            if (validTargets.length > 0) {
                                const chosenBlock = validTargets[Math.floor(Math.random() * validTargets.length)];

                                if (Math.random() <= 0.85) {
                                    chosenBlock.setType(block.typeId);
                                }

                                block.setType(vanilla.MinecraftBlockTypes.Air);
                            } else {
                                block.setType(vanilla.MinecraftBlockTypes.Air);
                            }
                        });
                    }
                }
            }
        }
    ];

    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        this.dynamiteEvents();
        this.registerComponents();
    }

    /**
     * Metodo auxiliar que detecta los eventos del bloque de dinamita y sus acciones cercanas.
     * @returns {void}
     * @author HaJuegos - 09-07-2026
     * @private
     */
    private dynamiteEvents(): void {
        beforeEventsSimplified.onExplosion((args) => {
            const dime = args.dimension;
            const blocks = args.getImpactedBlocks();
            const dynamites = blocks.filter(b => b?.isValid && b.typeId == 'ha:dynamite_block');

            for (const block of dynamites) {
                if (block.permutation.getState('ha:is_on') == true) continue;

                worldToolsSimplified.setRun(() => {
                    if (!block.isValid) return;

                    dime.spawnEntity('ha:dynamite' as mc.VanillaEntityIdentifier, block.location, { spawnEvent: 'ha:from_chain_explodes' });
                });
            }
        });
    }

    /**
     * Metodo auxiliar que procesa la explosion al encender la dinamita en cuestion.
     * @param {mc.Block} block Bloque de la dinamita en cuestion.
     * @param {mc.Dimension} dime Dimension a considerar.
     * @returns {void}
     * @author HaJuegos - 17-03-2026
     * @private
     */
    private startExplosionDynamite(block: mc.Block, dime: mc.Dimension): void {
        const isValidBlock = () => block.isValid && block.typeId == 'ha:dynamite_block';

        const loopID = worldToolsSimplified.setLoop(() => {
            if (isValidBlock()) {
                const blockLocation = block.location;

                dime.spawnParticle('ha:dynamite_dust', { x: blockLocation.x + 0.5, y: blockLocation.y + 0.65, z: blockLocation.z + 0.5 });
            }
        }, worldToolsSimplified.convertSecondsToTicks(0.25));

        worldToolsSimplified.setDelay(() => {
            if (isValidBlock()) {
                const blockLocation = block.location;

                dime.setBlockType(blockLocation, vanilla.MinecraftBlockTypes.Air);
                dime.createExplosion(blockLocation, 3, { allowUnderwater: true, breaksBlocks: true });
            }

            worldToolsSimplified.stopLoop(loopID);
        }, worldToolsSimplified.convertSecondsToTicks(1.2));
    }

    /**
     * Metodo principal que registra todos los componentes guardados en la variable principal.
     * @returns {void}
     * @author HaJuegos - 09-07-2026
     * @private
     */
    private registerComponents(): void {
        for (const component of this.listOfComponents) {
            beforeEventsSimplified.createBlockComponent(component.idComponent, component.events);
        }
    }
}

new BlocksCustomComponentsManager();