import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  languageNames,
  type SupportedLanguage,
  supportedLanguages
} from "./config";

export function useLocale() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const changeLanguage = useCallback(
    async (language: SupportedLanguage) => {
      await i18n.changeLanguage(language);
      // Update cookie for persistence
      document.cookie = `language=${language};path=/;max-age=31536000`;
    },
    [i18n]
  );

  return {
    currentLanguage,
    changeLanguage,
    supportedLanguages,
    languageNames,
    isLanguageSupported: (lang: string): lang is SupportedLanguage =>
      supportedLanguages.includes(lang as SupportedLanguage)
  };
}

export default useLocale;
