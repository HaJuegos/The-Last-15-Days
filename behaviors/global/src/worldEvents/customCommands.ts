import * as mc from "@minecraft/server";

import { beforeEventsSimplified, ButtonFormBase, customEventsManager, debugToolsSimplified, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";

/**
 * Clase principal que controla los comandos personalizados del add-on a base de scripts.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 07-07-2026
 */
class CustomCmdsEvents extends TL15DBaseManager {
    /**
     * Todos los comandos custom creados a base de una plantilla fija para ser registradas en el mundo.
     * @type {CustomCmdTemplate[]}
     * @author HaJuegos - 08-07-2026
     * @private
     * @readonly
     */
    private readonly customCmds: CustomCmdTemplate[] = [
        // Comando de ban
        {
            prefixCmd: 'ha:autoban',
            description: 'Comando que modifica el estado de baneo automatico del servidor.',
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            cheatsEnabled: true,
            paramsCmd: [{ name: 'banState', type: mc.CustomCommandParamType.Boolean }],
            onRunCmd: (ply, args) => {
                const newState = args[0] as boolean;

                worldToolsSimplified.setRun(() => {
                    if (newState) {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.autoban.enabled' }] });
                    } else {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.autoban.disabled' }] });
                    }

                    TL15DBaseManager.banState = newState;

                    mc.world.setDynamicProperty('ha:ban_state', newState);
                    ply.playSound('random.screenshot');
                });
            }
        },
        // Comando de hitboxes
        {
            prefixCmd: 'ha:hitboxes',
            description: 'Comando que alterna la visibilidad de las hitboxes de las entidades en un jugador en concreto.',
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            cheatsEnabled: true,
            paramsCmd: [
                { name: 'player', type: mc.CustomCommandParamType.PlayerSelector },
                { name: 'state', type: mc.CustomCommandParamType.Boolean }
            ],
            onRunCmd: (sourcePly, targets: { id: string; typeId: string; }[], newState: boolean) => {
                const plys = mc.world.getAllPlayers().filter(ply =>
                    targets.some(target => target.id == ply.id)
                );

                if (plys.length == 0) {
                    worldToolsSimplified.setRun(() => {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.error.nothing' }] });
                        sourcePly.playSound('ui.error_item');
                    });

                    return;
                }

                for (const ply of plys) {
                    if (!ply.isValid) {
                        worldToolsSimplified.setRun(() => {
                            sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.error.noply', with: { rawtext: [{ text: `${ply.name}` }] } }] });
                            sourcePly.playSound('ui.error_item');
                        });

                        return;
                    };

                    const actualState = ply.getDynamicProperty('ha:hitboxes_state') as boolean | undefined ?? false;

                    if (actualState == newState) {
                        worldToolsSimplified.setRun(() => {
                            sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.error.same_state', with: { rawtext: [{ text: `${ply.name}` }] } }] });
                            sourcePly.playSound('ui.error_item');
                        });

                        return;
                    }

                    if (newState) {
                        worldToolsSimplified.setRun(() => {
                            sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.enabled', with: { rawtext: [{ text: `${ply.name}` }] } }] });
                            sourcePly.playSound('random.screenshot');
                        });

                        debugToolsSimplified.showHitboxes(ply);
                    } else {
                        worldToolsSimplified.setRun(() => {
                            sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.disabled', with: { rawtext: [{ text: `${ply.name}` }] } }] });
                            sourcePly.playSound('random.screenshot');
                        });

                        debugToolsSimplified.stopHitboxes(ply);
                    }

                    ply.setDynamicProperty('ha:hitboxes_state', newState);
                }
            }
        },
        // Comando de fastitems
        {
            prefixCmd: 'ha:fastitems',
            description: 'Comando que cambia los items por defecto que funcionan con el sistema de items rapidos',
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            cheatsEnabled: true,
            customEnums: {
                'ha:enum_fastitems': ['add', 'replace']
            },
            paramsCmd: [
                { name: 'method', enumName: 'ha:enum_fastitems', type: mc.CustomCommandParamType.Enum },
                { name: 'item1', type: mc.CustomCommandParamType.ItemType }
            ],
            optionalParamsCmd: [
                { name: 'item2', type: mc.CustomCommandParamType.ItemType },
                { name: 'item3', type: mc.CustomCommandParamType.ItemType },
                { name: 'item4', type: mc.CustomCommandParamType.ItemType },
                { name: 'item5', type: mc.CustomCommandParamType.ItemType },
                { name: 'item6', type: mc.CustomCommandParamType.ItemType },
                { name: 'item7', type: mc.CustomCommandParamType.ItemType }
            ],
            onRunCmd: (sourcePly, method: 'add' | 'replace', ...items: ({ id: string, localizationKey: string; } | undefined)[]) => {
                worldToolsSimplified.setRun(() => {
                    const mapItems = items.filter(i => i != undefined).map(i => i!.id);
                    const listOfItemsLocal = mc.world.getDynamicProperty('ha:fastitems_list') as string | undefined;

                    let currentList: string[] = [];

                    if (listOfItemsLocal) {
                        try {
                            currentList = JSON.parse(listOfItemsLocal);
                        } catch (e) {
                            currentList = [...TL15DBaseManager.listOfFastItems];
                        }
                    } else {
                        currentList = [...TL15DBaseManager.listOfFastItems];
                    }

                    let newList: string[] = [];

                    if (method == 'add') {
                        newList = [... new Set([...currentList, ...mapItems])];
                    } else if (method == 'replace') {
                        newList = [... new Set([...mapItems])];
                    }

                    TL15DBaseManager.listOfFastItems = newList;

                    mc.world.setDynamicProperty('ha:fastitems_list', JSON.stringify(newList));

                    sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.fastitems_system.items_changed' }] });
                    sourcePly.playSound('random.levelup');
                });
            }
        },
        // Comando de checkdeaths
        {
            prefixCmd: 'ha:checkdeaths',
            cheatsEnabled: true,
            description: 'Comando que visualiza las muertes registradas internamente en el mundo. Esto con fines depurativos.',
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [],
            onRunCmd: (sourcePly) => {
                worldToolsSimplified.setRun(async () => {
                    const entityWorldData = await this.getEntityDataWorld();
                    const totalDeaths = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:death_counter');
                    const objDeaths = worldToolsSimplified.getOrCreateScorebordObj('ha:list_deaths') as mc.ScoreboardObjective;

                    if (totalDeaths <= 0) {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'ui.form_deaths.no_plys_deaths' }] });
                        sourcePly.playSound('ui.error_item');
                        return;
                    }

                    let plyData: { plyName: string, plyId: string; linked?: string; }[] = [];

                    const deathDataPre = objDeaths.getParticipants().map(data => data.displayName);

                    for (const data of deathDataPre) {
                        const [name, id, linked] = data.split(':');

                        plyData.push({ plyName: name, plyId: id, linked });
                    }

                    if (plyData.length > 0) {
                        let btns: ButtonFormBase[] = [];

                        for (const data of plyData) {
                            if (data.linked == 'true') {
                                btns.push({ buttomText: `${data.plyName}`, iconButtomUI: "textures/ui/custom/default_headsteve" });
                            } else {
                                btns.push({ buttomText: data.plyName, iconButtomUI: "textures/ui/custom/default_headsteve" });
                            }

                        }

                        customEventsManager.createCustomClassicFormUI({
                            titleForm: { rawtext: [{ translate: 'ui.form_deaths.title.plys_deaths' }] },
                            bodyText: { rawtext: [{ translate: 'ui.form_deaths.subtitle.plys_deaths' }] },
                            buttonsForm: btns,
                            showPly: {
                                targetPly: sourcePly,
                                onCreate: (ply) => {
                                    ply.playSound('random.enderchestopen');
                                },
                                onClose: (ply) => {
                                    ply.playSound('random.chestclosed');
                                }
                            }
                        });
                    } else {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'ui.form_deaths.no_plys_valid' }] });
                        sourcePly.playSound('ui.error_item');
                    }
                });
            }
        },
        // Comando de seed
        {
            prefixCmd: 'ha:seed',
            description: 'Comando que muestra la semilla del mundo actual',
            cheatsEnabled: true,
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [],
            onRunCmd: ((ply, args) => {
                const seed = mc.world.seed;

                worldToolsSimplified.setRun(() => {
                    ply.sendMessage({ rawtext: [{ text: `§7>> ${seed}` }] });
                    ply.playSound('random.levelup');
                });
            })
        },
        // Comando para eliminar info de jugadores muertos
        {
            prefixCmd: 'ha:changedeaths',
            description: 'Comando que muestra la lista de jugadores muertos registrados y luego, al seleccionar uno, eliminarás su información del add-on. Con fines de depuración.',
            cheatsEnabled: true,
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [],
            onRunCmd: ((ply, args) => {
                worldToolsSimplified.setRun(async () => {
                    const entityWorldData = await this.getEntityDataWorld();
                    const totalDeaths = (() => { return worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:death_counter'); });
                    const objDeaths = worldToolsSimplified.getOrCreateScorebordObj('ha:list_deaths') as mc.ScoreboardObjective;

                    if (totalDeaths() <= 0) {
                        ply.sendMessage({ rawtext: [{ translate: 'ui.form_deaths.no_plys_deaths' }] });
                        ply.playSound('ui.error_item');
                        return;
                    }

                    let plyData: { plyName: string, plyId: string; linked?: string; }[] = [];

                    const deathDataPre = objDeaths.getParticipants().map(data => data.displayName);

                    for (const data of deathDataPre) {
                        const [name, id, linked] = data.split(':');

                        plyData.push({ plyName: name, plyId: id, linked });
                    }

                    if (plyData.length > 0) {
                        let btns: ButtonFormBase[] = [];

                        for (const data of plyData) {
                            if (data.linked == 'true') {
                                btns.push({ buttomText: `${data.plyName}`, iconButtomUI: "textures/ui/custom/default_headsteve" });
                            } else {
                                btns.push({ buttomText: data.plyName, iconButtomUI: "textures/ui/custom/default_headsteve" });
                            }

                        }

                        const principalForm = (() => {
                            customEventsManager.createCustomClassicFormUI({
                                titleForm: { rawtext: [{ translate: 'ui.form_deaths_delete.title.plys_deaths' }] },
                                bodyText: { rawtext: [{ translate: 'ui.form_deaths_delete.subtitle.plys_deaths' }] },
                                buttonsForm: btns,
                                showPly: {
                                    targetPly: ply,
                                    onCreate: (ply) => {
                                        ply.playSound('random.enderchestopen');
                                    },
                                    onClose: (ply) => {
                                        ply.playSound('random.chestclosed');
                                    },
                                    onClickBtn: (ply, btnI) => {
                                        const selectData = plyData[btnI];
                                        const linkedFix = selectData.linked == undefined;
                                        const finalDataNormal = `${selectData.plyName}:${selectData.plyId}:${linkedFix ? 'false' : selectData.linked}`;
                                        const finalDataOld = `${selectData.plyName}:${selectData.plyId}${linkedFix ? '' : `:${selectData.linked}`}`;

                                        customEventsManager.createCustomClassicFormUI({
                                            titleForm: { rawtext: [{ translate: 'ui.form_deaths_delete.confirm_title.delete' }] },
                                            bodyText: { rawtext: [{ translate: 'ui.form_deaths_delete.confirm_sub.delete', with: { rawtext: [{ text: `${selectData.plyName}` }] } }] },
                                            buttonsForm: [
                                                { buttomText: 'ui.form_deaths_delete.confirm_btn1.accept' },
                                                { buttomText: 'ui.form_deaths_delete.confirm_btn2.cancel' }
                                            ],
                                            showPly: {
                                                targetPly: ply,
                                                onClickBtn: ((ply, btnI) => {
                                                    if (btnI == 0) {
                                                        objDeaths.removeParticipant(linkedFix ? finalDataOld : finalDataNormal);

                                                        worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:death_counter', 'set', totalDeaths() == 0 ? 0 : totalDeaths() - 1);

                                                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.form_deaths_deleted.success', with: { rawtext: [{ text: `${selectData.plyName}` }] } }] });
                                                        ply.playSound('random.levelup');
                                                    } else {
                                                        principalForm();
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            });
                        });

                        principalForm();
                    } else {
                        ply.sendMessage({ rawtext: [{ translate: 'ui.form_deaths.no_plys_valid' }] });
                        ply.playSound('ui.error_item');
                    }
                });
            })
        },
        // Comando para eliminar el registro de linkeados
        {
            prefixCmd: 'ha:removelinked',
            description: 'Comando que elimina el soul link de jugadores vinculados a sí mismos. Con fines de depuración.',
            cheatsEnabled: true,
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [],
            onRunCmd: ((ply, args) => {
                worldToolsSimplified.setRun(async () => {
                    const entityWorldData = await this.getEntityDataWorld();
                    const objLinkdes = worldToolsSimplified.getOrCreateScorebordObj('ha:plys_linkeds') as mc.ScoreboardObjective;
                    const objRevives = worldToolsSimplified.getOrCreateScorebordObj('ha:pending_revive') as mc.ScoreboardObjective;

                    /**
                     * Se utiliza una funcion auxiliar del formulario entero porque se recalcula la veces que se abre este mismo por los botones de cancelar y mantener la informacion actualizada a tiempo real.
                     * @author HaJuegos - 30-07-2026
                     */
                    const mainForm = (() => {
                        const linkeds = objLinkdes.getParticipants().map(p => p.displayName);

                        if (linkeds.length <= 0) {
                            ply.sendMessage({ rawtext: [{ translate: 'chat.system.remove_linked.no_data' }] });
                            ply.playSound('ui.error_item');
                            return;
                        }

                        const playersData: { rawData: string, ply1Name: string, ply1ID: string, ply2Name: string, ply2ID: string; }[] = [];

                        for (const data of linkeds) {
                            const [ply1name, ply1id, , ply2name, ply2id] = data.split(':');

                            if (!ply1name || !ply1id || !ply2name || !ply2id) continue;

                            playersData.push({
                                rawData: data,
                                ply1Name: ply1name,
                                ply1ID: ply1id,
                                ply2Name: ply2name,
                                ply2ID: ply2id
                            });
                        }

                        if (playersData.length <= 0) {
                            ply.sendMessage({ rawtext: [{ translate: 'chat.system.remove_linked.no_data' }] });
                            ply.playSound('ui.error_item');
                            return;
                        }

                        const btns: ButtonFormBase[] = [];
                        const btnsData: typeof playersData = [];

                        playersData.forEach((data) => {
                            btns.push({
                                buttomText: { rawtext: [{ translate: 'ui.remove_linkeds.nameplys', with: { rawtext: [{ text: '\n' }, { text: `${data.ply1Name}` }, { text: `${data.ply2Name}` }] } }] },
                                iconButtomUI: 'textures/ui/custom/default_headsteve'
                            });
                            btnsData.push(data);
                        });

                        return customEventsManager.createCustomClassicFormUI({
                            titleForm: { rawtext: [{ translate: 'ui.remove_linkeds.title' }] },
                            bodyText: { rawtext: [{ translate: 'ui.remove_linkeds.subtitle' }] },
                            buttonsForm: btns,
                            showPly: {
                                targetPly: ply,
                                onCreate: ((ply) => {
                                    ply.playSound('random.enderchestopen');
                                }),
                                onClickBtn: ((ply, btnI) => {
                                    const target = btnsData[btnI];

                                    customEventsManager.createCustomClassicFormUI({
                                        titleForm: { rawtext: [{ translate: 'ui.remove_linkeds.confirm.title' }] },
                                        bodyText: { rawtext: [{ translate: 'ui.remove_linkeds.confirm.subtitle', with: { rawtext: [{ text: `${target.ply1Name}` }, { text: `${target.ply2Name}` }] } }] },
                                        buttonsForm: [
                                            { buttomText: { rawtext: [{ translate: 'ui.remove_linkeds.confirm.btn1.accept' }] } },
                                            { buttomText: { rawtext: [{ translate: 'ui.remove_linkeds.confirm.btn2.cancel' }] } }
                                        ],
                                        showPly: {
                                            targetPly: ply,
                                            onClickBtn: ((ply, btnI) => {
                                                if (btnI == 0) {
                                                    objLinkdes.removeParticipant(target.rawData);

                                                    const revives = objRevives.getParticipants().map(d => d.displayName);
                                                    const reviveEntry = revives.find(d => d.split(':')[1] == target.ply1ID);

                                                    if (reviveEntry) {
                                                        objRevives.removeParticipant(reviveEntry);
                                                    };

                                                    const linker1 = mc.world.getPlayers().find(pl => pl.id == target.ply1ID);
                                                    const linker2 = mc.world.getPlayers().find(pl => pl.id == target.ply2ID);

                                                    if (linker1) {
                                                        linker1.removeTag('isLinked');
                                                    } else {
                                                        worldToolsSimplified.changeScoreInObj(`${target.ply1Name}:${target.ply1ID}`, 'ha:pending_remove_link', 'set', 1);
                                                    };

                                                    if (linker2) {
                                                        linker2.removeTag('isLinked');
                                                    } else {
                                                        worldToolsSimplified.changeScoreInObj(`${target.ply2Name}:${target.ply2ID}`, 'ha:pending_remove_link', 'set', 1);
                                                    };

                                                    worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:linkeds_counter', 'add', -1);

                                                    ply.sendMessage({ rawtext: [{ translate: 'chat.system.remove_linked.success', with: { rawtext: [{ text: `${target.ply1Name}` }, { text: `${target.ply2Name}` }] } }] });
                                                    ply.playSound('random.levelup');
                                                } else {
                                                    mainForm();
                                                }
                                            }),
                                            onClose: (() => {
                                                mainForm();
                                            }),
                                            onErrForm: (() => {
                                                mainForm();
                                            })
                                        }
                                    });
                                })
                            }
                        });
                    });

                    mainForm();
                });
            })
        }
    ];

    /**
     * Eventos principales de la clase cuando es inicializada.
     * @constructor
     */
    constructor () {
        super();

        this.registerCmds();
    }

    /**
     * Metodo principal que registra todos los comandos customs creados a base de una plantilla fija.
     * @returns {void}
     * @author HaJuegos - 07-07-2026
     * @private
     */
    private registerCmds(): void {
        for (const cmd of this.customCmds) {
            beforeEventsSimplified.createCustomCommand({
                name: cmd.prefixCmd,
                description: cmd.description,
                cheatsRequired: cmd.cheatsEnabled,
                mandatoryParameters: cmd.paramsCmd,
                optionalParameters: cmd.optionalParamsCmd,
                permissionLevel: cmd.permsLevel
            }, (origin, ...args) => {
                const ply = origin.sourceEntity;

                if (ply instanceof mc.Player) {
                    return cmd.onRunCmd(ply, ...args);
                }
            }, cmd.customEnums);
        }
    }
}

new CustomCmdsEvents();