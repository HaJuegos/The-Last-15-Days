import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { afterEventsSimplified, beforeEventsSimplified, customEventsManager, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";

/**
 * Clase hijo encargada de manejar los eventos principales de los componentes custom de bloques.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 17-03-2026
 */
class BlocksCustomComponentsManager extends TL15DBaseManager {
    /**
     * Eventos principales de la clase cuando es inicializada o llamada.
     * @constructor
     */
    constructor () {
        super();

        this.dynamiteEvents();

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
     * Metodo que controla los eventos custom del bloque de dinamita.
     * @author HaJuegos - 17-03-2026
     * @private
     */
    private dynamiteEvents(): void {
        const self = this;
        const blockEvents: mc.BlockCustomComponent = {
            onPlayerInteract(args) {
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
                    self.startExplosionDynamite(block, dime);
                }
            }
        };

        beforeEventsSimplified.createBlockComponent('ha:dynamite_interactions', blockEvents);
    }

    /**
     * Metodo auxiliar que procesa la explosion al encender la dinamita en cuestion.
     * @param {mc.Block} block Bloque de la dinamita en cuestion.
     * @param {mc.Dimension} dime Dimension a considerar.
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
}

new BlocksCustomComponentsManager();