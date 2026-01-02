export const supportedLanguages = ["en", "pl"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "en";

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  pl: "Polski"
};

export const namespaces = [
  "common",
  "account",
  "errors",
  "inventory",
  "items",
  "navigation",
  "production",
  "purchasing",
  "quality",
  "resources",
  "sales",
  "users"
] as const;

export type Namespace = (typeof namespaces)[number];

export const defaultNamespace: Namespace = "common";
