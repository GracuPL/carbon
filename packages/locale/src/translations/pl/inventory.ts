export const inventory = {
  // Module title - Tytuł modułu
  title: "Magazyn",

  // Entities - Encje
  item: "Pozycja",
  items: "Pozycje",
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

  // Statuses - Statusy
  inStock: "Na stanie",
  outOfStock: "Brak na stanie",
  lowStock: "Niski stan",
  reserved: "Zarezerwowane"
} as const;
