export const settings = {
  // Module title
  title: "Settings",

  // Navigation groups
  company: "Company",
  modules: "Modules",
  system: "System",
  billing: "Billing",
  labels: "Labels",
  logos: "Logos",
  inventory: "Inventory",
  items: "Items",
  purchasing: "Purchasing",
  production: "Production",
  quality: "Quality",
  sales: "Sales",
  resources: "Resources",
  integrations: "Integrations",

  // API Keys
  apiKey: "API Key",
  apiKeys: "API Keys",
  key: "Key",
  newApiKey: "New API Key",
  editApiKey: "Edit API Key",
  deleteApiKey: "Delete API Key",
  apiDocs: "API Docs",
  apiKeyWarning: "You can only see this key once. Store it safely.",

  // Sequences
  sequence: "Sequence",
  sequences: "Sequences",
  prefix: "Prefix",
  current: "Current",
  size: "Size",
  step: "Step",
  suffix: "Suffix",
  editSequence: "Edit Sequence",

  // Custom Fields
  customField: "Custom Field",
  customFields: "Custom Fields",
  table: "Table",
  module: "Module",
  fields: "Fields",
  newField: "New Field",
  viewCustomFields: "View Custom Fields",

  // Webhooks
  webhook: "Webhook",
  webhooks: "Webhooks",
  success: "Success",
  webhooksDocs: "Webhooks Docs",
  newWebhook: "New Webhook",
  editWebhook: "Edit Webhook",
  deleteWebhook: "Delete Webhook",
  notifications: "Notifications",
  insert: "Insert",
  update: "Update",
  deleteEvent: "Delete",
  webhookNameHelper: "This is a unique identifier for the webhook",
  webhookUrl: "Webhook URL",
  webhookUrlHelper: "The endpoint that receives a POST request with the updated data when the table is updated",
  active: "Active",

  // Common fields
  name: "Name",
  createdBy: "Created By",
  createdAt: "Created At",

  // Custom Fields Detail
  editCustomField: "Edit Custom Field",
  deleteCustomField: "Delete Custom Field",
  confirmDeleteCustomField: "Are you sure you want to delete the {{name}} field?",

  // Toast messages
  failedToResizeImage: "Failed to resize image",
  failedToUploadLogo: "Failed to upload logo",
  failedToRemoveImage: "Failed to remove image",
  createdWebhook: "Created webhook",
  failedToCreateWebhook: "Failed to create webhook: {{message}}",
  integrationNotFound: "Integration not found",

  // Company page
  companyHeading: "Company",

  // Sequence Form
  sequenceTitle: "{{name}} Sequence",
  fullYear: "Full Year",
  year: "Year",
  month: "Month",
  day: "Day",
  hour: "Hour",
  minute: "Minute",
  second: "Second",

  // Custom Field Form
  newCustomField: "New Custom Field",
  fieldName: "Field Name",
  sortOrder: "Sort Order",
  dataType: "Data Type",
  listOptions: "List Options",
  dataTypeCannotBeChanged: "Data type cannot be changed",
  customFieldTagsHelper: "These custom fields will only be available for entities with the same tags",

  // Integration Form
  installed: "Installed",
  publishedByCarbon: "Published by Carbon",
  howItWorks: "How it works",
  setupInstructions: "Setup Instructions",
  integrationDisclaimer: "Carbon Manufacturing Systems does not endorse any third-party software. Report any concerns about app content or behavior.",
  reportIntegration: "Report integration",
  install: "Install",

  // Theme Form
  theme: "Theme",
  themeDescription: "This updates the theme for all users of the application"
} as const;
