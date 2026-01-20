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
  newSupplierStatus: "Nowy status dostawcy",
  editSupplierStatus: "Edytuj status dostawcy",
  deleteSupplierStatus: "Usuń status dostawcy",

  // Supplier Type - Typ dostawcy
  supplierType: "Typ dostawcy",
  newSupplierType: "Nowy typ dostawcy",
  editSupplierType: "Edytuj typ dostawcy",
  deleteSupplierType: "Usuń typ dostawcy",

  // Supplier Process - Proces dostawcy
  supplierProcess: "Proces dostawcy",
  newSupplierProcess: "Nowy proces dostawcy",
  editSupplierProcess: "Edytuj proces dostawcy",
  process: "Proces",
  minimumCost: "Minimalny koszt",
  standardLeadTime: "Standardowy czas realizacji",

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
  failedToInsertSupplierQuoteLine: "Nie udało się dodać pozycji oferty dostawcy",
  createdSupplierStatus: "Utworzono status dostawcy",
  failedToCreateSupplierStatus: "Nie udało się utworzyć statusu dostawcy: {{message}}",
  createdSupplierType: "Utworzono typ dostawcy",
  failedToCreateSupplierType: "Nie udało się utworzyć typu dostawcy: {{message}}",
  createdSupplierContact: "Utworzono kontakt dostawcy",
  failedToCreateSupplierContact: "Nie udało się utworzyć kontaktu dostawcy: {{message}}",
  createdSupplierProcess: "Utworzono proces dostawcy",
  failedToCreateSupplierProcess: "Nie udało się utworzyć procesu dostawcy",
  createdSupplier: "Utworzono dostawcę: {{name}}",
  failedToCreateSupplier: "Nie udało się utworzyć dostawcy: {{message}}",
  createdSupplierLocation: "Utworzono lokalizację dostawcy",
  failedToCreateSupplierLocation: "Nie udało się utworzyć lokalizacji dostawcy: {{message}}",

  // Charts / KPIs - Wykresy / KPI
  supplierQuoteCount: "Oferty dostawców",
  purchaseOrderCount: "Zamówienia zakupu",
  purchaseInvoiceCount: "Faktury zakupu",
  purchaseOrderAmount: "Wartość zamówień zakupu",
  purchaseInvoiceAmount: "Wartość faktur zakupu",
  noDataWithinRange: "Brak danych w wybranym zakresie",

  // Supplier Form - Formularz dostawcy
  supplierOverview: "Przegląd dostawcy",
  supplierDescription: "Dostawca to firma lub osoba, która sprzedaje ci wyroby lub usługi.",
  selectSupplierStatus: "Wybierz status dostawcy",
  selectSupplierType: "Wybierz typ dostawcy",
  purchasingContact: "Kontakt ds. zakupów",
  invoicingContact: "Kontakt ds. fakturowania",

  // Purchase Order Form - Formularz zamówienia zakupu
  purchaseOrderDescription: "Zamówienie zakupu zawiera informacje o umowie między firmą a konkretnym dostawcą na wyroby i usługi.",
  purchaseOrderId: "ID zamówienia zakupu",
  supplierLocation: "Lokalizacja dostawcy",
  supplierContact: "Kontakt dostawcy",
  supplierOrderNumber: "Numer zamówienia dostawcy",

  // Supplier Quote Form - Formularz oferty dostawcy
  supplierQuoteDescription: "Oferta dostawcy to zestaw cen dla konkretnych wyrobów i ilości.",
  supplierQuoteId: "ID oferty dostawcy",
  supplierRefNumber: "Nr ref. dostawcy",
  newSupplierQuote: "Nowa oferta dostawcy",

  // Supplier Accounting Form - Formularz księgowości dostawcy
  supplierAccounting: "Księgowość dostawcy",
  taxId: "NIP",
  postingGroup: "Grupa księgowania",
  selectPostingGroup: "Wybierz grupę księgowania",

  // Supplier Payment Form - Formularz płatności dostawcy
  invoiceSupplier: "Dostawca do fakturowania",
  invoiceLocation: "Lokalizacja do fakturowania",
  invoiceContact: "Kontakt do fakturowania",
  paymentTerm: "Termin płatności",

  // Supplier Shipping Form - Formularz wysyłki dostawcy
  shipping: "Wysyłka",
  shippingSupplier: "Dostawca do wysyłki",
  shippingLocation: "Lokalizacja do wysyłki",
  shippingContact: "Kontakt do wysyłki",

  // Supplier Contact Form - Formularz kontaktu dostawcy
  newContact: "Nowy kontakt",
  editContact: "Edytuj kontakt",
  email: "E-mail",
  firstName: "Imię",
  lastName: "Nazwisko",
  title: "Stanowisko",
  mobilePhone: "Telefon komórkowy",
  homePhone: "Telefon domowy",
  workPhone: "Telefon służbowy",
  notes: "Notatki",

  // Supplier Location Form - Formularz lokalizacji dostawcy
  newLocation: "Nowa lokalizacja",
  editLocation: "Edytuj lokalizację",

  // Purchase Order Payment Form - Formularz płatności zamówienia zakupu
  payment: "Płatność",
  paymentComplete: "Płatność zakończona",

  // Purchase Order Delivery Form - Formularz dostawy zamówienia zakupu
  shippingCost: "Koszt wysyłki",
  deliveryLocation: "Miejsce dostawy",
  trackingNumber: "Numer śledzenia",

  // Purchase Order Line Form - Formularz pozycji zamówienia zakupu
  purchaseOrderLine: "Pozycja zamówienia zakupu",
  newPurchaseOrderLine: "Nowa pozycja zamówienia zakupu",
  purchaseOrderLineDescription: "Pozycja zamówienia zakupu zawiera szczegóły zamówienia dla konkretnego wyrobu",
  outsideProcessing: "Przetwarzanie zewnętrzne",
  description: "Opis",
  quantity: "Ilość",
  unitOfMeasure: "Jednostka miary",
  unitPrice: "Cena jednostkowa",
  tax: "Podatek",
  taxPercent: "Procent podatku",
  shelf: "Półka",
  job: "Zlecenie",
  operation: "Operacja",

  // Supplier Quote Line Form - Formularz pozycji oferty dostawcy
  supplierQuoteLine: "Pozycja oferty dostawcy",
  newSupplierQuoteLine: "Nowa pozycja oferty dostawcy",
  supplierQuoteLineDescription: "Pozycja oferty dostawcy zawiera ceny dla konkretnego wyrobu",
  deleteLine: "Usuń pozycję",
  part: "Wyrób",
  shortDescription: "Krótki opis",
  supplierPartNumber: "Numer wyrobu dostawcy",
  purchaseUnitOfMeasure: "Jednostka miary zakupu"
} as const;
