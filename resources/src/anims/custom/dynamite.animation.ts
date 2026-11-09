import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

export const DynamiteAnimations = createRPAnimation({
    animations: [
        {
            idAnimation: "dynamite.fly",
            loop: true,
            bones: {
                bone: {
                    relativeTo: {
                        rotation: "entity"
                    },
                    rotation: {
                        "0.0": {
                            post: [0, `${MoLang.isOnGround()} ? (-${MoLang.targetYRotation()}) : 0`, 0],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [0, `${MoLang.isOnGround()} ? -3.7 : 0`, `${MoLang.isOnGround()} ? -4 : 0`],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                bone2: {
                    rotation: {
                        "0.0": {
                            post: [`${MoLang.isOnGround()} ? -180 : 0`, `${MoLang.isOnGround()} ? 0 : (-${MoLang.targetXRotation()})`, `${MoLang.isOnGround()} ? 90 : (${MoLang.lifeTime()} * 300)`],
                            lerpMode: "catmullrom"
                        }
                    },
                    position: {
                        "0.0": {
                            post: [`${MoLang.isOnGround()} ? -3 : 0`, 0, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                },
                bone3: {
                    position: {
                        "0.0": {
                            post: [`math.sin(${MoLang.lifeTime()} * 500) * -1`, `math.sin(${MoLang.lifeTime()} * 500) * -0.5`, 0],
                            lerpMode: "catmullrom"
                        }
                    }
                }
            }
        },
        {
            idAnimation: "dynamite.particle",
            loop: true,
            animationLength: 0.55,
            particleEffects: {
                "0.0": [
                    {
                        effect: "dust",
                        locator: "particle"
                    }
                ]
            }
        }
    ]
});