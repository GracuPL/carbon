export const documents = {
  // Module title - Tytuł modułu
  title: "Dokumenty",

  // Navigation items - Elementy nawigacji
  allDocuments: "Wszystkie dokumenty",
  myDocuments: "Moje dokumenty",
  recent: "Ostatnie",
  pinned: "Przypięte",
  trash: "Kosz",

  // Entities - Encje
  document: "Dokument",

  // Table headers - Nagłówki tabeli
  name: "Nazwa",
  sourceDocument: "Dokument źródłowy",
  labels: "Etykiety",
  size: "Rozmiar",
  type: "Typ",
  fileExtension: "Rozszerzenie pliku",
  createdBy: "Utworzył",
  createdAt: "Data utworzenia",
  updatedBy: "Zaktualizował",
  updatedAt: "Data aktualizacji",

  // Actions - Akcje
  edit: "Edytuj",
  download: "Pobierz",
  favorite: "Dodaj do ulubionych",
  moveToTrash: "Przenieś do kosza",
  restoreFromTrash: "Przywróć z kosza",
  permanentlyDelete: "Usuń na stałe",
  restore: "Przywróć",
  create: "Utwórz",

  // Confirmation dialogs - Dialogi potwierdzenia
  confirmMoveToTrash: "Czy na pewno chcesz przenieść {{name}} do kosza?",
  confirmRestore: "Czy na pewno chcesz przywrócić {{name}} z kosza?",
  confirmPermanentDelete: "Czy na pewno chcesz trwale usunąć {{name}}? Tej operacji nie można cofnąć.",

  // Toast messages - Komunikaty toast
  uploadingFile: "Przesyłanie {{name}}",
  failedToUploadFile: "Nie udało się przesłać pliku",
  errorDownloadingFile: "Błąd pobierania pliku"
} as const;
