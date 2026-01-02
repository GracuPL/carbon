export const items = {
  // Module title
  title: "Items",

  // Entity types
  part: "Part",
  parts: "Parts",
  material: "Material",
  materials: "Materials",
  tool: "Tool",
  tools: "Tools",
  consumable: "Consumable",
  consumables: "Consumables",

  // Table headers
  partId: "Part ID",
  materialId: "Material ID",
  description: "Description",
  itemGroup: "Item Group",
  tracking: "Tracking",
  defaultMethod: "Default Method",
  replenishment: "Replenishment",
  tags: "Tags",
  createdBy: "Created By",
  createdAt: "Created At",
  updatedBy: "Updated By",
  updatedAt: "Updated At",
  active: "Active",
  inactive: "Inactive",
  activeStatuses: "Active Statuses",

  // Configuration entities
  dimension: "Dimension",
  dimensions: "Dimensions",
  finish: "Finish",
  finishes: "Finishes",
  grade: "Grade",
  grades: "Grades",
  shape: "Shape",
  shapes: "Shapes",
  substance: "Substance",
  substances: "Substances",
  type: "Type",
  types: "Types",
  unit: "Unit",
  units: "Units",
  itemGroups: "Item Groups",

  // Actions
  addPart: "Add Part",
  addMaterial: "Add Material",
  addTool: "Add Tool",
  addConsumable: "Add Consumable",
  editPart: "Edit Part",
  deletePart: "Delete Part",
  confirmDeletePart: "Are you sure you want to delete {{name}}? This cannot be undone.",
  versions: "Versions",
  revision: "Revision",
  update: "Update",

  // Tracking types
  inventory: "Inventory",
  lot: "Lot",
  serial: "Serial",
  none: "None",

  // Method types
  make: "Make",
  buy: "Buy",

  // Replenishment
  demandBased: "Demand-Based",
  planBased: "Plan-Based",
  fixedReorder: "Fixed Reorder"
} as const;
