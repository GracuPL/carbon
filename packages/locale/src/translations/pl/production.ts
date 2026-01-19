export const production = {
  // Module title - Tytuł modułu
  title: "Produkcja",

  // Navigation groups - Grupy nawigacji
  plan: "Plan",
  configure: "Konfiguracja",

  // Navigation items - Elementy nawigacji
  procedures: "Procedury",
  planning: "Planowanie",
  projections: "Prognozy",
  schedule: "Harmonogram",
  scrapReasons: "Przyczyny odpadów",

  // Dashboard cards - Karty pulpitu
  activeJobs: "Aktywne zlecenia",
  viewActiveJobs: "Zobacz aktywne zlecenia",
  jobsAssignedToMe: "Zlecenia przypisane do mnie",
  viewAssignedJobs: "Zobacz przypisane zlecenia",

  // Entities - Encje
  job: "Zlecenie",
  jobs: "Zlecenia",
  workCenter: "Stanowisko pracy",
  workCenters: "Stanowiska pracy",
  operation: "Operacja",
  operations: "Operacje",
  method: "Metoda",
  methods: "Metody",

  // Charts / KPIs - Wykresy / KPI
  utilizationPercent: "Wykorzystanie (%)",
  workCenterUtilization: "Wykorzystanie stanowisk pracy",
  noUtilizationData: "Brak danych o wykorzystaniu stanowisk w wybranym okresie",
  estimatesVsActuals: "Szacunki vs Rzeczywiste",
  noCompletedJobs: "Brak zakończonych zleceń w wybranym okresie",
  completionTime: "Czas realizacji",

  // Statuses - Statusy
  pending: "Oczekujące",
  inProgress: "W trakcie",
  completed: "Zakończone",
  onHold: "Wstrzymane",
  inactive: "Nieaktywny",

  // Actions - Akcje
  newJob: "Nowe zlecenie",
  startJob: "Rozpocznij zlecenie",
  completeJob: "Zakończ zlecenie",
  viewMaintenanceDispatch: "Zobacz dyspozycję konserwacji",
  exportCsv: "Eksportuj CSV",
  editJob: "Edytuj zlecenie",
  deleteJob: "Usuń zlecenie",
  deleteJobs: "Usuń zlecenia",
  update: "Aktualizuj",
  confirmDeleteJob: "Czy na pewno chcesz usunąć zlecenie: {{jobId}}?",

  // Work center cards - Karty stanowisk pracy
  blockedBy: "Zablokowane przez",
  due: "Termin",

  // Table headers - Nagłówki tabeli
  jobId: "ID zlecenia",
  item: "Pozycja",
  tracking: "Śledzenie",
  quantity: "Ilość",
  customer: "Klient",
  salesOrder: "Zamówienie sprzedaży",
  status: "Status",
  statuses: "Statusy",
  assignee: "Przypisany do",
  startDate: "Data rozpoczęcia",
  dueDate: "Termin",
  deadlineType: "Typ terminu",
  tags: "Tagi",
  orderQty: "Ilość zam.",
  inventoryQty: "Ilość mag.",
  productionQty: "Ilość prod.",
  scrapQty: "Ilość braku",
  completedQty: "Ilość wyk.",
  shippedQty: "Ilość wys.",
  receivedQty: "Ilość przyj.",
  location: "Lokalizacja",
  createdBy: "Utworzył",
  createdAt: "Data utworzenia",
  updatedBy: "Zaktualizował",
  updatedAt: "Data aktualizacji",

  // Procedures - Procedury
  procedure: "Procedura",
  procedures: "Procedury",
  process: "Proces",
  version: "Wersja",
  versions: "Wersje",
  editProcedure: "Edytuj procedurę",
  deleteProcedure: "Usuń procedurę",
  confirmDeleteProcedure: "Czy na pewno chcesz usunąć tę procedurę?",
  name: "Nazwa",

  // Scrap reasons - Przyczyny braków
  scrapReason: "Przyczyna braku",
  scrapReasons: "Przyczyny braków",
  editScrapReason: "Edytuj przyczynę braku",
  deleteScrapReason: "Usuń przyczynę braku",

  // Planning - Planowanie
  planning: "Planowanie",
  partId: "ID wyrobu",
  reorderPolicy: "Polityka zamówień",
  onHand: "Na stanie",
  type: "Typ",
  blocked: "Zablokowane",
  order: "Zamów",
  orderParts: "Zamów wyroby",
  recalculate: "Przelicz ponownie",
  presentWeek: "Bieżący tydzień",
  week: "Tydzień",

  // Demand Projections - Projekcje popytu
  demandProjections: "Projekcje popytu",
  part: "Wyrób",
  edit: "Edytuj",
  delete: "Usuń",
  confirmDeleteProjection: "Czy na pewno chcesz usunąć wszystkie projekcje dla {{partId}}? Tej operacji nie można cofnąć.",

  // Job Materials Table - Tabela materiałów zlecenia
  required: "Wymagane",
  onShelf: "Na półce",
  incoming: "Przychodzące",
  transfer: "Przesunięcie",
  materials: "Materiały",
  removeTransfer: "Usuń przesunięcie",
  removeOrder: "Usuń zamówienie",

  // Job Operations Table - Tabela operacji zlecenia
  description: "Opis",
  operationType: "Typ operacji",
  qtyComplete: "Il. ukończ.",
  qtyScrapped: "Il. braku",
  qtyReworked: "Il. poprawek",

  // Job Operation Step Records Table - Tabela rekordów kroków operacji
  step: "Krok",
  value: "Wartość",
  stepRecords: "Rekordy kroków",
  viewFile: "Wyświetl plik",

  // Production Events Table - Tabela zdarzeń produkcyjnych
  employee: "Pracownik",
  duration: "Czas trwania",
  startTime: "Czas rozpoczęcia",
  endTime: "Czas zakończenia",
  notes: "Notatki",
  productionEvent: "Zdarzenie produkcyjne",
  productionEvents: "Zdarzenia produkcyjne",
  editEvent: "Edytuj zdarzenie",
  deleteEvent: "Usuń zdarzenie",
  confirmDeleteEvent: "Czy na pewno chcesz usunąć to zdarzenie produkcyjne? Tej operacji nie można cofnąć.",

  // Production Quantities Table - Tabela ilości produkcyjnych
  productionQuantities: "Ilości produkcyjne",
  editQuantity: "Edytuj ilość",
  deleteQuantity: "Usuń ilość",
  confirmDeleteQuantity: "Czy na pewno chcesz usunąć tę ilość produkcyjną? Tej operacji nie można cofnąć.",

  // Job Form - Formularz zlecenia
  singleJob: "Pojedyncze zlecenie",
  manyJobs: "Wiele zleceń",
  jobDescription: "Zlecenie to zestaw prac do wykonania w celu realizacji zamówienia lub zwiększenia zapasów",
  shortDescription: "Krótki opis",
  scrapQuantity: "Ilość braku",
  bulkJobs: "Zlecenia zbiorcze",
  bulkJobsDescription: "Formularz zleceń zbiorczych tworzy wiele zleceń dla tej samej pozycji z różnymi terminami.",
  totalQuantity: "Całkowita ilość",
  quantityPerJob: "Ilość na zlecenie",
  scrapQuantityPerJob: "Ilość braku na zlecenie",
  dueDateOfFirstJob: "Termin pierwszego zlecenia",
  dueDateOfLastJob: "Termin ostatniego zlecenia",

  // Procedure Form - Formularz procedury
  newProcedure: "Nowa procedura",
  copyProcedure: "Kopiuj procedurę",
  newVersion: "Nowa wersja",
  newVersionHelper: "Nowy numer wersji procedury",
  versionHelper: "Wersja nowej procedury",

  // Scrap Reason Form - Formularz przyczyny braku
  newScrapReason: "Nowa przyczyna braku",
  failedToCreateScrapReason: "Nie udało się utworzyć przyczyny braku: {{message}}",

  // Toast messages - Success - Komunikaty sukcesu
  ordersSubmitted: "Zamówienia zostały wysłane",
  createdScrapReason: "Utworzono przyczynę braku",
  fileDeletedSuccessfully: "{{name}} został usunięty",
  modelRemovedFromJob: "Model został usunięty ze zlecenia",
  fileMovedToBucket: "Przeniesiono {{name}} do folderu {{bucket}}",

  // Toast messages - Errors - Komunikaty błędów
  failedToUploadImage: "Nie udało się przesłać obrazu",
  trackedEntityIdRequired: "Wymagany jest ID śledzonej jednostki, ale nie został znaleziony",
  failedToFetchItemCosts: "Nie udało się pobrać kosztów pozycji",
  unableToGetCompanyId: "Nie można uzyskać ID firmy",
  failedToLoadItemDetails: "Nie udało się załadować szczegółów pozycji",
  failedToLoadConfigurationParameters: "Nie udało się załadować parametrów konfiguracji",
  errorDeletingFile: "Błąd usuwania pliku",
  errorRemovingModelFromJob: "Błąd usuwania modelu ze zlecenia",
  modelDataMissing: "Brak danych modelu",
  errorDownloadingFile: "Błąd pobierania pliku",
  carbonClientNotAvailable: "Klient Carbon niedostępny",
  cannotUploadToPartsBucketWithoutItemId: "Nie można przesłać do folderu wyrobów bez ID pozycji",
  failedToUploadFile: "Nie udało się przesłać pliku: {{name}}",
  cannotMoveToPartsBucketWithoutItemId: "Nie można przenieść do folderu wyrobów bez ID pozycji",
  fileAlreadyInSelectedBucket: "Plik jest już w wybranym folderze",
  failedToDownloadFileForMoving: "Nie udało się pobrać pliku do przeniesienia",
  failedToUploadFileToNewLocation: "Nie udało się przesłać pliku do nowej lokalizacji",
  failedToDeleteFileFromOldLocation: "Nie udało się usunąć pliku ze starej lokalizacji",
  errorMovingFile: "Błąd przenoszenia pliku",
  itemCannotBeAddedToItself: "Pozycja nie może być dodana do samej siebie.",
  partsBucket: "Wyroby",
  jobsBucket: "Zlecenia"
} as const;
