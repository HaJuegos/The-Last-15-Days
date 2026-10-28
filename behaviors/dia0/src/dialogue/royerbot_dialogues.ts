import { createBPDialogue } from "simplified-mojang-jsons";

export const RoyerBotDialogues = createBPDialogue({
    scenes: [
        // Dialogo inicial
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia0.txt" }]
            },
            buttons: [
                {
                    name: {
                        rawtext: [{ translate: "dialogue.royerbot.dia0.btn1" }]
                    },
                    commands: [
                        "/dialogue open @s @initiator[tag=!royer_dia0] royerbot_dialogue.dia0.btn1.dialogue",
                        "/dialogue open @s @initiator[tag=royer_dia0] royerbot_dialogue.dia0.btn1.dialogue.alr"
                    ]
                },
                {
                    name: { rawtext: [{ translate: "dialogue.royerbot.dia0.btn2" }] },
                    commands: [
                        "/dialogue open @s @initiator royerbot_dialogue.dia0.btn2.dialogue"
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
                "/tag @initiator add royer_dia0",
                "/give @initiator enchanted_golden_apple 1",
                "/execute as @initiator at @s run scriptevent ha:see_royerbot_counter"
            ],
            "buttons": [
                {
                    name: { rawtext: [{ translate: "dialogue.royerbot.dia0.btn2" }] },
                    commands: [
                        "/dialogue open @s @initiator royerbot_dialogue.dia0.btn2.dialogue"
                    ]
                }
            ]
        },

        // Dialogo reco, ya
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue.dia0.btn1.dialogue.alr",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia0.btn1.txt.alr" }]
            },
            buttons: [
                {
                    name: { rawtext: [{ translate: "dialogue.royerbot.dia0.btn2" }] },
                    commands: [
                        "/dialogue open @s @initiator royerbot_dialogue.dia0.btn2.dialogue"
                    ]
                }
            ]
        },

        // Extra dialogo
        {
            npcName: "§gRoyerBot§r",
            sceneTag: "royerbot_dialogue.dia0.btn2.dialogue",
            text: {
                rawtext: [{ translate: "dialogue.royerbot.dia0.btn2.txt" }]
            }
        }
    ]
});