import * as mc from '@minecraft/server';
import * as vanilla from '@minecraft/vanilla-data';

import { afterEventsSimplified, beforeEventsSimplified, worldToolsSimplified } from "simplified-mojang-api";

import { TL15DBaseManager } from "../base";
import { CustomDimensionsTypes } from '../customTypes';

/**
 * Clase hijo que controla los eventos principales que estan relacionados con las dimensiones custom del add-on
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 15-07-2026
 */
class CustomDimensionsManager extends TL15DBaseManager {
    /**
     * Metodo global que contiene todas las dimensiones generadas proceduralmente para no volverlas a generar nuevamente.
     * @type {Set<string>}
     * @author HaJuegos - 15-07-2026
     * @private
     * @readonly
     */
    private readonly builtedDime: Set<string> = new Set();

    /**
     * Lista de todas las dimensiones a registrar.
     * @type {DimensionCustomTemplate[]}
     * @author HaJuegos - 15-07-2026
     * @private
     * @readonly
     */
    private readonly listOfDimes: DimensionCustomTemplate[] = [
        {
            idPrefix: CustomDimensionsTypes.BackRooms,
            spawnLocation: { x: 0, y: 0, z: 0 },
            onCreateEvents: (dime, spawnCoords) => {
                this.createBackRoomsTerrain(dime, spawnCoords);
                this.generateMobsBackRooms();
            }
        }
    ];

    /**
     * Eventos principales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

        this.loadBuiltedDimes();
        this.registerDimensions();
    }

    /**
     * Metodo auxiliar que regenera los datos previamente guardados en el mundo de dimensiones previamente creadas.
     * @returns {void}
     * @author HaJuegos - 15-07-2026
     * @private
     */
    private loadBuiltedDimes(): void {
        beforeEventsSimplified.onAddonStarts(async () => {
            await null;

            const data = mc.world.getDynamicProperty('ha:builted_dimes') as string | undefined;

            if (!data) return;

            try {
                const normalData: string[] = JSON.parse(data);

                normalData.forEach((id) => this.builtedDime.add(id));
            } catch { }
        });
    }

    /**
     * Metodo auxiliar que guarda las dimensiones creadas en el mundo por el add-on.
     * @returns {void}
     * @author HaJuegos - 15-07-2026
     * @private
     */
    private saveDime(): void {
        mc.world.setDynamicProperty('ha:builted_dimes', JSON.stringify([...this.builtedDime]));
    }

