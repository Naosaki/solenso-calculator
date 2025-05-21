import { SUPPORTED_LANGUAGES } from './constants';
import type { LanguageCode, TranslationSchema } from './types';
import { fr } from './fr';
import { en } from './en';
import { de } from './de';
import { es } from './es';
import { zh } from './zh';

export { SUPPORTED_LANGUAGES } from './constants';
export type { LanguageCode, TranslationSchema } from './types';

export const translations: Record<LanguageCode, TranslationSchema> = {
  fr,
  en,
  de,
  es,
  zh
};