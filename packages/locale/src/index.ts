// Core

// Re-export from react-i18next for convenience
export { Trans, useTranslation } from "react-i18next";
// Config
export {
  defaultLanguage,
  defaultNamespace,
  languageNames,
  type Namespace,
  namespaces,
  type SupportedLanguage,
  supportedLanguages
} from "./config";
export { default as i18n, i18n as i18nInstance } from "./i18n";
export { default as LocaleProviderDefault, LocaleProvider } from "./provider";
// Translations
export { en } from "./translations/en";
export { pl } from "./translations/pl";
export { default as useLocaleDefault, useLocale } from "./useLocale";
