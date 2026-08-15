import * as mc from "@minecraft/server";

import { beforeEventsSimplified, ButtonFormBase, customEventsManager, debugToolsSimplified, worldToolsSimplified } from "simplified-mojang-api";
import { TL15DBaseManager } from "../base";
import { DebuffData } from "../customTypes";

/**
 * Clase principal que controla los comandos personalizados del add-on a base de scripts.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 07-07-2026
 */
class CustomCmdsEvents extends TL15DBaseManager {
    /**
     * Lista de variables posibles para los debuffs a obtener.
     * @type {DebuffData[]}
     * @private
     */
    private readonly listOfDebuffs: DebuffData[] = [
        {
            id: 'abyssal',
            idTitleUI: 'abyssal:combo',
            maxComboUI: 6,
            timerScoreboard: 'abyssalTimer',
            comboScoreboard: 'abyssalCombo',
            translationKey: 'chat.system.debuff_name.abyssal',
            iconSamplePath: 'textures/ui/custom/abyss_icons/abyssal_eyes/base',
            eventsEndTimer: (ply) => {
                ply.runCommand(`clear @s ha:void_item`);
            }
        },
        {
            id: 'colossus',
            idTitleUI: 'colossus:combo',
            maxComboUI: 6,
            timerScoreboard: 'colossusTimer',
            comboScoreboard: 'colossusCombo',
            translationKey: 'chat.system.debuff_name.colossus',
            iconSamplePath: 'textures/ui/custom/abyss_icons/colossus_trick/base',
            eventsEndTimer: (ply) => {
                ply.triggerEvent(`ha:set_colossus_normal`);
            }
        },
        {
            id: 'hunger',
            idTitleUI: 'hunger:combo',
            maxComboUI: 6,
            timerScoreboard: 'hungerTimer',
            comboScoreboard: 'hungerCombo',
            translationKey: 'chat.system.debuff_name.hunger',
            iconSamplePath: 'textures/ui/custom/abyss_icons/endless_hunger/base',
            eventsEndTimer: (ply) => {
                ply.removeTag('hungerDebuff1');
                ply.removeTag('hungerDebuff2');
                ply.removeTag('hungerDebuff3');
                ply.removeTag('hungerDebuff4');
                ply.removeTag('hungerDebuff5');
                ply.removeTag('hungerDebuff6');

                ply.runCommand(`effect @s clear hunger`);
            }
        },
        {
            id: 'shadows',
            idTitleUI: 'shadows:combo',
            maxComboUI: 6,
            timerScoreboard: 'shadowsTimer',
            comboScoreboard: 'shadowsCombo',
            translationKey: 'chat.system.debuff_name.shadows',
            iconSamplePath: 'textures/ui/custom/abyss_icons/ravenous_shadows/base',
            eventsEndTimer: (ply) => {
                ply.removeTag('shedowsDebuff1');
                ply.removeTag('shedowsDebuff2');
                ply.removeTag('shedowsDebuff3');
                ply.removeTag('shedowsDebuff4');
                ply.removeTag('shedowsDebuff5');
                ply.removeTag('shedowsDebuff6');
            },
        },
        {
            id: 'soul',
            idTitleUI: 'soul:combo',
            maxComboUI: 6,
            timerScoreboard: 'soulTimer',
            comboScoreboard: 'soulCombo',
            translationKey: 'chat.system.debuff_name.decay',
            iconSamplePath: 'textures/ui/custom/abyss_icons/soul_decay/base',
            eventsEndTimer: (ply) => {
                ply.triggerEvent('ha:set_soul_normal');
            }
        },
        {
            id: 'fury',
            idTitleUI: 'fury:combo',
            maxComboUI: 6,
            timerScoreboard: 'furyTimer',
            comboScoreboard: 'furyCombo',
            translationKey: 'chat.system.debuff_name.fury',
            iconSamplePath: 'textures/ui/custom/abyss_icons/unhinged_fury/base',
            eventsEndTimer: (ply) => {
                ply.removeTag('furyDebuff1');
                ply.removeTag('furyDebuff2');
                ply.removeTag('furyDebuff3');
                ply.removeTag('furyDebuff4');
                ply.removeTag('furyDebuff5');
                ply.removeTag('furyDebuff6');

                ply.runCommand(`fog @s pop furyFogID1`);
                ply.runCommand(`fog @s pop furyFogID2`);
                ply.runCommand(`fog @s pop furyFogID3`);
                ply.runCommand(`fog @s pop furyFogID4`);
                ply.runCommand(`fog @s pop furyFogID5`);
                ply.runCommand(`fog @s pop furyFogID6`);
            },
        },
        {
            id: 'void',
            idTitleUI: 'void:combo',
            maxComboUI: 6,
            timerScoreboard: 'voidTimer',
            comboScoreboard: 'voidCombo',
            translationKey: 'chat.system.debuff_name.void',
            iconSamplePath: 'textures/ui/custom/abyss_icons/void_claws/base',
            eventsEndTimer: (ply) => {
                customEventsManager.lockItemsPly({
                    ply: ply,
                    invType: 'inv',
                    lockMethod: mc.ItemLockMode.none,
                    itemsSelection: {
                        allSlots: true,
                        whitelistItems: ['ha:void_item']
                    }
                });
            },
        }
    ];

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
            description: 'ui.custom_command.desc.autoban',
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            cheatsEnabled: true,
            paramsCmd: [
                { name: 'banState', type: mc.CustomCommandParamType.Boolean }
            ],
            onRunCmd: (ply, args) => {
                const newState = args as boolean;

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
            description: 'ui.custom_command.desc.hitboxes',
            permsLevel: mc.CommandPermissionLevel.Any,
            cheatsEnabled: false,
            paramsCmd: [
                { name: 'state', type: mc.CustomCommandParamType.Boolean }
            ],
            onRunCmd: (sourcePly, newState: boolean) => {
                worldToolsSimplified.setRun(() => {
                    if (!sourcePly.isValid) return;

                    const actualState = sourcePly.getDynamicProperty('ha:hitboxes_state') as boolean | undefined ?? false;

                    if (actualState == newState) {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.error.same_state', with: { rawtext: [{ text: `${sourcePly.name}` }] } }] });
                        sourcePly.playSound('ui.error_item');
                        return;
                    }

                    if (newState) {
                        debugToolsSimplified.showHitboxes(sourcePly);
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.enabled', with: { rawtext: [{ text: `${sourcePly.name}` }] } }] });
                    } else {
                        debugToolsSimplified.stopHitboxes(sourcePly);
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.hitboxes_system.disabled', with: { rawtext: [{ text: `${sourcePly.name}` }] } }] });
                    }

                    sourcePly.playSound('random.screenshot');
                    sourcePly.setDynamicProperty('ha:hitboxes_state', newState);
                });
            }
        },
        // Comando de fastitems
        {
            prefixCmd: 'ha:fastitems',
            description: 'ui.custom_command.desc.change_fastitems',
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
            onRunCmd: (sourcePly, method: 'add' | 'replace', ...items: (mc.ItemType | undefined)[]) => {
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
            description: 'ui.custom_command.desc.check_deaths',
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
            description: 'ui.custom_command.desc.seed',
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
            description: 'ui.custom_command.desc.change_deaths',
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
            description: 'ui.custom_command.desc.remove_linkeds',
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
                                onCreate: (ply) => {
                                    ply.playSound('random.enderchestopen');
                                },
                                onClose: (ply) => {
                                    ply.playSound('random.chestclosed');
                                },
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
        },
        // Comando para activar o no las mecanicas de los debuffs.
        {
            prefixCmd: 'ha:changedebuffs',
            description: 'ui.custom_command.desc.change_debuffs',
            cheatsEnabled: true,
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [
                { type: mc.CustomCommandParamType.Boolean, name: 'newState' }
            ],
            onRunCmd: ((ply, args) => {
                const newState = args as boolean;

                worldToolsSimplified.setRun(async () => {
                    const entityWorldData = await this.getEntityDataWorld();

                    if (newState) {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.change_debuffs.enabled' }] });
                        mc.system.sendScriptEvent('ha:reload_debuffs', '');
                    } else {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.change_debuffs.disabled' }] });
                    }

                    worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:debuffs_state', 'set', newState ? 1 : 0);
                    ply.playSound('random.screenshot');
                });
            })
        },
        // Comando para eliminar todos o un debuff a un jugador en especifico.
        {
            prefixCmd: 'ha:removedebuff',
            description: 'ui.custom_command.desc.change_debuffs_ply',
            cheatsEnabled: true,
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [
                { type: mc.CustomCommandParamType.PlayerSelector, name: 'targetPlayer' }
            ],
            onRunCmd: ((sourcePly, args) => {
                worldToolsSimplified.setRun(() => {
                    const mathed = (Array.isArray(args) ? args : [args]) as mc.Player[];
                    const selectedPly = mathed[0];

                    if (!selectedPly || !selectedPly.isValid) {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_remove_debuff.error.player_invalid' }] });
                        sourcePly.playSound('ui.error_sound');
                        return;
                    }

                    const btns: ButtonFormBase[] = [
                        { buttomText: { rawtext: [{ translate: 'ui.form_remove_debuff.btn.deleted_all' }] }, iconButtomUI: 'textures/ui/custom/trash_icon' }
                    ];

                    for (const debuff of this.listOfDebuffs) {
                        btns.push({ buttomText: { rawtext: [{ translate: debuff.translationKey }] }, iconButtomUI: debuff.iconSamplePath });
                    }

                    customEventsManager.createCustomClassicFormUI({
                        titleForm: { rawtext: [{ translate: 'ui.form_remove_debuff.title' }] },
                        bodyText: { rawtext: [{ translate: 'ui.form_remove_debuff.subtitle', with: { rawtext: [{ text: `${selectedPly.name}` }] } }] },
                        buttonsForm: btns,
                        showPly: {
                            targetPly: sourcePly,
                            onCreate: (ply) => {
                                ply.playSound('random.enderchestopen');
                            },
                            onClose: (ply) => {
                                ply.playSound('random.chestclosed');
                            },
                            onClickBtn: (ply, btnI) => {
                                if (!selectedPly || !selectedPly.isValid) {
                                    sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_remove_debuff.error.player_invalid' }] });
                                    sourcePly.playSound('ui.error_sound');
                                    return;
                                }

                                try {
                                    if (btnI == 0) {
                                        for (const debuff of this.listOfDebuffs) {
                                            this.clearDebuff(selectedPly, debuff);
                                        }
                                    } else {
                                        this.clearDebuff(selectedPly, this.listOfDebuffs[btnI - 1]);
                                    }

                                    sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_remove_debuff.success.removed_debuff', with: { rawtext: [{ text: `${selectedPly.name}` }] } }] });
                                    sourcePly.playSound('random.levelup');
                                } catch (e) {
                                    sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_remove_debuff.error.fail_removal' }] });
                                    sourcePly.playSound('ui.error_sound');
                                }
                            }
                        }
                    });
                });
            })
        },
        // Comando para revivir un jugador dentro del mundo.
        {
            prefixCmd: 'ha:reviveply',
            description: 'ui.custom_command.desc.force_revive_ply',
            cheatsEnabled: true,
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            paramsCmd: [
                { type: mc.CustomCommandParamType.PlayerSelector, name: 'targetPlayer' }
            ],
            onRunCmd: ((sourcePly, args) => {
                worldToolsSimplified.setRun(async () => {
                    const mathed = (Array.isArray(args) ? args : [args]) as mc.Player[];
                    const selectedPly = mathed[0];

                    if (!selectedPly || !selectedPly.isValid) {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_revival_ply.error.player_invalid' }] });
                        sourcePly.playSound('ui.error_sound');
                        return;
                    }

                    const obj = worldToolsSimplified.getOrCreateScorebordObj('totalLives', 'ui.scoreboard.obj.title');

                    selectedPly.runCommand(`function system/revive_ply`);
                    obj?.addScore('ui.scoreboard.scores.lives', 1);
                    obj?.addScore('ui.scoreboard.scores.deaths', -1);

                    try {
                        const entityWorldData = await this.getEntityDataWorld();
                        const objDeaths = worldToolsSimplified.getOrCreateScorebordObj('ha:list_deaths') as mc.ScoreboardObjective;
                        const totalDeaths = worldToolsSimplified.getScoreInObj(entityWorldData, 'ha:death_counter');

                        const deathEntry = objDeaths.getParticipants().find(data => {
                            const [name] = data.displayName.split(':');

                            return name == selectedPly.name;
                        });

                        if (deathEntry != undefined) {
                            objDeaths.removeParticipant(deathEntry.displayName);
                            worldToolsSimplified.changeScoreInObj(entityWorldData, 'ha:death_counter', 'set', totalDeaths <= 0 ? 0 : totalDeaths - 1);
                        }
                    } catch (e) {
                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_revival_ply.success_but.player_revive', with: { rawtext: [{ text: `${selectedPly.name}` }] } }] });
                        sourcePly.playSound('ui.error_item');
                    }

                    sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.form_revival_ply.success.player_revive', with: { rawtext: [{ text: `${selectedPly.name}` }] } }] });
                    sourcePly.playSound('random.levelup');
                });
            })
        },
        // Comando para teletransportarse a un jugador en modo espectador para todos.
        {
            prefixCmd: 'ha:tpspectator',
            description: 'ui.custom_command.desc.tp_spectator',
            permsLevel: mc.CommandPermissionLevel.Any,
            cheatsEnabled: true,
            paramsCmd: [
                { type: mc.CustomCommandParamType.PlayerSelector, name: 'targetPlayer' }
            ],
            onRunCmd: ((ply, args) => {
                worldToolsSimplified.setRun(() => {
                    const mathed = (Array.isArray(args) ? args : [args]) as mc.Player[];
                    const selectedPly = mathed[0];

                    if (ply.getGameMode() != mc.GameMode.Spectator) {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.teleport_spect.error.no_args' }] });
                        ply.playSound('ui.error_sound');
                        return;
                    }

                    if (!selectedPly || !selectedPly.isValid) {
                        ply.sendMessage({ rawtext: [{ translate: 'chat.system.teleport_spect.error.player_invalid' }] });
                        ply.playSound('ui.error_sound');
                        return;
                    }

                    const coordsTarget = selectedPly.location;
                    const dimeTarget = selectedPly.dimension;

                    ply.tryTeleport(coordsTarget, { dimension: dimeTarget });
                });
            })
        },
        // Comando para deshabilitar o habilitar una caracteristica de la pelea del RoyerBot. (Dragon)
        {
            prefixCmd: 'ha:changeroyerbotfight',
            description: 'ui.custom_command.desc.change_royerbot_fight',
            permsLevel: mc.CommandPermissionLevel.GameDirectors,
            cheatsEnabled: true,
            customEnums: {
                "ha:featureType": [
                    'canMobsSpawnOnCrystal', // ya
                    'canBreakTowersOnCrystal', // ya
                    'canDragonKnockback', // ya
                    'canDragonReflectDamage', // ya
                    'canSummonLightnings', // ya
                    'changeMobSpawnOnCrystal' // ya
                ]
            },
            paramsCmd: [
                { name: 'feature', enumName: 'ha:featureType', type: mc.CustomCommandParamType.Enum },
                { name: 'state', type: mc.CustomCommandParamType.Boolean },
            ],
            optionalParamsCmd: [
                { name: 'mobToChange', type: mc.CustomCommandParamType.EntityType }
            ],
            onRunCmd: ((sourcePly, ...args) => {
                worldToolsSimplified.setRun(async () => {
                    const worldData = await this.getEntityDataWorld();
                    const featureSelected = args[0] as string;
                    const rawNewState = args[1] as boolean;
                    const newState = rawNewState ? 1 : 0;
                    const mobSelected = args[2] as mc.EntityType | undefined;

                    if (featureSelected == 'changeMobSpawnOnCrystal' && mobSelected) {
                        if (!mobSelected) {
                            sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.change_feature_fight.error.missing_entity' }] });
                            sourcePly.playSound('ui.error_sound');
                            return;
                        }

                        const blacklistedMobs = [
                            'minecraft:player',
                            'minecraft:ender_crystal',
                            'minecraft:item'
                        ];

                        if (blacklistedMobs.includes(mobSelected.id)) {
                            sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.change_feature_fight.error.no_valid_entity' }] });
                            sourcePly.playSound('ui.error_sound');
                            return;
                        }

                        try {
                            const objective = worldToolsSimplified.getOrCreateScorebordObj('ha:custom_entity_crystal');

                            if (objective) {
                                const participants = objective.getParticipants();

                                for (const participant of participants) {
                                    objective.removeParticipant(participant);
                                }
                            }
                        } catch { }

                        worldToolsSimplified.changeScoreInObj(worldData, `ha:${featureSelected}`, 'set', newState);

                        if (newState == 1) {
                            worldToolsSimplified.changeScoreInObj(mobSelected.id, `ha:custom_entity_crystal`, 'set', newState);
                        }

                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.change_feature_fight.mob_change', with: { rawtext: [{ text: `${featureSelected}` }, { text: `${mobSelected.id}` }] } }] });
                        sourcePly.playSound('random.screenshot');
                    } else {
                        worldToolsSimplified.changeScoreInObj(worldData, `ha:${featureSelected}`, 'set', newState);

                        sourcePly.sendMessage({ rawtext: [{ translate: 'chat.system.change_feature_fight', with: { rawtext: [{ text: `${featureSelected}` }, { translate: `chat.system.change_feature_fight.args.${rawNewState}` }] } }] });
                        sourcePly.playSound('random.screenshot');
                    }
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
     * Metodo auxiliar que controla la logica adiccional de todos los datos sobre el timer loop de los debuffs.
     * @param {mc.Player} ply Jugador en concreto afectado.
     * @param {DebuffData} debuff Debuff en concreto afectado.
     * @returns {void}
     * @author HaJuegos - 07-08-2026
     * @private
     */
    private clearDebuff(ply: mc.Player, debuff: DebuffData): void {
        debuff.eventsEndTimer(ply);

        ply.sendMessage({ rawtext: [{ translate: 'chat.system.debuff_end_timer', with: { rawtext: [{ translate: `${debuff.translationKey}` }] } }] });
        ply.playSound('mob.guardian.death');

        const syncScore = `ha:${debuff.timerScoreboard}_sync_ply`;

        worldToolsSimplified.changeScoreInObj(ply, debuff.timerScoreboard, 'set', 0);
        worldToolsSimplified.changeScoreInObj(ply, debuff.comboScoreboard, 'set', 0);
        worldToolsSimplified.changeScoreInObj(ply, syncScore, 'set', 0);
        ply.setDynamicProperty(`ha:debuff_timer_${debuff.id}`, undefined);
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