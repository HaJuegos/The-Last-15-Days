import { createBPDialogue } from "simplified-mojang-jsons";

export const RoyerBotDialogues = createBPDialogue({
    scenes: [
        // Dialogo inicial
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia1.txt" }]
            },
            buttons: [
                {
                    name: {
                        rawtext: [{ translate: "dialogue.royerbot.dia0.btn1" }]
                    },
                    commands: [
                        "/dialogue open @s @initiator[tag=!royer_dia1] royerbot_dialogue.dia0.btn1.dialogue",
                        "/dialogue open @s @initiator[tag=royer_dia1] royerbot_dialogue.dia0.btn1.dialogue.alr"
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
            },
            onOpenCommands: [
                "/tag @initiator add royer_dia1",
                "/give @initiator cookie 10",
                "/execute as @initiator at @s run scriptevent ha:see_royerbot_counter"
            ]
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