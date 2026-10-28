import { TextsGeneratorsManager, VariationsAddonsList } from '../../utils/TextsLangsGenerator';

export const texts = new TextsGeneratorsManager(VariationsAddonsList.Global, "26.60", "0.0.13-beta").buildTxts();