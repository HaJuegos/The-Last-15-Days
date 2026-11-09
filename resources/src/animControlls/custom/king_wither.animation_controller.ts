import { createRPAnimController, MoLang } from "simplified-mojang-jsons";

export const KingWitherController = createRPAnimController({
    animControllers: [
        {
            idController: "king_wither.spawned",
            initialState: "default",
            states: {
                default: {
                    animations: ["hide_spirits"],
                    transitions: [
                        { showSpirits: `${MoLang.health()} >= 250` }
                    ]
                },
                showSpirits: {
                    animations: ["show_spirits", "positions_spirits"],
                    transitions: [
                        { idleSpirits: `${MoLang.health()} >= 420 && ${MoLang.animTime()} >= 1.35` }
                    ]
                },
                idleSpirits: {
                    animations: ["scale_spirits", "look_target_spirits", "positions_spirits"],
                    transitions: [
                        { redSpiritStart: `${MoLang.variant()} == 1` },
                        { blueSpiritStart: `${MoLang.variant()} == 2` },
                        { yellowSpiritStart: `${MoLang.variant()} == 3` },
                        { orangeSpiritStart: `${MoLang.variant()} == 4` },
                        { removeSpirits: `${MoLang.health()} <= 150` }
                    ]
                },
                redSpiritStart: {
                    animations: ["red_spirit_starts", "positions_spirits"],
                    transitions: [
                        { idleSpirits: `${MoLang.variant()} != 1` },
                        { removeSpirits: `${MoLang.health()} <= 150` }
                    ]
                },
                blueSpiritStart: {
                    animations: ["blue_spirit_starts", "positions_spirits"],
                    transitions: [
                        { idleSpirits: `${MoLang.variant()} != 2` },
                        { removeSpirits: `${MoLang.health()} <= 150` }
                    ]
                },
                yellowSpiritStart: {
                    animations: ["yellow_spirit_starts", "positions_spirits"],
                    transitions: [
                        { idleSpirits: `${MoLang.variant()} != 4` },
                        { removeSpirits: `${MoLang.health()} <= 150` }
                    ]
                },
                orangeSpiritStart: {
                    animations: ["orange_spirit_starts", "positions_spirits"],
                    transitions: [
                        { idleSpirits: `${MoLang.variant()} != 3` },
                        { removeSpirits: `${MoLang.health()} <= 150` }
                    ]
                },
                removeSpirits: {
                    animations: ["positions_spirits", "despawn_spirits"]
                }
            }
        }
    ]
});