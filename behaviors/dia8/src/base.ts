import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { worldToolsSimplified } from 'simplified-mojang-api';

/**
 * Clase padre de todos los eventos principales del add-on a base de scripts.
 * @author HaJuegos - 11-03-2026
 */
export class TL15DBaseManager {
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