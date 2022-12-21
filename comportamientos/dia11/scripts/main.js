/*
Este archivo fue creado por ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord), Cualquier reutilizacion o modificacion de este, Por favor dejar creditos originales del creador del codigo y del add-on para no tener problemas!. Si quieres contactarte con el creador de este codigo, Ve a su server de Discord: https://discord.gg/C3ZHdnUVmu
*/
/*
This file was created by ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord), Any reuse or modification of this, please leave original credits to the creator of the code and add-on to avoid problems. If you want to contact the creator of this code, go to his Discord server: https://discord.gg/C3ZHdnUVmu
*/
import { world, ItemStack, MinecraftItemTypes } from "@minecraft/server"

world.events.entityHit.subscribe(eventInv => {
    try {
        const players = eventInv.hitEntity
        const entity = eventInv.entity
        if (players.typeId == 'minecraft:player' && entity.typeId == 'minecraft:zombie') {
            let player = Array.from(world.getPlayers()).find(plr => plr.name == players.name);
            const playerInv = player.getComponent("inventory");
            const InvContainer = playerInv.container;
            let random = Math.floor(Math.random() * 5);
            InvContainer.swapItems(1, 2, InvContainer);
            InvContainer.swapItems(4, 0, InvContainer);
            InvContainer.swapItems(3, 6, InvContainer);
            InvContainer.swapItems(5, 7, InvContainer);
            InvContainer.swapItems(8, 9, InvContainer);
            if (random == 0) {
                InvContainer.swapItems(17, 0, InvContainer);
                InvContainer.swapItems(25, 1, InvContainer);
                InvContainer.swapItems(15, 2, InvContainer);
                InvContainer.swapItems(11, 3, InvContainer);
                InvContainer.swapItems(9, 4, InvContainer);
                InvContainer.swapItems(19, 5, InvContainer);
                InvContainer.swapItems(31, 6, InvContainer);
                InvContainer.swapItems(14, 7, InvContainer);
                InvContainer.swapItems(23, 8, InvContainer);
                InvContainer.swapItems(10, 24, InvContainer);
                InvContainer.swapItems(12, 26, InvContainer);
                InvContainer.swapItems(13, 27, InvContainer);
                InvContainer.swapItems(16, 28, InvContainer);
                InvContainer.swapItems(18, 29, InvContainer);
                InvContainer.swapItems(20, 30, InvContainer);
                InvContainer.swapItems(21, 32, InvContainer);
                InvContainer.swapItems(22, 33, InvContainer);
                InvContainer.swapItems(34, 35, InvContainer);
            } else if (random == 1) {
                InvContainer.swapItems(7, 0, InvContainer);
                InvContainer.swapItems(27, 8, InvContainer);
                InvContainer.swapItems(31, 28, InvContainer);
                InvContainer.swapItems(1, 32, InvContainer);
                InvContainer.swapItems(6, 2, InvContainer);
                InvContainer.swapItems(16, 19, InvContainer);
                InvContainer.swapItems(35, 17, InvContainer);
                InvContainer.swapItems(4, 34, InvContainer);
                InvContainer.swapItems(13, 3, InvContainer);
                InvContainer.swapItems(5, 14, InvContainer);
                InvContainer.swapItems(11, 9, InvContainer);
                InvContainer.swapItems(10, 12, InvContainer);
                InvContainer.swapItems(15, 21, InvContainer);
                InvContainer.swapItems(18, 24, InvContainer);
                InvContainer.swapItems(20, 26, InvContainer);
                InvContainer.swapItems(22, 25, InvContainer);
                InvContainer.swapItems(23, 29, InvContainer);
                InvContainer.swapItems(30, 33, InvContainer);
            } else if (random == 2) {
                InvContainer.swapItems(1, 18, InvContainer);
                InvContainer.swapItems(2, 19, InvContainer);
                InvContainer.swapItems(3, 20, InvContainer);
                InvContainer.swapItems(4, 35, InvContainer);
                InvContainer.swapItems(5, 34, InvContainer);
                InvContainer.swapItems(6, 33, InvContainer);
                InvContainer.swapItems(7, 32, InvContainer);
                InvContainer.swapItems(8, 31, InvContainer);
                InvContainer.swapItems(9, 30, InvContainer);
                InvContainer.swapItems(10, 29, InvContainer);
                InvContainer.swapItems(11, 28, InvContainer);
                InvContainer.swapItems(12, 27, InvContainer);
                InvContainer.swapItems(13, 21, InvContainer);
                InvContainer.swapItems(14, 22, InvContainer);
                InvContainer.swapItems(15, 23, InvContainer);
                InvContainer.swapItems(16, 24, InvContainer);
                InvContainer.swapItems(17, 25, InvContainer);
                InvContainer.swapItems(26, 0, InvContainer);
            } else if (random == 3) {
                InvContainer.swapItems(10, 26, InvContainer);
                InvContainer.swapItems(9, 32, InvContainer);
                InvContainer.swapItems(33, 27, InvContainer);
                InvContainer.swapItems(7, 14, InvContainer);
                InvContainer.swapItems(18, 4, InvContainer);
                InvContainer.swapItems(22, 20, InvContainer);
                InvContainer.swapItems(13, 2, InvContainer);
                InvContainer.swapItems(31, 11, InvContainer);
                InvContainer.swapItems(5, 8, InvContainer);
                InvContainer.swapItems(30, 15, InvContainer);
                InvContainer.swapItems(28, 21, InvContainer);
                InvContainer.swapItems(3, 12, InvContainer);
                InvContainer.swapItems(19, 16, InvContainer);
                InvContainer.swapItems(23, 25, InvContainer);
                InvContainer.swapItems(24, 17, InvContainer);
                InvContainer.swapItems(6, 1, InvContainer);
                InvContainer.swapItems(35, 29, InvContainer);
                InvContainer.swapItems(0, 34, InvContainer);
            } else if (random == 4) {
                InvContainer.swapItems(19, 16, InvContainer);
                InvContainer.swapItems(34, 21, InvContainer);
                InvContainer.swapItems(10, 22, InvContainer);
                InvContainer.swapItems(33, 6, InvContainer);
                InvContainer.swapItems(7, 11, InvContainer);
                InvContainer.swapItems(13, 35, InvContainer);
                InvContainer.swapItems(29, 20, InvContainer);
                InvContainer.swapItems(2, 32, InvContainer);
                InvContainer.swapItems(17, 27, InvContainer);
                InvContainer.swapItems(4, 8, InvContainer);
                InvContainer.swapItems(12, 28, InvContainer);
                InvContainer.swapItems(18, 24, InvContainer);
                InvContainer.swapItems(26, 3, InvContainer);
                InvContainer.swapItems(15, 30, InvContainer);
                InvContainer.swapItems(25, 23, InvContainer);
                InvContainer.swapItems(5, 31, InvContainer);
                InvContainer.swapItems(1, 14, InvContainer);
                InvContainer.swapItems(0, 9, InvContainer);
            }

        } else {

        }
    } catch { }
})

