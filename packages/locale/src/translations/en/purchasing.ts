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
  newSupplierStatus: "New Supplier Status",
  editSupplierStatus: "Edit Supplier Status",
  deleteSupplierStatus: "Delete Supplier Status",

  // Supplier Type
  supplierType: "Supplier Type",
  newSupplierType: "New Supplier Type",
  editSupplierType: "Edit Supplier Type",
  deleteSupplierType: "Delete Supplier Type",

  // Supplier Process
  supplierProcess: "Supplier Process",
  newSupplierProcess: "New Supplier Process",
  editSupplierProcess: "Edit Supplier Process",
  process: "Process",
  minimumCost: "Minimum Cost",
  standardLeadTime: "Standard Lead Time",

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
  noDataWithinRange: "No data within range",

  // Supplier Form
  supplierOverview: "Supplier Overview",
  supplierDescription: "A supplier is a business or person who sells you parts or services.",
  selectSupplierStatus: "Select Supplier Status",
  selectSupplierType: "Select Supplier Type",
  purchasingContact: "Purchasing Contact",
  invoicingContact: "Invoicing Contact",

  // Purchase Order Form
  purchaseOrderDescription: "A purchase order contains information about the agreement between the company and a specific supplier for parts and services.",
  purchaseOrderId: "Purchase Order ID",
  supplierLocation: "Supplier Location",
  supplierContact: "Supplier Contact",
  supplierOrderNumber: "Supplier Order Number",

  // Supplier Quote Form
  supplierQuoteDescription: "A supplier quote is a set of prices for specific parts and quantities.",
  supplierQuoteId: "Supplier Quote ID",
  supplierRefNumber: "Supplier Ref. Number",
  newSupplierQuote: "New Supplier Quote",

  // Supplier Accounting Form
  supplierAccounting: "Supplier Accounting",
  taxId: "Tax ID",
  postingGroup: "Posting Group",
  selectPostingGroup: "Select Posting Group",

  // Supplier Payment Form
  invoiceSupplier: "Invoice Supplier",
  invoiceLocation: "Invoice Location",
  invoiceContact: "Invoice Contact",
  paymentTerm: "Payment Term",

  // Supplier Shipping Form
  shipping: "Shipping",
  shippingSupplier: "Shipping Supplier",
  shippingLocation: "Shipping Location",
  shippingContact: "Shipping Contact",

  // Supplier Contact Form
  newContact: "New Contact",
  editContact: "Edit Contact",
  email: "Email",
  firstName: "First Name",
  lastName: "Last Name",
  title: "Title",
  mobilePhone: "Mobile Phone",
  homePhone: "Home Phone",
  workPhone: "Work Phone",
  notes: "Notes",

  // Supplier Location Form
  newLocation: "New Location",
  editLocation: "Edit Location",

  // Purchase Order Payment Form
  payment: "Payment",
  paymentComplete: "Payment Complete",

  // Purchase Order Delivery Form
  shippingCost: "Shipping Cost",
  deliveryLocation: "Delivery Location",
  trackingNumber: "Tracking Number",

  // Purchase Order Line Form
  purchaseOrderLine: "Purchase Order Line",
  newPurchaseOrderLine: "New Purchase Order Line",
  purchaseOrderLineDescription: "A purchase order line contains order details for a particular item",
  outsideProcessing: "Outside Processing",
  description: "Description",
  quantity: "Quantity",
  unitOfMeasure: "Unit of Measure",
  unitPrice: "Unit Price",
  tax: "Tax",
  taxPercent: "Tax Percent",
  shelf: "Shelf",
  job: "Job",
  operation: "Operation",

  // Supplier Quote Line Form
  supplierQuoteLine: "Supplier Quote Line",
  newSupplierQuoteLine: "New Supplier Quote Line",
  supplierQuoteLineDescription: "A supplier quote line contains pricing for a particular item",
  deleteLine: "Delete Line",
  part: "Part",
  shortDescription: "Short Description",
  supplierPartNumber: "Supplier Part Number",
  purchaseUnitOfMeasure: "Purchase Unit of Measure"
} as const;
