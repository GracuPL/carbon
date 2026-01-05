export const documents = {
  // Module title
  title: "Documents",

  // Navigation items
  allDocuments: "All Documents",
  myDocuments: "My Documents",
  recent: "Recent",
  pinned: "Pinned",
  trash: "Trash",

  // Entities
  document: "Document",

  // Table headers
  name: "Name",
  sourceDocument: "Source Document",
  labels: "Labels",
  size: "Size",
  type: "Type",
  fileExtension: "File Extension",
  createdBy: "Created By",
  createdAt: "Created At",
  updatedBy: "Updated By",
  updatedAt: "Updated At",

  // Actions
  edit: "Edit",
  download: "Download",
  favorite: "Favorite",
  moveToTrash: "Move to Trash",
  restoreFromTrash: "Restore from Trash",
  permanentlyDelete: "Permanently Delete",
  restore: "Restore",
  create: "Create",

  // Confirmation dialogs
  confirmMoveToTrash: "Are you sure you want to move {{name}} to the trash?",
  confirmRestore: "Are you sure you want to restore {{name}} from the trash?",
  confirmPermanentDelete: "Are you sure you want to delete {{name}} permanently? This cannot be undone."
} as const;
