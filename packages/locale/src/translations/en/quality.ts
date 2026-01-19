export const quality = {
  // Module title
  title: "Quality",

  // Navigation groups
  configure: "Configure",

  // Main entities
  issue: "Issue",
  issues: "Issues",
  action: "Action",
  actions: "Actions",
  risk: "Risk",
  risks: "Risks",
  document: "Document",
  documents: "Documents",

  // Calibrations
  calibration: "Calibration",
  calibrations: "Calibrations",
  gauge: "Gauge",
  gauges: "Gauges",
  gaugeType: "Gauge Type",
  gaugeTypes: "Gauge Types",
  record: "Record",
  records: "Records",

  // Issue management
  issueType: "Issue Type",
  issueTypes: "Issue Types",
  issueWorkflow: "Issue Workflow",
  issueWorkflows: "Issue Workflows",
  requiredAction: "Required Action",
  requiredActions: "Required Actions",
  actionType: "Action Type",
  actionTypes: "Action Types",

  // Table headers
  issueId: "Issue ID",
  name: "Name",
  status: "Status",
  type: "Type",
  severity: "Severity",
  priority: "Priority",
  source: "Source",
  location: "Location",
  assignee: "Assignee",
  items: "Items",
  openDate: "Open Date",
  closeDate: "Closed Date",
  createdBy: "Created By",
  createdAt: "Created At",
  dueDate: "Due Date",
  resolution: "Resolution",
  rootCause: "Root Cause",
  confirmDeleteIssue: "Are you sure you want to delete this issue?",

  // Statuses
  open: "Open",
  inProgress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
  pending: "Pending",
  overdue: "Overdue",

  // Severity levels
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",

  // Actions
  addIssue: "Add Issue",
  addAction: "Add Action",
  addRisk: "Add Risk",
  addGauge: "Add Gauge",
  addCalibration: "Add Calibration",
  editIssue: "Edit Issue",
  deleteIssue: "Delete Issue",
  resolveIssue: "Resolve Issue",
  closeIssue: "Close Issue",
  reopenIssue: "Reopen Issue",
  activate: "Activate",
  deactivate: "Deactivate",

  // Action fields
  actionType: "Action Type",
  actionStatus: "Action Status",
  issueStatus: "Issue Status",
  completedDate: "Completed Date",
  created: "Created",
  viewIssue: "View Issue",

  // Messages
  noDataExists: "No data exists",
  noIssuesFound: "No issues found",
  noActionsFound: "No actions found",

  // Risk register
  riskRegister: "Risk Register",
  riskRegisters: "Risk Registers",
  editRisk: "Edit Risk",
  deleteRisk: "Delete Risk",

  // Gauges and calibrations
  editGauge: "Edit Gauge",
  deleteGauge: "Delete Gauge",
  editGaugeType: "Edit Gauge Type",
  deleteGaugeType: "Delete Gauge Type",
  editCalibration: "Edit Calibration",
  deleteCalibration: "Delete Calibration",
  calibrationDate: "Calibration Date",
  nextCalibrationDate: "Next Calibration Date",
  result: "Result",
  calibrationResult: "Calibration Result",
  pass: "Pass",
  fail: "Fail",
  description: "Description",
  code: "Code",
  active: "Active",
  inactive: "Inactive",

  // Issue types and workflows
  editIssueType: "Edit Issue Type",
  deleteIssueType: "Delete Issue Type",
  editIssueWorkflow: "Edit Issue Workflow",
  deleteIssueWorkflow: "Delete Issue Workflow",
  editRequiredAction: "Edit Required Action",
  deleteRequiredAction: "Delete Required Action",

  // Gauges additional
  manufacturer: "Manufacturer",
  id: "ID",
  calibrationStatus: "Calibration Status",
  modelNumber: "Model Number",
  serialNumber: "Serial Number",
  role: "Role",
  nextCalibration: "Next Calibration",
  lastCalibration: "Last Calibration",
  updatedBy: "Updated By",
  updatedAt: "Updated At",
  deactivateGauge: "Deactivate Gauge",
  activateGauge: "Activate Gauge",
  confirmDeleteGauge: "Are you sure you want to delete this gauge?",
  confirmDeactivateGauge: "Are you sure you want to deactivate this gauge?",
  confirmActivateGauge: "Are you sure you want to activate this gauge?",

  // Issue Workflows additional
  defaultSource: "Default Source",
  defaultPriority: "Default Priority",
  editTemplate: "Edit Template",
  deleteTemplate: "Delete Template",
  confirmDeleteIssueWorkflow: "Are you sure you want to delete this issue workflow?",

  // Risk Register additional
  title: "Title",
  item: "Item",
  likelihood: "Likelihood",
  confirmDeleteRisk: "Are you sure you want to delete this risk? This cannot be undone.",
  delete: "Delete",

  // Gauge Calibration Records Table
  dateCalibrated: "Date Calibrated",
  inspectionStatus: "Inspection Status",
  requiresAction: "Requires Action",
  requiresAdjustment: "Requires Adjustment",
  requiresRepair: "Requires Repair",
  calibrationSupplier: "Calibration Supplier",
  temperature: "Temperature",
  humidity: "Humidity",
  approvedBy: "Approved By",
  editRecord: "Edit Record",
  deleteRecord: "Delete Record",
  calibrationRecords: "Calibration Records",
  yes: "Yes",
  no: "No",
  confirmDeleteCalibrationRecord: "Are you sure you want to delete this record?",

  // Quality Documents Table
  tags: "Tags",
  versions: "Versions",
  version: "Version",
  editDocument: "Edit Document",
  deleteDocument: "Delete Document",
  loadTemplates: "Load Templates",
  qualityDocuments: "Quality Documents",
  confirmDeleteDocument: "Are you sure you want to delete this quality document?",

  // Toast messages - Errors
  gaugeNotFound: "Gauge not found",
  failedToUploadImage: "Failed to upload image",
  failedToLoadData: "Failed to load data",
  failedToLoadJobs: "Failed to load jobs",
  failedToLoadJobOperations: "Failed to load job operations",
  failedToLoadPurchaseOrders: "Failed to load purchase orders",
  failedToLoadPurchaseOrderLines: "Failed to load purchase order lines",
  failedToLoadSalesOrders: "Failed to load sales orders",
  failedToLoadSalesOrderLines: "Failed to load sales order lines",
  failedToLoadShipments: "Failed to load shipments",
  failedToLoadShipmentLines: "Failed to load shipment lines",
  failedToLoadReceipts: "Failed to load receipts",
  failedToLoadReceiptLines: "Failed to load receipt lines",
  failedToLoadTrackedEntities: "Failed to load tracked entities",

  // Toast messages - Success
  createdGaugeType: "Created gauge type",
  failedToCreateGaugeType: "Failed to create gauge type: {{message}}",
  createdRequiredAction: "Created required action",
  failedToFetchRisks: "Failed to fetch risks",
  savedRisk: "Saved risk",
  failedToSaveRisk: "Failed to save risk: {{message}}",
  createdIssueType: "Created non conformance type",

  // Issue Form
  newIssue: "New Issue",
  issueDescription: "An issue record tracks quality issues and their resolution process.",
  workflow: "Workflow",
  approvalRequirements: "Approval Requirements",

  // Gauge Type Form
  newGaugeType: "New Gauge Type",

  // Issue Type Form
  newIssueType: "New Non Conformance Type",
  nonConformanceType: "Non Conformance Type",
  failedToCreateIssueType: "Failed to create non conformance type: {{message}}",

  // Issue Workflow Form
  newIssueWorkflow: "New Issue Workflow",
  issueWorkflowDescription: "Issue workflows defined the preset values for an issue. For example, you can have an 8D workflow or a containment workflow.",
  issueTemplate: "Issue Template",
  requiredActionsInOrder: "Required Actions (in order)",
  availableActionsClickToAdd: "Available Actions (click to add):",
  noRequiredActionsAvailable: "No required actions available",
  inactiveActionsHelper: "Inactive actions will not appear in selection lists",

  // Required Action Form
  newRequiredAction: "New Required Action",
  failedToCreateRequiredAction: "Failed to create required action: {{message}}",

  // Gauge Form
  newGauge: "New Gauge",
  gaugeId: "Gauge ID",
  details: "Details",
  addCalibrationRecord: "Add Calibration Record",
  calibrationRecord: "Calibration Record",
  updated: "Updated",
  noCalibrationRecordsFound: "No calibration records found",
  dateAcquired: "Date Acquired",
  lastCalibrationDate: "Last Calibration Date",
  shelf: "Shelf",
  calibrationIntervalMonths: "Calibration Interval (Months)",

  // Gauge Calibration Record Form
  newCalibrationRecord: "New Calibration Record",

  // Quality Document Form
  newDocument: "New Document",

  // Risk Register Form
  newRisk: "New Risk"
} as const;
