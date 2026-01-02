import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  defaultLanguage,
  defaultNamespace,
  supportedLanguages
} from "./config";
import { en } from "./translations/en";
import { pl } from "./translations/pl";

const resources = {
  en,
  pl
};

// Only initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS: defaultNamespace,
    ns: Object.keys(en),

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
