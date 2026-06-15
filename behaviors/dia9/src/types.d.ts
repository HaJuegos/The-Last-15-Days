import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

export { };

declare module "@minecraft/vanilla-data" {
    interface BlockStateSuperset {
        "ha:is_on": boolean;
        "ominous": boolean;
    }
}

declare global {
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
         * Los textos indicativos de este debuff ordenados por su index de combo.
         * @type {{ idCombo: number; msg: mc.RawMessage | string; }[]}
         */
        rawMsgCombos: {
            idCombo: number;
            msg: mc.RawMessage | string;
        }[];

        /**
         * Los eventos en concreto de este debuff ordenados por el index del combo.
         * @type {{ specificCombo?: number; minRangeCombo?: number; events: (ply: mc.Player) => void; }[]}
         */
        eventsCombo: {
            /**
             * (Opcional) Si se argumenta, sera el combo especifico para activar este evento.
             * @type {?number}
             */
            specificCombo?: number;

            /**
             * (Opcional) Si se argumenta, sera el combo minimo en rango para activar este evento.
             * @type {?number}
             */
            minRangeCombo?: number;

            /**
             * Los eventos en concreto que se ejecutaran al jugador cuando se active por su respectivo combo.
             * @type {(ply: mc.Player) => void}
             */
            events: (ply: mc.Player) => void;
        }[];

        /**
         * Los eventos en concreto a ejecutar cuando el timer local del debuff llegue a 0.
         * @type {(ply: mc.Player) => void}
         */
        eventsEndTimer: (ply: mc.Player) => void;
    }

    /**
     * Los datos base para crear un logro con una estructra fija.
     * @interface ListOfAdvs
     * @author HaJuegos - 20-03-2026
     */
    interface ListOfAdvs {
        /**
         * El texto del logro en concreto
         * @type {string}
         */
        textAdv: string;

        /**
         * El tag del logro para que no se repita.
         * @type {string}
         */
        tagAdv: string;

        /**
         * El item(s) para obtener un logro
         * @type {(vanilla.MinecraftItemTypes[] | vanilla.MinecraftItemTypes | string | string[])}
         */
        items: vanilla.MinecraftItemTypes[] | vanilla.MinecraftItemTypes | string | string[];

        /**
         * Es un progreso o un logro? para cambiar de sonido y color.
         * @type {boolean}
         */
        isRare: boolean;

        /**
         * (Opcional) Necesita todos los logros para conseguirlo?
         * @type {?boolean}
         */
        allItemsRequired?: boolean;

        /**
         * (Opcional) Es un logro que se consigue haciendo algo y no por items?
         * @type {?boolean}
         */
        isAction?: boolean;
    }
}