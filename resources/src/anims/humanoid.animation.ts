import { RPAnimationTemplates } from "simplified-mojang-jsons";

export const HumanoidAnimations = RPAnimationTemplates.HumanoidAnimation({
    add: {
        animations: [
            {
                idAnimation: "player.no_clip.tp",
                loop: false,
                animationLength: 2.6,
                overridePreviousAnimation: true,
                bones: {
                    root: {
                        position: {
                            "0.0": [0, 0, 0],
                            "0.2": [0, -5, 0],
                            "0.5": [0, -10, 0],
                            "0.8": [0, -15, 0],
                            "1.0": [0, -1000, 0]
                        }
                    },
                    head: {
                        rotation: {
                            "0.0": [0, 0, 0],
                            "0.3": [-20, 0, 0],
                            "0.6": [-20, 0, 0],
                            "0.8": [-72.5, 0, 0]
                        },
                        position: [0, 0, 0]
                    },
                    leftArm: {
                        rotation: {
                            "0.0": [0, 0, 0],
                            "0.3": [-107.5, 0, 0],
                            "0.6": [-107.5, 0, 0],
                            "0.8": [-190, 0, 0]
                        },
                        position: [0, 0, 0]
                    },
                    rightArm: {
                        rotation: {
                            "0.0": [0, 0, 0],
                            "0.3": [-110, 0, 0],
                            "0.6": [-110, 0, 0],
                            "0.8": [-190, 0, 0]
                        },
                        position: [0, 0, 0]
                    },
                }
            }
        ]
    }
});