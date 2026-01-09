export const purchasing = {
  // Module title - Tytuł modułu
  title: "Zakupy",

  // Navigation groups - Grupy nawigacji
  manage: "Zarządzaj",
  plan: "Plan",
  configure: "Konfiguracja",

  // Navigation items - Elementy nawigacji
  planning: "Planowanie",
  types: "Typy",

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
  partId: "ID wyrobu",
  noSupplier: "Brak dostawcy",
  reorderPolicy: "Polityka zamówień",
  onHand: "Na stanie",
  order: "Zamów",
  blocked: "Zablokowane",
  recalculate: "Przelicz ponownie",
  orderParts: "Zamów wyroby",
  presentWeek: "Bieżący tydzień",
  week: "Tydzień",

  // Toast messages - Komunikaty toast
  failedToLoadSupplierPartDetails: "Nie udało się załadować szczegółów wyrobu dostawcy",
  failedToLoadItemDetails: "Nie udało się załadować szczegółów pozycji",
  errorDownloadingFile: "Błąd pobierania pliku",
  carbonClientNotAvailable: "Klient Carbon niedostępny",
  ordersSubmitted: "Zamówienia wysłane",
  supplierUpdated: "Dostawca zaktualizowany",
  supplierAddedAndSelected: "Dostawca dodany i wybrany",
  errorDeletingFile: "Błąd usuwania pliku",
  fileDeletedSuccessfully: "{{name}} usunięto pomyślnie",
  uploadingFile: "Przesyłanie {{name}}",
  failedToUploadFile: "Nie udało się przesłać pliku: {{name}}",
  uploadedFile: "Przesłano: {{name}}",
  failedToUploadImage: "Nie udało się przesłać obrazu",
  carbonClientNotFound: "Nie znaleziono klienta Carbon",
  errorFetchingSupplierData: "Błąd pobierania danych dostawcy",
  failedToLoadReceipts: "Nie udało się załadować przyjęć",
  failedToLoadInvoices: "Nie udało się załadować faktur",
  failedToLoadShipments: "Nie udało się załadować wysyłek",
  failedToUpdateSupplierQuoteLine: "Nie udało się zaktualizować pozycji oferty dostawcy",
  failedToInsertSupplierQuoteLine: "Nie udało się dodać pozycji oferty dostawcy"
} as const;
