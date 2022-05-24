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
                world.getDimension("overworld").runCommand(`execute "${player.nameTag}" ~ ~ ~ replaceitem entity @s slot.weapon.offhand 0 totem`)
                world.getDimension("overworld").runCommand(`execute "${player.nameTag}" ~ ~ ~ replaceitem entity @s slot.hotbar 8 golden_carrot 15`)
                world.getDimension("overworld").runCommand(`execute "${player.nameTag}" ~ ~ ~ replaceitem entity @s slot.hotbar 7 water_bucket`)
                world.getDimension("overworld").runCommand(`execute "${player.nameTag}" ~ ~ ~ scoreboard objectives add ban dummy ban`)
                player.addTag("Kit")
            } else { }
        }
    } catch { }
})

