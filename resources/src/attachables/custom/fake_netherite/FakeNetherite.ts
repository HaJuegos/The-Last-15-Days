import { createGenericArmorAttach } from "../../../../utils/GenericArmorGenerator";

const helmetPack = createGenericArmorAttach('ha:fake_netherite_helmet', "helmet", "textures/models/armors/netherite_1");
export const Helmet = helmetPack.baseArmor;
export const HelmetPlayer = helmetPack.plyArmor;


const chestPlatePack = createGenericArmorAttach('ha:fake_netherite_chestplate', "chest", "textures/models/armors/netherite_1");
export const ChestPlate = chestPlatePack.baseArmor;
export const ChestPlatePlayer = chestPlatePack.plyArmor;


const leggingsPack = createGenericArmorAttach('ha:fake_netherite_leggings', "leg", "textures/models/armors/netherite_2");
export const Leggings = leggingsPack.baseArmor;
export const LeggingsPlayer = leggingsPack.plyArmor;


const bootsPack = createGenericArmorAttach('ha:fake_netherite_boots', "boot", "textures/models/armors/netherite_1");
export const Boots = bootsPack.baseArmor;
export const BootsPlayer = bootsPack.plyArmor;