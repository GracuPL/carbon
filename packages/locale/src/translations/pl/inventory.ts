export const inventory = {
  // Module title - Tytuł modułu
  title: "Magazyn",

  // Main views - Główne widoki
  quantities: "Stany magazynowe",
  kanbans: "Kanbany",
  trackedEntities: "Śledzone jednostki",
  traceability: "Śledzenie",

  // Entities - Encje
  item: "Pozycja",
  items: "Pozycje",
  itemId: "ID pozycji",
  part: "Część",
  parts: "Części",
  location: "Lokalizacja",
  locations: "Lokalizacje",
  shelf: "Półka",
  shelves: "Półki",
  warehouse: "Magazyn",
  warehouses: "Magazyny",
  receipt: "Przyjęcie",
  receipts: "Przyjęcia",
  shipment: "Wysyłka",
  shipments: "Wysyłki",
  stockTransfer: "Transfer magazynowy",
  stockTransfers: "Transfery magazynowe",
  warehouseTransfer: "Transfer międzymagazynowy",
  warehouseTransfers: "Transfery międzymagazynowe",
  shippingMethod: "Metoda wysyłki",
  shippingMethods: "Metody wysyłki",

  // Table headers - Nagłówki tabeli
  onHand: "Na stanie",
  days: "Dni",
  leadTime: "Czas realizacji",
  reorderPolicy: "Polityka zamówień",
  replenishment: "Uzupełnianie",
  usagePerDay: "Zużycie/dzień (30d)",
  usagePerDay90: "Zużycie/dzień (90d)",
  onPurchaseOrder: "Na zamówieniu",
  onJobs: "Na zleceniach",
  onJobsDemand: "Na zleceniach (zapotrzebowanie)",
  onSalesOrder: "Na zamówieniu sprzedaży",
  unitOfMeasure: "Jednostka miary",
  shape: "Kształt",
  substance: "Substancja",
  finish: "Wykończenie",
  grade: "Gatunek",
  dimension: "Wymiar",
  type: "Typ",
  itemType: "Typ pozycji",
  active: "Aktywny",
  inactive: "Nieaktywny",
  activeStatuses: "Statusy aktywności",

  // Fields - Pola
  quantity: "Ilość",
  quantityOnHand: "Ilość na stanie",
  quantityAvailable: "Ilość dostępna",
  quantityReserved: "Ilość zarezerwowana",
  unitCost: "Koszt jednostkowy",
  totalValue: "Wartość całkowita",
  batchNumber: "Numer partii",
  serialNumber: "Numer seryjny",
  lotNumber: "Numer LOT",

  // Receipt fields - Pola przyjęcia
  receiptId: "ID przyjęcia",
  sourceDocument: "Dokument źródłowy",
  sourceDocumentId: "ID dokumentu źródłowego",
  status: "Status",
  statuses: "Statusy",
  postedBy: "Zaksięgował",
  postingDate: "Data księgowania",
  assignee: "Przypisany do",
  supplier: "Dostawca",
  invoiced: "Zafakturowano",
  invoicedStatuses: "Statusy fakturowania",
  externalRef: "Ref. zewnętrzna",
  createdBy: "Utworzył",
  createdAt: "Data utworzenia",
  updatedBy: "Zaktualizował",
  updatedAt: "Data aktualizacji",
  editReceipt: "Edytuj przyjęcie",
  viewReceipt: "Pokaż przyjęcie",
  deleteReceipt: "Usuń przyjęcie",
  confirmDeleteReceipt: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Shipment fields - Pola wysyłki
  shipmentId: "ID wysyłki",
  customer: "Klient",
  editShipment: "Edytuj wysyłkę",
  viewShipment: "Pokaż wysyłkę",
  deleteShipment: "Usuń wysyłkę",
  confirmDeleteShipment: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Kanban fields - Pola kanban
  kanban: "Kanban",
  reorderQty: "Ilość zamówienia",
  release: "Zwolnij",
  start: "Start",
  complete: "Zakończ",
  create: "Utwórz",
  settings: "Ustawienia",
  edit: "Edytuj",
  viewItemMaster: "Pokaż kartę produktu",
  actions: "Akcje",
  printLabels: "Drukuj etykiety",

  // Actions - Akcje
  receive: "Przyjmij",
  ship: "Wyślij",
  transfer: "Przenieś",
  adjust: "Skoryguj",
  count: "Inwentaryzuj",
  recalculate: "Przelicz",

  // Statuses - Statusy
  inStock: "Na stanie",
  outOfStock: "Brak na stanie",
  lowStock: "Niski stan",
  reserved: "Zarezerwowane",

  // Reorder policies - Polityki zamówień
  demandBased: "Na żądanie",
  planBased: "Według planu",
  fixedReorder: "Stałe zamówienie",

  // Shelf fields - Pola półki
  name: "Nazwa",
  newShelf: "Nowa półka",
  editShelf: "Edytuj półkę",
  deleteShelf: "Usuń półkę",
  confirmDeleteShelf: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Shipping method fields - Pola metody wysyłki
  carrier: "Przewoźnik",
  trackingUrl: "URL śledzenia",
  carrierAccount: "Konto przewoźnika",
  editShippingMethod: "Edytuj metodę wysyłki",
  deleteShippingMethod: "Usuń metodę wysyłki",

  // Stock transfer fields - Pola transferu magazynowego
  stockTransferId: "ID transferu magazynowego",
  completedAt: "Zakończono",
  addStockTransfer: "Dodaj transfer magazynowy",
  editStockTransfer: "Edytuj transfer magazynowy",
  viewStockTransfer: "Pokaż transfer magazynowy",
  deleteStockTransfer: "Usuń transfer magazynowy",
  confirmDeleteStockTransfer: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Warehouse transfer fields - Pola transferu międzymagazynowego
  warehouseTransferId: "ID transferu międzymagazynowego",
  sourceLocation: "Lokalizacja źródłowa",
  destinationLocation: "Lokalizacja docelowa",
  addWarehouseTransfer: "Dodaj transfer międzymagazynowy",
  editWarehouseTransfer: "Edytuj transfer międzymagazynowy",
  viewWarehouseTransfer: "Pokaż transfer międzymagazynowy",
  deleteWarehouseTransfer: "Usuń transfer międzymagazynowy",
  confirmDeleteWarehouseTransfer: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Tracked entities - Śledzone jednostki
  trackedEntity: "Śledzona jednostka",
  entity: "Jednostka",
  entityId: "ID jednostki",
  entityType: "Typ jednostki",
  entityTypes: "Typy jednostek",
  serialBatchNumber: "Nr seryjny/partii",
  viewTraceabilityGraph: "Pokaż graf śledzenia",

  // Warehouse transfer additional fields - Dodatkowe pola transferu
  transferId: "ID transferu",
  fromLocation: "Z lokalizacji",
  toLocation: "Do lokalizacji",
  reference: "Referencja",
  transferDate: "Data transferu",
  expectedReceipt: "Oczekiwane przyjęcie",
  viewTransfer: "Pokaż transfer",
  editTransfer: "Edytuj transfer",
  deleteTransfer: "Usuń transfer"
} as const;
