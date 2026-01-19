export const invoicing = {
  // Module title
  title: "Invoicing",

  // Navigation groups
  manage: "Manage",
  purchasing: "Purchasing",

  // Entities
  salesInvoice: "Sales Invoice",
  salesInvoices: "Sales Invoices",
  purchaseInvoice: "Purchase Invoice",
  purchaseInvoices: "Purchase Invoices",

  // Table headers
  invoiceNumber: "Invoice Number",
  customer: "Customer",
  invoiceCustomer: "Invoice Customer",
  supplier: "Supplier",
  invoiceSupplier: "Invoice Supplier",
  customerPo: "Customer PO",
  supplierRef: "Supplier Ref.",
  status: "Status",
  statuses: "Statuses",
  invoiceTotal: "Invoice Total",
  orderTotal: "Order Total",
  assignee: "Assignee",
  issuedDate: "Issued Date",
  dueDate: "Due Date",
  paidDate: "Paid Date",
  postingDate: "Posting Date",
  paymentMethod: "Payment Method",
  createdBy: "Created By",
  createdAt: "Created At",
  updatedBy: "Updated By",
  updatedAt: "Updated At",

  // Actions
  edit: "Edit",
  delete: "Delete",
  confirmDeleteSalesInvoice: "Are you sure you want to permanently delete {{name}}?",
  confirmDeletePurchaseInvoice: "Are you sure you want to permanently delete {{name}}?",

  // Toast messages
  carbonClientNotFound: "Carbon client not found",
  errorFetchingSupplierData: "Error fetching supplier data",
  errorFetchingCustomerData: "Error fetching customer data",

  // Form titles and descriptions
  newPurchaseInvoice: "New Purchase Invoice",
  purchaseInvoiceDescription: "A purchase invoice is a document that specifies the products or services purchased by a customer and the corresponding cost.",
  newSalesInvoice: "New Sales Invoice",
  salesInvoiceDescription: "A sales invoice is a document that specifies the products or services sold to a customer and the corresponding cost.",

  // Form labels
  invoiceId: "Invoice ID",
  supplierInvoiceNumber: "Supplier Invoice Number",
  invoiceSupplierLocation: "Invoice Supplier Location",
  invoiceSupplierContact: "Invoice Supplier Contact",
  customerInvoiceNumber: "Customer Invoice Number",
  invoiceCustomerLocation: "Invoice Customer Location",
  invoiceCustomerContact: "Invoice Customer Contact",
  dateIssued: "Date Issued",
  paymentTerms: "Payment Terms",

  // Invoice Line Form
  newSalesInvoiceLine: "New Sales Invoice Line",
  newPurchaseInvoiceLine: "New Purchase Invoice Line",
  salesInvoiceLineDescription: "A sales invoice line contains invoice details for a particular item",
  purchaseInvoiceLineDescription: "A purchase invoice line contains invoice details for a particular item",
  description: "Description",
  method: "Method",
  quantity: "Quantity",
  unitPrice: "Unit Price",
  supplierUnitPrice: "Supplier Unit Price",
  shipping: "Shipping",
  addOnCost: "Add On Cost",
  tax: "Tax",
  taxPercent: "Tax Percent",
  location: "Location",
  shelf: "Shelf",
  unitOfMeasure: "Unit of Measure",
  batchItemsRequireSalesOrder: "Batch items require a sales order",
  serialItemsRequireSalesOrder: "Serial items require a sales order",
  makeItemsCannotBeInvoiced: "Make items cannot be invoiced directly. Change method to Pick to continue."
} as const;
