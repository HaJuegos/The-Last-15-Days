export {
    VariationsAddonsList,
    VariationsLanguagesList,
    TextsGeneratorsManager,
};

/**
 * Lista de idiomas permitidos y construidos para el manifest y un BP.
 * @enum {string}
 */
enum VariationsLanguagesList {
    Spanish = "es_MX",
    English = "en_US"
}

/**
 * Lista de versiones del add-on disponibles.
 * @enum {number}
 */
enum VariationsAddonsList {
    Global = 13,
    Day0 = 0,
    Day1 = 1,
    Day2 = 2,
    Day3 = 3,
    Day4 = 4,
    Day5 = 5,
    Day6 = 6,
    Day7 = 7,
    Day8 = 8,
    Day9 = 9,
    Day10 = 10,
    Day11 = 11,
    Day12 = 12
}

/**
 * Clase principal auxiliar que construye y genera los texts de un BP.
 * @class TextsManagerBPManifest
 * @author HaJuegos - 25-10-2026
 */
class TextsGeneratorsManager {
    /**
     * Lista de idiomas permitidos en el BP.
     * @type {Record<VariationsLanguagesList, string[]>}
     * @readonly
     * @private
     */
    private readonly languagesList: Record<VariationsLanguagesList, string[]> = {
        [VariationsLanguagesList.Spanish]: ['es_MX', "es_ES"],
        [VariationsLanguagesList.English]: ['en_US']
    };

    /**
     * Lista de dias permitidos en el BP.
     * @type {Record<VariationsAddonsList, Record<string, string>>}
     * @readonly
     * @private
     */
    private readonly dayList: Record<VariationsAddonsList, Record<string, string>> =
        Object.values(VariationsAddonsList)
            .filter((val): val is number => typeof val == 'number')
            .reduce((acc, dayNum) => {
                const localMap: Record<string, string> = {};

                (Object.entries(this.languagesList) as [VariationsLanguagesList, string[]][]).forEach(([langEnum, locales]) => {
                    let finalTxt: string;

                    switch (dayNum) {
                        case 13: {
                            finalTxt = langEnum == VariationsLanguagesList.Spanish ? `Eventos Generales` : `Global Events`;
                        } break;
                        default: {
                            finalTxt = langEnum == VariationsLanguagesList.Spanish ? `Día ${dayNum}` : `Day ${dayNum}`;
                        } break;
                    }

                    locales.forEach(locale => {
                        localMap[locale] = finalTxt;
                    });
                });

                acc[dayNum as VariationsAddonsList] = localMap;

                return acc;
            }, {} as Record<VariationsAddonsList, Record<string, string>>);

    /**
     * Extension del archivo a construir.
     * @type {string}
     * @readonly
     * @private
     */
    private readonly extensionFile: string = ".lang";

    /**
     * Dia en concreto del addon a crear.
     * @type {VariationsAddonsList}
     * @private
     */
    private dayAddon: VariationsAddonsList;

    /**
     * Version permitida de mc del add-on a crear.
     * @type {string}
     * @private
     */
    private mcVersion: string;

    /**
     * Version del addon a crear.
     * @type {string}
     * @private
     */
    private addonVersion: string;

    /**
     * Parametros y eventos iniciales de la clase para construir los txts estaticos.
     * @param {VariationsAddonsList} dayAddon Dia del add-on a construir.
     * @param {string} mcVersion Version de mc a construir.
     * @param {string} addonVersion Version del add-on a construir.
     * @author HaJuegos - 25-10-2026 
     * @constructor
     * @public
     */
    public constructor (dayAddon: VariationsAddonsList, mcVersion: string, addonVersion: string) {
        this.dayAddon = dayAddon;
        this.mcVersion = mcVersion;
        this.addonVersion = addonVersion;
    }

    /**
     * Metodo principal que construye los archivos finales en el formato establecido.
     * @returns {Record<string, string>} Los archivos construidos finales.
     * @author HaJuegos - 25-10-2026
     * @public
     */
    public buildTxts(): Record<string, string> {
        const result: Record<string, string> = {};

        (Object.entries(this.languagesList) as [VariationsLanguagesList, string[]][]).forEach(([langEnum, locales]) => {
            locales.forEach(locale => {
                const dayTxt = this.dayList[this.dayAddon][locale] || "";

                let packName = "";
                let packDesc = "";

                if (langEnum == VariationsLanguagesList.Spanish) {
                    packName = `§l§4The Last 15 Days§r | ${dayTxt} | Creado por §gRosherRandom§r | §oVersión §7${this.addonVersion}§r`;
                    packDesc = `Versión de Minecraft: ${this.mcVersion} | Desarrollado por HaJuegos y Convex!`;
                } else {
                    packName = `§l§4The Last 15 Days§r | ${dayTxt} | Created by §gRosherRandom§r | §oVersion §7${this.addonVersion}§r`;
                    packDesc = `MC Version: ${this.mcVersion} | Developed by HaJuegos and Convex!`;
                }

                const fileContent = [
                    `pack.name=${packName}`,
                    `pack.description=${packDesc}`
                ].join("\n");

                const fileName = `${locale}${this.extensionFile}`;

                result[fileName] = fileContent;
            });
        });

        return result;
    }
}
