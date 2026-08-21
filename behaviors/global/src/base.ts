import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { worldToolsSimplified } from 'simplified-mojang-api';

/**
 * Clase padre de todos los eventos principales del add-on a base de scripts.
 * @author HaJuegos - 07-08-2026
 */
export class TL15DBaseManager {
    /**
     * Variable que controla el estado del baneo automatico del servidor.
     * @type {boolean}
     * @author HaJuegos - 07-07-2026
     * @protected
     */
    protected static banState: boolean = true;

    /**
     * Todos los items permitidos para el fast items, tanto por defecto, como dinamicamente.
     * @type {(string[] | vanilla.MinecraftItemTypes[])}
     * @author HaJuegos - 08-07-2026
     * @protected
     */
    protected static listOfFastItems: string[] | vanilla.MinecraftItemTypes[] = [
        vanilla.MinecraftItemTypes.TotemOfUndying,
        vanilla.MinecraftItemTypes.Shield,
        'arrow',
        'firework'
    ];

    /**
   * Los rangos personalizables para usuarios que compraron un Ko-Fi en mi pagina :3
   * @type {({ namePly: string | string[]; rank: string; colorCode: string; }[])}
   * @author HaJuegos - 19-03-2026
   * @protected
   */
    protected customRanks: CustomRankTemplate[] = [
        { plyName: 'BigRoyer', nameRank: ['OWNER', 'DEV'], colorCode: ['§l§e', '§l§g'] },
        { plyName: 'Ha Juegos', nameRank: ['DEV', 'Gay'], colorCode: ['§l§g', '§l§d'] },
        { plyName: 'llConvex38ll', nameRank: 'DEV', colorCode: '§l§g' },
        { plyName: 'XChitoX3083', nameRank: 'Diresito Lover', colorCode: '§c' },
        { plyName: 'Dyaerl', nameRank: 'DaoLover', colorCode: '§a' },
        { plyName: 'Mattols7886', nameRank: 'Rey grasoso', colorCode: '§e' },
        { plyName: 'taracubayano', nameRank: 'The Last Survivor', colorCode: '§b' },
        { plyName: 'Stazku', nameRank: 'MvpBtw', colorCode: '§e' },
        { plyName: 'MetWee', nameRank: 'FanDeGeoKiller', colorCode: '§d' },
        { plyName: 'El Dahp', nameRank: 'Zzz', colorCode: '§l§a' },
        { plyName: 'SrLoboMCTuber', nameRank: 'Fan de Diresito uwu ', colorCode: '§l§d' },
        { plyName: 'ItsAncientMC', nameRank: 'Main-Astra', colorCode: '§l§u' },
        { plyName: 'Diresito', nameRank: 'nyaowodirepene', colorCode: '§l§a' },
        { plyName: 'macros skill', nameRank: 'Bendies2', colorCode: '§a' },
        { plyName: 'ShedowXDYT', nameRank: 'ElFurro', colorCode: '§1' },
        { plyName: 'fede p5959', nameRank: 'MvpBtw', colorCode: '§e' },
        { plyName: 'GEOKILLER', nameRank: 'GeoPerro', colorCode: '§u' },
        { plyName: 'zVicX9198', nameRank: 'The Lagger', colorCode: '§u' },
        { plyName: 'CopyCat Mc', nameRank: ['Gato', 'GatoTester'], colorCode: ['§d§l', '§9'] },
        { plyName: 'Iam4ndrew', nameRank: 'SoSneaky SpeedRunner', colorCode: '§u§l' },
        { plyName: 'CloudMrcZ', nameRank: ['Sobreviviente', 'CloudTester'], colorCode: ['§l§4', '§9'] },
        { plyName: 'KyzaxxLL', nameRank: 'Pelowisos', colorCode: '§l§d' },
        { plyName: 'Emiliocrack1355', nameRank: 'El Furro', colorCode: '§c§l' },
        { plyName: 'AlternativeGWG', nameRank: 'Cataclysm', colorCode: '§p§l' }
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

    /**
     * Metodo auxiliar que obtiene datos del rango personalizado por nombre.
     * @param {string} name Nombre del jugador.
     * @param {boolean} isOp Condicion a validar si el jugador es operador o no.
     * @param {boolean} isSurvival Condicion a validar si el jugador esta en survival.
     * @param {boolean} isDeath Condicion a valdiar si el jugador ya esta muerto.
     * @returns {{ namePly: string | string[]; rank: string; colorCode: string; } | undefined}
     * @author HaJuegos - 18-06-2026
     * @protected
     */
    protected getRanksPlys(name: string, isOp: boolean, isSurvival: boolean, isDeath: boolean): string {
        const data = this.customRanks.find((r) => Array.isArray(r.plyName) ? r.plyName.includes(name) : r.plyName == name);
        const extraRanks: string[] = [];

        if (isOp && !isSurvival) {
            extraRanks.push('§j§lEspectador');
        }

        if (isDeath) {
            extraRanks.push('§8§lMuerto');
        }

        if (!data) {
            return extraRanks.length > 0 ? extraRanks.join('§r§7§l] [§r') : '§4§lSobreviviente';
        };

        let baseRanks = '';

        if (!Array.isArray(data.nameRank)) {
            const color = Array.isArray(data.colorCode) ? data.colorCode[0] : data.colorCode;

            baseRanks = `${color}${data.nameRank}`;
        } else {
            const multipleRanks = data.nameRank.map((rank, i) => {
                const color = Array.isArray(data.colorCode) ? data.colorCode[i] : data.colorCode;

                return `${color}${rank}`;
            });

            baseRanks = multipleRanks.join('§r§7§l] [§r');
        }

        if (extraRanks.length > 0) {
            return `${baseRanks}§r§7§l] [§r${extraRanks.join('§r§7§l] [§r')}`;
        }

        return baseRanks;
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

        return dimensionMap[dimensionId] ?? dimensionId;
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

        const name = (targetEntity instanceof mc.Player) ? targetEntity.name : targetEntity.typeId.split(':').pop()!.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        const healthComponent = targetEntity.getComponent(mc.EntityComponentTypes.Health);

        if (!healthComponent) return;

        const actualCurrentH = currentH ?? Math.floor(healthComponent.currentValue ?? 0);
        const actualMaxH = maxH ?? healthComponent.defaultValue ?? 20;
        const isOp = (targetEntity instanceof mc.Player) ? targetEntity.playerPermissionLevel == mc.PlayerPermissionLevel.Operator : false;
        const isSurvi = (targetEntity instanceof mc.Player) ? (targetEntity.getGameMode() == mc.GameMode.Survival || targetEntity.getGameMode() == mc.GameMode.Adventure) : false;
        const isDeath = (targetEntity instanceof mc.Player) ? targetEntity.hasTag('death') : false;

        const ranks = this.getRanksPlys(name, isOp, isSurvi, isDeath);
        const isLinked = targetEntity.hasTag('isLinked') ? '' : '';
        const iconDamage = isTakingDamage ? '' : '';
        const colorDamage = isTakingDamage ? '§4§l' : '§4';

        const finalRanks = `§7§l[§r${ranks}§r§7§l]§r${isLinked}\n${name} ${colorDamage}${actualCurrentH}/${actualMaxH}§r${iconDamage}`;

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

                    worldToolsSimplified.changeScoreInObj(entity, 'ha:debuffs_state', 'set', 1);
                }

                r(entity);
            });
        });
    }
}