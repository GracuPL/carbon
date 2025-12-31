import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, defaultNamespace, supportedLanguages } from "./config";
import { en } from "./translations/en";
import { pl } from "./translations/pl";

const resources = {
  en,
  pl
};

// Only initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: defaultLanguage,
      supportedLngs: [...supportedLanguages],
      defaultNS: defaultNamespace,
      ns: Object.keys(en),

      detection: {
        order: ["cookie", "localStorage", "navigator", "htmlTag"],
        caches: ["cookie", "localStorage"],
        cookieMinutes: 525600, // 1 year
        lookupCookie: "language",
        lookupLocalStorage: "language"
      },

      interpolation: {
        escapeValue: false // React already escapes
      },

      react: {
        useSuspense: false
      }
    });
}

export default i18n;
export { i18n };
