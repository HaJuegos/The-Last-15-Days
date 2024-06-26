/* Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz */
/* Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz */

import * as mc from "@minecraft/server";
import { preRanksSetup, setupCommands, mobsExplodes } from './localVariables';
import * as variable from './settings';
import './piglinTeleport';

let lastCoords = {};
let lastDime = {};

mc.world.afterEvents.itemCompleteUse.subscribe(itemConsumed => {
	try {
		let item = itemConsumed.itemStack;
		let player = itemConsumed.source;
		if (item.typeId == "cnvx:iron_apple") {
			player.runCommand(`function items/iron_apple`);
		};
	} catch {};
});

mc.world.beforeEvents.explosion.subscribe(explodeSensor => {
	try {
		let entity = explodeSensor.source;
		let coords = entity.location;
		let message = {translate: "chat.explotion_alert", with: {rawtext: [{text: `${Math.round(coords.x)} ${Math.round(coords.y)} ${Math.round(coords.z)}`},{translate: `${dimensionName(entity)}`}]}};
		if (mobsExplodes.includes(entity.typeId)) {
			if (entity.typeId) {
				message.with.rawtext.push({ text: 'Skuartu' });
				mc.world.sendMessage(message);
			} else {
				let entityName = entity.typeId.split(':')[1].charAt(0).toUpperCase() + entity.typeId.split(':')[1].slice(1);
				message.with.rawtext.push({ text: entityName });
				mc.world.sendMessage(message);
			};
		} else if (entity.typeId == 'minecraft:creeper') {
			let dimension = entity.dimension;
			let variant = entity.getComponent("minecraft:variant");
			switch (variant.value) {
				case 5: {
					mc.system.run(() => {
						dimension.spawnEntity("ha:radioactive_cloud", coords);
					});
				} break;
				case 4: {
					mc.system.run(() => {
						dimension.runCommand(`fill ${Math.round(coords.x) + 5} ${Math.round(coords.y) + 5} ${Math.round(coords.z) - 5} ${Math.round(coords.x) - 5} ${Math.round(coords.y) - 5} ${Math.round(coords.z) + 5} obsidian replace air`);
					});
				} break;
				case 3: {
					if (entity.hasTag("baby")) return;
					mc.system.run(() => {
						for (let i = 0; i < 3; i++) {
							dimension.spawnEntity("minecraft:creeper<ha:spawn_mini_momi_creeper>", coords);
						};
					});
				} break;
			};
		} else if (entity.typeId == 'minecraft:ender_crystal') {
			if (entity.hasTag("playerCrystal")) return;
			let dimension = entity.dimension;
			message = {translate: "chat.alert_crystal_explode"};
			if (dimension.id != 'minecraft:the_end') return;
			mc.system.run(() => {
				dimension.spawnEntity("ha:regenerate_llama", coords);
				mc.world.sendMessage(message);
				dimension.runCommand(`execute as @a[tag=in_end] at @s run playsound mob.wither.break_block`);
			});
		};
	} catch {};
});

mc.world.afterEvents.entitySpawn.subscribe(duplicateMobs => {
	try {
		let entity = duplicateMobs.entity;
		let dimension = entity.dimension;
		let coords = entity.location;
		switch (entity.typeId) {
			case 'minecraft:blaze':
			case 'minecraft:piglin':
			case 'minecraft:piglin_brute':
			case 'minecraft:ghast': {
				if (entity.hasTag("duplicated")) return;
				entity.addTag("duplicated");
				for (let i = 0; i < 2; i++) {
					let duplicateMob = dimension.spawnEntity(`${entity.typeId}`, coords);
					duplicateMob.addTag("duplicated");
				};
			} break;
			case 'minecraft:sheep': {
				entity.nameTag = `§bPolly§r`;
			} break;
			case 'minecraft:piglin_brute': {
				customRankName(entity);
			} break;
			case 'minecraft:creeper': {
				let variant = entity.getComponent("minecraft:variant");
				switch (variant.value) {
					case 5: {
						entity.nameTag = "§aCreeper Radioactivo§r";
					} break;
					case 4: {
						entity.nameTag = "§tCreeper Obsidiana§r";
					} break;
					case 1: {
						entity.nameTag = "§hCreeper Debuff§r";
					} break;
					case 3: {
						entity.nameTag = "§5Creeper Mommy§r";
					} break;
					case 2: {
						entity.nameTag = "§iCreeper Ninja§r";
					} break;
				};
			} break;
		};
	} catch {};
});

