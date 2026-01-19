export const sales = {
  // Module title
  title: "Sales",

  // Navigation groups
  manage: "Manage",
  configure: "Configure",

  // Navigation items
  portals: "Portals",
  noQuotes: "No Quotes",
  types: "Types",

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

  // Charts / KPIs
  quoteCount: "Quotes",
  rfqCount: "RFQs",
  salesFunnel: "Sales Funnel",
  salesOrderCount: "Sales Orders",
  salesOrderRevenue: "Sales Revenue",
  salesRevenue: "Sales Revenue",
  lastMonth: "Last Month",
  allCustomers: "All Customers",
  exportCsv: "Export CSV",

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
  quoteId: "Quote ID",
  quoteNumber: "Quote Number",
  quoteLocation: "Quote Location",
  quoteDescription: "A quote is a set of prices for specific parts and quantities.",
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
  rfqId: "RFQ ID",
  rfqNumber: "RFQ Number",
  rfqLocation: "RFQ Location",
  rfqDate: "RFQ Date",
  rfqFormDescription: "A sales request for quote (RFQ) is a customer inquiry for pricing on a set of parts and quantities. It may result in a quote.",

  // Customer Status
  customerStatus: "Customer Status",
  customerStatuses: "Customer Statuses",
  viewCustomers: "View Customers",
  editCustomerStatus: "Edit Customer Status",
  deleteCustomerStatus: "Delete Customer Status",

  // Customer Type
  customerType: "Customer Type",
  editCustomerType: "Edit Customer Type",
  deleteCustomerType: "Delete Customer Type",

  // No Quote Reasons
  reason: "Reason",
  reasons: "Reasons",
  editReason: "Edit Reason",
  deleteReason: "Delete Reason",

  // Customer Portals
  customerPortal: "Customer Portal",
  customerPortals: "Customer Portals",
  portalLink: "Portal Link",
  editPortal: "Edit Portal",
  deletePortal: "Delete Portal",

  // Customer actions
  edit: "Edit",
  delete: "Delete",
  customerTypes: "Customer Types",
  contacts: "Contacts",
  confirmDeleteCustomer: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteQuote: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteSalesOrder: "Are you sure you want to delete {{name}}? This cannot be undone.",
  confirmDeleteRfq: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Toast messages - Success
  createdNoQuoteReason: "Created no quote reason",
  createdCustomerPortal: "Created customer portal",
  createdCustomerStatus: "Created customer status",
  createdCustomerType: "Created customer type",
  createdCustomer: "Created customer: {{name}}",
  purchaseOrderRemoved: "Purchase order removed successfully",
  successfullyCopiedQuote: "Successfully copied quote",
  successfullyCreatedRevision: "Successfully created a new revision",
  fileDeleted: "{{name}} deleted successfully",
  modelRemovedFromLine: "Model removed from line",
  fileMovedToBucket: "Moved {{name}} to {{bucket}} bucket",
  fileUploaded: "Uploaded: {{name}}",
  partsBucket: "Parts",
  opportunityBucket: "Opportunity",

  // Toast messages - Errors
  failedToCreateNoQuoteReason: "Failed to create no quote reason: {{message}}",
  failedToCreateCustomerPortal: "Failed to create customer portal: {{message}}",
  failedToCreateCustomerStatus: "Failed to create customer status: {{message}}",
  failedToCreateCustomerType: "Failed to create customer type: {{message}}",
  failedToCreateCustomer: "Failed to create customer: {{message}}",
  failedToUpdateQuoteLine: "Failed to update quote line",
  failedToUpdateItemCost: "Failed to update item cost",
  failedToInsertQuoteLine: "Failed to insert quote line",
  failedToUploadImage: "Failed to upload image",
  carbonClientNotAvailable: "Carbon client not available",
  carbonClientNotFound: "Carbon client not found",
  failedToInitializeCarbonClient: "Failed to initialize Carbon client",
  failedToUpdateOpportunityWithPurchaseOrder: "Failed to update opportunity with purchase order",
  failedToRemovePurchaseOrder: "Failed to remove purchase order",
  failedToLoadCustomerPartDetails: "Failed to load customer part details",
  failedToLoadItemDetails: "Failed to load item details",
  failedToLoadConfigurationParameters: "Failed to load configuration parameters",
  itemCannotBeAddedToItself: "An item cannot be added to itself.",
  failedToLoadJobOperations: "Failed to load job operations",
  errorFetchingCustomerData: "Error fetching customer data",
  errorDeletingFile: "Error deleting file",
  errorRemovingModelFromRfqLine: "Error removing model from RFQ line",
  errorRemovingModelFromQuoteLine: "Error removing model from quote line",
  errorRemovingModelFromSalesOrderLine: "Error removing model from sales order line",
  errorRemovingModelFromInvoiceLine: "Error removing model from sales invoice line",
  modelDataMissing: "Model data is missing",
  errorDownloadingFile: "Error downloading file",
  cannotUploadToPartsBucketWithoutItemId: "Cannot upload to parts bucket without item ID",
  failedToUploadFile: "Failed to upload file: {{name}}",
  cannotMoveToPartsBucketWithoutItemId: "Cannot move to parts bucket without item ID",
  fileAlreadyInSelectedBucket: "File is already in the selected bucket",
  failedToDownloadFileForMoving: "Failed to download file for moving",
  failedToUploadFileToNewLocation: "Failed to upload file to new location",
  failedToDeleteFileFromOldLocation: "Failed to delete file from old location",
  errorMovingFile: "Error moving file",
  unableToGetCompanyId: "Unable to get company ID",

  // Toast messages - Info
  uploadingFile: "Uploading {{name}}",

  // Customer Form
  customerOverview: "Customer Overview",
  newCustomer: "New Customer",
  customerDescription: "A customer is a business or person who buys your parts or services.",
  selectCustomerStatus: "Select Customer Status",
  selectCustomerType: "Select Customer Type",
  taxPercent: "Tax Percent",
  salesContact: "Sales Contact",
  invoicingContact: "Invoicing Contact",

  // Sales Order Form
  newSalesOrder: "New Sales Order",
  salesOrderDescription: "A sales order contains information about the agreement between the company and a specific customer for parts and services.",
  salesOrderId: "Sales Order ID",
  customerPoNumber: "Customer PO Number",
  purchasingContact: "Purchasing Contact",
  engineeringContact: "Engineering Contact",
  customerLocation: "Customer Location",
  quoteAcceptedBy: "Quote Accepted By",
  quoteAcceptedByEmail: "Quote Accepted By Email",
  requestedDate: "Requested Date",
  requestedDateHelper: "The date the customer expects to receive the goods",
  promisedDateHelper: "The date the customer expects to receive the goods",
  salesLocation: "Sales Location",

  // Customer Accounting Form
  customerAccounting: "Customer Accounting",
  taxId: "Tax ID",
  postingGroup: "Posting Group",
  selectPostingGroup: "Select Posting Group",

  // Customer Payment Form
  paymentTerms: "Payment Terms",
  invoiceCustomer: "Invoice Customer",
  invoiceLocation: "Invoice Location",
  invoiceContact: "Invoice Contact",
  paymentTerm: "Payment Term",

  // Customer Shipping Form
  shipping: "Shipping",
  shippingCustomer: "Shipping Customer",
  shippingLocation: "Shipping Location",
  shippingContact: "Shipping Contact",

  // Customer Contact Form
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

  // Customer Location Form
  newLocation: "New Location",
  editLocation: "Edit Location",

  // Quote Payment Form
  payment: "Payment",

  // Quote Line Form
  quoteLine: "Quote Line",
  newQuoteLine: "New Quote Line",
  quoteLineDescription: "A quote line contains pricing and lead times for a particular part",
  deleteLine: "Delete Line",
  viewItemMaster: "View Item Master",
  part: "Part",
  shortDescription: "Short Description",
  method: "Method",
  lineStatus: "Line Status",
  customerPartNumber: "Customer Part Number",
  customerPartRevision: "Customer Part Revision",
  noQuoteReason: "No Quote Reason",
  quantity: "Quantity",
  tax: "Tax",
  configureItem: "Configure",

  // Sales Order Line Form
  salesOrderLine: "Sales Order Line",
  newSalesOrderLine: "New Sales Order Line",
  salesOrderLineDescription: "A sales order line contains order details for a particular item",
  unitOfMeasure: "Unit of Measure",
  unitPrice: "Unit Price",
  shippingCost: "Shipping Cost",
  addOnCost: "Add-On Cost",
  shelf: "Shelf",

  // Sales RFQ Line Form
  rfqLine: "RFQ Line",
  newRfqLine: "New RFQ Line",
  rfqLineDescription: "An RFQ line contains part and quantity information about the requested item",
  description: "Description"
} as const;
