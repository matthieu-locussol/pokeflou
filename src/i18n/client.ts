/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { COOKIE_NAME, DEFAULT_NS, getOptions, Language, LANGUAGES } from './config';

const runsOnServerSide = typeof window === 'undefined';

i18next
   .use(initReactI18next)
   .use(LanguageDetector)
   .use(
      resourcesToBackend(
         (language: Language) => import(`./locales/${language}/${DEFAULT_NS}.json`),
      ),
   )
   .init({
      ...getOptions(),
      lng: undefined,
      detection: {
         order: ['path', 'htmlTag', 'cookie', 'navigator'],
      },
      preload: runsOnServerSide ? LANGUAGES : [],
   });

export const useTranslation = (lang: Language) => {
   const [cookies, setCookie] = useCookies([COOKIE_NAME]);
   const original = useTranslationOrg(DEFAULT_NS);
   const { i18n } = original;

   if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang);
   } else {
      const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

      useEffect(() => {
         if (activeLng !== i18n.resolvedLanguage) {
            setActiveLng(i18n.resolvedLanguage);
         }
      }, [activeLng, i18n.resolvedLanguage]);

      useEffect(() => {
         if (lang && i18n.resolvedLanguage !== lang) {
            i18n.changeLanguage(lang);
         }
      }, [lang, i18n]);

      useEffect(() => {
         if (cookies.i18next !== lang) {
            setCookie(COOKIE_NAME, lang, { path: '/' });
         }

         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [lang, cookies.i18next]);
   }

   return original;
};
