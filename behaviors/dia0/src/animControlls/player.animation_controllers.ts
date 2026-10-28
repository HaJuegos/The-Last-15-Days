import { MoLang } from "simplified-mojang-jsons";
import { createBPAnimController } from "simplified-mojang-jsons";

export const PlyAnimControll = createBPAnimController({
    idController: "player.spawned_day",
    initialState: "default",
    states: {
        default: {
            transitions: [
                {
                    onMove: `${MoLang.stateTime()} >= 2.0 && ${MoLang.isMoving()}`
                }
            ]
        },
        onMove: {
            onEntry: [
                "/function dayAddon"
            ]
        }
    }
});