/* Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */
/* Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */

import { system, world, ItemStack, EquipmentSlot, MinecraftItemTypes } from "@minecraft/server";

system.events.beforeWatchdogTerminate.subscribe((eventData) => {
	eventData.cancel = true;
});

world.beforeEvents.explosion.subscribe(entityExplode => {
	let entityExploted = entityExplode.source;
	let dimension = entityExplode.dimension;
	let position = entityExploted.location;
	const dimensionKeys = { 'minecraft:overworld': 'overworld', 'minecraft:nether': 'nether', 'minecraft:the_end': 'the_end', };
	let dimensionName = dimensionKeys[dimension.id] || '';
	try {
		if (entityExploted.typeId == 'minecraft:ender_crystal' && entityExploted.hasTag("naturalGenerated")) {
			if (dimensionName == 'the_end') {
				world.getDimension(dimensionName).runCommandAsync(`summon ha:attack_llama_summon ${Math.round(position.x)} ${Math.round(position.y)} ${Math.round(position.z)}`);
				world.getDimension(dimensionName).runCommandAsync(`event entity @a[tag=in_end] ha:in_cinematic`);
				world.getDimension(dimensionName).runCommandAsync(`camera @a[tag=in_end] set minecraft:free ease 0.8 in_out_expo pos ${Math.round(position.x)} ${Math.round(position.y) + 5} ${Math.round(position.z)} rot 90 0`);
				system.runTimeout(() => {
					world.getDimension(dimensionName).runCommandAsync(`execute as @a[tag=in_end] at @s run camera @a set minecraft:free ease 0.8 in_out_expo pos ~ ~1.5 ~ rot ~ ~`);
					system.runTimeout(() => {
						world.getDimension(dimensionName).runCommandAsync(`camera @a[tag=in_end] clear`);
						system.runTimeout(() => {
							world.getDimension(dimensionName).runCommandAsync(`event entity @a[tag=in_end] ha:no_cinematic`);
						}, 44);
					}, 16);
				}, 32);
			};
		};
	} catch {};
});

world.afterEvents.projectileHit.subscribe(eventProjectile => {
	let source = eventProjectile.source;
    try {
		if (source.typeId == 'minecraft:piglin_brute') {
			let hittedObject = eventProjectile.getEntityHit()?.entity ?? eventProjectile.getBlockHit()?.block;
			if (source.hasTag("enderMode")) {
				source.runCommandAsync(`tp @s ${Math.round(hittedObject.location.x)} ${Math.round(hittedObject.location.y) + 1} ${Math.round(hittedObject.location.z)}`);
				source.runCommandAsync(`playsound mob.shulker.teleport @a ${hittedObject.location.x} ${hittedObject.location.y} ${hittedObject.location.z}`);
			};
		} else if (source.typeId == 'minecraft:snow_golem') {
			let hittedObject = eventProjectile.getEntityHit()?.entity ?? eventProjectile.getBlockHit()?.block;
			let dimension = source.dimension.id;
			if (dimension == 'minecraft:the_end' && hittedObject.typeId == 'minecraft:player') {
				hittedObject.runCommandAsync(`tp ${Math.round(source.location.x)} ${Math.round(source.location.y)} ${Math.round(source.location.z)}`);
				source.runCommandAsync(`playsound mob.shulker.teleport @a ~ ~ ~`);
			};
		};
    } catch {};
});

world.afterEvents.entitySpawn.subscribe(entitySummon => {
	let entity = entitySummon.entity;
	try {
		switch (true) {
			case (entity.typeId == 'minecraft:sheep'): {
				entity.nameTag = "Polly";
			} break;
		};
	} catch {};
});

