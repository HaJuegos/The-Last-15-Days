import * as mc from '@minecraft/server';

/**
 * Clase padre de todos los eventos principales del add-on a base de scripts.
 * @author HaJuegos - 11-03-2026
 */
export class TL15DBaseManager {
    /**
     * Variables iniciales de las reglas que se ponen automaticamente al iniciar el mundo.
     * @type {Partial<Record<mc.GameRule, boolean | number>>}
     * @protected
     * @author HaJuegos - 12-03-2026
     */
    protected initialGameRules: Partial<Record<mc.GameRule, boolean | number>> = {
        [mc.GameRule.CommandBlockOutput]: false,
        [mc.GameRule.DoDayLightCycle]: true,
        [mc.GameRule.DoImmediateRespawn]: true,
        [mc.GameRule.DoWeatherCycle]: true,
        [mc.GameRule.KeepInventory]: true,
        [mc.GameRule.LocatorBar]: false,
        [mc.GameRule.PlayersSleepingPercentage]: 9999,
        [mc.GameRule.Pvp]: false,
        [mc.GameRule.RandomTickSpeed]: 2,
        [mc.GameRule.RecipesUnlock]: true,
        [mc.GameRule.SendCommandFeedback]: false,
        [mc.GameRule.ShowBorderEffect]: false,
        [mc.GameRule.ShowCoordinates]: true,
        [mc.GameRule.ShowDaysPlayed]: true,
        [mc.GameRule.ShowRecipeMessages]: true,
        [mc.GameRule.ShowTags]: true,
        [mc.GameRule.SpawnRadius]: 2
    };

    constructor () {

    }

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
     * Metodo auxiliar que simplifica la informacion de la dimension obtenida.
     * @param {mc.Dimension} dime Dimension en concreto a simplificar. 
     * @returns {string} La informacion simplificada.
     * @author HaJuegos - 12-03-2026 
     * @protected
     */
    protected simplifiedDimension(dime: mc.Dimension): string {
        const dimensionMap: { [key: string]: string; } = {
            'overworld': 'Overworld',
            'nether': 'Nether',
            'the_end': 'The End'
        };

        const dimensionId = dime.id.replace('minecraft:', '');

        return dimensionMap[dimensionId];
    }
}