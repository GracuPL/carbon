import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

interface LocaleProviderProps {
  children: ReactNode;
  locale?: string;
}

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  // Change language if locale prop is provided and different from current
  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default LocaleProvider;
