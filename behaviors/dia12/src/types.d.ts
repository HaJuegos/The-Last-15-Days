import * as mc from "@minecraft/server";

export { };

declare module "@minecraft/vanilla-data" {
    interface BlockStateSuperset {
        "ha:is_on": boolean;
        "ha:variant_spawn": 'null' | 'nurse' | 'stand';
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
     * Plantilla principal para crear un nuevo componente custom a un bloque en especifico con una estructura fija.
     * @interface BlockCustomCTemplate
     * @author HaJuegos - 08-07-2026
     */
    interface BlockCustomCTemplate {
        /**
         * ID del componente custom a registrar.
         * @type {string}
         */
        idComponent: string;

        /**
         * Los eventos relacionados con el componente custom a registrar.
         * @type {mc.BlockCustomComponent}
         */
        events: mc.BlockCustomComponent;
    }

    /**
     * Plantilla principal para crear un nuevo componente custom a un item en especifico con una estructura fija.
     * @interface ItemCustomCTemplate
     * @author HaJuegos - 08-07-2026
     */
    interface ItemCustomCTemplate {
        /**
         * ID del componente custom a registrar.
         * @type {string}
         */
        idComponent: string;

        /**
         * Los eventos relacionados con el componente custom a registrar.
         * @type {mc.ItemCustomComponent}
         */
        events: mc.ItemCustomComponent;
    }
}