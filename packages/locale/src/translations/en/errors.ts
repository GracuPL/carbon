export const errors = {
  // General errors
  generic: "Something went wrong. Please try again.",
  notFound: "Page not found",
  unauthorized: "You are not authorized to access this page",
  forbidden: "You do not have permission to perform this action",
  serverError: "Server error. Please try again later.",
  networkError: "Network error. Please check your connection.",
  timeout: "Request timed out. Please try again.",

  // Validation errors
  required: "This field is required",
  invalidEmail: "Please enter a valid email address",
  invalidPhone: "Please enter a valid phone number",
  invalidUrl: "Please enter a valid URL",
  invalidDate: "Please enter a valid date",
  invalidNumber: "Please enter a valid number",
  minLength: "Must be at least {{min}} characters",
  maxLength: "Must be at most {{max}} characters",
  minValue: "Must be at least {{min}}",
  maxValue: "Must be at most {{max}}",
  passwordTooWeak: "Password is too weak",
  passwordsDoNotMatch: "Passwords do not match",

  // Auth errors
  invalidCredentials: "Invalid email or password",
  accountLocked: "Your account has been locked. Please contact support.",
  sessionExpired: "Your session has expired. Please log in again.",
  emailAlreadyExists: "An account with this email already exists",

  // CRUD errors
  createFailed: "Failed to create {{item}}",
  updateFailed: "Failed to update {{item}}",
  deleteFailed: "Failed to delete {{item}}",
  loadFailed: "Failed to load {{item}}",
  saveFailed: "Failed to save {{item}}",

  // File errors
  fileTooLarge: "File is too large. Maximum size is {{size}}",
  invalidFileType: "Invalid file type. Allowed types: {{types}}",
  uploadFailed: "Failed to upload file"
} as const;