mc.world.beforeEvents.playerBreakBlock.subscribe(blockSensor => {
	try {
		let block = blockSensor.block;
		let player = blockSensor.player;
		if (block.typeId == 'minecraft:diamond_ore' || block.typeId == 'minecraft:deepslate_diamond_ore') {
			mc.system.run(() => {
				player.applyDamage(2, { cause: mc.EntityDamageCause.temperature });
			});
		} else if (block.typeId == 'minecraft:ancient_debris') {
			let coords = block.location;
			let dimension = player.dimension;
			mc.system.run(() => {
				dimension.spawnEntity("minecraft:silverfish", coords);
				dimension.runCommand(`setblock ${coords.x} ${coords.y} ${coords.z} flowing_lava`);
			});
		};
	} catch {};
});

mc.world.afterEvents.projectileHitEntity.subscribe(projectileHitSensor => {
	try {
		let source = projectileHitSensor.source
		let hitEntity = projectileHitSensor.getEntityHit().entity;
		if (source.typeId == 'minecraft:stray') {
			hitEntity.addEffect("slowness", 600, { amplifier: 3 });
		};
	} catch {};
});

mc.world.afterEvents.entityHurt.subscribe(damageSensor => {
	try {
		let damageSource = damageSensor.damageSource;
		let damage = damageSensor.damage;
		let cause = damageSource.cause;
		let sourceEntity = damageSource.damagingEntity;
		let hurtEntity = damageSensor.hurtEntity;
		
		if (hurtEntity.typeId == 'minecraft:player') {
			if (cause == 'fire' || cause == 'fireTick') {
				hurtEntity.applyDamage(6, { cause: mc.EntityDamageCause.fireTick });
			} else if (cause == 'lava') {
				hurtEntity.applyDamage(10, { cause: mc.EntityDamageCause.lava });
			};
		} else if (hurtEntity.typeId == 'minecraft:ender_dragon') {
			hurtEntity.runCommand(`playsound damage.thorns @a ~~~`);
			sourceEntity.applyDamage(Math.floor(damage), { cause: mc.EntityDamageCause.magic, damagingEntity: hurtEntity });
		};
		
		if (sourceEntity) {
			if (sourceEntity.typeId == 'minecraft:slime') {
				hurtEntity.addEffect("jump_boost", 600, { amplifier: 1 });
			} else if (sourceEntity.typeId == 'minecraft:ender_dragon') {
				if (cause != "entityAttack") return;
				let newCoords = { x: hurtEntity.location.x - sourceEntity.location.x, z: hurtEntity.location.z - sourceEntity.location.z };
				let length = Math.sqrt(newCoords.x * newCoords.x + newCoords.z * newCoords.z);
				newCoords.x /= length;
				newCoords.z /= length;
				let randomValue = 7.5 + Math.random() * (9.5 - 7.5);
				hurtEntity.applyKnockback(newCoords.x, newCoords.z, randomValue, randomValue);
			};
		};
	} catch {};
});

