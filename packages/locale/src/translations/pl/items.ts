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
  fixedReorder: "Stałe zamówienie",

  // Additional table headers - Dodatkowe nagłówki tabeli
  toolId: "ID narzędzia",
  consumableId: "ID materiału eksploatacyjnego",
  unitOfMeasure: "Jednostka miary",
  unitOfMeasures: "Jednostki miary",
  name: "Nazwa",
  code: "Kod",
  defaultMethodType: "Domyślny typ metody",
  trackingType: "Typ śledzenia",

  // Material/Tool/Consumable actions - Akcje materiałów/narzędzi/materiałów eksploatacyjnych
  editMaterial: "Edytuj materiał",
  deleteMaterial: "Usuń materiał",
  confirmDeleteMaterial: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",
  editTool: "Edytuj narzędzie",
  deleteTool: "Usuń narzędzie",
  confirmDeleteTool: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",
  editConsumable: "Edytuj materiał eksploatacyjny",
  deleteConsumable: "Usuń materiał eksploatacyjny",
  confirmDeleteConsumable: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Material configuration entity actions - Akcje encji konfiguracyjnych materiałów
  editDimension: "Edytuj wymiar",
  deleteDimension: "Usuń wymiar",
  editFinish: "Edytuj wykończenie",
  deleteFinish: "Usuń wykończenie",
  editGrade: "Edytuj gatunek",
  deleteGrade: "Usuń gatunek",
  editShape: "Edytuj kształt",
  deleteShape: "Usuń kształt",
  editSubstance: "Edytuj substancję",
  deleteSubstance: "Usuń substancję",
  editType: "Edytuj typ",
  deleteType: "Usuń typ",
  editUnit: "Edytuj jednostkę",
  deleteUnit: "Usuń jednostkę",
  editItemGroup: "Edytuj grupę produktów",
  deleteItemGroup: "Usuń grupę produktów",

  // Methods - Metody
  method: "Metoda",
  methods: "Metody",
  materialName: "Nazwa materiału",
  quantity: "Ilość",
  editMethod: "Edytuj metodę",
  deleteMethod: "Usuń metodę",
  sequence: "Kolejność",
  operation: "Operacja",
  operations: "Operacje",
  operationType: "Typ operacji",
  workCenter: "Stanowisko pracy",
  setupTime: "Czas ustawienia",
  productionTime: "Czas produkcji",
  waitTime: "Czas oczekiwania",
  moveTime: "Czas przemieszczenia"
} as const;
