import { FormatVersionListEntities, MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const WitherClientEntity = RPClientEntityTemplates.WitherEntity({
    setFormatVersion: FormatVersionListEntities.MostStable,
    add: {
        materials: {
            spirit_normal: "entity_alphatest",
            spirit_trans: "entity_alphablend"
        },
        textures: {
            king: "textures/entity/king_wither/king_wither_boss",

            spirit_orange: "textures/entity/king_wither/spirits/orange",
            spirit_orange_trans: "textures/entity/king_wither/spirits/orange_transparent",

            spirit_red: "textures/entity/king_wither/spirits/red",
            spirit_red_trans: "textures/entity/king_wither/spirits/red_transparent",

            spirit_blue: "textures/entity/king_wither/spirits/blue",
            spirit_blue_trans: "textures/entity/king_wither/spirits/blue_transparent",

            spirit_yellow: "textures/entity/king_wither/spirits/yellow",
            spirit_yellow_trans: "textures/entity/king_wither/spirits/yellow_transparent"
        },
        geometry: {
            king: "geometry.king_wither",

            spirit_orange: "geometry.orange_spirit",
            spirit_blue: "geometry.blue_spirit",
            spirit_yellow: "geometry.yellow_spirit",
            spirit_red: "geometry.red_spirit"
        },
        scripts: {
            animate: [
                {
                    root_spirits_controller: `${MoLang.skinId()} == 1`
                }
            ]
        },
        animations: {
            root_spirits_controller: "controller.animation.king_wither.spawned",

            hide_spirits: "animation.king_wither.hide_spirits",
            show_spirits: "animation.king_wither.scale_spirits_spawn",
            scale_spirits: "animation.king_wither.scale_spirits_loop",
            positions_spirits: "animation.king_wither.spirits.positions",
            look_target_spirits: "animation.spirit.look_at_target",
            despawn_spirits: "animation.king_wither.spirits_despawn",

            red_spirit_starts: "animation.spirit.start_summon.red",
            yellow_spirit_starts: "animation.spirit.start_summon.yellow",
            blue_spirit_starts: "animation.spirit.start_summon.blue",
            orange_spirit_starts: "animation.spirit.start_summon.orange",
        },
        renderControllers: [
            {
                "controller.render.king_wither.spirit_red": `${MoLang.skinId()} == 1`
            },
            {
                "controller.render.king_wither.spirit_blue": `${MoLang.skinId()} == 1`
            },
            {
                "controller.render.king_wither.spirit_yellow": `${MoLang.skinId()} == 1`
            },
            {
                "controller.render.king_wither.spirit_orange": `${MoLang.skinId()} == 1`
            }
        ]
    }
});