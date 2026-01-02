export const inventory = {
  // Module title
  title: "Inventory",

  // Main views
  quantities: "Quantities",
  kanbans: "Kanbans",
  trackedEntities: "Tracked Entities",
  traceability: "Traceability",

  // Entities
  item: "Item",
  items: "Items",
  itemId: "Item ID",
  part: "Part",
  parts: "Parts",
  location: "Location",
  locations: "Locations",
  shelf: "Shelf",
  shelves: "Shelves",
  warehouse: "Warehouse",
  warehouses: "Warehouses",
  receipt: "Receipt",
  receipts: "Receipts",
  shipment: "Shipment",
  shipments: "Shipments",
  stockTransfer: "Stock Transfer",
  stockTransfers: "Stock Transfers",
  warehouseTransfer: "Warehouse Transfer",
  warehouseTransfers: "Warehouse Transfers",
  shippingMethod: "Shipping Method",
  shippingMethods: "Shipping Methods",

  // Table headers
  onHand: "On Hand",
  days: "Days",
  leadTime: "Lead Time",
  reorderPolicy: "Reorder Policy",
  replenishment: "Replenishment",
  usagePerDay: "Usage/Day (30d)",
  usagePerDay90: "Usage/Day (90d)",
  onPurchaseOrder: "On Purchase Order",
  onJobs: "On Jobs",
  onJobsDemand: "On Jobs (Demand)",
  onSalesOrder: "On Sales Order",
  unitOfMeasure: "Unit of Measure",
  shape: "Shape",
  substance: "Substance",
  finish: "Finish",
  grade: "Grade",
  dimension: "Dimension",
  type: "Type",
  itemType: "Item Type",
  active: "Active",
  inactive: "Inactive",
  activeStatuses: "Active Statuses",

  // Fields
  quantity: "Quantity",
  quantityOnHand: "Quantity on Hand",
  quantityAvailable: "Quantity Available",
  quantityReserved: "Quantity Reserved",
  unitCost: "Unit Cost",
  totalValue: "Total Value",
  batchNumber: "Batch Number",
  serialNumber: "Serial Number",
  lotNumber: "Lot Number",

  // Receipt fields
  receiptId: "Receipt ID",
  sourceDocument: "Source Document",
  sourceDocumentId: "Source Document ID",
  status: "Status",
  statuses: "Statuses",
  postedBy: "Posted By",
  postingDate: "Posting Date",
  assignee: "Assignee",
  supplier: "Supplier",
  invoiced: "Invoiced",
  invoicedStatuses: "Invoiced Statuses",
  externalRef: "External Ref.",
  createdBy: "Created By",
  createdAt: "Created At",
  updatedBy: "Updated By",
  updatedAt: "Updated At",
  editReceipt: "Edit Receipt",
  viewReceipt: "View Receipt",
  deleteReceipt: "Delete Receipt",
  confirmDeleteReceipt: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Shipment fields
  shipmentId: "Shipment ID",
  customer: "Customer",
  editShipment: "Edit Shipment",
  viewShipment: "View Shipment",
  deleteShipment: "Delete Shipment",
  confirmDeleteShipment: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Kanban fields
  kanban: "Kanban",
  reorderQty: "Reorder Qty.",
  release: "Release",
  start: "Start",
  complete: "Complete",
  create: "Create",
  settings: "Settings",
  edit: "Edit",
  viewItemMaster: "View Item Master",
  actions: "Actions",
  printLabels: "Print Labels",

  // Actions
  receive: "Receive",
  ship: "Ship",
  transfer: "Transfer",
  adjust: "Adjust",
  count: "Count",
  recalculate: "Recalculate",

  // Statuses
  inStock: "In Stock",
  outOfStock: "Out of Stock",
  lowStock: "Low Stock",
  reserved: "Reserved",

  // Reorder policies
  demandBased: "Demand-Based",
  planBased: "Plan-Based",
  fixedReorder: "Fixed Reorder",

  // Shelf fields
  name: "Name",
  newShelf: "New Shelf",
  editShelf: "Edit Shelf",
  deleteShelf: "Delete Shelf",
  confirmDeleteShelf: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Shipping method fields
  carrier: "Carrier",
  trackingUrl: "Tracking URL",
  carrierAccount: "Carrier Account",
  editShippingMethod: "Edit Shipping Method",
  deleteShippingMethod: "Delete Shipping Method",

  // Stock transfer fields
  stockTransferId: "Stock Transfer ID",
  completedAt: "Completed At",
  addStockTransfer: "Add Stock Transfer",
  editStockTransfer: "Edit Stock Transfer",
  viewStockTransfer: "View Stock Transfer",
  deleteStockTransfer: "Delete Stock Transfer",
  confirmDeleteStockTransfer: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Warehouse transfer fields
  warehouseTransferId: "Warehouse Transfer ID",
  sourceLocation: "Source Location",
  destinationLocation: "Destination Location",
  addWarehouseTransfer: "Add Warehouse Transfer",
  editWarehouseTransfer: "Edit Warehouse Transfer",
  viewWarehouseTransfer: "View Warehouse Transfer",
  deleteWarehouseTransfer: "Delete Warehouse Transfer",
  confirmDeleteWarehouseTransfer: "Are you sure you want to delete {{name}}? This cannot be undone.",

  // Tracked entities
  trackedEntity: "Tracked Entity",
  entity: "Entity",
  entityId: "Entity ID",
  entityType: "Entity Type",
  entityTypes: "Entity Types",
  serialBatchNumber: "Serial/Batch #",
  viewTraceabilityGraph: "View Traceability Graph",

  // Warehouse transfer additional fields
  transferId: "Transfer ID",
  fromLocation: "From Location",
  toLocation: "To Location",
  reference: "Reference",
  transferDate: "Transfer Date",
  expectedReceipt: "Expected Receipt",
  viewTransfer: "View Transfer",
  editTransfer: "Edit Transfer",
  deleteTransfer: "Delete Transfer"
} as const;
