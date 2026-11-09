export {
    VariationsLanguagesList,
    createLanguageFile,
};

/**
 * Lista de idiomas permitidos y construidos para el manifest y un BP.
 * @enum {string}
 * @exports
 */
enum VariationsLanguagesList {
    Spanish = "es_MX",
    English = "en_US"
}

/**
 * Metodo principal auxiliar que construye y genera los texts de un RP.
 * @returns {Record<string, string>} Devuelve los archivos listos para su conversion final.
 * @author HaJuegos - 05-11-2026
 * @exports
 */
function createLanguageFile(): Record<string, string> {
    const languagesList: Record<VariationsLanguagesList, string[]> = {
        [VariationsLanguagesList.Spanish]: ['es_MX', "es_ES"],
        [VariationsLanguagesList.English]: ['en_US']
    };

    const result: Record<string, string> = {};

    for (const [langEnum, locales] of Object.entries(languagesList) as [VariationsLanguagesList, string[]][]) {
        for (const locale of locales) {
            const isSpanish = langEnum == VariationsLanguagesList.Spanish;

            const packName = isSpanish ? `§l§4The Last 15 Days§r | Creado por §gRosherRandom§r` : `§l§4The Last 15 Days§r | Created by §gRosherRandom§r`;
            const packDesc = isSpanish ? `Recursos necesarios para el add-on | Desarrollado por HaJuegos y Convex!` : `Resources needed for the add-on | Developed by HaJuegos and Convex!`;

            result[`${locale}.lang`] = [
                `pack.name=${packName}`,
                `pack.description=${packDesc}`
            ].join("\n");
        }
    }

    return result;
}