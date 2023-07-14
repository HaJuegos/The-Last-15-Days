/* Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */
/* Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174 */

import { system, world, ItemStack, EquipmentSlot } from "@minecraft/server";

system.beforeEvents.watchdogTerminate.subscribe((eventData) => {
	eventData.cancel = true;
});

world.afterEvents.entitySpawn.subscribe(entitySummon => {
	try {
		let entity = entitySummon.entity;
		switch (entity.typeId) {
			case 'minecraft:sheep': {
				entity.nameTag = "Polly";
			} break;
		};
	} catch {};
});

world.afterEvents.entityHurt.subscribe(entityDamage => {
	try {
		let hurtEntity = entityDamage.hurtEntity;
		let source = entityDamage.damageSource;
		let entityCause = source.damagingEntity;
		let cause = source.cause;
		let damage = entityDamage.damage;
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
				};
			} break;
		};
	} catch {};
});

world.afterEvents.blockBreak.subscribe(eventNetherite => {
    try {
        let player = Array.from(world.getPlayers()).find(p => p.name == eventNetherite.player.name);
        let block = eventNetherite.brokenBlockPermutation.type;
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
	try {
		const msg = eventData.message;
		const player = eventData.sender;
		eventData.cancel = true;
		let tag = player.getTags().find(tag => tag.startsWith("r:"))?.substring(2)?.split("-") || ["default"];
		let key = `rank.${tag}`;
		world.getDimension("overworld").runCommandAsync(`tellraw @a {"rawtext":[{"text":"§l§8["},{"translate":"${key}"},{"text":"§l§8]§r ${player.name} §8§l>>§r ${msg}"}]}`);
	} catch {};
});

world.afterEvents.entityDie.subscribe(eventDead => {
	try {
		let entity = eventDead.deadEntity;
		let source = eventDead.damageSource;
		let cause = source.cause;
		let entityCause = source.damagingEntity;
		if (entity.typeId == 'minecraft:player') {
			if (!entity.hasTag("coords")) {
				entity.runCommandAsync(`summon ha:ghost_player "§e${entity.name} Inventory§r" ~ ~ ~`);
				entity.runCommandAsync(`tellraw @a {"rawtext": [{"translate":"dead_player_coordinates", "with": {"rawtext": [{"selector":"@s"},{"text":"${Math.floor(entity.location.x)} ${Math.floor(entity.location.y)} ${Math.floor(entity.location.z)}"},{"translate":"${getDimension(entity.dimension)}"}]}}]}`);
				entity.addTag("coords");
			};
			if (entityCause) {
				try {
					let name = entityCause.name ?? entityCause.typeId;
					console.warn(`[HALOGS] >> ${entity.name} ha muerto a manos de ${name}. Causa: ${cause}. (Estaba en el ${entity.dimension.id} en las coords ${Math.round(entity.location.x)} ${Math.round(entity.location.z)} ${Math.round(entity.location.y)})`);
				} catch {
					console.warn(`[HALOGS] >> ${entity.name} ha muerto a manos de una entidad desconocida, que ha muerto tambien o no se pudo obtener a tiempo. Causa: ${cause}. (Estaba en el ${entity.dimension.id} en las coords ${Math.round(entity.location.x)} ${Math.round(entity.location.z)} ${Math.round(entity.location.y)})`);
				};
			} else {
				console.warn(`[HALOGS] >> ${entity.name} ha muerto. Causa: ${cause}. (Estaba en el ${entity.dimension.id} en las coords ${Math.round(entity.location.x)} ${Math.round(entity.location.z)} ${Math.round(entity.location.y)})`);
			};
		};
	} catch {};
});

system.runInterval(() => {
	for (const player of world.getPlayers()) {
		if (player.hasTag("ban")) {
			player.runCommandAsync(`kick "${player.name}" `);
        };
    };
}, 44);

system.runInterval((healthEvent) => {
	try {
		const players = Array.from(world.getPlayers());
		for (const player of players) {
			if (player.hasComponent("health")) {
				const health = player.getComponent("health");
				let rankKey = player.getTags().find((tag) => tag.startsWith("r:") || tag == "owner" || tag == "dev" || tag == "custom_1" || tag == "custom_2" || tag == "custom_3" || tag == "custom_4" || tag == "custom_5" || tag == "custom_6" || tag == "custom_7" || tag == "custom_8" || tag == "custom_9" || tag == "custom_10");
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
						case (rankKey.startsWith("r:custom_10")): {
							rankKey = "§r§l§uMain-Astra";
						} break;
						case (rankKey.startsWith("r:")): {
							rankKey = "§r§4Survivor";
						} break;
					};
				};
				const fixRank = rankKey.substring(2).split("-").join(" ");
				player.nameTag = `§7§l[${fixRank}§7§l]\n§r${player.name} §c${Math.round(health.currentValue)}§7/§c${Math.round(health.defaultValue)}§r`;
			};
		};
	} catch {};
}, 1);

world.afterEvents.itemUse.subscribe(totemFast => {
	try {
		let item = totemFast.itemStack;
		let player = totemFast.source;
		let slot = player.getComponent('minecraft:equipment_inventory');
		let mainHand = slot.getEquipment("mainhand");
		let offHand = slot.getEquipment("offhand");
		if (item.typeId == 'minecraft:totem_of_undying' && offHand == undefined) {
			slot.setEquipment("offhand", mainHand);
			slot.setEquipment("mainhand", offHand);
			player.runCommandAsync(`playsound armor.equip_generic`);
		};
	} catch {};
});

world.afterEvents.entityHurt.subscribe(hurtEvent => {
	try {
		let hurtEntity = hurtEvent.hurtEntity;
		let damage = hurtEvent.damage;
		let source = hurtEvent.damageSource;
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