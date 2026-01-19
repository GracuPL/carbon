export const invoicing = {
  // Module title - Tytuł modułu
  title: "Fakturowanie",

  // Navigation groups - Grupy nawigacji
  manage: "Zarządzaj",
  purchasing: "Zakupy",

  // Entities - Encje
  salesInvoice: "Faktura sprzedaży",
  salesInvoices: "Faktury sprzedaży",
  purchaseInvoice: "Faktura zakupu",
  purchaseInvoices: "Faktury zakupu",

  // Table headers - Nagłówki tabeli
  invoiceNumber: "Numer faktury",
  customer: "Klient",
  invoiceCustomer: "Klient na fakturze",
  supplier: "Dostawca",
  invoiceSupplier: "Dostawca na fakturze",
  customerPo: "Zamówienie klienta",
  supplierRef: "Ref. dostawcy",
  status: "Status",
  statuses: "Statusy",
  invoiceTotal: "Wartość faktury",
  orderTotal: "Wartość zamówienia",
  assignee: "Przypisany do",
  issuedDate: "Data wystawienia",
  dueDate: "Termin płatności",
  paidDate: "Data zapłaty",
  postingDate: "Data księgowania",
  paymentMethod: "Metoda płatności",
  createdBy: "Utworzył",
  createdAt: "Data utworzenia",
  updatedBy: "Zaktualizował",
  updatedAt: "Data aktualizacji",

  // Actions - Akcje
  edit: "Edytuj",
  delete: "Usuń",
  confirmDeleteSalesInvoice: "Czy na pewno chcesz trwale usunąć {{name}}?",
  confirmDeletePurchaseInvoice: "Czy na pewno chcesz trwale usunąć {{name}}?",

  // Toast messages - Komunikaty toast
  carbonClientNotFound: "Nie znaleziono klienta Carbon",
  errorFetchingSupplierData: "Błąd pobierania danych dostawcy",
  errorFetchingCustomerData: "Błąd pobierania danych klienta",

  // Form titles and descriptions - Tytuły i opisy formularzy
  newPurchaseInvoice: "Nowa faktura zakupu",
  purchaseInvoiceDescription: "Faktura zakupu to dokument określający produkty lub usługi zakupione przez klienta oraz odpowiadający im koszt.",
  newSalesInvoice: "Nowa faktura sprzedaży",
  salesInvoiceDescription: "Faktura sprzedaży to dokument określający produkty lub usługi sprzedane klientowi oraz odpowiadający im koszt.",

  // Form labels - Etykiety formularza
  invoiceId: "ID faktury",
  supplierInvoiceNumber: "Numer faktury dostawcy",
  invoiceSupplierLocation: "Lokalizacja dostawcy na fakturze",
  invoiceSupplierContact: "Kontakt dostawcy na fakturze",
  customerInvoiceNumber: "Numer faktury klienta",
  invoiceCustomerLocation: "Lokalizacja klienta na fakturze",
  invoiceCustomerContact: "Kontakt klienta na fakturze",
  dateIssued: "Data wystawienia",
  paymentTerms: "Warunki płatności",

  // Invoice Line Form - Formularz pozycji faktury
  newSalesInvoiceLine: "Nowa pozycja faktury sprzedaży",
  newPurchaseInvoiceLine: "Nowa pozycja faktury zakupu",
  salesInvoiceLineDescription: "Pozycja faktury sprzedaży zawiera szczegóły faktury dla konkretnego wyrobu",
  purchaseInvoiceLineDescription: "Pozycja faktury zakupu zawiera szczegóły faktury dla konkretnego wyrobu",
  description: "Opis",
  method: "Metoda",
  quantity: "Ilość",
  unitPrice: "Cena jednostkowa",
  supplierUnitPrice: "Cena jednostkowa dostawcy",
  shipping: "Wysyłka",
  addOnCost: "Koszt dodatkowy",
  tax: "Podatek",
  taxPercent: "Procent podatku",
  location: "Lokalizacja",
  shelf: "Półka",
  unitOfMeasure: "Jednostka miary",
  batchItemsRequireSalesOrder: "Wyroby partyjne wymagają zamówienia sprzedaży",
  serialItemsRequireSalesOrder: "Wyroby seryjne wymagają zamówienia sprzedaży",
  makeItemsCannotBeInvoiced: "Wyroby produkowane nie mogą być fakturowane bezpośrednio. Zmień metodę na Pobierz, aby kontynuować."
} as const;
