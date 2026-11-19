import { createRPRenderController, MoLang } from "simplified-mojang-jsons";

export const IllusionerRenderController = createRPRenderController({
    renderControllers: [
        {
            idRender: "illusioner",
            geometry: "Geometry.default",
            materials: [
                {
                    "*": "Material.default"
                }
            ],
            partVisibility: [
                {
                    "*": true
                },
                {
                    arms: `!(${MoLang.isCasting()} || ${MoLang.isCelebrating()} || ${MoLang.facingTargetToRangeAttack()})`
                },
                {
                    leftarm: `${MoLang.isCasting()} || ${MoLang.isCelebrating()} || ${MoLang.facingTargetToRangeAttack()}`
                },
                {
                    rightarm: `${MoLang.isCasting()} || ${MoLang.isCelebrating()} || ${MoLang.facingTargetToRangeAttack()}`
                }
            ],
            textures: [
                "Texture.default"
            ]
        }
    ]
});