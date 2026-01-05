export const purchasing = {
  // Module title - Tytuł modułu
  title: "Zakupy",

  // Dashboard cards - Karty pulpitu
  openPurchaseOrders: "Otwarte zamówienia zakupu",
  openPurchaseInvoices: "Otwarte faktury zakupu",
  activeSupplierQuotes: "Aktywne oferty dostawców",
  viewOpenPOs: "Zobacz otwarte ZZ",
  viewOpenInvoices: "Zobacz otwarte faktury",
  viewActiveQuotes: "Zobacz aktywne oferty",

  // Dashboard sections - Sekcje pulpitu
  recentlyCreated: "Ostatnio utworzone",
  recentlyCreatedDescription: "Ostatnio utworzone dokumenty zakupowe",
  assignedToMe: "Przypisane do mnie",
  assignedToMeDescription: "Dokumenty zakupowe przypisane do mnie",

  // Entities - Encje
  supplier: "Dostawca",
  suppliers: "Dostawcy",
  allSuppliers: "Wszyscy dostawcy",
  purchaseOrder: "Zamówienie zakupu",
  purchaseOrders: "Zamówienia zakupu",
  purchaseInvoice: "Faktura zakupu",
  purchaseInvoices: "Faktury zakupu",
  supplierQuote: "Oferta dostawcy",
  supplierQuotes: "Oferty dostawców",

  // Table headers - Nagłówki tabeli
  document: "Dokument",
  status: "Status",
  statuses: "Statusy",
  name: "Nazwa",
  supplierStatus: "Status dostawcy",
  type: "Typ",
  accountManager: "Opiekun klienta",
  tags: "Tagi",
  currency: "Waluta",
  phone: "Telefon",
  fax: "Fax",
  website: "Strona www",
  createdBy: "Utworzył",
  createdAt: "Data utworzenia",
  updatedBy: "Zaktualizował",
  updatedAt: "Data aktualizacji",
  assignee: "Przypisany do",
  location: "Lokalizacja",

  // Purchase Order fields - Pola zamówienia zakupu
  poNumber: "Numer ZZ",
  supplierRef: "Ref. dostawcy",
  orderDate: "Data zamówienia",
  requestedDate: "Data żądana",
  promisedDate: "Data obiecana",
  orderTotal: "Wartość zamówienia",
  shippingMethod: "Metoda wysyłki",
  paymentMethod: "Metoda płatności",
  dropShipment: "Wysyłka bezpośrednia",
  dropShipmentStatuses: "Statusy wysyłki bezpośredniej",

  // Supplier Quote fields - Pola oferty dostawcy
  quoteNumber: "Numer oferty",
  supplierReference: "Referencja dostawcy",
  quotedDate: "Data wyceny",
  expirationDate: "Data ważności",

  // Fields - Pola
  leadTime: "Czas realizacji",
  paymentTerms: "Warunki płatności",
  deliveryDate: "Data dostawy",

  // Statuses - Statusy
  draft: "Szkic",
  sent: "Wysłano",
  received: "Otrzymano",
  partiallyReceived: "Częściowo otrzymano",
  closed: "Zamknięte",

  // Actions - Akcje
  newPurchaseOrder: "Nowe zamówienie zakupu",
  newSupplier: "Nowy dostawca",
  sendOrder: "Wyślij zamówienie",
  receiveGoods: "Przyjmij towar",
  receive: "Przyjmij",
  finalize: "Finalizuj",
  exportCsv: "Eksportuj CSV",
  edit: "Edytuj",
  delete: "Usuń",
  update: "Aktualizuj",
  deletePurchaseOrders: "Usuń zamówienia zakupu",
  editSupplier: "Edytuj dostawcę",
  supplierTypes: "Typy dostawców",
  contacts: "Kontakty",
  confirmDeletePurchaseOrder: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",
  confirmDeleteSupplierQuote: "Czy na pewno chcesz usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Supplier Status - Status dostawcy
  viewSuppliers: "Zobacz dostawców",
  editSupplierStatus: "Edytuj status dostawcy",
  deleteSupplierStatus: "Usuń status dostawcy",

  // Supplier Type - Typ dostawcy
  supplierType: "Typ dostawcy",
  editSupplierType: "Edytuj typ dostawcy",
  deleteSupplierType: "Usuń typ dostawcy",

  // Planning - Planowanie
  planning: "Planowanie",
  partId: "ID części",
  noSupplier: "Brak dostawcy",
  reorderPolicy: "Polityka zamówień",
  onHand: "Na stanie",
  order: "Zamów",
  blocked: "Zablokowane",
  recalculate: "Przelicz ponownie",
  orderParts: "Zamów części",
  presentWeek: "Bieżący tydzień",
  week: "Tydzień"
} as const;
