/* Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz */
/* Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz */

import * as mc from "@minecraft/server";
import * as debug from "@minecraft/debug-utilities";

export let timerBan = true;

debug.disableWatchdog(true);

mc.world.beforeEvents.chatSend.subscribe(customCommands => {
    try {
        let message = customCommands.message;
        let player = customCommands.sender;
        customCommands.cancel = true;
		if (player.hasTag("admin") && message.includes('!settings')) {
            if (message.includes('!settings timerBan off')) {
                let msg = { translate: "chat.timerban_off" };
                timerBan = false;
                player.sendMessage(msg);
                mc.system.run(() => {
                    player.playSound("random.screenshot");
                });
            } else if (message.includes('!settings timerBan on')) {
                let msg = { translate: "chat.timerban_on" };
                timerBan = true;
                player.sendMessage(msg);
                mc.system.run(() => {
                    player.playSound("random.screenshot");
                });
            } else if (message.includes('!settings timerBan') || message.includes('!settings ') || message.includes('!settings')) {
                let msg = { translate: "chat.error.failcommand" };
                player.sendMessage(msg);
                mc.system.run(() => {
                    player.playSound("random.break");
                });
            };
        } else if (!player.hasTag("admin") && message.includes('!settings')) {
            let msg = { translate: "chat.error.noadmin" };
            player.sendMessage(msg);
            mc.system.run(() => {
                player.playSound("random.break");
            });
        };
    } catch {};
});
/* Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz */
/* Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz */