import { createRPFog } from "simplified-mojang-jsons";

/**
 * Variantes de la fog en cuestion a crear.
 * @type {{id: string, fogEnd: number, maxDensity: number}[]}
 */
const fogLevels: { id: string, fogEnd: number, maxDensity: number; }[] = [
    { id: "ha:fury_fog_lvl_one", fogEnd: 0.80, maxDensity: 0.05 },
    { id: "ha:fury_fog_lvl_two", fogEnd: 0.65, maxDensity: 0.10 },
    { id: "ha:fury_fog_lvl_three", fogEnd: 0.50, maxDensity: 0.18 },
    { id: "ha:fury_fog_lvl_four", fogEnd: 0.35, maxDensity: 0.28 },
    { id: "ha:fury_fog_lvl_five", fogEnd: 0.20, maxDensity: 0.40 },
    { id: "ha:fury_fog_lvl_six", fogEnd: 0.10, maxDensity: 0.60 },
];

export const [
    FuryFogLvLOne,
    FuryFogLvLTwo,
    FuryFogLvLThree,
    FuryFogLvLFour,
    FuryFogLvLFive,
    FuryFogLvLSix
] = fogLevels.map(lvl => createRPFog({
    idFog: lvl.id,
    distance: {
        air: {
            fogStart: 0.05,
            fogEnd: lvl.fogEnd,
            fogColor: "#2B0202",
            renderDistanceType: "render"
        },
        water: {
            fogStart: 2.0,
            fogEnd: 25.0,
            fogColor: "#1A0101",
            renderDistanceType: "fixed"
        },
        weather: {
            fogStart: 0.02,
            fogEnd: Math.max(lvl.fogEnd - 0.15, 0.05),
            fogColor: "#1F0101",
            renderDistanceType: "render"
        }
    },
    volumetric: {
        density: {
            air: {
                maxDensity: lvl.maxDensity,
                maxDensityHeight: 15,
                zeroDensityHeight: 70
            }
        },
        mediaCoefficients: {
            air: {
                scattering: "#2B0202",
                absorption: "#2B0202"
            }
        }
    }
}));