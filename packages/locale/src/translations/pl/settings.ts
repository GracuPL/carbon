export const settings = {
  // Module title - Tytuł modułu
  title: "Ustawienia",

  // Navigation groups - Grupy nawigacji
  company: "Firma",
  modules: "Moduły",
  system: "System",
  billing: "Rozliczenia",
  labels: "Etykiety",
  logos: "Logotypy",
  inventory: "Magazyn",
  items: "Produkty",
  purchasing: "Zakupy",
  production: "Produkcja",
  quality: "Jakość",
  sales: "Sprzedaż",
  resources: "Zasoby",
  integrations: "Integracje",

  // API Keys - Klucze API
  apiKey: "Klucz API",
  apiKeys: "Klucze API",
  key: "Klucz",
  newApiKey: "Nowy klucz API",
  editApiKey: "Edytuj klucz API",
  deleteApiKey: "Usuń klucz API",
  apiDocs: "Dokumentacja API",
  apiKeyWarning: "Ten klucz zobaczysz tylko raz. Przechowuj go bezpiecznie.",

  // Sequences - Sekwencje
  sequence: "Sekwencja",
  sequences: "Sekwencje",
  prefix: "Prefiks",
  current: "Bieżący",
  size: "Rozmiar",
  step: "Krok",
  suffix: "Sufiks",
  editSequence: "Edytuj sekwencję",

  // Custom Fields - Pola niestandardowe
  customField: "Pole niestandardowe",
  customFields: "Pola niestandardowe",
  table: "Tabela",
  module: "Moduł",
  fields: "Pola",
  newField: "Nowe pole",
  viewCustomFields: "Pokaż pola niestandardowe",

  // Webhooks
  webhook: "Webhook",
  webhooks: "Webhooki",
  success: "Sukces",
  webhooksDocs: "Dokumentacja webhooków",
  newWebhook: "Nowy webhook",
  editWebhook: "Edytuj webhook",
  deleteWebhook: "Usuń webhook",
  notifications: "Powiadomienia",
  insert: "Wstawienie",
  update: "Aktualizacja",
  deleteEvent: "Usunięcie",
  webhookNameHelper: "To jest unikalny identyfikator webhooka",
  webhookUrl: "URL webhooka",
  webhookUrlHelper: "Endpoint, który otrzymuje żądanie POST z zaktualizowanymi danymi po aktualizacji tabeli",
  active: "Aktywny",

  // Common fields - Wspólne pola
  name: "Nazwa",
  createdBy: "Utworzony przez",
  createdAt: "Utworzony",

  // Custom Fields Detail - Szczegóły pól niestandardowych
  editCustomField: "Edytuj pole niestandardowe",
  deleteCustomField: "Usuń pole niestandardowe",
  confirmDeleteCustomField: "Czy na pewno chcesz usunąć pole {{name}}?",

  // Toast messages - Komunikaty toast
  failedToResizeImage: "Nie udało się zmienić rozmiaru obrazu",
  failedToUploadLogo: "Nie udało się przesłać logo",
  failedToRemoveImage: "Nie udało się usunąć obrazu",
  createdWebhook: "Utworzono webhook",
  failedToCreateWebhook: "Nie udało się utworzyć webhooka: {{message}}",
  integrationNotFound: "Nie znaleziono integracji",

  // Company page - Strona firmy
  companyHeading: "Firma",

  // Sequence Form - Formularz sekwencji
  sequenceTitle: "Sekwencja {{name}}",
  fullYear: "Pełny rok",
  year: "Rok",
  month: "Miesiąc",
  day: "Dzień",
  hour: "Godzina",
  minute: "Minuta",
  second: "Sekunda",

  // Custom Field Form - Formularz pola niestandardowego
  newCustomField: "Nowe pole niestandardowe",
  fieldName: "Nazwa pola",
  sortOrder: "Kolejność sortowania",
  dataType: "Typ danych",
  listOptions: "Opcje listy",
  dataTypeCannotBeChanged: "Typ danych nie może być zmieniony",
  customFieldTagsHelper: "Te pola niestandardowe będą dostępne tylko dla encji z tymi samymi tagami",

  // Integration Form - Formularz integracji
  installed: "Zainstalowany",
  publishedByCarbon: "Opublikowany przez Carbon",
  howItWorks: "Jak to działa",
  setupInstructions: "Instrukcje konfiguracji",
  integrationDisclaimer: "Carbon Manufacturing Systems nie popiera żadnego oprogramowania firm trzecich. Zgłoś wszelkie obawy dotyczące zawartości lub zachowania aplikacji.",
  reportIntegration: "Zgłoś integrację",
  install: "Instaluj",

  // Theme Form - Formularz motywu
  theme: "Motyw",
  themeDescription: "Ta zmiana aktualizuje motyw dla wszystkich użytkowników aplikacji"
} as const;
