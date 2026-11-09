import { SnakeCase } from "simplified-mojang-jsons";
import { LanguagesTextsParams, MetadataParams } from "./types/MetadataTypes";

/**
 * Clase principal que construye los meta datos de tipados necesarios para la creacion de un nuevo sonido, textura, item de textura, bloque de textura o entidades. Hasta la musica.
 * @class MetadataGeneratorManager
 * @author HaJuegos - 07-11-2026
 * @export
 */
export class MetadataGeneratorManager {
    /**
     * Version del format version que tomara la lista de sounds.json
     * @type {string}
     * @readonly
     * @private
     */
    private readonly soundsDefVersion: string = "1.26.60";

    /**
     * Version del format version que tomara la lista de blocks.json
     * @type {string}
     * @readonly
     * @private
     */
    private readonly blocksVersion: string = "1.21.40";

    /**
     * Mapeo general final de los metadatos registrados en la clase.
     * @type {Map<string, Record<string, any>>}
     * @private
     */
    private finalMetaData: Map<string, Record<string, any>> = new Map();

    /**
     * Mapeo general final para la lista de textos traducos registrados en la clase.
     * @type {Record<string, string | string[]>}
     * @private
     */
    private finalTxtsData: Record<string, string | string[]> = {};

    /**
     * Parametros principales para la creacion de nuevos metadatos en un RP.
     * @param {MetadataParams[]} params Metadatos a registrar en concreto.
     * @author HaJuegos - 07-11-2026
     * @constructor
     * @public
     */
    public constructor (
        private readonly params: MetadataParams[]
    ) { }

    /**
     * Metodo auxiliar que construye los metadatos de la categoria de texturas de items en un RP. 
     * @param {(MetadataParams & { typeData: "item"; })} data Datos a considerar registrados en los metadatos.
     * @returns {void}
     * @author HaJuegos - 07-11-2026
     * @private
     */
    private buildItemMetadata(data: MetadataParams & { typeData: "item"; }): void {
        if (!this.finalMetaData.has('items')) {
            this.finalMetaData.set("items", {
                resource_pack_name: "vanilla",
                texture_name: "atlas.items",
                texture_data: {}
            });
        }

        const { idData, texts, textures } = data;
        const itemTextureBase = this.finalMetaData.get('items')!;

        itemTextureBase.texture_data[idData] = { textures };
        this.buildTxtsData(texts);
    }

    /**
     * Metodo auxiliar que construye los metadatos de la categoria de bloques de texturas en un RP.
     * @param {(MetadataParams & { typeData: "block"; })} data Datos a considerar registrados en los metadatos.
     * @returns {void}
     * @author HaJuegos - 07-11-2026
     * @private
     */
    private buildBlockMetadata(data: MetadataParams & { typeData: "block"; }): void {
        if (!this.finalMetaData.has('block')) {
            this.finalMetaData.set("block", {
                format_version: this.blocksVersion
            });
        }

        if (!this.finalMetaData.has('block_terrain')) {
            this.finalMetaData.set("block_terrain", {
                resource_pack_name: "vanilla",
                texture_name: "atlas.terrain",
                padding: 8,
                num_mip_levels: 4,
                texture_data: {}
            });
        }

        const { idData, typeData, texts, terrainTextures, ...rest } = data;

        const blockListBase = this.finalMetaData.get('block')!;
        const terrainTextureBase = this.finalMetaData.get('block_terrain')!;

        blockListBase[idData] = { ...rest };

        for (const [key, val] of Object.entries(terrainTextures)) {
            terrainTextureBase.texture_data[key] = {
                textures: val.textures
            };
        }

        this.buildTxtsData(texts);
    }

    /**
     * Metodo auxiliar que construye los metadatos de la categoria de sonidos en un RP.
     * @param {(MetadataParams & { typeData: "sound"; })} data Datos a considerar registrados en los metadatos.
     * @returns {void}
     * @author HaJuegos - 07-11-2026
     * @private
     */
    private buildSoundMetadata(data: MetadataParams & { typeData: "sound"; }): void {
        if (!this.finalMetaData.has('sounds')) {
            this.finalMetaData.set("sounds", {
                format_version: this.soundsDefVersion,
                sound_definitions: {}
            });
        }

        const { idData, typeData, subtitle, ...rest } = data;

        const soundListBase = this.finalMetaData.get('sounds')!;
        const mainIDTxts = Object.keys(subtitle.english)[0];

        soundListBase.sound_definitions[idData] = {
            subtitle: mainIDTxts,
            ...rest
        };

        this.buildTxtsData(subtitle);
    }

