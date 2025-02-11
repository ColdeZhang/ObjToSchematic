import { DeepPartial } from '../src/util/type_util';
import { en_GB } from './en_GB';
import { en_US } from './en_US';
import { fr_FR } from './fr_FR';
import { ru_RU } from './ru_RU';
import { zh_CN } from './zh_CN';
import { ja_JP } from './ja_JP';

export type TTranslationMap = typeof en_GB.translations;

export type TLocaleDefinition = {
    display_name: string,
    language_code: string,
    translations: DeepPartial<TTranslationMap>,
};

export const locales = [
    zh_CN,
    en_GB,
    en_US,
    ru_RU,
    fr_FR,
    ja_JP,
];