world.events.blockBreak.subscribe(eventNetherite => {
	try {
        let player = Array.from(world.getPlayers()).find(p => p.name == eventNetherite.player.name)
        const block = eventNetherite.brokenBlockPermutation.type
        let x = eventNetherite.block.location.x
        let y = eventNetherite.block.location.y
        let z = eventNetherite.block.location.z
        if (block.id == 'minecraft:diamond_ore') {
            player.runCommandAsync(`damage "${player.name}" 3 temperature`)
        }
		if (block.id == 'minecraft:deepslate_diamond_ore') {
            player.runCommandAsync(`damage "${player.name}" 3 temperature`)
        }
        if (block.id == 'minecraft:ancient_debris') {
            player.runCommandAsync(`summon silverfish ${x} ${y} ${z}`)
            player.runCommandAsync(`setblock ${x} ${y} ${z} flowing_lava`)
        }
    } catch { }
})

world.events.beforeChat.subscribe(eventData => {
    eventData.cancel = true
    const msg = eventData.message
    const player = eventData.sender
    world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"§8§l[§r${(player.getTags().find((tag) => tag.startsWith("r:"))?.substring(2)?.split("-") ?? ["§4Sobreviviente"]).join("§r§l§8][§r")}§8§l]§r ${player.name} §8§l>>§r ${msg}"}]}`)
    if (player.hasTag("Admin")) {
        const args = msg.trim().split(/\s+/)
        if (msg.startsWith("!ban")) {
            eventData.cancel = true
            player.runCommandAsync(`scoreboard players set "${args[1]}" ban 1`)
        }
        if (msg.startsWith("!unban")) {
            eventData.cancel = true
            player.runCommandAsync(`scoreboard players set "${args[1]}" ban 0`)
        }
    } else { }
})

world.events.tick.subscribe(() => {
	for (const plr of world.getPlayers()) {
        let health = plr.getComponent('minecraft:health');
        if (health.current == 0 && !plr.hasTag("coords")) {
			plr.runCommandAsync(`summon ha:ghost_player "§e${plr.name} Inventory§r" ~ ~ ~`)
            plr.runCommandAsync(`tellraw @a {"rawtext": [{"translate":"dead_player_coordinates", "with": {"rawtext": [{"selector":"@s"},{"text":"${Math.floor(plr.location.x)} ${Math.floor(plr.location.y)} ${Math.floor(plr.location.z)}"},{"text":"${getDimension(plr.dimension)}"}]}}]}`)
			plr.addTag("coords")
        }
    }
    for (const player of world.getPlayers()) {
        if (player.hasTag("ban")) {
            player.runCommandAsync(`kick "${player.name}" §4Game Over!`)
        }
    }
})

world.events.beforeItemUse.subscribe(eventMilk => {
    const players = eventMilk.source
    const item = eventMilk.item
    let player = Array.from(world.getPlayers()).find(plr => plr.name == players.name)
    if (item.typeId == 'minecraft:totem_of_undying') {
        if (!player.hasTag("TotemOffHand") && !player.hasTag("ShieldOffHand")) {
            player.runCommandAsync(`replaceitem entity @s slot.weapon.offhand 0 totem`)
            player.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 air`)
            player.runCommandAsync(`playsound armor.equip_chain @s`)
        }
    } else { }
})