world.afterEvents.entityHurt.subscribe(entityDamage => {
    let hurtEntity = entityDamage.hurtEntity;
    let source = entityDamage.damageSource;
	let entityCause = source.damagingEntity;
	let cause = source.cause;
	let damage = entityDamage.damage;
	let dimension = hurtEntity.dimension.id;
	try {
		switch (true) {
			case (hurtEntity.typeId == 'minecraft:player'): {
				if (entityCause.typeId == 'minecraft:fox') {
					hurtEntity.runCommandAsync(`function system/zorro_roba_item`);
				} else if (entityCause.typeId == 'minecraft:stray' && cause == 'projectile') {
					hurtEntity.runCommandAsync(`effect @s slowness 30 3`);
				} else if (entityCause.typeId == 'minecraft:husk') {
					hurtEntity.runCommandAsync(`effect @s hunger 30 3`);
				} else if (entityCause.typeId == 'minecraft:wither') {
					hurtEntity.runCommandAsync(`effect @s levitation 30 10`);
				} else if (entityCause.typeId == 'minecraft:dolphin') {
					hurtEntity.runCommandAsync(`event entity @s cnvx:dolphin_damage`);
				} else if (entityCause.typeId == 'minecraft:zombie_horse' || entityCause.typeId == 'minecraft:skeleton_horse') {
					hurtEntity.runCommandAsync(`effect @s mining_fatigue 60 0`);
					hurtEntity.runCommandAsync(`effect @s poison 30 1`);
					hurtEntity.runCommandAsync(`effect @s nausea 30 0`);
				} else if (entityCause.typeId == 'minecraft:spider' || entityCause.typeId == 'minecraft:cave_spider') {
					hurtEntity.runCommandAsync(`fill ~3 ~3 ~3 ~-3 ~-3 ~-3 web replace air`);
				} else if (entityCause.typeId == 'minecraft:vex' && dimension == 'minecraft:the_end') {
					hurtEntity.runCommandAsync(`effect @s slowness 60 9`)
				};
			} break;
			case (hurtEntity.typeId == 'minecraft:ender_dragon'): {
				if (entityCause.typeId == 'minecraft:player') {
					if (hurtEntity.hasTag("isSitting")) {
						entityCause.runCommandAsync(`damage @s ${Math.round(damage)} override entity @e[type=ender_dragon,c=1]`);
					};
				};
			} break;
		};
	} catch {};
});

world.afterEvents.blockBreak.subscribe(eventNetherite => {
    try {
        let player = Array.from(world.getPlayers()).find(p => p.name == eventNetherite.player.name);
        const block = eventNetherite.brokenBlockPermutation.type;
		let x = eventNetherite.block.location.x;
        let y = eventNetherite.block.location.y;
        let z = eventNetherite.block.location.z;
        if (block.id == 'minecraft:diamond_ore') {
            player.runCommandAsync(`damage "${player.name}" 3 temperature`);
        };
		if (block.id == 'minecraft:deepslate_diamond_ore') {
            player.runCommandAsync(`damage "${player.name}" 3 temperature`);
        };
		if (block.id == 'minecraft:ancient_debris') {
            player.runCommandAsync(`summon silverfish ${x} ${y} ${z}`);
            player.runCommandAsync(`setblock ${x} ${y} ${z} flowing_lava`);
        };
    } catch {};
});

