export const inventory = {
  // Module title
  title: "Inventory",

  // Entities
  item: "Item",
  items: "Items",
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

  // Statuses
  inStock: "In Stock",
  outOfStock: "Out of Stock",
  lowStock: "Low Stock",
  reserved: "Reserved"
} as const;
