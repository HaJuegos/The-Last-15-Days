import { createRPEntityClient } from "simplified-mojang-jsons";

export const PlayerGhostClientEntity = createRPEntityClient({
    idEntity: "ha:player_ghost",
    params: {
        materials: {
            default: "player_ghost"
        },
        geometry: {
            default: "geometry.player_ghost"
        },
        textures: {
            default: "textures/entity/player_ghost/player_ghost"
        },
        animations: {
            idle: "animation.player_ghost.idle"
        },
        scripts: {
            scale: "1.15",
            animate: [
                "idle"
            ]
        },
        renderControllers: [
            "controller.render.player_ghost"
        ],
        enableAttachables: false,
    }
});