import { EntityQueryOptions, EntityQueryScoreOptions, world } from "mojang-minecraft"

const ban = new EntityQueryScoreOptions()
ban.objective = "ban"
ban.minScore = 1
const banQuery = new EntityQueryOptions
banQuery.scoreOptions = [ban]



world.events.beforeChat.subscribe(eventData => {
    eventData.cancel = true
    const msg = eventData.message
    const player = eventData.sender
    world.getDimension("overworld").runCommand(`tellraw @a {"rawtext":[{"text":"§8§l[§r${(player.getTags().find((tag) => tag.startsWith("r:"))?.substring(2)?.split("-") ?? ["§4Sobreviviente"]).join("§r§l§8][§r")}§8§l]§r ${player.name} §8§l>>§r ${msg}"}]}`)
    if (player.hasTag("Admin")) {
        const args = msg.trim().split(/\s+/)
        if (msg.startsWith("!ban")) {
            eventData.cancel = true
            player.runCommand(`scoreboard players set ${args[1]} ban 1`)
        }
        if (msg.startsWith("!unban")) {
            eventData.cancel = true
            player.runCommand(`scoreboard players set ${args[1]} ban 0`)
        }
    } else { }
})

world.events.tick.subscribe(() => {
    const players = Array.from(world.getPlayers(banQuery))
    for (const player of players) {
        player.runCommand(`kick ${player.name} ¡Has muerto y ahora estas baneado!`)
    }
})

world.events.tick.subscribe(eventKit => {
    try {
        for (const player of world.getPlayers()) {
            if (!player.hasTag("Kit")) {
                world.getDimension("overworld").runCommand(`execute "${player.nameTag}" ~ ~ ~ function start`)   
                player.addTag("Kit")
            } else { }
        }
    } catch { }
})

world.events.beforeItemUse.subscribe(eventMilk => {
    const player = eventMilk.source
    const item = eventMilk.item
    for (const plr of world.getPlayers()) {
        if (item.id == 'minecraft:milk_bucket') {
            player.addTag("TomoLeche")
        } else if (!plr.hasTag("totemlock")) {
            if (item.id == 'minecraft:totem_of_undying' && !plr.hasTag("totemlock") && !plr.hasTag("shield")) {
                if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.offhand}]`).error == true) {
                    player.runCommand(`replaceitem entity @s slot.weapon.offhand 0 totem`)
                    player.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 air`)
                    player.runCommand(`playsound armor.equip_chain @s`)
                } else {

                }

            } else {

            }

        }
    }
})

world.events.tick.subscribe(totemFix => {
    for (const plr of world.getPlayers()) {
        if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.offhand}]`).error == false) {
            try {
                plr.runCommand("tag @s[tag=!totemlock] add totemlock")
            } catch { }
        } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=totem,location=slot.weapon.offhand}]`).error == true) {
            try {
                plr.runCommand("tag @s[tag=totemlock] remove totemlock")
            } catch { }
        }
    }
})

world.events.tick.subscribe(shieldFix => {
    for (const plr of world.getPlayers()) {
        if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=shield,location=slot.weapon.offhand}]`).error == false) {
            try {
                plr.runCommand("tag @s[tag=!shield] add shield")
            } catch { }
        } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=shield,location=slot.weapon.offhand}]`).error == true) {
            try {
                plr.runCommand("tag @s[tag=shield] remove shield")
            } catch { }
        }
    }
})


world.events.tick.subscribe(eventEffect => {
    try {
        for (const plr of world.getPlayers()) {
            if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={location=slot.weapon.mainhand,item=bucket}]`).error == false && plr.hasTag("TomoLeche")) {
                world.getDimension("overworld").runCommand(`effect "${plr.nameTag}" nausea 10 0 false`)
                world.getDimension("overworld").runCommand(`effect "${plr.nameTag}" poison 10 9 false`)
                plr.removeTag("TomoLeche")
            } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=cnvx:infernal_relic}]`).error == false) {
                plr.addTag("infernal_relic")
                plr.runCommand(`execute @s[tag=!first_relic] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§4§l"},{"selector":"@s"},{"text":"§r§4 ha conseguido su §lReliquia Infernal"}]}`)
                plr.runCommand(`execute @s[tag=!first_relic] ~ ~ ~ playsound ambient.weather.thunder @a`)
                plr.addTag("first_relic")
            } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=cnvx:infernal_relic}]`).error == true) {
                plr.removeTag("infernal_relic")
            }
        }
    } catch { }
})

world.events.blockBreak.subscribe(eventNetherite => {
    const player = eventNetherite.player
    const block = eventNetherite.brokenBlockPermutation.type
    if (block.id == 'minecraft:ancient_debris') {
        player.runCommand(`summon silverfish ^ ^1 ^1.5`)
        player.runCommand(`execute @e[type=silverfish,c=1,r=3] ~ ~ ~ setblock ~ ~ ~ lava`)
        player.runCommand(`execute @e[type=silverfish,c=1,r=3] ~ ~ ~ setblock ~ ~-1 ~ air 0 destroy`)
    }
})

world.events.entityHit.subscribe(eventInv => {
    const player = eventInv.hitEntity
    const entity = eventInv.entity
    try {
        if (player.id == 'minecraft:player' && entity.id == 'minecraft:zombie') {
            for (const plr of world.getPlayers()) {
                const playerInv = plr.getComponent("inventory");
                const InvContainer = playerInv.container;
                plr.runCommand(`scoreboard players random @s SwapInv 0 4`);
                InvContainer.swapItems(1, 2, InvContainer);
                InvContainer.swapItems(4, 0, InvContainer);
                InvContainer.swapItems(3, 6, InvContainer);
                InvContainer.swapItems(5, 7, InvContainer);
                InvContainer.swapItems(8, 9, InvContainer);
                if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[scores={SwapInv=0}]`).error == false) {
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
                } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[scores={SwapInv=1}]`).error == false) {
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
                } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[scores={SwapInv=2}]`).error == false) {
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
                } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[scores={SwapInv=3}]`).error == false) {
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
                } else if (runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[scores={SwapInv=4}]`).error == false) {
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
            }
        } else {

        }
    } catch { }
})

function runCommand(command) {
    try {
        return {
            error: false, ...world.getDimension("overworld").runCommand(command)
        }
    } catch (error) {
        return {
            error: true
        }
    }
}
