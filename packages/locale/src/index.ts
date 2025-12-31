// Core
export { default as i18n, i18n as i18nInstance } from "./i18n";
export { LocaleProvider, default as LocaleProviderDefault } from "./provider";
export { useLocale, default as useLocaleDefault } from "./useLocale";

// Re-export from react-i18next for convenience
export { useTranslation, Trans } from "react-i18next";

// Config
export {
  supportedLanguages,
  defaultLanguage,
  languageNames,
  namespaces,
  defaultNamespace,
  type SupportedLanguage,
  type Namespace
} from "./config";

// Translations
export { en } from "./translations/en";
export { pl } from "./translations/pl";