world.events.tick.subscribe(healthEvent => {
    const players = Array.from(world.getPlayers())
    for (const player of players) {
        if (player.hasComponent("health")) {
            const health = player.getComponent("health")
            player.nameTag = (player.getTags().find((tag) => tag.startsWith("r:"))?.substring(2)?.split("-") ?? ["§8§l[§r§4Sobreviviente§8§l]§r"]).join() + " §7" + player.name + "\n§c" + Math.round(health.current) + "§7/§c" + Math.round(health.value)
        }
    }
})

world.events.entityHurt.subscribe(({ damage, hurtEntity }) => {
    if (hurtEntity.typeId == 'minecraft:player') {
        let player = Array.from(world.getPlayers()).find(plr => plr.name == hurtEntity.name)
        let health = player.getComponent('minecraft:health')
        if (runCommandAsync(`execute "${player.name}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.offhand}]`).error == false) {
            if (damage < 0 && health.current == 1) {
                player.runCommandAsync(`function system/alerta_de_totem`)
            }
        } else if (runCommandAsync(`execute "${player.name}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.mainhand}]`).error == false) {
            if (damage < 0 && health.current == 1) {
                player.runCommandAsync(`function system/alerta_de_totem`)
            }
        }
    }
})

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
/*
Este archivo fue creado por ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord), Cualquier reutilizacion o modificacion de este, Por favor dejar creditos originales del creador del codigo y del add-on para no tener problemas!. Si quieres contactarte con el creador de este codigo, Ve a su server de Discord: https://discord.gg/C3ZHdnUVmu
*/
/*
This file was created by ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord), Any reuse or modification of this, please leave original credits to the creator of the code and add-on to avoid problems. If you want to contact the creator of this code, go to his Discord server: https://discord.gg/C3ZHdnUVmu
*/