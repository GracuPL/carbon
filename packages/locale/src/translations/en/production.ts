export const production = {
  // Module title
  title: "Production",

  // Navigation groups
  plan: "Plan",
  configure: "Configure",

  // Navigation items
  procedures: "Procedures",
  planning: "Planning",
  projections: "Projections",
  schedule: "Schedule",
  scrapReasons: "Scrap Reasons",

  // Dashboard cards
  activeJobs: "Active Jobs",
  viewActiveJobs: "View Active Jobs",
  jobsAssignedToMe: "Jobs Assigned to Me",
  viewAssignedJobs: "View Assigned Jobs",

  // Entities
  job: "Job",
  jobs: "Jobs",
  workCenter: "Work Center",
  workCenters: "Work Centers",
  operation: "Operation",
  operations: "Operations",
  method: "Method",
  methods: "Methods",

  // Charts / KPIs
  utilizationPercent: "Utilization (%)",
  workCenterUtilization: "Work Center Utilization",
  noUtilizationData: "No work center utilization data within range",
  estimatesVsActuals: "Estimates vs Actuals",
  noCompletedJobs: "No completed jobs within range",
  completionTime: "Completion Time",

  // Statuses
  pending: "Pending",
  inProgress: "In Progress",
  completed: "Completed",
  onHold: "On Hold",
  inactive: "Inactive",

  // Actions
  newJob: "New Job",
  startJob: "Start Job",
  completeJob: "Complete Job",
  viewMaintenanceDispatch: "View maintenance dispatch",
  exportCsv: "Export CSV",
  editJob: "Edit Job",
  deleteJob: "Delete Job",
  deleteJobs: "Delete Jobs",
  update: "Update",
  confirmDeleteJob: "Are you sure you want to delete the job: {{jobId}}?",

  // Work center cards
  blockedBy: "Blocked by",
  due: "Due",

  // Table headers
  jobId: "Job ID",
  item: "Item",
  tracking: "Tracking",
  quantity: "Quantity",
  customer: "Customer",
  salesOrder: "Sales Order",
  status: "Status",
  statuses: "Statuses",
  assignee: "Assignee",
  startDate: "Start Date",
  dueDate: "Due Date",
  deadlineType: "Deadline Type",
  tags: "Tags",
  orderQty: "Order Qty",
  inventoryQty: "Inventory Qty",
  productionQty: "Production Qty",
  scrapQty: "Scrap Qty",
  completedQty: "Completed Qty",
  shippedQty: "Shipped Qty",
  receivedQty: "Received Qty",
  location: "Location",
  createdBy: "Created By",
  createdAt: "Created At",
  updatedBy: "Updated By",
  updatedAt: "Updated At",

  // Procedures
  procedure: "Procedure",
  procedures: "Procedures",
  process: "Process",
  version: "Version",
  versions: "Versions",
  editProcedure: "Edit Procedure",
  deleteProcedure: "Delete Procedure",
  confirmDeleteProcedure: "Are you sure you want to delete this procedure?",
  name: "Name",

  // Scrap reasons
  scrapReason: "Scrap Reason",
  scrapReasons: "Scrap Reasons",
  editScrapReason: "Edit Scrap Reason",
  deleteScrapReason: "Delete Scrap Reason",

  // Planning
  planning: "Planning",
  partId: "Part ID",
  reorderPolicy: "Reorder Policy",
  onHand: "On Hand",
  type: "Type",
  blocked: "Blocked",
  order: "Order",
  orderParts: "Order Parts",
  recalculate: "Recalculate",
  presentWeek: "Present Week",
  week: "Week",

  // Demand Projections
  demandProjections: "Demand Projections",
  part: "Part",
  edit: "Edit",
  delete: "Delete",
  confirmDeleteProjection: "Are you sure you want to delete all projections for {{partId}}? This action cannot be undone.",

  // Job Materials Table
  required: "Required",
  onShelf: "On Shelf",
  incoming: "Incoming",
  transfer: "Transfer",
  materials: "Materials",
  removeTransfer: "Remove Transfer",
  removeOrder: "Remove Order",

  // Job Operations Table
  description: "Description",
  operationType: "Operation Type",
  qtyComplete: "Qty. Complete",
  qtyScrapped: "Qty. Scrapped",
  qtyReworked: "Qty. Reworked",

  // Job Operation Step Records Table
  step: "Step",
  value: "Value",
  stepRecords: "Step Records",
  viewFile: "View File",

  // Production Events Table
  employee: "Employee",
  duration: "Duration",
  startTime: "Start Time",
  endTime: "End Time",
  notes: "Notes",
  productionEvent: "Production Event",
  productionEvents: "Production Events",
  editEvent: "Edit Event",
  deleteEvent: "Delete Event",
  confirmDeleteEvent: "Are you sure you want to delete this production event? This action cannot be undone.",

  // Production Quantities Table
  productionQuantities: "Production Quantities",
  editQuantity: "Edit Quantity",
  deleteQuantity: "Delete Quantity",
  confirmDeleteQuantity: "Are you sure you want to delete this production quantity? This action cannot be undone.",

  // Job Form
  singleJob: "Single Job",
  manyJobs: "Many Jobs",
  jobDescription: "A job is a set of work to be done to fulfill an order or increase inventory",
  shortDescription: "Short Description",
  scrapQuantity: "Scrap Quantity",
  bulkJobs: "Bulk Jobs",
  bulkJobsDescription: "The bulk jobs form creates multiple jobs for the same item across multiple due dates.",
  totalQuantity: "Total Quantity",
  quantityPerJob: "Quantity Per Job",
  scrapQuantityPerJob: "Scrap Quantity Per Job",
  dueDateOfFirstJob: "Due Date of First Job",
  dueDateOfLastJob: "Due Date of Last Job",

  // Procedure Form
  newProcedure: "New Procedure",
  copyProcedure: "Copy Procedure",
  newVersion: "New Version",
  newVersionHelper: "The new version number of the procedure",
  versionHelper: "The version of the new procedure",

  // Scrap Reason Form
  newScrapReason: "New Scrap Reason",
  failedToCreateScrapReason: "Failed to create scrap reason: {{message}}",

  // Toast messages - Success
  ordersSubmitted: "Orders submitted",
  createdScrapReason: "Created scrap reason",
  fileDeletedSuccessfully: "{{name}} deleted successfully",
  modelRemovedFromJob: "Model removed from job",
  fileMovedToBucket: "Moved {{name}} to {{bucket}} bucket",

  // Toast messages - Errors
  failedToUploadImage: "Failed to upload image",
  trackedEntityIdRequired: "Tracked entity ID is required but none was found",
  failedToFetchItemCosts: "Failed to fetch item costs",
  unableToGetCompanyId: "Unable to get company ID",
  failedToLoadItemDetails: "Failed to load item details",
  failedToLoadConfigurationParameters: "Failed to load configuration parameters",
  errorDeletingFile: "Error deleting file",
  errorRemovingModelFromJob: "Error removing model from job",
  modelDataMissing: "Model data is missing",
  errorDownloadingFile: "Error downloading file",
  carbonClientNotAvailable: "Carbon client not available",
  cannotUploadToPartsBucketWithoutItemId: "Cannot upload to parts bucket without item ID",
  failedToUploadFile: "Failed to upload file: {{name}}",
  cannotMoveToPartsBucketWithoutItemId: "Cannot move to parts bucket without item ID",
  fileAlreadyInSelectedBucket: "File is already in the selected bucket",
  failedToDownloadFileForMoving: "Failed to download file for moving",
  failedToUploadFileToNewLocation: "Failed to upload file to new location",
  failedToDeleteFileFromOldLocation: "Failed to delete file from old location",
  errorMovingFile: "Error moving file",
  itemCannotBeAddedToItself: "An item cannot be added to itself.",
  partsBucket: "Parts",
  jobsBucket: "Jobs"
} as const;
