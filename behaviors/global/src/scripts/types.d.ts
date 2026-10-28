import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { DaysOfAddonEnums } from "./customEnums";

export { };

declare global {
    /**
     * Plantilla principal para crear una nueva dimension custom con una estructura fija.
     * @interface DimensionCustomTemplate
     * @author HaJuegos - 15-07-2026
     */
    interface DimensionCustomTemplate {
        /**
         * ID del prefix de la dimension a crear.
         * @type {string}
         */
        idPrefix: string;

        /**
         * Coordenadas donde el jugador va a spawnear.
         * @type {mc.Vector3}
         */
        spawnLocation: mc.Vector3;

        /**
         * (Opcional) Eventos que se ejecutaran cuando la dimension sea creada. 
         * @type {(() => void)}
         */
        onCreateEvents?: ((customDime: string, spawnCoords: mc.Vector3) => void);
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

    /**
     * Plantilla principal para crear un comando personalizado con una estructura fija.
     * @interface CustomCmdTemplate
     * @author HaJuegos - 07-07-2026
     */
    interface CustomCmdTemplate {
        /**
         * El prefijo del comando en concreto a crear. Por ej: '/ha:ban'
         * @type {string}
         */
        prefixCmd: string;

        /**
         * Descripcion del comando en concreto a crear.
         * @type {string}
         */
        description: string;

        /**
         * Parametros obligatorios del comando a crear.
         * @type {mc.CustomCommandParameter[]}
         */
        paramsCmd: mc.CustomCommandParameter[];

        /**
         * (Opcional) Parametros opcionales del comando a crear.
         * @type {?mc.CustomCommandParameter[]}
         */
        optionalParamsCmd?: mc.CustomCommandParameter[];

        /**
         * Parametro que especifica si el comando a crear requiere cheats o no.
         * @type {boolean}
         */
        cheatsEnabled: boolean;

        /**
         * Parametro que especifica el nivel de permisos para poder usarse, para el comando a crear.
         * @type {mc.CommandPermissionLevel}
         */
        permsLevel: mc.CommandPermissionLevel;


        /**
         * (Opcional) Los parametros personalizados con datos personalizados para el comando a crear.
         * @type {?Record<string, string[]>}
         */
        customEnums?: Record<string, string[]>;

        /**
         * Eventos relacionados a ejecutar cuando el comando sea usado para el comando a crear.
         * @type {(source: mc.Player, ...paramsArgs: any[]) => mc.CustomCommandResult | undefined}
         */
        onRunCmd: (source: mc.Player, ...paramsArgs: any[]) => mc.CustomCommandResult | undefined;
    }

    /**
     * Plantilla general para crear rangos custom en el add-on con una estructura fija.
     * @interface CustomRankTemplate
     * @author HaJuegos - 09-07-2026
     */
    interface CustomRankTemplate {
        /**
         * Nombre o nombres de jugadores que tendran ese rol.
         * @type {(string | string[])}
         */
        plyName: string | string[];

        /**
         * Nombre o nomrbes de los rangos en cuestion
         * @type {(string | string[])}
         */
        nameRank: string | string[];

        /**
         * Codigo de color de o los rangos. El orden de los colores es para el orden de los rangos.
         * @type {string}
         */
        colorCode: string | string[];
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

        /**
         * (Opcional) Si se pone true, es porque es un logro custom.
         * @type {?boolean}
         */
        isCustom?: boolean;
    }
}