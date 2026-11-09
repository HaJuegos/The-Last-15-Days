import * as mc from "@minecraft/server";

export {
    MetadataParams,

    LanguagesTextsParams,
};

/**
 * Tipado general dinamico para el registro de un nuevo metadato en un RP.
 * @author HaJuegos - 07-11-2026
 */
type MetadataParams = {
    /**
     * ID del metadato a considerar.
     * @type {string}
     */
    idData: string;
} & (
        {
            /**
             * Tipo de metadato a registrar en concreto. En este caso, se va a registrar unas texturas para items y sus texts.
             * @type {"item"}
             */
            typeData: "item";

            /**
             * Textos en lang con sus respectivos lenguajes traducidos del item en cuestion.
             * @type {LanguagesTextsParams}
             */
            texts: LanguagesTextsParams;
        } & ItemTexturePatchParams |
        {
            /**
             * Tipo de metadato a registrar en concreto. En este caso, se va a registrar unas texturas para bloques y sus texts.
             * @type {"block"}
             */
            typeData: "block";

            /**
             * Textos en lang con sus respectivos lenguajes traducidos del item en cuestion.
             * @type {LanguagesTextsParams}
             */
            texts: LanguagesTextsParams;
        } & BlocksListParams |
        {
            /**
             * Tipo de metadato a registrar en concreto. En este caso, se va a registrar sonidos y sus texts de subtitulos.
             * @type {"sound"}
             */
            typeData: "sound";
        } & SoundDefinitionsParams |
        {
            /**
             * Tipo de metadato a registrar en concreto. En este caso, se va a registrar musica ambiental.
             * @type {"music"}
             */
            typeData: "music";
        } & MusicDefinitionsParams |
        {
            /**
             * Tipo de metadato a registrar en concreto. En este caso, se va a registrar textos langs individuales.
             * @type {"text"}
             */
            typeData: "text";

            /**
             * Los textos en cuestion a registrar separados por lenguaje.
             * @type {LanguagesTextsParams}
             */
            texts: LanguagesTextsParams;
        } |
        {
            /**
             * Tipo de metadato a registrar en concreto. En este caso, se va a sonidos individuales del juego a modificar o custom, o sino tambien, a asignar sonidos a entidades.
             * @type {"entity"}
             */
            typeData: "entity";

            /**
             * Textos en lang con sus respectivos lenguajes traducidos del item en cuestion.
             * @type {LanguagesTextsParams}
             */
            texts: LanguagesTextsParams;
        } & SoundsListParams
    );

/**
 * Lista de categorias de sonidos permitidos del juego.
 * @author HaJuegos - 07-11-2026
 */
type CategorySoundsTypes = "block" | "bottle" | "bucket" | "hostile" | "music" | "neutral" | "player" | "record" | "ui" | "weather";

/**
 * Parametros principales para la creacion de metadatos de sonidos.
 * @interface SoundDefinitionsParams
 * @author HaJuegos - 07-11-2026
 */
interface SoundDefinitionsParams {
    /**
     * (Opcional) Si se define, se usa el motor de distancias clasico para este sonido. Pero, si es solo 3D.
     * @type {?("true" | "false")}
     */
    "__use_legacy_max_distance"?: "true" | "false";

    /**
     * Distancia minima para escuchar este sonido. null es igual a que no importa la distancia.
     * @type {(null | number)}
     */
    minDistance: null | number;

    /**
     * Distancia maxima para escuchar este sonido. null es igual a que no importa la distancia.
     * @type {(null | number)}
     */
    maxDistance: null | number;

    /**
     * Categoria de sonidos del juego donde este mismo se puede escuchar.
     * @type {CategorySoundsTypes}
     */
    category: CategorySoundsTypes;

    /**
     * Subtitulos asignados a este sonido.
     * @type {LanguagesTextsParams}
     */
    subtitle: LanguagesTextsParams;

    /**
     * Lista de sonidos asignados a este mismo y sus respectivos parametros.
     * @type {SoundArrayTypes[]}
     */
    sounds: SoundArrayTypes[];
}

/**
 * Parametros principales para la definicion de un sonido, como su ruta, pitch y demas.
 * @interface SoundArrayTypes
 * @author HaJuegos - 07-11-2026
 */
