import { TextsGeneratorsManager, VariationsAddonsList } from '../../utils/TextsLangsGenerator';

export const texts = new TextsGeneratorsManager(VariationsAddonsList.Global, "26.52", "0.0.13-beta").buildTxts();