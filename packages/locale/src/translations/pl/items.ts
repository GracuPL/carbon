export const items = {
  // Module title - Tytuł modułu
  title: "Produkty",

  // Entity types - Typy encji
  part: "Wyrób",
  parts: "Wyroby",
  material: "Materiał",
  materials: "Materiały",
  tool: "Narzędzie",
  tools: "Narzędzia",
  consumable: "Materiał eksploatacyjny",
  consumables: "Materiały eksploatacyjne",

  // Table headers - Nagłówki tabeli
  partId: "ID wyrobu",
  materialId: "ID materiału",
  description: "Opis",
  itemGroup: "Grupa produktów",
  tracking: "Śledzenie",
  defaultMethod: "Domyślna metoda",
  replenishment: "Uzupełnianie",
  tags: "Tagi",
  createdBy: "Utworzył",
  createdAt: "Data utworzenia",
  updatedBy: "Zaktualizował",
  updatedAt: "Data aktualizacji",
  active: "Aktywny",
  inactive: "Nieaktywny",
  activeStatuses: "Statusy aktywności",

  // Configuration entities - Encje konfiguracyjne
  dimension: "Wymiar",
  dimensions: "Wymiary",
  finish: "Wykończenie",
  finishes: "Wykończenia",
  grade: "Gatunek",
  grades: "Gatunki",
  shape: "Kształt",
  shapes: "Kształty",
  substance: "Substancja",
  substances: "Substancje",
  type: "Typ",
  types: "Typy",
  unit: "Jednostka",
  units: "Jednostki",
  itemGroups: "Grupy produktów",

  // Actions - Akcje
  addPart: "Dodaj wyrób",
  addMaterial: "Dodaj materiał",
  addTool: "Dodaj narzędzie",
  addConsumable: "Dodaj materiał eksploatacyjny",
  editPart: "Edytuj wyrób",
  deletePart: "Usuń wyrób",
  confirmDeletePart: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",
  versions: "Wersje",
  revision: "Rewizja",
  update: "Aktualizuj",

  // Tracking types - Typy śledzenia
  inventory: "Magazyn",
  lot: "Partia",
  serial: "Numer seryjny",
  none: "Brak",

  // Method types - Typy metod
  make: "Produkcja",
  buy: "Zakup",

  // Replenishment - Uzupełnianie
  demandBased: "Na żądanie",
  planBased: "Według planu",
  fixedReorder: "Stałe zamówienie"
} as const;