mc.world.afterEvents.entityHitEntity.subscribe(hitSensor => {
    try {
        const entityDamage = hitSensor.damagingEntity;
        const entityHit = hitSensor.hitEntity;
		switch (entityDamage.typeId) {
			case 'minecraft:goat': {
				let coordsDamage = entityDamage.location;
				let coordsHit = entityHit.location;
				const directionX = coordsHit.x - coordsDamage.x;
				const directionZ = coordsHit.z - coordsDamage.z;
				entityHit.applyKnockback(directionX, directionZ, 3.3, 0.3);
			} break;
			case 'minecraft:fox': {
				if (entityHit.typeId != 'minecraft:player') return;
				stealItemFox(entityDamage, entityHit);
			} break;
			case 'minecraft:husk': {
				entityHit.addEffect("hunger", 600, { amplifier: 3 });
			} break;
			case 'minecraft:stray': {
				entityHit.addEffect("slowness", 600, { amplifier: 3 });
			} break;
			case 'minecraft:dolphin': {
				entityHit.runCommand(`scoreboard players add @s dolphinTimer 300`);
				entityHit.playSound("damage.thorns");
			} break;
			case 'minecraft:zombie_horse': {
				entityHit.addEffect("nausea", 400, { amplifier: 0 });
				entityHit.addEffect("mining_fatigue", 400, { amplifier: 0 });
				entityHit.addEffect("poison", 400, { amplifier: 0 });
				entityHit.dimension.spawnEntity("minecraft:zombie<minecraft:entity_spawned>", entityHit.location);
			} break;
			case 'minecraft:skeleton_horse': {
				entityHit.addEffect("nausea", 400, { amplifier: 0 });
				entityHit.addEffect("mining_fatigue", 400, { amplifier: 0 });
				entityHit.addEffect("poison", 400, { amplifier: 0 });
				entityHit.dimension.spawnEntity("minecraft:skeleton<minecraft:entity_spawned>", entityHit.location);
			} break;
			case 'minecraft:spider':
			case 'minecraft:cave_spider': {
				entityHit.runCommand(`fill ~5~5~-5 ~-5~-5~5 web replace air`);
				if (entityDamage.hasTag("jockeyEffect")) {
					entityHit.runCommand(`effect @s clear`);
				};
			} break;
			case 'minecraft:zombie': {
				declutterInventory(entityHit);
				if (entityDamage.hasTag("jockeyEffect")) {
					entityHit.runCommand(`effect @s clear`);
				};
			} break;
			case 'minecraft:piglin_brute': {
				if (!entityDamage.hasTag("critical")) return;
				entityHit.runCommand(`particle minecraft:critical_hit_emitter ~~2~`);
			} break;
			case 'minecraft:vex': {
				let dimension = entityDamage.dimension;
				if (dimension.id != 'minecraft:the_end') return;
				entityHit.addEffect("slowness", 1200, { amplifier: 9 });
			} break;
		};
    } catch {};
});

mc.world.afterEvents.worldInitialize.subscribe(setupworld => {
	try {
		const dimension = mc.world.getDimension("overworld");
		for (let command of setupCommands) {
			dimension.runCommandAsync(`${command}`);
		};
	} catch {};
});

mc.world.afterEvents.entityHurt.subscribe(totemSensor => {
	try {
		let damage = totemSensor.damage;
		let entity = totemSensor.hurtEntity;
		let source = totemSensor.damageSource;
		if (entity.typeId != 'minecraft:player') return;
		let health = entity.getComponent("minecraft:health");
		if (health.currentValue <= 0) {
			mc.system.run(() => {
				if (health.currentValue > 0) {
					entity.applyDamage(0, override);
				};
			});
		};
		if (damage > 0 || source.cause != 'none') return;
		entity.runCommand(`function system/totem_alert`);
	} catch {};
});

mc.world.afterEvents.entityDie.subscribe(deathSensor => {
	try {
		let deadEntity = deathSensor.deadEntity;
		let source = deathSensor.damageSource;
		if (deadEntity.typeId == 'minecraft:player') {
			let coords = deadEntity.location;
			let dimension = deadEntity.dimension;
			lastCoords = coords;
			lastDime = dimension;
		} else if (deadEntity.typeId == 'minecraft:ender_dragon') {
			let damagingEntity = source.damagingEntity;
			damagingEntity.runCommand(`tellraw @a {"rawtext": [{"translate": "chat.free_end", "with": {"rawtext": [{"selector": "@s"}]}}]}`);
		};
	} catch {};
});

mc.world.afterEvents.entityHealthChanged.subscribe(healthSensor => {
	try {
		let entity = healthSensor.entity;
		if (entity.typeId == 'minecraft:player' || entity.typeId == 'minecraft:piglin_brute')
		customRankName(entity);
	} catch {};
});

mc.world.beforeEvents.chatSend.subscribe(chatRanks => {
	try {
		let message = chatRanks.message;
		let player = chatRanks.sender;
		chatRanks.cancel = true;
		if (!message.includes('!settings')) {
			customRanksChat(player, message);
		};
	} catch {};
});