    /**
     * Metodo auxiliar que genera el terreno de los backrooms proceduralmente.
     * @param {string} customDime Dimension en concreto a conciderar. 
     * @param {mc.Vector3} spawnCoords El punto inicial del spawn de la dimension.
     * @returns {Promise<void>}
     * @author HaJuegos - 15-07-2026 
     * @private
     * @async
     */
    private async createBackRoomsTerrain(customDime: string, spawnCoords: mc.Vector3): Promise<void> {
        if (this.builtedDime.has(customDime)) return;

        this.builtedDime.add(customDime);
        this.saveDime();

        const rad = 200;
        const height = 5;
        const regSize = 16;
        const delayReg = 1;
        const cellSize = 4;
        const wallChance = 0.2;
        const spawnRadiusClear = 5;
        const lighSpace = 6;
        const lighChance = 0.7;
        const chestChance = 0.001;

        const dime = mc.world.getDimension(customDime);

        /**
         * Funcion auxiliar que crea una seed random para la generacion procedural de los backrooms.
         * @type {(...seeds: {}) => number}
         * @author HaJuegos - 15-07-2026
         */
        const seedRandom = ((...seeds: number[]): number => {
            const raw = Math.sin(seeds.reduce((acc, n, i) => acc + n * (12.9898 + i * 37.719), 0)) * 43758.5453;

            return raw - Math.floor(raw);
        });

        /**
         * Funcion auxiliar que calcula y pone bloques de la generacion del suelo de los backrooms.
         * @type {(x: number, z: number) => void}
         * @author HaJuegos - 15-07-2026
         */
        const placeFloor = ((x: number, z: number) => {
            const blockFloor1 = mc.BlockPermutation.resolve(vanilla.MinecraftBlockTypes.PackedMud);
            const blockFloor2 = mc.BlockPermutation.resolve(vanilla.MinecraftBlockTypes.BrownMushroomBlock);
            const chanceBlock = (x + z) % 2 == 0;

            dime.getBlock({
                x: spawnCoords.x + x,
                y: spawnCoords.y - 1,
                z: spawnCoords.z + z
            })?.setPermutation(chanceBlock ? blockFloor2 : blockFloor1);
        });

        /**
         * Funcion auxiliar que añade la capa de bloques deny debajo del suelo de los backrooms
         * @type {(x: number, z: number) => void}
         * @author HaJuegos - 15-07-2026
         */
        const placeDenyFloor = ((x: number, z: number) => {
            const blockDeny = mc.BlockPermutation.resolve(vanilla.MinecraftBlockTypes.Deny);

            dime.getBlock({
                x: spawnCoords.x + x,
                y: spawnCoords.y - 2,
                z: spawnCoords.z + z
            })?.setPermutation(blockDeny);
        });

        /**
         * Funcion auxiliar que calcula y pone bloques de la generacion del techo de los backrooms.
         * @type {(x: number, z: number) => void}
         * @author HaJuegos - 15-07-2026
         */
        const placeCeiling = ((x: number, z: number) => {
            const blockCeiling1 = mc.BlockPermutation.resolve(vanilla.MinecraftBlockTypes.Beehive);
            const blockCeiling2 = mc.BlockPermutation.resolve(vanilla.MinecraftBlockTypes.OchreFroglight);

            const isLight = Math.abs(x) % lighSpace == 0 && Math.abs(z) % lighSpace == 0;
            const placeLight = isLight && seedRandom(x, z, 99) < lighChance;

            dime.getBlock({
                x: spawnCoords.x + x,
                y: spawnCoords.y + height,
                z: spawnCoords.z + z,
            })?.setPermutation(placeLight ? blockCeiling2 : blockCeiling1);
        });

        /**
         * Funcion auxiliar encargada de hacer un laberinto conexo desde la celda del spawn para asi garantizar una exploracion mas comoda desde el radio establecido formando espacios abiertos.
         * @type {() => { openVertical: Set<string>; openHorizontal: Set<string>; }}
         * @author HaJuegos - 15-07-2026
         */
        const generatePlacement = ((): { openVertical: Set<string>, openHorizontal: Set<string>; } => {
            const halfCells = Math.floor(rad / cellSize);
            const openVertical = new Set<string>();
            const openHorizontal = new Set<string>();
            const visitedCells = new Set<string>(['0,0']);
            const stack: [number, number][] = [[0, 0]];

            while (stack.length > 0) {
                const [ix, iz] = stack[stack.length - 1];
                const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dz]) => {
                    const nix = ix + dx;
                    const niz = iz + dz;

                    return Math.abs(nix) <= halfCells && Math.abs(niz) <= halfCells && !visitedCells.has(`${nix},${niz}`);
                });

                if (dirs.length == 0) {
                    stack.pop();
                    continue;
                }

                const [dx, dz] = dirs[Math.floor(Math.random() * dirs.length)];
                const nix = ix + dx;
                const niz = iz + dz;

                if (dx != 0) {
                    openVertical.add(`${Math.max(ix, nix)},${iz}`);
                } else {
                    openHorizontal.add(`${Math.max(iz, niz)},${ix}`);
                }

                visitedCells.add(`${nix},${niz}`);
                stack.push([nix, niz]);
            }

            for (let k = -halfCells + 1; k <= halfCells; k++) {
                for (let m = -halfCells; m <= halfCells; m++) {
                    if (Math.random() < wallChance) {
                        openVertical.add(`${k},${m}`);
                    }

                    if (Math.random() < wallChance) {
                        openHorizontal.add(`${k},${m}`);
                    }
                }
            }

