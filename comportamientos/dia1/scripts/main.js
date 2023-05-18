/* Creado/Editado por: Convex!. Si quieres mas informacion al respecto, escribeme en Discord: https://discord.com/users/736761089056047174 o https://discord.com/users/948057828495605820 */
/* Created/Edited by: Convex!. If you want more information about it, write me on Discord: https://discord.com/users/736761089056047174 or https://discord.com/users/948057828495605820 */

import { system, world } from "@minecraft/server";

system.events.beforeWatchdogTerminate.subscribe((eventData) => {
  eventData.cancel = true;
});

world.events.beforeChat.subscribe(eventData => {
    eventData.cancel = true;
    const msg = eventData.message;
    const player = eventData.sender;
    world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"${(player.getTags().find((tag) => tag.startsWith("r:"))?.substring(2)?.split("-") ?? ["§4Sobreviviente"]).join("§r§l§0][§r")} ${player.name} §8§l>>§r ${msg}"}]}`);
});

world.events.entityDie.subscribe(eventDead => {
	const player = eventDead.deadEntity;
	const source = eventDead.damageSource;
	if (player.typeId == 'minecraft:player') {
		if (!player.hasTag("coords")) {
			player.runCommandAsync(`summon ha:ghost_player "§e${player.name} Inventory§r" ~ ~ ~`)
			player.runCommandAsync(`tellraw @a {"rawtext": [{"translate":"dead_player_coordinates", "with": {"rawtext": [{"selector":"@s"},{"text":"${Math.floor(player.location.x)} ${Math.floor(player.location.y)} ${Math.floor(player.location.z)}"},{"text":"${getDimension(player.dimension)}"}]}}]}`)
			player.addTag("coords")
		};
	};
});

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.hasTag("ban")) {
            player.runCommandAsync(`kick "${player.name}" §4Game Over!`);
        };
    };
}, 1);

system.runInterval((healthEvent) => {
    const players = Array.from(world.getPlayers());
    for (const player of players) {
        if (player.hasComponent("health")) {
            const health = player.getComponent("health")
            player.nameTag = (player.getTags().find((tag) => tag.startsWith("r:"))?.substring(2)?.split("-") ?? ["§7§l[§4Sobreviviente§7]§r"]).join() + "\n§7" + player.name + " §c" + Math.round(health.current) + "§7/§c" + Math.round(health.value)
        };
    };
}, 1);

world.events.beforeItemUse.subscribe(eventMilk => {
    const players = eventMilk.source;
    const item = eventMilk.item;
    let player = Array.from(world.getPlayers()).find(plr => plr.name == players.name);
    if (item.typeId == 'minecraft:totem_of_undying') {
        if (!player.hasTag("TotemOffHand") && !player.hasTag("ShieldOffHand")) {
            player.runCommandAsync(`replaceitem entity @s slot.weapon.offhand 0 totem`)
            player.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 air`)
            player.runCommandAsync(`playsound armor.equip_chain @s`)
        };
    } else { };
});

world.events.entityHurt.subscribe(({ damage, hurtEntity }) => {
    if (hurtEntity.typeId == 'minecraft:player') {
        let player = Array.from(world.getPlayers()).find(plr => plr.name == hurtEntity.name);
        let health = player.getComponent('minecraft:health');
        if (runCommandAsync(`execute "${player.name}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.offhand}]`).error == false) {
            if (damage < 0 && health.current <= 1) {
                player.runCommandAsync(`function system/alerta_de_totem`)
            };
        } else if (runCommandAsync(`execute "${player.name}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.mainhand}]`).error == false) {
            if (damage < 0 && health.current <= 1) {
                player.runCommandAsync(`function system/alerta_de_totem`)
            };
        };
    };
});

function getDimension(dimension) {
    const ids = ['overworld', 'nether', 'the end'];
    let d = ids.find((id) => world.getDimension(id) == dimension);
    switch (d) {
        case "overworld": {
            return `§2Overworld§7`
        } break;
        case "nether": {
            return `§cNether§7`
        } break;
        case "the end": {
            return `§dEnd§7`
        } break;
    }
}

function runCommandAsync(command) {
    try {
        return {
            error: false, ...world.getDimension("overworld").runCommandAsync(command)
        }
    } catch (error) {
        return {
            error: true
        }
    }
}
/* Creado/Editado por: Convex!. Si quieres mas informacion al respecto, escribeme en Discord: https://discord.com/users/736761089056047174 o https://discord.com/users/948057828495605820 */
/* Created/Edited by: Convex!. If you want more information about it, write me on Discord: https://discord.com/users/736761089056047174 or https://discord.com/users/948057828495605820 */