mc.world.beforeEvents.itemUse.subscribe(itemUsed => {
	try {
		const player = itemUsed.source;
		const item = itemUsed.itemStack;
		if (item.typeId == 'minecraft:totem_of_undying' || item.typeId == 'minecraft:shield') {
			const armorSlots = player.getComponent("minecraft:equippable");
			let itemOffHand = armorSlots.getEquipment("Offhand");
			let itemMainHand = armorSlots.getEquipment("Mainhand");
			const air = new mc.ItemStack("minecraft:air");
			if (itemOffHand) {
				mc.system.run(() => {
					armorSlots.setEquipment("Offhand", itemMainHand);
					armorSlots.setEquipment("Mainhand", itemOffHand);
					player.playSound("armor.equip_generic");
				});
			} else {
				mc.system.run(() => {
					armorSlots.setEquipment("Offhand", itemMainHand);
					armorSlots.setEquipment("Mainhand", air);
					player.playSound("armor.equip_generic");
				});
			};
		};
	} catch {};
});

mc.world.afterEvents.playerSpawn.subscribe(banSensor => {
	try {
		let player = banSensor.player;
		setCustomRank(player);
		customRankName(player);
		if (variable.timerBan && player.hasTag("banned")) {
			player.runCommand(`kick "${player.name}" `);
		} else if (!variable.timerBan && player.hasTag("banned")) {
			player.runCommand(`function revivir`);
		};
	} catch {};
});

mc.system.afterEvents.scriptEventReceive.subscribe(staticEvents => {
	try {
		let events = staticEvents.id;
		let optionalMsg = staticEvents.message;
		let entity = staticEvents.sourceEntity;
		let coords = { x: Math.round(entity.location.x), y: Math.round(entity.location.y), z: Math.round(entity.location.z) };
		switch (events) {
			case 'ha:tp_revive': {
				let dimension = mc.world.getDimension("overworld");
				let tpSpawn = mc.world.getDefaultSpawnLocation();
				entity.tryTeleport(tpSpawn, { dimension: dimension });
			} break;
			case 'ha:resquicio_timer': {
				let rawMessage = {translate: "chat.royerbot.player_dead", with: {rawtext: [{text: `${entity.name}`},{text: `${coords.x} ${coords.y} ${coords.z}`},{translate: `${dimensionName(entity)}`}]}};
				mc.world.sendMessage(rawMessage);
				swapInventory(entity, coords);
			} break;
			case 'ha:death_knockback': {
				let viewCoords = entity.getViewDirection();
				entity.tryTeleport(lastCoords, { dimension: lastDime });
				mc.system.runTimeout(() => {
					entity.applyKnockback(viewCoords.x, viewCoords.z, 2.5, 0.7);
					mc.system.runTimeout(() => {
						if (variable.timerBan) {
							entity.runCommand(`kick "${entity.name}" `);
						};
					}, 65);
				}, 4);
			} break;
			case 'ha:generate_explode_skeleton': {
				let dimension = entity.dimension;
				let randomRadio = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
				dimension.createExplosion(coords, randomRadio, { source: entity, causesFire: true });
				entity.kill();
			} break;
			case 'ha:generate_explode_wither': {
				let dimension = entity.dimension;
				let randomRadio = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
				dimension.createExplosion(coords, randomRadio, { source: entity, causesFire: false });
				entity.kill();
			} break;
			case 'ha:generate_enderman': {
				let dimension = entity.dimension;
				dimension.spawnEntity("minecraft:enderman<minecraft:entity_spawned>", coords);
				entity.addTag("summonEnder");
			} break;
			case 'ha:summon_zombies': {
				let end = mc.world.getDimension('the_end');
				for (let i = 0; i < 6; i++) {
					end.spawnEntity("minecraft:cave_spider", { x: 0, y: 70, z: 0, });
				};
				entity.kill();
			} break;
		};
	} catch {};
});

function declutterInventory(player) {
	let inv = player.getComponent("minecraft:inventory").container;
	let numberOfSlots = inv.size;
    for (let slot = 0; slot < numberOfSlots; slot++) {
        let newSlot = Math.floor(Math.random() * numberOfSlots);
        inv.swapItems(slot, newSlot, inv);
    };
};

