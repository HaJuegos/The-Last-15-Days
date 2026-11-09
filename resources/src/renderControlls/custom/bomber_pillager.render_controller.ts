import {createRPRenderController, MoLang} from "simplified-mojang-jsons";

export const BomberPillagerRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "bomber_pillager",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            textures: [
                "Texture.default"
            ],
            overlay_color: {
                a: `${MoLang.isPregnant()} * (Math.sin(${MoLang.lifeTime()} * (400 + (${MoLang.lifeTime()} * 150))) > 0 ? 0.8 : 0.0)`,
                r: `${MoLang.isPregnant()} * Math.lerp(1.0, 1.0, ${MoLang.lifeTime()})`,
                g: `${MoLang.isPregnant()} * Math.clamp(1.0 - (${MoLang.lifeTime()} * 2.0), 0.0, 1.0)`,
                b: `${MoLang.isPregnant()} * Math.clamp(1.0 - (${MoLang.lifeTime()} * 2.0), 0.0, 1.0)`
            }
        }
    ]
});