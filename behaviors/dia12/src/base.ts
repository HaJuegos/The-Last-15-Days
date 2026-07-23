import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { worldToolsSimplified } from 'simplified-mojang-api';

/**
 * Clase padre de todos los eventos principales del add-on a base de scripts.
 * @author HaJuegos - 11-03-2026
 */
export class TL15DBaseManager {
    /**
     * Metodo auxiliar que simplifica la informacion de la localizacion de un Vector3.
     * @param {mc.Vector3} coords La localizacion en concreto.
     * @returns {string} La informacion simplificada.
     * @author HaJuegos - 12-03-2026
     * @protected
     */
    protected simplifiedCoords(coords: mc.Vector3): string {
        return `X: ${Math.floor(coords.x)} Y: ${Math.floor(coords.y)} Z: ${Math.floor(coords.z)}`;
    }

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
        const actualMaxH = maxH ?? healthComponent.defaultValue ?? 20;

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
                const over = mc.world.getDimension(vanilla.MinecraftDimensionTypes.Overworld);
                let entity = over.getEntities({ type: 'ha:data_world' })[0];

                if (entity == undefined) {
                    over.runCommand('summon ha:data_world 0 50 0');

                    entity = over.getEntities({ type: 'ha:data_world' })[0];
                }

                r(entity);
            });
        });
    }
}