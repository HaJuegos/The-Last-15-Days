import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const PiglinBruteClientEntity = RPClientEntityTemplates.PiglinBruteEntity({
    add: {
        textures: {
            baby: "textures/entity/piglin/piglin_brute_baby"
        },
        geometry: {
            baby: "geometry.piglin.baby"
        },
        scripts: {
            preAnimation: [
                `${MoLang.variable("use_dedicated_baby_armor")} = true;`,
                `${MoLang.variable("riding_y_offset_baby_scaling")} = ${MoLang.isBaby()} ? -0.5 : 0.0;`,
                `${MoLang.variable("riding_y_offset_with_respect_to_player")} = 1.0;`,
                `${MoLang.variable("riding_y_offset_on_vehicle_where_other_entites_can_stand")} = ${MoLang.isRidingAnyEntityOfType("minecraft:minecart", "minecraft:boat", "minecraft:chest_boat")} ? -3.0 : 0.0;`,
                `${MoLang.variable("unscaled_riding_y_offset")} = ${MoLang.variable("riding_y_offset_with_respect_to_player")} + ${MoLang.variable("riding_y_offset_on_vehicle_where_other_entites_can_stand")};`,
                `${MoLang.variable("riding_y_offset")} = ${MoLang.variable("riding_y_offset_baby_scaling")} * ${MoLang.abs(MoLang.variable("unscaled_riding_y_offset"))} + ${MoLang.variable("unscaled_riding_y_offset")} + ${MoLang.variable("riding_y_offset_baby_scaling")} * 0.2f;`,
                `${MoLang.variable("melee_spear_equipped")} = ${MoLang.equippedItemAnyTag("slot.weapon.mainhand", "minecraft:is_spear")};`,
                [
                    `(${MoLang.variable("melee_spear_equipped")}) ? {`,
                    `${MoLang.temp("melee_spear_use_finish_raise_tick")} = ${MoLang.kineticWeaponDelay()};`,
                    `${MoLang.temp("melee_spear_use_finish_sway_tick")} = ${MoLang.temp("melee_spear_use_finish_raise_tick")} + ${MoLang.kineticWeaponDismountDuration()};`,
                    `${MoLang.temp("melee_spear_use_start_sway_tick")} = ${MoLang.temp("melee_spear_use_finish_sway_tick")} - 20.0;`,
                    `${MoLang.temp("melee_spear_use_finish_lower_tick")} = ${MoLang.temp("melee_spear_use_finish_raise_tick")} + ${MoLang.kineticWeaponKnockbackDuration()};`,
                    `${MoLang.temp("melee_spear_use_start_lower_tick")} = ${MoLang.temp("melee_spear_use_finish_lower_tick")} - 40.0;`,
                    `${MoLang.temp("melee_spear_use_finish_raise_back_tick")} = ${MoLang.temp("melee_spear_use_finish_raise_tick")} + ${MoLang.kineticWeaponDamageDuration()};`,
                    `${MoLang.temp("melee_spear_use_start_raise_back_tick")} = ${MoLang.temp("melee_spear_use_finish_raise_back_tick")} - 5.0;`,
                    `t.melee_spear_use_raise_progress = math.clamp(math.inverse_lerp(0.0, t.melee_spear_use_finish_raise_tick, ${MoLang.variable("item_use_duration")}), 0.0, 1.0);`,
                    "t.melee_spear_use_raise_progress_start = math.clamp(math.inverse_lerp(0.0, 0.5, t.melee_spear_use_raise_progress), 0.0, 1.0);",
                    "t.melee_spear_use_raise_progress_middle = math.clamp(math.inverse_lerp(0.5, 0.8, t.melee_spear_use_raise_progress), 0.0, 1.0);",
                    "t.melee_spear_use_raise_progress_end = math.clamp(math.inverse_lerp(0.8, 1.0, t.melee_spear_use_raise_progress), 0.0, 1.0);",
                    `t.melee_spear_use_sway_progress = math.clamp(math.inverse_lerp(t.melee_spear_use_start_sway_tick, t.melee_spear_use_finish_sway_tick, ${MoLang.variable("item_use_duration")}), 0.0, 1.0);`,
                    `t.melee_spear_use_lower_progress = math.ease_in_out_elastic(0.0, 1.0, math.clamp(math.inverse_lerp(t.melee_spear_use_start_lower_tick, t.melee_spear_use_finish_lower_tick, ${MoLang.variable("item_use_duration")} - 20.0), 0.0, 1.0));`,
                    `t.melee_spear_use_raise_back_progress = math.clamp(math.inverse_lerp(t.melee_spear_use_start_raise_back_tick, t.melee_spear_use_finish_raise_back_tick, ${MoLang.variable("item_use_duration")}), 0.0, 1.0);`,
                    "t.melee_spear_use_sway_intensity = math.ease_out_circ(0.0, 2.0, t.melee_spear_use_sway_progress) + math.ease_in_circ(0.0, -2.0, t.melee_spear_use_raise_back_progress);",
                    `${MoLang.temp("melee_spear_use_sway_scale_slow")} = ${MoLang.sin(`${MoLang.variable("item_use_duration")} * 19.0`)} * ${MoLang.temp("melee_spear_use_sway_intensity")};`,
                    `${MoLang.temp("melee_spear_use_sway_scale_fast")} = ${MoLang.sin(`${MoLang.variable("item_use_duration")} * 30.0`)} * ${MoLang.temp("melee_spear_use_sway_intensity")};`,
                    `${MoLang.variable("tp_melee_spear_use_arm_rotation_x")} = ${MoLang.temp("melee_spear_use_raise_progress_start")} * -40.0 + ${MoLang.temp("melee_spear_use_raise_progress_middle")} * 30.0 + ${MoLang.temp("melee_spear_use_raise_progress_end")} * -20.0 + ${MoLang.temp("melee_spear_use_lower_progress")} * 20.0 + ${MoLang.temp("melee_spear_use_raise_back_progress")} * 10.0;`,
                    `${MoLang.variable("tp_melee_spear_use_arm_rotation_x")} = ${MoLang.variable("tp_melee_spear_use_arm_rotation_x")} + ${MoLang.temp("melee_spear_use_sway_scale_slow")} * 0.6;`,
                    `${MoLang.variable("tp_melee_spear_use_arm_rotation_y")} = ${MoLang.temp("melee_spear_use_sway_scale_fast")} * 1.0;`,
                    `${MoLang.variable("tp_melee_spear_use_arm_rotation_z")} = ${MoLang.temp("melee_spear_use_sway_scale_slow")} * 0.5;`,
                    `${MoLang.variable("tp_melee_spear_use_item_rotation_x")} = ${MoLang.temp("melee_spear_use_raise_progress")} * 60.0 + ${MoLang.temp("melee_spear_use_raise_back_progress")} * -60.0;`,
                    `${MoLang.variable("tp_melee_spear_use_attachable_rotation_z")} = ${MoLang.temp("melee_spear_use_raise_progress")} * 90.0 + ${MoLang.temp("melee_spear_use_sway_progress")} * -90.0;`,
                    "};"
                ].join(" ")
            ],
            animate: [
                {
                    melee_spear_controller: `${MoLang.variable("melee_spear_equipped")} && !${MoLang.isAdmiring()} && !${MoLang.isCelebrating()} && !${MoLang.isCelebratingSpecial()}`
                }
            ],
            variables: {
                "variable.tp_melee_spear_use_attachable_rotation_z": "public",
                "variable.use_dedicated_baby_armor": "public"
            },
            initialize: [
                `${MoLang.variable("tp_melee_spear_base_arm_rotation_x")} = -30.0;`
            ],
            scale: `${MoLang.isBaby()} ? 2.0 : 1.0`
        },
        animations: {
            melee_spear_use: "animation.humanoid.melee_spear_use",
            melee_spear_hold: "animation.humanoid.melee_spear_hold",
            melee_spear_controller: "controller.animation.humanoid.melee_spear"
        }
    }
});