    /**
     * Metodo auxiliar que construye los metadatos de la categoria de musicas ambientales en un RP.
     * @param {(MetadataParams & { typeData: "music"; })} data Datos a considerar registrados en los metadatos.
     * @returns {void}
     * @author HaJuegos - 07-11-2026
     * @private
     */
    private buildMusicMetadata(data: MetadataParams & { typeData: "music"; }): void {
        if (!this.finalMetaData.has('music')) {
            this.finalMetaData.set("music", {});
        }

        const { idData, typeData, ...rest } = data;

        const musicListBase = this.finalMetaData.get('music')!;

        musicListBase[idData] = { ...rest };
    }

    /**
     * Metodo auxiliar que construye los metadatos de la categoria de sonidos de entidades o sonidos individuales en un RP.
     * @param {(MetadataParams & { typeData: "entity"; })} data Datos a considerar registrados en los metadatos.
     * @returns {void}
     * @author HaJuegos - 07-11-2026
     * @private
     */
    private buildEntityMetada(data: MetadataParams & { typeData: "entity"; }): void {
        if (!this.finalMetaData.has('entity')) {
            this.finalMetaData.set("entity", {
                entity_sounds: {
                    entities: {}
                },
                individual_event_sounds: {
                    events: {}
                }
            });
        }

        const { idData, typeData, texts, entitySounds, individualEventSounds } = data;

        const entityListBase = this.finalMetaData.get('entity')!;

        this.buildTxtsData(texts);

        if (individualEventSounds?.events) {
            Object.assign(entityListBase.individual_event_sounds.events, individualEventSounds.events);
        }

        if (entitySounds?.entities) {
            entityListBase.entity_sounds.entities[idData] = entitySounds.entities;
        }
    }

    /**
     * Metodo auxiliar que construye los textos en sus respectivos idiomas, registrados individualmente o en metadatos previos en un RP.
     * @param {LanguagesTextsParams} textsData Textos a considerar en concreto.
     * @returns {void}
     * @author HaJuegos - 07-11-2026
     * @private
     */
    private buildTxtsData(textsData: LanguagesTextsParams): void {
        if (!this.finalTxtsData) {
            this.finalTxtsData = {
                en_US: [],
                es_ES: [],
                es_MX: []
            };
        }

        const getLangs = (key: string, obj: Record<string, any>) => {
            const lines = Object.entries(obj).map(([key, val]) => `${key}=${val}`);
            const current = this.finalTxtsData[key];
            const existing = Array.isArray(current) ? current : (current ? [current] : []);
            const updated = [...existing, ...lines];

            this.finalTxtsData[key] = updated.length == 1 ? updated[0] : updated;
        };

        getLangs("en_US", textsData.english);
        getLangs("es_ES", textsData.spanish);
        getLangs("es_MX", textsData.spanish);
    }

    /**
     * Metodo principal que ejecuta la construccion final de los metadatos a transformar en sus respectivos archivos JSON admitidos en un add-on RP.
     * @returns {{ metadata: Map<string, Record<string, any>>; txts: Record<string, string | {}>; }} Devuelve los datos registrados formados y listos para ser exportados en sus respectivos archivos JSONs.
     * @author HaJuegos - 07-11-2026
     * @public
     */
    public finalBuild(): { metadata: Map<string, Record<string, any>>; txts: Record<string, string | {}>; } {
        for (const param of this.params) {
            switch (param.typeData) {
                case "item": {
                    this.buildItemMetadata(param);
                } break;
                case "block": {
                    this.buildBlockMetadata(param);
                } break;
                case "sound": {
                    this.buildSoundMetadata(param);
                } break;
                case "music": {
                    this.buildMusicMetadata(param);
                } break;
                case "text": {
                    this.buildTxtsData(param.texts);
                } break;
                case "entity": {
                    this.buildEntityMetada(param);
                } break;
            }
        }

        const convertedMetadata = new Map<string, Record<string, any>>();

        for (const [key, value] of this.finalMetaData.entries()) {
            convertedMetadata.set(key, SnakeCase.deepSnakeCase(value) as Record<string, any>);
        }

        return { metadata: convertedMetadata, txts: this.finalTxtsData };
    }
}