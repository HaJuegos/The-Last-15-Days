import * as mc from "@minecraft/server";

export { };

declare global {
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