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