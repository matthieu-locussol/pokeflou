import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { DEFAULT_NS, getOptions, Language } from './config';

const initI18next = async (lang: Language) => {
   const i18nInstance = createInstance();
   await i18nInstance
      .use(initReactI18next)
      .use(
         resourcesToBackend(
            (language: Language) => import(`./locales/${language}/${DEFAULT_NS}.json`),
         ),
      )
      .init(getOptions(lang));
   return i18nInstance;
};

interface UseTranslationProps {
   lang: Language;
}

export const useTranslation = async ({ lang }: UseTranslationProps) => {
   const i18nextInstance = await initI18next(lang);

   return {
      t: i18nextInstance.getFixedT(lang, DEFAULT_NS),
      i18n: i18nextInstance,
   };
};
