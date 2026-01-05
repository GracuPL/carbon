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
  confirmDeletePurchaseInvoice: "Are you sure you want to permanently delete {{name}}?"
} as const;
