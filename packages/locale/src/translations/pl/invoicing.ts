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
  errorFetchingCustomerData: "Błąd pobierania danych klienta"
} as const;