world.beforeEvents.chatSend.subscribe(eventData => {
    const msg = eventData.message;
    const player = eventData.sender;
	eventData.cancel = true;
	const tag = player.getTags().find(tag => tag.startsWith("r:"))?.substring(2)?.split("-") || ["default"];
	const key = `rank.${tag}`;
	try {
		world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"§l§8["},{"translate":"${key}"},{"text":"§l§8]§r ${player.name} §8§l>>§r ${msg}"}]}`);
	} catch {};
});

world.afterEvents.entityDie.subscribe(eventDead => {
	const player = eventDead.deadEntity;
	const source = eventDead.damageSource;
	try {
		if (player.typeId == 'minecraft:player') {
			if (!player.hasTag("coords")) {
				player.runCommandAsync(`summon ha:ghost_player "§e${player.name} Inventory§r" ~ ~ ~`);
				player.runCommandAsync(`tellraw @a {"rawtext": [{"translate":"dead_player_coordinates", "with": {"rawtext": [{"selector":"@s"},{"text":"${Math.floor(player.location.x)} ${Math.floor(player.location.y)} ${Math.floor(player.location.z)}"},{"translate":"${getDimension(player.dimension)}"}]}}]}`);
				player.addTag("coords");
			};
		} else if (player.typeId == 'minecraft:ender_dragon') {
			let dimension = player.dimension;
			let position = player.location;
			const dimensionKeys = { 'minecraft:overworld': 'overworld', 'minecraft:nether': 'nether', 'minecraft:the_end': 'the_end', };
			let dimensionName = dimensionKeys[dimension.id] || '';
			world.getDimension(dimensionName).runCommandAsync(`camera @a[tag=in_end] set minecraft:free ease 1.0 in_out_expo pos ${Math.round(position.x) + 11} ${Math.round(position.y) + 10} ${Math.round(position.z) + -11} rot ${Math.round(position.x) + 30} ${Math.round(position.y) + -15}`);
			world.getDimension(dimensionName).runCommandAsync(`event entity @a[tag=in_end] ha:in_cinematic`);
			system.runTimeout(() => {
				world.getDimension(dimensionName).runCommandAsync(`execute as @a[tag=in_end] run function system/royerbot_death`);
				system.runTimeout(() => {
					world.getDimension(dimensionName).runCommandAsync(`execute as @a[tag=in_end] at @s run camera @a set minecraft:free ease 0.8 in_out_expo pos ~ ~1.5 ~ rot ~ ~`);
					system.runTimeout(() => {
						world.getDimension(dimensionName).runCommandAsync(`camera @a[tag=in_end] clear`);
						system.runTimeout(() => {
							world.getDimension(dimensionName).runCommandAsync(`event entity @a[tag=in_end] ha:no_cinematic`);
						}, 44);
					}, 16);
				}, 60);
			}, 40);
		};
	} catch {};
});

system.runInterval(() => {
	for (const player of world.getPlayers()) {
		if (player.hasTag("ban")) {
			player.runCommandAsync(`kick "${player.name}" `);
        };
    };
}, 1);

system.runInterval((healthEvent) => {
    const players = Array.from(world.getPlayers());
    for (const player of players) {
        if (player.hasComponent("health")) {
            const health = player.getComponent("health");
            let rankKey = player.getTags().find((tag) => tag.startsWith("r:") || tag == "owner" || tag == "dev" || tag == "custom_1" || tag == "custom_2" || tag == "custom_3" || tag == "custom_4" || tag == "custom_5" || tag == "custom_6" || tag == "custom_7" || tag == "custom_8" || tag == "custom_9");
			if (!rankKey) {
                rankKey = "§r§4Survivor";
            } else {
                switch (true) {
                    case (rankKey.startsWith("r:owner")): {
						rankKey = "§r§eOwner";
					} break;
                    case (rankKey.startsWith("r:dev")): {
						rankKey = "§r§6DEV";
					} break;
                    case (rankKey.startsWith("r:custom_1")): {
						rankKey = "§r§cDiresito Lover";
					} break;
                    case (rankKey.startsWith("r:custom_2")): {
						rankKey = "§r§aDaoLover";
					} break;
                    case (rankKey.startsWith("r:custom_3")): {
						rankKey = "§r§eGreasy King";
					} break;
                    case (rankKey.startsWith("r:custom_4")): {
						rankKey = "§r§bThe Last Survivor";
					} break;
                    case (rankKey.startsWith("r:custom_5")): {
						rankKey = "§r§eMvpBtw";
					} break;
                    case (rankKey.startsWith("r:custom_6")): {
						rankKey = "§r§dGeoKiller Fan";
					} break;
                    case (rankKey.startsWith("r:custom_7")): {
						rankKey = "§r§aZzz";
					} break;
                    case (rankKey.startsWith("r:custom_8")): {
						rankKey = "§r§dDiresito Fan uwu";
					} break;
					case (rankKey.startsWith("r:custom_9")): {
						rankKey = "§r§eTlan sexoso";
					} break;
                    case (rankKey.startsWith("r:")): {
						rankKey = "§r§4Survivor";
					} break;
                };
            };
            const fixRank = rankKey.substring(2).split("-").join(" ");
            player.nameTag = `§7§l[${fixRank}§7§l]\n§r${player.name} §c${Math.round(health.current)}§7/§c${Math.round(health.value)}§r`;
        };
    };
}, 1);

world.afterEvents.itemUse.subscribe(eventMilk => {
    const players = eventMilk.source;
	const slot = players.getComponent('minecraft:equipment_inventory');
    const item = slot.getEquipment(EquipmentSlot.mainhand);
	const anotherItem = slot.getEquipment(EquipmentSlot.offhand);
	let player = Array.from(world.getPlayers()).find(plr => plr.name == players.name);
	try {
		if (item.typeId == 'minecraft:totem_of_undying' && anotherItem == undefined) {
			player.runCommandAsync(`replaceitem entity @s slot.weapon.offhand 0 totem`);
			player.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 air`);
			player.runCommandAsync(`playsound armor.equip_chain @s`);
		};
	} catch {};
});

world.afterEvents.entityHurt.subscribe(hurtEvent => {
    let hurtEntity = hurtEvent.hurtEntity;
    let damage = hurtEvent.damage;
    let source = hurtEvent.damageSource;
	try {
		if (hurtEntity.typeId != 'minecraft:player') return;
		let player = Array.from(world.getPlayers()).find(plr => plr.name == hurtEntity.name);
		const health = player.getComponent('minecraft:health');
		if (health.current <= 0) {
			system.runTimeout(() => {
				if (health.current > 0) {
					player.runCommandAsync(`damage @s 0 override`);
				}
			}, 1);
		};
		if (damage > 0 || source.cause != 'none') return;
		player.runCommandAsync(`function system/alerta_de_totem`);
	} catch {};
});

world.afterEvents.entityHit.subscribe(eventInv => {
    try {
        const players = eventInv.hitEntity;
        const entity = eventInv.entity;
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
            };
        } else { };
    } catch { };
});

function getDimension(dimension) {
    const keys = {
        overworld: "dimension.over",
        nether: "dimension.nether",
        "the end": "dimension.end"
    };
    const ids = ['overworld', 'nether', 'the end'];
    let d = ids.find((id) => world.getDimension(id) == dimension);
    if (d && keys[d]) {
        let rawtextKeys = keys[d];
        return `${rawtextKeys}`;
    }
};

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
/* Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */
/* Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */