export const errors = {
  // General errors - Błędy ogólne
  generic: "Coś poszło nie tak. Spróbuj ponownie.",
  notFound: "Strona nie znaleziona",
  unauthorized: "Nie masz uprawnień do tej strony",
  forbidden: "Nie masz uprawnień do wykonania tej akcji",
  serverError: "Błąd serwera. Spróbuj ponownie później.",
  networkError: "Błąd sieci. Sprawdź połączenie.",
  timeout: "Upłynął limit czasu. Spróbuj ponownie.",

  // Validation errors - Błędy walidacji
  required: "To pole jest wymagane",
  invalidEmail: "Wprowadź prawidłowy adres email",
  invalidPhone: "Wprowadź prawidłowy numer telefonu",
  invalidUrl: "Wprowadź prawidłowy adres URL",
  invalidDate: "Wprowadź prawidłową datę",
  invalidNumber: "Wprowadź prawidłową liczbę",
  minLength: "Musi mieć co najmniej {{min}} znaków",
  maxLength: "Może mieć maksymalnie {{max}} znaków",
  minValue: "Musi być co najmniej {{min}}",
  maxValue: "Może być maksymalnie {{max}}",
  passwordTooWeak: "Hasło jest zbyt słabe",
  passwordsDoNotMatch: "Hasła nie są zgodne",

  // Auth errors - Błędy autoryzacji
  invalidCredentials: "Nieprawidłowy email lub hasło",
  accountLocked: "Twoje konto zostało zablokowane. Skontaktuj się z pomocą.",
  sessionExpired: "Twoja sesja wygasła. Zaloguj się ponownie.",
  emailAlreadyExists: "Konto z tym adresem email już istnieje",

  // CRUD errors - Błędy operacji
  createFailed: "Nie udało się utworzyć: {{item}}",
  updateFailed: "Nie udało się zaktualizować: {{item}}",
  deleteFailed: "Nie udało się usunąć: {{item}}",
  loadFailed: "Nie udało się wczytać: {{item}}",
  saveFailed: "Nie udało się zapisać: {{item}}",

  // File errors - Błędy plików
  fileTooLarge: "Plik jest za duży. Maksymalny rozmiar to {{size}}",
  invalidFileType: "Nieprawidłowy typ pliku. Dozwolone typy: {{types}}",
  uploadFailed: "Nie udało się przesłać pliku"
} as const;
