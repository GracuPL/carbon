export const users = {
  // Module title - Tytuł modułu
  title: "Użytkownicy",

  // Main entities - Główne encje
  user: "Użytkownik",
  users: "Użytkownicy",
  employee: "Pracownik",
  employees: "Pracownicy",
  customer: "Klient",
  customers: "Klienci",
  supplier: "Dostawca",
  suppliers: "Dostawcy",
  group: "Grupa",
  groups: "Grupy",

  // Employee types - Typy pracowników
  employeeType: "Typ pracownika",
  employeeTypes: "Typy pracowników",

  // Table headers - Nagłówki tabeli
  name: "Nazwa",
  email: "Email",
  firstName: "Imię",
  lastName: "Nazwisko",
  phone: "Telefon",
  role: "Rola",
  department: "Dział",
  manager: "Przełożony",
  hireDate: "Data zatrudnienia",
  status: "Status",

  // Customer/Supplier fields - Pola klienta/dostawcy
  company: "Firma",
  contactPerson: "Osoba kontaktowa",
  address: "Adres",
  city: "Miasto",
  country: "Kraj",
  taxId: "NIP",

  // Statuses - Statusy
  active: "Aktywny",
  inactive: "Nieaktywny",
  pending: "Oczekujący",
  invited: "Zaproszony",
  deactivated: "Dezaktywowany",

  // Actions - Akcje
  addEmployee: "Dodaj pracownika",
  addCustomer: "Dodaj klienta",
  addSupplier: "Dodaj dostawcę",
  addGroup: "Dodaj grupę",
  editEmployee: "Edytuj pracownika",
  deleteEmployee: "Usuń pracownika",
  inviteUser: "Zaproś użytkownika",
  resendInvite: "Wyślij ponownie zaproszenie",
  resendAccountInvite: "Wyślij ponownie zaproszenie do konta",
  revokeInvite: "Anuluj zaproszenie",
  deactivateUser: "Dezaktywuj użytkownika",
  deactivateUsers: "Dezaktywuj użytkowników",
  deactivateAccount: "Dezaktywuj konto",
  activateUser: "Aktywuj użytkownika",
  editPermissions: "Edytuj uprawnienia",
  bulkEditPermissions: "Edycja zbiorcza uprawnień",
  account: "Konto",
  employeeAccounts: "Konta pracowników",

  // Permissions - Uprawnienia
  permission: "Uprawnienie",
  permissions: "Uprawnienia",
  viewPermission: "Podgląd",
  createPermission: "Tworzenie",
  updatePermission: "Edycja",
  deletePermission: "Usuwanie",

  // Department fields - Pola działu
  departments: "Działy",
  subDepartments: "Poddziały",
  editDepartment: "Edytuj dział",
  deleteDepartment: "Usuń dział",

  // Group fields - Pola grupy
  groupName: "Nazwa grupy",
  members: "Członkowie",
  editGroup: "Edytuj grupę",
  deleteGroup: "Usuń grupę",

  // Messages - Komunikaty
  noEmployeesFound: "Nie znaleziono pracowników",
  noCustomersFound: "Nie znaleziono klientów",
  noSuppliersFound: "Nie znaleziono dostawców"
} as const;
