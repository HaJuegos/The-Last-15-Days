/* Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz */
/* Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz */

import * as mc from "@minecraft/server";

mc.world.afterEvents.projectileHitBlock.subscribe(pearlTeleport => {
	try {
		let source = pearlTeleport.source;
		let hitCoords = pearlTeleport.getBlockHit().block.location;
		if (source.hasTag("pearl")) {
			source.tryTeleport({ x: hitCoords.x, y: hitCoords.y + 1, z: hitCoords.z }, { dimension: source.dimension });
		};
	} catch {};
});

mc.world.afterEvents.projectileHitEntity.subscribe(pearlTeleport => {
	try {
		let source = pearlTeleport.source;
		let entityHit = pearlTeleport.getEntityHit().entity;
		if (entityHit && source.hasTag("pearl")) {
			let eCoords = entityHit.location;
			source.tryTeleport(eCoords, { dimension: source.dimension });
		};
	} catch {};
});

mc.system.runInterval(() => {
	try {
		for (const entities of mc.world.getDimension('nether').getEntities({ type: 'minecraft:piglin_brute', excludeTags: [ "meleeMode" ] })) {
			if (entities.target) {
				let targetEntity = entities.target;
				if (!targetEntity.isSneaking) {
					entities.triggerEvent("ha:mining_mode");
				};
			};
		};
	} catch {};
}, 300);
/* Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz */
/* Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz */