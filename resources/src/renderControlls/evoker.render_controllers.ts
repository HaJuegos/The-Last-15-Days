import {RPRenderControllerTemplates, MoLang} from "simplified-mojang-jsons";

export const EvokerRenderController = RPRenderControllerTemplates.Evoker({
    changeRender: {
        evoker: {
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
            ]
        }
    }
});