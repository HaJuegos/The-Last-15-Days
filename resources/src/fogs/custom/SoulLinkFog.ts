import { createRPFog } from "simplified-mojang-jsons";

export const SoulLinkFog = createRPFog({
    idFog: "ha:fog_soul_linked_start",
    distance: {
        air: {
            fogStart: 0.05,
            fogEnd: 0.25,
            fogColor: "#2B0202",
            renderDistanceType: "render"
        },
        water: {
            fogStart: 1.0,
            fogEnd: 15.0,
            fogColor: "#1A0101",
            renderDistanceType: "fixed"
        },
        weather: {
            fogStart: 0.02,
            fogEnd: 0.18,
            fogColor: "#1F0101",
            renderDistanceType: "render"
        }
    },
    volumetric: {
        density: {
            air: {
                maxDensity: 0.35,
                maxDensityHeight: 15,
                zeroDensityHeight: 64
            }
        },
        mediaCoefficients: {
            air: {
                scattering: "#2B0202",
                absorption: "#2B0202"
            }
        }
    }
});