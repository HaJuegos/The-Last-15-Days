import { createRPAnimation } from "simplified-mojang-jsons";

export const ArmorerPiglinAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "armorer_pigin.start_gem",
            loop: false,
            animationLength: 2.25,
            overridePreviousAnimation: true,
            bones: {
                head: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.25": {
                            post: [20, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [20, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                leftarm: {
                    rotation: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [-22.64395, 17.05316, 39.00354],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [-178.82197, 8.52658, 19.50177],
                            lerpMode: "catmullrom"
                        },
                        "1.75": {
                            post: [-178.82197, 8.52658, 19.50177],
                            lerpMode: "catmullrom"
                        },
                        "2.25": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "2.25": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                bone3: {
                    position: {
                        "0.0": {
                            post: [0, 6, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, 6, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "1.5": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                bone4: {
                    position: {
                        "0.0": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.4583": {
                            post: [0, 0, 0],
                            lerpMode: "catmullrom"
                        },
                        "0.5": {
                            post: [0, 0, 1],
                            lerpMode: "catmullrom"
                        }
                    }
                },
            }
        }
    ]
});