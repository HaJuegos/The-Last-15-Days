import { MoLang, RPClientEntityTemplates } from "simplified-mojang-jsons";

export const SheepClientEntity = RPClientEntityTemplates.SheepEntity({
    changeEntity: {
        scripts: {
            animate: [
                "look_at_target",
                {
                    move: `${MoLang.skinId()} != 1`
                }
            ]
        }
    },
    add: {
        materials: {
            iron: "entity_alphatest"
        },
        textures: {
            iron: "textures/entity/iron_polly/iron_polly"
        },
        geometry: {
            iron: "geometry.iron_polly"
        },
        scripts: {
            preAnimation: [
                `${MoLang.variable('fly_blend')} = ${MoLang.variable('fly_blend')} ?? 0.0;`,
                `${MoLang.variable('fly_blend')} = math.lerp(${MoLang.variable('fly_blend')}, ${MoLang.isMoving()}, ${MoLang.deltaTime()} * 4.0);`
            ],
            animate: [
                {
                    "setup": `${MoLang.skinId()} != 1`
                },
                {
                    "root_controller_iron": `${MoLang.skinId()} == 1`
                }
            ]
        },
        animations: {
            root_controller_iron: "controller.animation.iron_polly.root",
            start_flying: "animation.iron_polly.start_flying",
            flying: "animation.iron_polly.flying"
        }
    }
});