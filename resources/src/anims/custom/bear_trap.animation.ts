import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const BearTrapAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "bear_trap.spawned",
            loop: true,
            bones: {
                bone: {
                    position: [
                        0,
                        `Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.875) < 0.5 ? Math.lerp(20, 0, Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.5) * 2) : Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.5, 0.875) < 0.625 ? Math.lerp(0, 2, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.5, 0.625) - 0.5) * 8) : Math.lerp(2, 0, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.625, 0.875) - 0.625) * 4)`,
                        0
                    ]
                },
                bone2: {
                    rotation: [
                        `Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.875) < 0.5 ? Math.lerp(60, 0, Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.5) * 2) : Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.5, 0.625) < 0.625 ? Math.lerp(0, -20, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.5, 0.625) - 0.5) * 8) : Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.625, 0.75) < 0.75 ? Math.lerp(-20, 15, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.625, 0.75) - 0.625) * 8) : Math.lerp(15, 0, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.75, 0.875) - 0.75) * 8)`,
                        0,
                        0
                    ]
                },
                bone3: {
                    rotation: [
                        `Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.875) < 0.5 ? Math.lerp(-60, 0, Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.5) * 2) : Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.5, 0.625) < 0.625 ? Math.lerp(0, 20, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.5, 0.625) - 0.5) * 8) : Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.625, 0.75) < 0.75? Math.lerp(20, -15, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.625, 0.75) - 0.625) * 8): Math.lerp(-15, 0, (Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0.75, 0.875) - 0.75) * 8)`,
                        0,
                        0
                    ]
                }
            }
        },
        {
            idAnimation: "bear_trap.scale_loop",
            loop: true,
            bones: {
                bone: {
                    scale: 3
                }
            }
        },
        {
            idAnimation: "bear_trap.init_trap",
            loop: true,
            overridePreviousAnimation: true,
            bones: {
                bone2: {
                    rotation: [
                        `Math.lerp(0, 90, Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.125) * 8)`, 0,
                        0
                    ]
                },
                bone3: {
                    rotation: [
                        `Math.lerp(0, -90, Math.clamp(${MoLang.lifeTime()} * ${MoLang.variable("anim_speed")}, 0, 0.125) * 8)`, 0,
                        0
                    ]
                }
            }
        }
    ]
});