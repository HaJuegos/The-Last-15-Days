import { createBPDialogue } from "simplified-mojang-jsons";

export const RoyerBotDialogues = createBPDialogue({
    scenes: [
        // Dialogo inicial
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia3.txt" }]
            },
            buttons: [
                {
                    name: {
                        rawtext: [{ translate: "dialogue.royerbot.dia0.btn1" }]
                    },
                    commands: [
                        "/scriptevent ha:royernpc_dialog 3"
                    ]
                }
            ]
        },

        // Dialogo reco
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue.dia0.btn1.dialogue",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia0.btn1.txt" }]
            }
        },

        // Dialogo reco, ya
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue.dia0.btn1.dialogue.alr",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia0.btn1.txt.alr" }]
            }
        }
    ]
});