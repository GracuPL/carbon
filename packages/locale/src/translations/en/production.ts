export const production = {
  // Module title
  title: "Production",

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

  // Charts
  utilizationPercent: "Utilization (%)",

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
  deleteScrapReason: "Delete Scrap Reason"
} as const;
