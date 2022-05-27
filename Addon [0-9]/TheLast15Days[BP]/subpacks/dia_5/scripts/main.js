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
            } else if(runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=cnvx:infernal_relic}]`).error == false){
                plr.addTag("infernal_relic")
                plr.runCommand(`execute @s[tag=!first_relic] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§4§l"},{"selector":"@s"},{"text":"§r§4 ha conseguido su §lReliquia Infernal"}]}`)
                plr.runCommand(`execute @s[tag=!first_relic] ~ ~ ~ playsound ambient.weather.thunder @a`)
                plr.addTag("first_relic")
            } else if(runCommand(`execute "${plr.nameTag}" ~ ~ ~ testfor @s[hasitem={item=cnvx:infernal_relic}]`).error == true){
                plr.removeTag("infernal_relic")
            }
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
