import { createGenericArmorAttach } from "../../../../utils/GenericArmorGenerator";

const helmetPack = createGenericArmorAttach('ha:cautious_helmet', "helmet", "textures/models/armors/cautious_armor/1");
export const Helmet = helmetPack.baseArmor;
export const HelmetPlayer = helmetPack.plyArmor;


const chestPlatePack = createGenericArmorAttach('ha:cautious_chestplate', "chest", "textures/models/armors/cautious_armor/1");
export const ChestPlate = chestPlatePack.baseArmor;
export const ChestPlatePlayer = chestPlatePack.plyArmor;


const leggingsPack = createGenericArmorAttach('ha:cautious_leggings', "leg", "textures/models/armors/cautious_armor/2");
export const Leggings = leggingsPack.baseArmor;
export const LeggingsPlayer = leggingsPack.plyArmor;


const bootsPack = createGenericArmorAttach('ha:cautious_boots', "boot", "textures/models/armors/cautious_armor/1");
export const Boots = bootsPack.baseArmor;
export const BootsPlayer = bootsPack.plyArmor;