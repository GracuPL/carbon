export const production = {
  // Module title - Tytuł modułu
  title: "Produkcja",

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

  // Charts - Wykresy
  utilizationPercent: "Wykorzystanie (%)",

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
  partId: "ID części",
  reorderPolicy: "Polityka zamówień",
  onHand: "Na stanie",
  type: "Typ",
  blocked: "Zablokowane",
  order: "Zamów",
  orderParts: "Zamów części",
  recalculate: "Przelicz ponownie",
  presentWeek: "Bieżący tydzień",
  week: "Tydzień",

  // Demand Projections - Projekcje popytu
  demandProjections: "Projekcje popytu",
  part: "Część",
  edit: "Edytuj",
  delete: "Usuń",
  confirmDeleteProjection: "Czy na pewno chcesz usunąć wszystkie projekcje dla {{partId}}? Tej operacji nie można cofnąć."
} as const;
