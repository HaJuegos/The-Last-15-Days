import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { worldToolsSimplified } from 'simplified-mojang-api';

/**
 * Clase padre de todos los eventos principales del add-on a base de scripts.
 * @author HaJuegos - 11-03-2026
 */
export class TL15DBaseManager {
    /**
     * Metodo auxiliar que controla el rango personalizado y general con su vida actua a los jugadores o entidades como el brute.
     * @param {mc.Player} ply Jugador o entidad en cuestion.
     * @param {?number} [currentH] (Opcional) La vida a asignar al rango, su vida actual.
     * @param {?number} [maxH] (Opcional) La vida a asignar al rango, su vida maxima que puede llegar.
     * @param {?boolean} [isTakingDamage] (Opcional) Solo para efectos visuales para poner el nombre en rojo al recibir daño.
     * @author HaJuegos - 02-04-2026
     * @protected
     */
    protected setCustomRank(targetEntity: mc.Player | mc.Entity, currentH?: number, maxH?: number, isTakingDamage?: boolean): void {
        if (!targetEntity.isValid) return;

        const name = targetEntity.typeId.split(':').pop()!.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        const healthComponent = targetEntity.getComponent(mc.EntityComponentTypes.Health);

        if (!healthComponent) return;

        const actualCurrentH = currentH ?? Math.floor(healthComponent.currentValue ?? 0);
        const actualMaxH = maxH ?? healthComponent.effectiveMax ?? healthComponent.defaultValue ?? 20;

        const iconDamage = isTakingDamage ? '' : '';
        const colorDamage = isTakingDamage ? '§4§l' : '§4';

        const finalRanks = `§7§l[§r§4§lSobreviviente§r§7§l]§r\n${name} ${colorDamage}${actualCurrentH}/${actualMaxH}§r${iconDamage}`;

        targetEntity.nameTag = finalRanks;

        if (isTakingDamage) {
            worldToolsSimplified.setDelay(() => {
                if (!targetEntity.isValid) return;

                this.setCustomRank(targetEntity);
            }, worldToolsSimplified.convertSecondsToTicks(0.2));
        }
    }

    /**
     * Metodo auxiliar principal que obtiene la entidad encargada de los datos del mundo guardados en el mundo.
     * @returns {mc.Entity} La entidad obtenida de los datos del mundo.
     * @author HaJuegos - 12-07-2026
     * @protected
     */
    protected getEntityDataWorld(): Promise<mc.Entity> {
        return new Promise((r) => {
            worldToolsSimplified.setRun(() => {
                const over = worldToolsSimplified.getDimension(vanilla.MinecraftDimensionTypes.Overworld) as mc.Dimension;
                const findWorldData = over.getEntities({ type: 'ha:data_world' });
                const plys = over.getPlayers();

                let finalEntity: mc.Entity;

                if (!findWorldData || findWorldData.length == 0) {
                    const spawnLoc = plys.length > 0 ? plys[0].location : { x: 0, y: 0, z: 0 };

                    finalEntity = over.spawnEntity('ha:data_world' as mc.VanillaEntityIdentifier, spawnLoc);

                    worldToolsSimplified.changeScoreInObj(finalEntity, 'ha:debuffs_state', 'set', 1);
                    worldToolsSimplified.getOrCreateTickingArea('ha:spawn_area', {
                        dimension: over,
                        from: spawnLoc,
                        to: spawnLoc,
                    });
                } else {
                    finalEntity = findWorldData[0];

                    if (findWorldData.length > 1) {
                        for (let i = 1; i < findWorldData.length; i++) {
                            const duplicate = findWorldData[i];

                            if (duplicate.isValid) {
                                duplicate.remove();
                            };
                        }
                    }
                }

                r(finalEntity);
            });
        });
    }
}