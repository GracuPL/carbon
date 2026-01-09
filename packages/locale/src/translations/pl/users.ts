export const users = {
  // Module title - Tytuł modułu
  title: "Użytkownicy",

  // Navigation groups - Grupy nawigacji
  manage: "Zarządzaj",
  configure: "Konfiguracja",
  accounts: "Konta",
  people: "Ludzie",

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
  viewEmployees: "Pokaż pracowników",
  editEmployeeType: "Edytuj typ pracownika",
  deleteEmployeeType: "Usuń typ pracownika",

  // Customer/Supplier types - Typy klientów/dostawców
  customerType: "Typ klienta",
  customerTypes: "Typy klientów",
  supplierType: "Typ dostawcy",
  supplierTypes: "Typy dostawców",
  customerAccounts: "Konta klientów",
  supplierAccounts: "Konta dostawców",

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
  noSuppliersFound: "Nie znaleziono dostawców",

  // Attribute categories - Kategorie atrybutów
  attributeCategories: "Kategorie atrybutów",
  attributeCategory: "Kategoria atrybutów",
  category: "Kategoria",
  attributes: "Atrybuty",
  visibility: "Widoczność",
  visibilities: "Widoczności",
  public: "Publiczny",
  private: "Prywatny",
  newAttribute: "Nowy atrybut",
  viewAttributes: "Zobacz atrybuty",
  editCategory: "Edytuj kategorię",
  deleteCategory: "Usuń kategorię",
  confirmDeleteAttributeCategory: "Czy na pewno chcesz dezaktywować kategorię atrybutów {{name}}?",

  // Holidays - Dni wolne
  holidays: "Dni wolne",
  holiday: "Dzień wolny",
  year: "Rok",
  date: "Data",
  editHoliday: "Edytuj dzień wolny",
  deleteHoliday: "Usuń dzień wolny",

  // Shifts - Zmiany
  shifts: "Zmiany",
  shift: "Zmiana",
  startTime: "Godzina rozpoczęcia",
  endTime: "Godzina zakończenia",
  location: "Lokalizacja",
  days: "Dni",
  editShift: "Edytuj zmianę",
  deleteShift: "Usuń zmianę",
  edit: "Edytuj",

  // Toast messages - Komunikaty toast
  createdDepartment: "Utworzono dział",
  failedToCreateDepartment: "Nie udało się utworzyć działu: {{message}}",

  // Department Form - Formularz działu
  newDepartment: "Nowy dział",
  departmentName: "Nazwa działu",
  parentDepartment: "Dział nadrzędny",

  // Attribute Form - Formularz atrybutu
  editAttribute: "Edytuj atrybut",
  dataType: "Typ danych",
  dataTypeCannotBeChanged: "Typ danych nie może być zmieniony",
  listOptions: "Opcje listy",
  selfManaged: "Samozarządzanie",
  selfManagedDescription: "Użytkownicy mogą sami aktualizować tę wartość",

  // Holiday Form - Formularz dnia wolnego
  newHoliday: "Nowy dzień wolny",
  holidayName: "Nazwa dnia wolnego",

  // Shift Form - Formularz zmiany
  newShift: "Nowa zmiana",
  shiftName: "Nazwa zmiany",
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela"
} as const;
