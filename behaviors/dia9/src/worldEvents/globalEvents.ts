import * as mc from "@minecraft/server";

import { debugToolsSimplified, fakePlysSimplified, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";

/**
 * Clase hijo que se encarga de los eventos globales del mundo.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 14-03-2026
 */
class GlobalWorldEventsManager extends TL15DBaseManager {
    /**
     * Eventos principales de la clase cuando es inicialiada o llamada.
     * @constructor
     */
    constructor () {
        super();

        debugToolsSimplified.watchDogState(false);

        this.staticEvents();
    }

    /**
     * Metodo auxiliar que escucha los eventos estaticos del comando scriptevent.
     * @author HaJuegos - 14-03-2026
     * @private
     */
    private staticEvents(): void {
        worldToolsSimplified.listenerScriptEvents((args) => {
            const id = args.id;
            const source = args.sourceEntity as mc.Player;
            const msg = args.message;

            if (!source) return;

            switch (id) {
                case 'ha:set_total_debuffs': {
                    const previusTotal = mc.world.getDynamicProperty('ha:stack_debuffs') as number | undefined;
                    const newTotal = Number(msg);

                    mc.world.setDynamicProperty('ha:stack_debuffs', newTotal);
                    source.setDynamicProperty('ha:stack_debuffs', 0);
                    source.playSound('random.click');
                    source.sendMessage({ rawtext: [{ translate: 'chat.system.debuff_total_changed', with: { rawtext: [{ text: `${newTotal}` }, { text: `${previusTotal}` }] } }] });
                } break;
                case 'ha:spawn_fake': {
                    for (let i = 0; i < 2; i++) {
                        fakePlysSimplified.createFakePly(`test_${i}`, mc.GameMode.Survival);
                    }
                } break;
                case 'ha:tp_spawn': {
                    const spawnCoords = mc.world.getDefaultSpawnLocation();
                    const over = mc.world.getDimension('overworld');

                    source.tryTeleport(spawnCoords, { checkForBlocks: true, dimension: over });
                } break;
                case 'ha:hitboxeson': {
                    debugToolsSimplified.showHitboxes(source);
                } break;
                case 'ha:hitboxesoff': {
                    debugToolsSimplified.stopHitboxes();
                } break;
            }
        });
    }
}

new GlobalWorldEventsManager();