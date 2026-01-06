export const account = {
  // Page titles - Tytuły stron
  title: "Konto",
  profile: "Profil",
  theme: "Motyw",
  password: "Hasło",
  security: "Bezpieczeństwo",
  notifications: "Powiadomienia",
  preferences: "Preferencje",

  // Profile - Profil
  profileDescription:
    "Te informacje będą widoczne dla wszystkich użytkowników, więc uważaj co udostępniasz.",
  email: "Email",
  firstName: "Imię",
  lastName: "Nazwisko",
  fullName: "Imię i nazwisko",
  about: "O mnie",
  aboutPlaceholder: "Powiedz nam coś o sobie...",
  avatar: "Awatar",
  changeAvatar: "Zmień awatar",
  removeAvatar: "Usuń awatar",
  uploadPhoto: "Prześlij zdjęcie",

  // Theme - Motyw
  themeDescription: "Wybierz motyw, który najbardziej Ci odpowiada.",
  lightMode: "Tryb jasny",
  darkMode: "Tryb ciemny",
  systemTheme: "Systemowy",
  themeColor: "Kolor motywu",

  // Password - Hasło
  currentPassword: "Obecne hasło",
  newPassword: "Nowe hasło",
  confirmPassword: "Potwierdź hasło",
  changePassword: "Zmień hasło",
  passwordRequirements: "Hasło musi mieć co najmniej 8 znaków",
  passwordMismatch: "Hasła nie są zgodne",

  // Language - Język
  language: "Język",
  languageDescription: "Wybierz preferowany język interfejsu.",
  selectLanguage: "Wybierz język",

  // Messages - Wiadomości
  profileUpdated: "Profil został zaktualizowany",
  avatarUpdated: "Awatar został zaktualizowany",
  avatarRemoved: "Awatar został usunięty",
  themeUpdated: "Motyw został zaktualizowany",
  passwordUpdated: "Hasło zostało zaktualizowane",
  languageUpdated: "Język został zaktualizowany",
  updateFailed: "Nie udało się zaktualizować",

  // Toast messages - Komunikaty toast
  uploadingFile: "Przesyłanie {{name}}",
  failedToUploadFile: "Nie udało się przesłać pliku: {{name}}",
  uploadedFile: "Przesłano: {{name}}",
  failedToResizeImage: "Nie udało się zmniejszyć obrazu",
  failedToUploadImage: "Nie udało się przesłać obrazu",
  failedToRemoveImage: "Nie udało się usunąć obrazu"
} as const;
