import * as mc from '@minecraft/server';

/**
 * Enumeracion de todas las dimensiones custom creadas en el add-on. 
 * @enum {string}
 * @author HaJuegos - 15-07-2026
 */
enum CustomDimensionsTypes {
    BackRooms = "ha:backrooms"
}

/**
 * Todos los tipos de datos disponibles para la creacion de un nuevo debuff en concreto.
 * @interface DebuffData
 * @author HaJuegos - 20-05-2026
 */
interface DebuffData {
    /**
     * El ID del debuff en concreto.
     * @type {string}
     */
    id: string;

    /**
     * El ID de su respectivo icono en pantalla para hacerlo aparecer.
     * @type {string}
     */
    idTitleUI: string;

    /**
     * El maximo de combo respectivos en sus iconos.
     * @type {number}
     */
    maxComboUI: number;

    /**
     * El timer total en scoreboard de este debuff. 
     * @type {string}
     */
    timerScoreboard: string;

    /**
     * El combo total en scoreboard de este debuff.
     * @type {string}
     */
    comboScoreboard: string;

    /**
     * El nombre del debuff en el archivo .lang del add-on.
     * @type {string}
     */
    translationKey: string;

    /**
     * Ruta de la textura del icono del debuff en cuestion.
     * @type {string}
     */
    iconSamplePath: string;

    /**
     * Los eventos en concreto a ejecutar cuando el timer local del debuff llegue a 0.
     * @type {(ply: mc.Player) => void}
     */
    eventsEndTimer: (ply: mc.Player) => void;
}

export {
    DebuffData,
    CustomDimensionsTypes
};