interface SoundArrayTypes {
    /**
     * (Opcional) Probabilidad en peso de que esta variante de sonido, suceda.
     * @type {?number}
     */
    weight?: number;

    /**
     * (Opcional) Si se define, este sonido se reproducira no importa si el dispositivo no puede reproducirlo en este momento, ya sea por recursos o por sonidos masivos.
     * @type {?boolean}
     */
    loadOnLowMemory?: boolean;

    /**
     * (Opcional) Si se define, permite a este sonido, ejecutarse en varias llamadas a la vez.
     * @example
     * ```txt
     * Por ejemplo:
     * - En false: Si dos entidades o bloques ejecutan este sonido al mismo tiempo, este sonido se cancela una vez, dejando solo escuchar la primera llamada.
     * - En true: Mismo caso, pero ahora se permite que se llame las veces que se quiera sin interrumpirse entre ellas.
     * ```
     * @type {boolean}
     */
    allowConcurrentStreaming?: boolean;

    /**
     * Se define si el sonido es 3D o no. Es decir, si debe escucharse con diferencias de distancia y movimiento. En caso contrario, esto no afectara al sonido y se escuchara normal.
     * @type {boolean}
     */
    is3D: boolean;

    /**
     * Ruta donde esta ubicado el sonido.
     * @type {string}
     */
    name: string;

    /**
     * Volumen del sonido de tipo float.
     * @type {number}
     */
    volume: number;

    /**
     * Tono o multiplicado de frecuencia del sonido de tipo float.
     * @type {number}
     */
    pitch: number;

    /**
     * Se define si el archivo se trasmite directamente desde el disco en lugar de precargarse por completo en la memoria RAM.
     * @example
     * ```txt
     * - Si es false: entonces el sonido se cargar completo en la RAM. Es ideal para efectos cortos que requieren respuesta inmediata.
     * - Si es true: entonces el sonido se lee desde el disco. Especialmente para sonidos largos, diseñado para musicas.
     * ```
     * @type {boolean}
     */
    stream: boolean;
}


/**
 * Parametros principales para la creacion de una nueva musica ambiental.
 * @interface MusicDefinitionsParams
 * @author HaJuegos - 07-11-2026
 */
interface MusicDefinitionsParams {
    /**
     * ID del sonido como musica ambiental a asignar en cuestion.
     * @type {string}
     */
    eventName: string;

    /**
     * Tiempo minimo en segundos de retraso para ejecutarse la musica.
     * @type {number}
     */
    minDelay: number;

    /**
     * Tiempo maximo en segundos de retraso para ejecutarse la musica.
     * @type {number}
     */
    maxDelay: number;
}


/**
 * Parametros principales para la definicion de nuevos textos en los langs disponibles con su correcta asignacion directa.
 * @interface LanguagesTextsParams
 * @author HaJuegos - 07-11-2026
 */
interface LanguagesTextsParams {
    /**
     * Textos langs en español a crear.
     * @type {Record<string, string | mc.RawText>}
     */
    spanish: Record<string, string | mc.RawText>;

    /**
     * Textos lagns en ingles a crear.
     * @type {Record<string, string | mc.RawText>}
     */
    english: Record<string, string | mc.RawText>;
}


/**
 * Parametros principales para la asignacion de texturas respectivas a un item o bloque.
 * @interface ItemTexturePatchParams
 * @author HaJuegos - 07-11-2026
 */
interface ItemTexturePatchParams {
    /**
     * Lista de texturas en concreto a asignar.
     * @type {(string | string[])}
     */
    textures: string | string[];
}


/**
 * Parametros principales para asignar los metadatos respectivos de un bloque.
 * @author HaJuegos - 07-11-2026
 */
interface BlocksListParams {
    /**
     * (Opcional) Nivel de brillo gamma que se aplicara a la textura del bloque.
     * @type {?number}
     */
    brightnessGamma?: number;

    /**
     * (Opcional) Lista de texturas alternatvias que se mostraran cuando el bloque este siendo sostenido en la mano o en el inventario.
     * @type {?SidesBlockLists}
     */
    carriedTextures?: SidesBlockLists;

