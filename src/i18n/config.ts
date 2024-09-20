import type { InitOptions } from 'i18next';
import { z } from 'zod';

export const FALLBACK_LANG = 'en' as const;
export const LANGUAGES = [FALLBACK_LANG, 'ja', 'ko', 'zh', 'fr', 'de', 'it', 'es'] as const;
export const COOKIE_NAME = 'i18next' as const;
export const DEFAULT_NS = 'translation' as const;

export const zLanguage = z.enum(LANGUAGES);

export type Language = z.infer<typeof zLanguage>;

export const getOptions = (lang: Language = FALLBACK_LANG): InitOptions => {
   return {
      supportedLngs: LANGUAGES,
      fallbackLng: FALLBACK_LANG,
      lng: lang,
      fallbackNS: DEFAULT_NS,
      defaultNS: DEFAULT_NS,
      ns: DEFAULT_NS,
   };
};
