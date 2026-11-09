import { FormatVersionListEntities, MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const PlayerClientEntity = RPClientEntityTemplates.PlayerEntity({
    setFormatVersion: FormatVersionListEntities.MostRecent,
    add: {
        minEngineVersion: FormatVersionListEntities.V1_8_0,
        textures: {
            bear_trap_ply: "textures/entity/bear_trap"
        },
        geometry: {
            bear_trap_ply: "geometry.bear_trap",
        },
        scripts: {
            animate: [
                { trap_scale: `${MoLang.variant()} == 1` },
                { trap_spawned: `${MoLang.variant()} == 1` },
            ]
        },
        animations: {
            trap_scale: "animation.bear_trap.scale_loop",
            trap_spawned: "animation.bear_trap.init_trap",
        },
        renderControllers: [
            {
                "controller.render.player.bear_trap": `${MoLang.variant()} == 1`
            }
        ]
    }
});