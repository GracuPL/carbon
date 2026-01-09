export const purchasing = {
  // Module title
  title: "Purchasing",

  // Navigation groups
  manage: "Manage",
  plan: "Plan",
  configure: "Configure",

  // Navigation items
  planning: "Planning",
  types: "Types",

  // Dashboard cards
  openPurchaseOrders: "Open Purchase Orders",
  openPurchaseInvoices: "Open Purchase Invoices",
  activeSupplierQuotes: "Active Supplier Quotes",
  viewOpenPOs: "View Open POs",
  viewOpenInvoices: "View Open Invoices",
  viewActiveQuotes: "View Active Quotes",

  // Dashboard sections
  recentlyCreated: "Recently Created",
  recentlyCreatedDescription: "Recently created purchasing documents",
  assignedToMe: "Assigned to Me",
  assignedToMeDescription: "Purchasing documents currently assigned to me",

  // Entities
  supplier: "Supplier",
  suppliers: "Suppliers",
  allSuppliers: "All Suppliers",
  purchaseOrder: "Purchase Order",
  purchaseOrders: "Purchase Orders",
  purchaseInvoice: "Purchase Invoice",
  purchaseInvoices: "Purchase Invoices",
  supplierQuote: "Supplier Quote",
  supplierQuotes: "Supplier Quotes",

  // Table headers
  document: "Document",
  status: "Status",
  statuses: "Statuses",
  name: "Name",
  supplierStatus: "Supplier Status",
  type: "Type",
  accountManager: "Account Manager",
  tags: "Tags",
  currency: "Currency",
  phone: "Phone",
  fax: "Fax",
  website: "Website",
  createdBy: "Created By",
  createdAt: "Created At",
  updatedBy: "Updated By",
  updatedAt: "Updated At",
  assignee: "Assignee",
  location: "Location",

  // Purchase Order fields
  poNumber: "PO Number",
  supplierRef: "Supplier Ref.",
  orderDate: "Order Date",
  requestedDate: "Requested Date",
  promisedDate: "Promised Date",
  orderTotal: "Order Total",
  shippingMethod: "Shipping Method",
  paymentMethod: "Payment Method",
  dropShipment: "Drop Shipment",
  dropShipmentStatuses: "Drop Shipment Statuses",

  // Supplier Quote fields
  quoteNumber: "Quote Number",
  supplierReference: "Supplier Reference",
  quotedDate: "Quoted Date",
  expirationDate: "Expiration Date",

  // Fields
  leadTime: "Lead Time",
  paymentTerms: "Payment Terms",
  deliveryDate: "Delivery Date",

  // Statuses
  draft: "Draft",
  sent: "Sent",
  received: "Received",
  partiallyReceived: "Partially Received",
  closed: "Closed",

  // Actions
  newPurchaseOrder: "New Purchase Order",
  newSupplier: "New Supplier",
  sendOrder: "Send Order",
  receiveGoods: "Receive Goods",
  receive: "Receive",
  finalize: "Finalize",
  exportCsv: "Export CSV",
  edit: "Edit",
  delete: "Delete",
  update: "Update",
  deletePurchaseOrders: "Delete Purchase Orders",
  editSupplier: "Edit Supplier",
  supplierTypes: "Supplier Types",
  contacts: "Contacts",
  confirmDeletePurchaseOrder: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteSupplierQuote: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Supplier Status
  viewSuppliers: "View Suppliers",
  editSupplierStatus: "Edit Supplier Status",
  deleteSupplierStatus: "Delete Supplier Status",

  // Supplier Type
  supplierType: "Supplier Type",
  editSupplierType: "Edit Supplier Type",
  deleteSupplierType: "Delete Supplier Type",

  // Planning
  planning: "Planning",
  partId: "Part ID",
  noSupplier: "No Supplier",
  reorderPolicy: "Reorder Policy",
  onHand: "On Hand",
  order: "Order",
  blocked: "Blocked",
  recalculate: "Recalculate",
  orderParts: "Order Parts",
  presentWeek: "Present Week",
  week: "Week",

  // Toast messages
  failedToLoadSupplierPartDetails: "Failed to load supplier part details",
  failedToLoadItemDetails: "Failed to load item details",
  errorDownloadingFile: "Error downloading file",
  carbonClientNotAvailable: "Carbon client not available",
  ordersSubmitted: "Orders submitted",
  supplierUpdated: "Supplier updated",
  supplierAddedAndSelected: "Supplier added and selected",
  errorDeletingFile: "Error deleting file",
  fileDeletedSuccessfully: "{{name}} deleted successfully",
  uploadingFile: "Uploading {{name}}",
  failedToUploadFile: "Failed to upload file: {{name}}",
  uploadedFile: "Uploaded: {{name}}",
  failedToUploadImage: "Failed to upload image",
  carbonClientNotFound: "Carbon client not found",
  errorFetchingSupplierData: "Error fetching supplier data",
  failedToLoadReceipts: "Failed to load receipts",
  failedToLoadInvoices: "Failed to load invoices",
  failedToLoadShipments: "Failed to load shipments",
  failedToUpdateSupplierQuoteLine: "Failed to update supplier quote line",
  failedToInsertSupplierQuoteLine: "Failed to insert supplier quote line",
  createdSupplierStatus: "Created supplier status",
  failedToCreateSupplierStatus: "Failed to create supplier status: {{message}}",
  createdSupplierType: "Created supplier type",
  failedToCreateSupplierType: "Failed to create supplier type: {{message}}",
  createdSupplierContact: "Created supplier contact",
  failedToCreateSupplierContact: "Failed to create supplier contact: {{message}}",
  createdSupplierProcess: "Created supplier process",
  failedToCreateSupplierProcess: "Failed to create supplier process",
  createdSupplier: "Created supplier: {{name}}",
  failedToCreateSupplier: "Failed to create supplier: {{message}}",
  createdSupplierLocation: "Created supplier location",
  failedToCreateSupplierLocation: "Failed to create supplier location: {{message}}",

  // Charts / KPIs
  supplierQuoteCount: "Supplier Quotes",
  purchaseOrderCount: "Purchase Orders",
  purchaseInvoiceCount: "Purchase Invoices",
  purchaseOrderAmount: "Purchase Order Amount",
  purchaseInvoiceAmount: "Purchase Invoice Amount",
  noDataWithinRange: "No data within range"
} as const;