    /**
     * (Opcional) Si se define, la textura del bloque puede rotarse de forma aleatoria y simetrica.
     * @type {?boolean}
     */
    isotropic?: boolean;

    /**
     * Sonido del bloque en concreto cuando se interactua con este. Como caminar encima, romperlo y demas.
     * @type {string}
     */
    sound: string;

    /**
     * Mapeo de texturas principales del bloque en el terrain textures.
     * @type {Record<string, ItemTexturePatchParams>}
     */
    terrainTextures: Record<string, ItemTexturePatchParams>;

    /**
     * Lista de texturas principales para cada cara del bloque. Ya sea todas las caras en general o una por cada lado.
     * @type {SidesBlockLists}
     */
    textures: SidesBlockLists;
};

/**
 * Tipado general para la asignacion de textura en una cara o todas. 
 * @author HaJuegos - 07-11-2026
 */
type SidesBlockLists = string | {
    down?: string;
    east?: string;
    north?: string;
    up?: string;
    side?: string;
    south?: string;
    west?: string;
};


/**
 * Parametros principales para la asignacion de nuevos sonidos para entidades o eventos individuales.
 * @interface SoundsListParams
 * @author HaJuegos - 07-11-2026
 */
interface SoundsListParams {
    /**
     * (Opcional) Lista de sonidos asignados a las entidades.
     * @type {?EntitySoundsParams}
     */
    entitySounds?: EntitySoundsParams;

    /**
     * (Opcional) Lista de sonidos individuales asignados al juego.
     * @type {?IndividualSoundsParams}
     */
    individualEventSounds?: IndividualSoundsParams;
};


/**
 * Tipado general para la asignacion de un nuevo sonido a un evento de sonidos.
 * @author HaJuegos - 07-11-2026
 */
type SoundParamsTypes = string | {
    /**
     * ID del sonido a asignar en concreto a este evento.
     * @type {string}
     */
    sound: string;

    /**
     * Volumen de tipo float a asignar a este evento.
     * @type {number}
     */
    volume?: number;

    /**
     * Tono o multiplicado de frecuencia del sonido de tipo float a este evento.
     * @type {number}
     */
    pitch?: number | [number, number];
};

/**
 * Parametros principales para la asignacion de un nuevo evento de una entidad.
 * @interface BaseEntitySoundsParams
 * @author HaJuegos - 07-11-2026
 */
interface BaseEntitySoundsParams {
    /**
     * Lista de eventos asociados a esta entidad en concreto.
     * @type {Record<string, SoundParamsTypes>}
     */
    events?: Record<string, SoundParamsTypes>;

    /**
     * Tono o multiplicado de frecuencia del sonido de tipo float a este evento.
     * @type {number}
     */
    pitch?: number | [number, number];

    /**
     * Volumen de tipo float a asignar a este evento.
     * @type {number}
     */
    volume?: number;
}

/**
 * Parametros principales para la asignacion de un nuevo evento de una entidad.
 * @author HaJuegos - 07-11-2026
 */
type EntitySoundsParams = {
    entities: BaseEntitySoundsParams & {
        /**
         * Desconozco para que se define una version de MoLang en esta parte, pero para compatibilidad, es mejor dejarlo.
         * @type {13}
         */
        "__molang_version"?: 13;

        /**
         * Variaciones de sonidos a base de keys y MoLang de esta entidad en concreto.
         * @type {?{ key: string; map: Record<string, BaseEntitySoundsParams>;}}
         */
        variants?: {
            /**
             * Condicion MoLang a cumplir para ejecutar la variante de tipo map.
             * @type {string}
             */
            key: string;

            /**
             * 
             * @type {Record<string, BaseEntitySoundsParams>}
             */
            map: Record<string, BaseEntitySoundsParams>;
        };
    };
};


/**
 * Parametros principales para la asignacion de varios sonidos individuales dentro del juego.
 * @interface IndividualSoundsParams
 * @author HaJuegos - 07-11-2026
 */
interface IndividualSoundsParams {
    /**
     * Eventos de sonidos individuales del juego.
     * @type {Record<string, SoundParamsTypes>}
     */
    events: Record<string, SoundParamsTypes>;
}