function stealItemFox(fox, player) {
    const inv = player.getComponent("minecraft:inventory").container;
    const foxInv = fox.getComponent("minecraft:inventory").container;
    const armorInv = player.getComponent("minecraft:equippable");
	let validSlots = inv.emptySlotsCount;
    let randomChance = Math.floor(Math.random() * 2);
    if (randomChance == 0) {
		if (validSlots == 36) return;
		let randomSlot;
        do {
            randomSlot = Math.floor(Math.random() * inv.size);
        } while (!inv.getItem(randomSlot));
        foxInv.addItem(inv.getItem(randomSlot));
        inv.setItem(randomSlot, undefined);
    } else if (randomChance == 1) {
		let armorSlots = ['Head', 'Chest', 'Legs', 'Feet', 'Offhand'];
        let randomArmorSlot;
        let armorItem;
        for (let i = 0; i < armorSlots.length; i++) {
            randomArmorSlot = armorSlots[Math.floor(Math.random() * armorSlots.length)];
            armorItem = armorInv.getEquipment(randomArmorSlot);
            if (armorItem) {
                foxInv.addItem(armorItem);
                armorInv.setEquipment(randomArmorSlot, undefined);
                return;
            };
        };
        if (validSlots == 36) return;
        let randomSlot;
        do {
            randomSlot = Math.floor(Math.random() * inv.size);
        } while (!inv.getItem(randomSlot));
        foxInv.addItem(inv.getItem(randomSlot));
        inv.setItem(randomSlot, undefined);
    };
};

function setCustomRank(player) {
	for (const rankTag in preRanksSetup) {
        let setTag = preRanksSetup[rankTag];
        if (Array.isArray(setTag.name)) {
            if (setTag.name.includes(player.name)) {
                player.addTag(rankTag);
                break;
            };
        } else {
            if (setTag.name == player.name) {
                player.addTag(rankTag);
                break;
            };
        };
    };
};

function customRanksChat(player, msg) {
	let tags = player.getTags();
	let foundTag = undefined;
    for (let tag of tags) {
        if (preRanksSetup[tag]) {
            foundTag = tag;
            break;
        };
    };
    let searchRank = foundTag ? preRanksSetup[foundTag] : preRanksSetup.default;
	let msgModifier = {translate: `${searchRank.rank}`, with: {rawtext: [{text: `${searchRank.nameRank}`},{text: `${player.name}`},{text: `${msg}`}]}};
	mc.world.sendMessage(msgModifier);
};

function customRankName(player) {
	if (player.typeId == 'minecraft:player') {
		let health = player.getComponent("minecraft:health");
		let tags = player.getTags();
		let foundTag = undefined;
		for (let tag of tags) {
			if (preRanksSetup[tag]) {
				foundTag = tag;
				break;
			};
		};
		let searchRank = foundTag ? preRanksSetup[foundTag] : preRanksSetup.default;
		player.nameTag = `${searchRank.nameRank}\n${player.name} §c${Math.round(health.currentValue)}§7/§c${health.defaultValue}§r`;
	} else {
		let health = player.getComponent("minecraft:health");
		let tags = player.getTags();
		let foundTag = undefined;
		for (let tag of tags) {
			if (preRanksSetup[tag]) {
				foundTag = tag;
				break;
			};
		};
		let searchRank = foundTag ? preRanksSetup[foundTag] : preRanksSetup.default;
		player.nameTag = `${searchRank.nameRank}\nPiglin Brute §c${Math.round(health.currentValue)}§7/§c${health.defaultValue}§r`;
	};
};

function swapInventory(player, coords) {
	const inv = player.getComponent("minecraft:inventory").container;
	const armorInv = player.getComponent("minecraft:equippable");
	let dimension = player.dimension;
	const armorSlots = ["Head", "Chest", "Legs", "Feet", "Offhand"];
	dimension.runCommand(`summon ha:player_ghost "§e${player.name} Inventory§r" ${coords.x} ${coords.y} ${coords.z}`);
	for (const entity of dimension.getEntities({ type: "ha:player_ghost", location: coords, maxDistance: 1 })) {
		const invGhost = entity.getComponent("minecraft:inventory").container;
		for (let i = 0; i < inv.size; i++) {
			let item = inv.getItem(i);
			if (!item) continue;
			inv.transferItem(i, invGhost);
		};
		for (let slot of armorSlots) {
			let item = armorInv.getEquipment(slot);
			if (!item) continue;
			invGhost.addItem(item);
			armorInv.setEquipment(slot, undefined);
		};
	};
};

function dimensionName(player) {
	const dimension = player.dimension;
	switch (dimension.id) {
		case 'minecraft:overworld': {
			return "dimension.overworld"
		} break;
		case 'minecraft:nether': {
			return "dimension.nether"
		} break;
		case 'minecraft:the_end': {
			return "dimension.end"
		} break;
	};
};
/* Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz */
/* Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz */