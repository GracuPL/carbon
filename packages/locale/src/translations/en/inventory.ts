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
  usagePerDay: "Usage/Day",
  onPurchaseOrder: "On Purchase Order",
  onJobs: "On Jobs",

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
  fixedReorder: "Fixed Reorder"
} as const;
