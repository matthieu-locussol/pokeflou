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

export const getLangIcon = (lang: Language) => {
   return {
      en: 'noto-v1:flag-for-flag-united-kingdom',
      ja: 'noto-v1:flag-for-flag-japan',
      ko: 'noto-v1:flag-for-flag-south-korea',
      zh: 'noto-v1:flag-for-flag-china',
      fr: 'noto-v1:flag-for-flag-france',
      de: 'noto-v1:flag-for-flag-germany',
      it: 'noto-v1:flag-for-flag-italy',
      es: 'noto-v1:flag-for-flag-spain',
   }[lang];
};

export const getLangName = (lang: Language) => {
   return {
      en: 'English',
      ja: '日本語',
      ko: '한국어',
      zh: '中文',
      fr: 'Français',
      de: 'Deutsch',
      it: 'Italiano',
      es: 'Español',
   }[lang];
};
