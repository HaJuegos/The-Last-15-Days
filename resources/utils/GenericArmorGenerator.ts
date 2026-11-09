import { createRPAttachable, FormatVersionAttachList, MoLang } from "simplified-mojang-jsons";

/**
 * Lista de piezas en concreto a considerar.
 * @author HaJuegos - 05-11-2026
 */
type ArmorPiecesList = "helmet" | "chest" | "leg" | "boot";

/**
 * Metodo principal auxiliar que crea un attachable generico de una armadura custom, en un RP.
 * @param {string} idAttach ID del Attachable a crear en cuestion.
 * @param {ArmorPiecesList} piece Pieza en concreto a considerar.
 * @param {string} txtPatch Ruta completa de la textura a considerar.
 * @returns {{ baseArmor: any; plyArmor: any; }} Devuelve las funciones construidas y listas para su exportacion final en los archivos correspondientes en su variante base y player.
 * @author HaJuegos - 05-11-2026 
 * @export
 */
export function createGenericArmorAttach(idAttach: string, piece: ArmorPiecesList, txtPatch: string) {
    const scriptVar = `variable.${piece}_layer_visible = 0.0;`;
    const geometryName = piece == "chest" ? "chestplate" : piece == "leg" ? "leggings" : piece == "boot" ? "boots" : "helmet";

    const baseArmor = createRPAttachable({
        formatVersion: FormatVersionAttachList.V1_8_0,
        idAttach: idAttach,
        attachable: {
            materials: {
                default: "armor",
                enchanted: "armor_enchanted"
            },
            textures: {
                default: txtPatch,
                enchanted: "textures/misc/enchanted_actor_glint"
            },
            geometry: {
                default: `geometry.humanoid.armor.${geometryName}`
            },
            scripts: {
                parentSetup: scriptVar
            },
            renderControllers: [
                "controller.render.armor"
            ]
        }
    });

    const plyArmor = createRPAttachable({
        idAttach: `${idAttach}.player`,
        attachable: {
            item: {
                [idAttach]: `${MoLang.ownerIdentifier()} == 'minecraft:player'`
            },
            materials: {
                default: "armor",
                enchanted: "armor_enchanted"
            },
            textures: {
                default: txtPatch,
                enchanted: "textures/misc/enchanted_actor_glint"
            },
            geometry: {
                default: `geometry.player.armor.${geometryName}`
            },
            scripts: {
                parentSetup: scriptVar,
                animate: ["offset"]
            },
            animations: {
                offset: `animation.armor.${geometryName}.offset`
            },
            renderControllers: [
                "controller.render.armor"
            ]
        }
    });

    return { baseArmor, plyArmor };
}