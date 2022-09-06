import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
const availableLanguages = ['en', 'bn']

i18n.use(Backend)
// detect user language
// learn more: https://github.com/i18next/i18next-browser-languageDetector
.use(LanguageDetector)
// pass the i18n instance to react-i18next.
.use(initReactI18next)
// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
.init({
  debug: false,
  // whitelist: availableLanguages,
  interpolation: {
    escapeValue: false // no need for react. it escapes by default
  },
  fallbackLng: 'en',
  // resources: {
  //   en: {
  //     translation: {
  //       // here we will place our translations...
  //     }
  //   }
  // }
});

export default i18n;