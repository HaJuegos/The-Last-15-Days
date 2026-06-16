import * as mc from '@minecraft/server';
import { worldToolsSimplified } from 'simplified-mojang-api';

/**
 * Clase padre de todos los eventos principales del add-on a base de scripts.
 * @author HaJuegos - 11-03-2026
 */
export class TL15DBaseManager {
    /**
    * Los rangos personalizables para usuarios que compraron un Ko-Fi en mi pagina :3
    * @type {({ namePly: string | string[]; rank: string; colorCode: string; }[])}
    * @author HaJuegos - 19-03-2026
    * @protected
    */
    protected customRanks: { namePly: string | string[]; rank: string; colorCode: string; }[] = [
        { namePly: ['Ha Juegos', 'Convex!', 'BigRoyer'], rank: 'DEV', colorCode: '§l§g' },
        { namePly: 'XChitoX3083', rank: 'Diresito Lover', colorCode: '§c' },
        { namePly: 'Dyaerl', rank: 'DaoLover', colorCode: '§a' },
        { namePly: 'Mattols7886', rank: 'Rey grasoso', colorCode: '§e' },
        { namePly: 'taracubayano', rank: 'The Last Survivor', colorCode: '§b' },
        { namePly: 'Stazku', rank: 'MvpBtw', colorCode: '§e' },
        { namePly: 'MetWee', rank: 'FanDeGeoKiller', colorCode: '§d' },
        { namePly: 'El Dahp', rank: 'Zzz', colorCode: '§l§a' },
        { namePly: 'SrLoboMCTuber', rank: 'Fan de Diresito uwu ', colorCode: '§l§d' },
        { namePly: 'ItsAncientMC', rank: 'Main-Astra', colorCode: '§l§u' },
        { namePly: 'Diresito', rank: 'nyaowodirepene', colorCode: '§l§a' },
        { namePly: 'E S D I 1 0', rank: 'Bendies2', colorCode: '§a' },
        { namePly: 'ShedowXDYT', rank: 'ElFurro', colorCode: '§1' },
        { namePly: 'fede p5959', rank: 'MvpBtw', colorCode: '§e' },
        { namePly: 'GEOKILLER', rank: 'GeoPerro', colorCode: '§u' },
        { namePly: 'zVicX9198', rank: 'The Lagger', colorCode: '§u' },
        { namePly: 'CopyCat Mc', rank: 'Tan sexoso', colorCode: '§e' },
        { namePly: 'Iam4ndrew', rank: 'SoSneaky SpeedRunner', colorCode: '§u§l' },
    ];

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
        const name = (targetEntity instanceof mc.Player) ? targetEntity.name : targetEntity.typeId.split(':').pop()!.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        const healthComponent = targetEntity.getComponent(mc.EntityComponentTypes.Health) as mc.EntityHealthComponent;
        const currentVal = Math.floor(healthComponent.currentValue);
        const maxVal = healthComponent.defaultValue;
        const rankData = this.customRanks.find((data) => {
            if (Array.isArray(data.namePly)) {
                return data.namePly.includes(name);
            }

            return data.namePly == name;
        });

        const displayRank = rankData ? `${rankData.colorCode}${rankData.rank}` : `§4§lSobreviviente`;
        const finalRank = isTakingDamage ?
            `§7§l[§r${displayRank}§7§l]§r\n${name} §4§l${currentH ? currentH : currentVal}/${maxH ? maxH : maxVal}§r` :
            `§7§l[§r${displayRank}§7§l]§r\n${name} §4${currentH ? currentH : currentVal}/${maxH ? maxH : maxVal}§r`;

        targetEntity.nameTag = finalRank;

        if (isTakingDamage) {
            worldToolsSimplified.setDelay(() => {
                this.setCustomRank(targetEntity);
            }, worldToolsSimplified.convertSecondsToTicks(0.2));
        }
    }
}