import * as mc from "@minecraft/server";

import { customEventsManager, debugToolsSimplified, fakePlysSimplified, worldToolsSimplified } from "simplified-mojang-api";
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
        worldToolsSimplified.listenerScriptEvents(async (args) => {
            const id = args.id;
            const source = args.sourceEntity as mc.Player;
            const msg = args.message;

            if (!source) return;

            switch (id) {
                case 'ha:final_addon': {
                    if (source.hasTag('finalMsg')) return;

                    customEventsManager.createCustomClassicFormUI({
                        titleForm: { rawtext: [{ translate: 'ui.system.end_addon.thanks' }] },
                        headerText: { rawtext: [{ translate: 'ui.system.end_addon.header_thanks' }] },
                        bodyText: { rawtext: [{ translate: 'ui.system.end_addon.body_thanks' }] },
                        labelText: { rawtext: [{ translate: 'ui.system.end_addon.label_team' }] },
                        buttonsForm: [
                            { buttomText: { rawtext: [{ translate: 'ui.system.end_addon.button_ok' }] }, }
                        ],
                        showPly: {
                            targetPly: source,
                            onCreate: (ply) => {
                                ply.playSound('random.levelup');
                                ply.playSound('ui.advancements.rare');
                                ply.playSound('music.final_music');
                            },
                            onClickBtn: (ply) => {
                                ply.addTag('finalMsg');
                            },
                            onErrForm: (ply) => {
                                if (!ply.hasTag('finalMsg')) {
                                    ply.runCommand(`scriptevent ha:final_addon`);
                                }
                            },
                            onClose: (ply) => {
                                ply.addTag('finalMsg');
                            }
                        }
                    });
                } break;
                case 'ha:set_total_debuffs': {
                    const previusTotal = mc.world.getDynamicProperty('ha:stack_debuffs') as number | undefined;
                    const newTotal = Number(msg);

                    mc.world.setDynamicProperty('ha:stack_debuffs', newTotal);
                    source.setDynamicProperty('ha:stack_debuffs', 0);
                    source.playSound('random.click');
                    source.sendMessage({ rawtext: [{ translate: 'chat.system.debuff_total_changed', with: { rawtext: [{ text: `${newTotal}` }, { text: `${previusTotal}` }] } }] });
                } break;
                case 'ha:spawn_fake': {
                    const item = new mc.ItemStack('ha:infernal_crown');

                    for (let i = 0; i < 1; i++) {
                        const ply = await fakePlysSimplified.createFakePly(`test_${i}`, mc.GameMode.Survival);

                        if (ply) {
                            ply.addItem(item);
                        }
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