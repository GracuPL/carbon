export const sales = {
  // Module title
  title: "Sales",

  // Dashboard cards
  openRFQs: "Open RFQs",
  openQuotes: "Open Quotes",
  openSalesOrders: "Open Sales Orders",
  viewOpenRFQs: "View Open RFQs",
  viewOpenQuotes: "View Open Quotes",
  viewOpenOrders: "View Open Orders",

  // Dashboard sections
  recentlyCreated: "Recently Created",
  recentlyCreatedDescription: "Newly created sales documents",
  assignedToMe: "Assigned to Me",
  assignedToMeDescription: "Sales documents currently assigned to me",

  // Charts
  salesRevenue: "Sales Revenue",
  lastMonth: "Last Month",
  allCustomers: "All Customers",

  // Entities
  customer: "Customer",
  customers: "Customers",
  quote: "Quote",
  quotes: "Quotes",
  order: "Order",
  orders: "Orders",
  rfq: "RFQ",
  rfqs: "RFQs",
  invoice: "Invoice",
  invoices: "Invoices",

  // Statuses
  draft: "Draft",
  sent: "Sent",
  confirmed: "Confirmed",
  toShipAndInvoice: "To Ship and Invoice",
  toShip: "To Ship",
  toInvoice: "To Invoice",
  needsApproval: "Needs Approval",
  inProgress: "In Progress",
  readyForQuote: "Ready for Quote",
  completed: "Completed",
  cancelled: "Cancelled",

  // Actions
  newQuote: "New Quote",
  newOrder: "New Order",
  newRFQ: "New RFQ",
  newInvoice: "New Invoice",
  convertToOrder: "Convert to Order",
  sendQuote: "Send Quote",
  confirmOrder: "Confirm Order",

  // Table headers
  document: "Document",
  status: "Status",
  statuses: "Statuses",
  name: "Name",
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

  // Quote fields
  quoteNumber: "Quote Number",
  customerRfq: "Customer RFQ",
  salesPerson: "Sales Person",
  estimator: "Estimator",
  dueDate: "Due Date",
  expirationDate: "Expiration Date",

  // Sales Order fields
  salesOrderNumber: "Sales Order Number",
  jobs: "Jobs",
  customerPo: "Customer PO",
  orderDate: "Order Date",
  orderTotal: "Order Total",
  promisedDate: "Promised Date",
  shippingMethod: "Shipping Method",
  paymentMethod: "Payment Method",
  dropShipment: "Drop Shipment",
  dropShipmentStatuses: "Drop Shipment Statuses",
  salesOrder: "Sales Order",
  salesOrders: "Sales Orders",

  // RFQ fields
  rfqNumber: "RFQ Number",
  rfqDate: "RFQ Date",

  // Customer actions
  edit: "Edit",
  delete: "Delete",
  customerTypes: "Customer Types",
  contacts: "Contacts",
  confirmDeleteCustomer: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteQuote: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteSalesOrder: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteRfq: "Are you sure you want to delete {{name}}? This cannot be undone."
} as const;
