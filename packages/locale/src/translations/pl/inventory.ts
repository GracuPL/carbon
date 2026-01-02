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
  usagePerDay: "Zużycie/dzień",
  onPurchaseOrder: "Na zamówieniu",
  onJobs: "Na zleceniach",

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
  fixedReorder: "Stałe zamówienie"
} as const;
