export const purchasing = {
  // Module title
  title: "Purchasing",

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
  confirmDeleteSupplierQuote: "Are you sure you want to delete {{name}}? This cannot be undone."
} as const;
