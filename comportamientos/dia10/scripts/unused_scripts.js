/* Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */
/* Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */

world.beforeEvents.chatSend.subscribe(eventData => {
    const msg = eventData.message;
    const player = eventData.sender;
	if (msg.startsWith("!unban") && player.hasTag("Admin")) {
		eventData.cancel = true;
		const args = msg.substring(msg.indexOf(' ') + 1);
		if (vPlayer && args.startsWith(vPlayer)) {
			const randomNum = args.substring(vPlayer.length).trim();
			if (/^\d+$/.test(randomNum)) {
				player.runCommandAsync(`scoreboard players reset "${args}" isBanned`).then(() => {
					player.runCommandAsync(`tellraw @s {"rawtext": [{"translate":"commands.unban.message", "with": {"rawtext": [{"text":"§7${args}"}]}}]}`);
				});
			};
		};
	} else if (msg.startsWith("!unban") && !player.hasTag("Admin")) {
		eventData.cancel = true;
		player.runCommandAsync(`tellraw @s {"rawtext": [{"text":"§c"},{"translate":"commands.generic.unknown", "with": {"rawtext": [{"text":"unban"}]}}]}`)
	} else {
		eventData.cancel = true;
		const tag = player.getTags().find(tag => tag.startsWith("r:"))?.substring(2)?.split("-") || ["default"];
        const key = `rank.${tag}`;
        world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"§l§8["},{"translate":"${key}"},{"text":"§l§8]§r ${player.name} §8§l>>§r ${msg}"}]}`);
	};
});

let vPlayer = null;

system.runInterval(() => {
	for (const player of world.getPlayers()) {
		try {
			const score = world.scoreboard.getObjective('isBanned');
			const participants = score.getParticipants();
			for (const participant of participants) {
				const value = score.getScore(participant);
				if (value >= 1 && participant.getEntity() == player) {
					player.runCommandAsync(`kick "${player.name}" §r`);
				} else {};
			};
			if (player.hasTag("pedingBan")) {
                const randomNum = Math.floor(Math.random() * 100);
                vPlayer = `${player.name}${randomNum}`;
				player.runCommandAsync(`scoreboard players set "${vPlayer}" isBanned 1`);
				player.removeTag("pedingBan")
			};
		} catch {};
	};
}, 1);

/* Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */
/* Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */