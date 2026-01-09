export const account = {
  // Page titles
  title: "Account",
  profile: "Profile",
  theme: "Theme",
  password: "Password",
  security: "Security",
  notifications: "Notifications",
  preferences: "Preferences",

  // Profile
  profileDescription:
    "This information will be visible to all users, so be careful what you share.",
  email: "Email",
  firstName: "First Name",
  lastName: "Last Name",
  fullName: "Full Name",
  about: "About",
  aboutPlaceholder: "Tell us a little about yourself...",
  avatar: "Avatar",
  changeAvatar: "Change Avatar",
  removeAvatar: "Remove Avatar",
  uploadPhoto: "Upload Photo",

  // Theme
  themeDescription: "Choose the theme that suits you best.",
  lightMode: "Light Mode",
  darkMode: "Dark Mode",
  systemTheme: "System",
  themeColor: "Theme Color",

  // Password
  currentPassword: "Current Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
  changePassword: "Change Password",
  passwordRequirements: "Password must be at least 8 characters long",
  passwordMismatch: "Passwords do not match",

  // Language
  language: "Language",
  languageDescription: "Choose your preferred language for the interface.",
  selectLanguage: "Select Language",

  // Messages
  profileUpdated: "Profile updated successfully",
  avatarUpdated: "Avatar updated successfully",
  avatarRemoved: "Avatar removed successfully",
  themeUpdated: "Theme updated successfully",
  passwordUpdated: "Password updated successfully",
  languageUpdated: "Language updated successfully",
  updateFailed: "Failed to update",

  // Toast messages
  uploadingFile: "Uploading {{name}}",
  failedToUploadFile: "Failed to upload file: {{name}}",
  uploadedFile: "Uploaded: {{name}}",
  failedToResizeImage: "Failed to resize image",
  failedToUploadImage: "Failed to upload image",
  failedToRemoveImage: "Failed to remove image"
} as const;