            return { openVertical, openHorizontal };
        });

        const { openVertical, openHorizontal } = generatePlacement();

        /**
         * Funcion auxiliar que calcula la logica de las paredes procedurales generadas en la dimension para calcular los espacios validos tanto para las paredes como el cofre.
         * @type {(x: number, z: number) => boolean}
         * @author HaJuegos - 16-07-2026
         */
        const isWallAt = ((x: number, z: number): boolean => {
            let isWall = false;

            if (x % cellSize == 0) {
                const k = x / cellSize;
                const m = Math.floor(z / cellSize);

                if (!openVertical.has(`${k},${m}`)) {
                    isWall = true;
                }
            }

            if (z % cellSize == 0) {
                const k = z / cellSize;
                const m = Math.floor(x / cellSize);

                if (!openHorizontal.has(`${k},${m}`)) {
                    isWall = true;
                }
            }

            if (Math.abs(x) <= spawnRadiusClear && Math.abs(z) <= spawnRadiusClear) {
                isWall = false;
            }

            if (x == -rad || x == rad || z == -rad || z == rad) {
                isWall = true;
            }

            return isWall;
        });

        /**
         * Funcion auxiliar que calcula y pone bloques de la generacion de las paredes de los backrooms.
         * @type {(x: number, z: number) => void}
         * @author HaJuegos - 15-07-2026
         */
        const placeWalls = ((x: number, z: number) => {
            if (!isWallAt(x, z)) return;

            const blockWall = mc.BlockPermutation.resolve(vanilla.MinecraftBlockTypes.StrippedBambooBlock);

            for (let y = 0; y < height; y++) {
                dime.getBlock({
                    x: spawnCoords.x + x,
                    y: spawnCoords.y + y,
                    z: spawnCoords.z + z,
                })?.setPermutation(blockWall);
            }
        });

        /**
         * Funcion auxiliar que calcula los cofres a poner en los backrooms con loot.
         * @type {(x: number, z: number) => void}
         */
        const placeChest = ((x: number, z: number) => {
            if (isWallAt(x, z)) return;
            if (Math.abs(x) <= spawnRadiusClear && Math.abs(z) <= spawnRadiusClear) return;

            if (Math.random() >= chestChance) return;

            const wallN = [
                { dx: 0, dz: -1, rotation: '0_degrees' },
                { dx: 0, dz: 1, rotation: '180_degrees' },
                { dx: -1, dz: 0, rotation: '270_degrees' },
                { dx: 1, dz: 0, rotation: '90_degrees' }
            ].find(({ dx, dz }) => isWallAt(x + dx, z + dz));

            if (!wallN) return;

            const targetX = spawnCoords.x + x;
            const targetY = spawnCoords.y;
            const targetZ = spawnCoords.z + z;

            try {
                dime.runCommand(`structure load ha:backrooms_chest ${targetX} ${targetY} ${targetZ} ${wallN.rotation}`);
            } catch { }
        });

        const regions: { regX: number; regZ: number; }[] = [];

        for (let regX = -rad; regX <= rad; regX += regSize) {
            for (let regZ = -rad; regZ <= rad; regZ += regSize) {
                regions.push({ regX, regZ });
            }
        }

        regions.sort((a, b) => {
            const distA = a.regX * a.regX + a.regZ * a.regZ;
            const distB = b.regX * b.regX + b.regZ * b.regZ;

            return distA - distB;
        });

        for (const { regX, regZ } of regions) {
            const fromX = regX;
            const fromZ = regZ;
            const toX = Math.min(regX + regSize - 1, rad);
            const toZ = Math.min(regZ + regSize - 1, rad);
            const tickArea = `backroom_reg_${regX}_${regZ}`;

            await mc.world.tickingAreaManager.createTickingArea(tickArea, {
                dimension: dime,
                from: {
                    x: spawnCoords.x + fromX,
                    y: spawnCoords.y - 1,
                    z: spawnCoords.z + fromZ
                },
                to: {
                    x: spawnCoords.x + toX,
                    y: spawnCoords.y + height,
                    z: spawnCoords.z + toZ
                }
            });

            for (let x = fromX; x <= toX; x++) {
                for (let z = fromZ; z <= toZ; z++) {
                    try {
                        placeDenyFloor(x, z);
                        placeFloor(x, z);
                        placeCeiling(x, z);
                        placeWalls(x, z);
                        placeChest(x, z);
                    } catch { }
                }
            }

            mc.world.tickingAreaManager.removeTickingArea(tickArea);
            await mc.system.waitTicks(delayReg);
        }
    }

    /**
     * Metodo principal que controla la generacion de mobs en los backrooms detectando los jugadores en dicha dimension.
     * @returns {void}
     * @author HaJuegos - 16-07-2026
     * @private
     */
    private generateMobsBackRooms(): void {
        const mobsToSpawn = [
            vanilla.MinecraftEntityTypes.Breeze,
            vanilla.MinecraftEntityTypes.ZombiePigman,
            vanilla.MinecraftEntityTypes.Zombie,
            vanilla.MinecraftEntityTypes.Skeleton,
            vanilla.MinecraftEntityTypes.Parched,
            vanilla.MinecraftEntityTypes.Stray,
            vanilla.MinecraftEntityTypes.ZombieVillagerV2,
            vanilla.MinecraftEntityTypes.Creaking,
            vanilla.MinecraftEntityTypes.Enderman,
            vanilla.MinecraftEntityTypes.Silverfish,
            vanilla.MinecraftEntityTypes.Endermite,
            vanilla.MinecraftEntityTypes.Bogged,
            vanilla.MinecraftEntityTypes.Husk,
            vanilla.MinecraftEntityTypes.MagmaCube,
            vanilla.MinecraftEntityTypes.Guardian,
            vanilla.MinecraftEntityTypes.ElderGuardian,
            vanilla.MinecraftEntityTypes.WitherSkeleton,
            vanilla.MinecraftEntityTypes.WanderingTrader,
            vanilla.MinecraftEntityTypes.Vindicator,
            vanilla.MinecraftEntityTypes.Pillager,
            vanilla.MinecraftEntityTypes.Salmon,
        ];
        const minRad = 24;
        const maxRad = 54;
        const spawnAtts = 2;

        worldToolsSimplified.setLoop(() => {
            const dime = mc.world.getDimension(CustomDimensionsTypes.BackRooms);
            const plys = dime.getPlayers().filter(p => p.getGameMode() == mc.GameMode.Survival);

            for (const ply of plys) {
                for (let i = 0; i < spawnAtts; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = minRad + Math.random() * (maxRad - minRad);
                    const targetX = Math.floor(ply.location.x + Math.cos(angle) * distance);
                    const targetZ = Math.floor(ply.location.z + Math.cos(angle) * distance);
                    const targetY = Math.floor(ply.location.y);

                    try {
                        const validBlock = dime.getBlock({ x: targetX, y: targetY, z: targetZ });
                        const floorBlock = dime.getBlock({ x: targetX, y: targetY - 1, z: targetZ });

                        if (!validBlock || !floorBlock) return;

                        const isAir = validBlock.isAir;
                        const isValid = floorBlock.typeId == vanilla.MinecraftBlockTypes.PackedMud || floorBlock.typeId == vanilla.MinecraftBlockTypes.BrownMushroomBlock;

                        if (isAir && isValid) {
                            const randomMob = mobsToSpawn[Math.floor(Math.random() * mobsToSpawn.length)];

                            dime.spawnEntity(randomMob, { x: targetX + 0.5, y: targetY, z: targetZ + 0.5 }, { spawnEvent: 'minecraft:entity_spawned' });
                        }
                    } catch { }
                }
            }
        }, worldToolsSimplified.convertSecondsToTicks(3));
    }

    /**
     * Metodo principal que registra las dimensiones custom registradas en el add-on.
     * @returns {void}
     * @author HaJuegos - 15-07-2026
     * @private 
     */
    private registerDimensions(): void {
        for (const dime of this.listOfDimes) {
            beforeEventsSimplified.createCustomDimension(dime.idPrefix);

            if (dime.onCreateEvents) {
                afterEventsSimplified.onWorldReady(() => {
                    dime.onCreateEvents?.(dime.idPrefix, dime.spawnLocation);
                });
            }
        }
    }
}

new CustomDimensionsManager();