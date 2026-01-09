export const resources = {
  // Module title
  title: "Resources",

  // Navigation groups
  infrastructure: "Infrastructure",
  people: "People",
  schedules: "Schedules",
  assignments: "Assignments",

  // Dashboard cards
  openDispatches: "Open Dispatches",
  openScheduled: "Open Scheduled",
  openReactive: "Open Reactive",
  viewOpen: "View Open",
  viewScheduled: "View Scheduled",
  viewReactive: "View Reactive",

  // Dashboard sections
  recentlyCreated: "Recently Created",
  recentlyCreatedDescription: "Newly created maintenance dispatches",
  assignedToMe: "Assigned to Me",
  assignedToMeDescription: "Dispatches currently assigned to you",
  errorLoadingDispatches: "Error loading assigned dispatches",

  // Entities
  equipment: "Equipment",
  dispatch: "Dispatch",
  dispatches: "Dispatches",
  maintenance: "Maintenance",
  training: "Training",
  trainings: "Trainings",
  workCenter: "Work Center",
  workCenters: "Work Centers",
  allWorkCenters: "All Work Centers",

  // Table headers
  source: "Source",
  status: "Status",

  // Statuses
  pending: "Pending",
  overdue: "Overdue",
  scheduled: "Scheduled",
  reactive: "Reactive",

  // KPIs
  failures: "failures",
  mttr: "Mean Time To Repair",
  mtbf: "Mean Time Between Failures",
  sparePartCost: "Spare Part Cost",
  worstPerformingMachines: "Worst Performing Machines",
  sparePartConsumption: "Spare Part Consumption",
  noDataWithinRange: "No data within range",

  // Actions
  exportCsv: "Export CSV",

  // Other
  yourself: "yourself",

  // Contractors
  contractor: "Contractor",
  contractors: "Contractors",
  supplier: "Supplier",
  hoursPerWeek: "Hours per Week",
  editContractor: "Edit Contractor",
  deleteContractor: "Delete Contractor",

  // Locations
  location: "Location",
  locations: "Locations",
  address: "Address",
  city: "City",
  stateProvince: "State / Province",
  country: "Country",
  createdBy: "Created By",
  updatedBy: "Updated By",
  editLocation: "Edit Location",
  deleteLocation: "Delete Location",

  // Trainings
  name: "Name",
  type: "Type",
  frequency: "Frequency",
  duration: "Duration",
  assignee: "Assignee",
  tags: "Tags",
  editTraining: "Edit Training",
  deleteTraining: "Delete Training",
  confirmDeleteTraining: "Are you sure you want to delete this training?",
  mandatory: "Mandatory",
  optional: "Optional",
  once: "Once",
  quarterly: "Quarterly",
  annual: "Annual",

  // Work Centers
  workCenterName: "Work Center Name",
  editWorkCenter: "Edit Work Center",
  deleteWorkCenter: "Delete Work Center",
  confirmDeleteWorkCenter: "Are you sure you want to delete this work center?",

  // Failure Modes
  failureMode: "Failure Mode",
  failureModes: "Failure Modes",
  editFailureMode: "Edit Failure Mode",
  deleteFailureMode: "Delete Failure Mode",

  // Processes
  process: "Process",
  processes: "Processes",
  editProcess: "Edit Process",
  deleteProcess: "Delete Process",

  // Partners
  partner: "Partner",
  partners: "Partners",
  editPartner: "Edit Partner",
  deletePartner: "Delete Partner",
  viewPartner: "View Partner",
  hoursOnSite: "Hours on Site",

  // Maintenance
  maintenanceSchedule: "Maintenance Schedule",
  maintenanceSchedules: "Maintenance Schedules",
  confirmDeleteMaintenanceSchedule: "Are you sure you want to delete this maintenance schedule?",
  editDispatch: "Edit Dispatch",
  deleteDispatch: "Delete Dispatch",
  confirmDeleteDispatch: "Are you sure you want to delete this dispatch?",
  nextDue: "Next Due",
  lastPerformed: "Last Performed",

  // Suggestions
  suggestion: "Suggestion",
  suggestions: "Suggestions",
  editSuggestion: "Edit Suggestion",
  deleteSuggestion: "Delete Suggestion",
  viewSuggestion: "View Suggestion",
  employee: "Employee",
  date: "Date",

  // Dispatches - additional
  dispatchId: "Dispatch ID",
  priority: "Priority",
  plannedStart: "Planned Start",
  actualFailureMode: "Actual Failure Mode",
  suspectedFailureMode: "Suspected Failure Mode",
  oeeImpact: "OEE Impact",
  createdAt: "Created At",
  updatedAt: "Updated At",
  unassigned: "Unassigned",
  unknown: "Unknown",

  // Processes - additional
  processType: "Process Type",
  defaultUnit: "Default Unit",
  suppliers: "Suppliers",
  completeAll: "Complete All",

  // Work Centers - additional
  active: "Active",
  description: "Description",
  laborRate: "Labor Rate",
  machineRate: "Machine Rate",
  overheadRate: "Overhead Rate",
  deactivateWorkCenter: "Deactivate Work Center",
  activateWorkCenter: "Activate Work Center",
  confirmDeactivateWorkCenter: "Are you sure you want to deactivate this work center?",
  confirmActivateWorkCenter: "Are you sure you want to activate this work center?",
  cancel: "Cancel",
  deactivate: "Deactivate",
  activate: "Activate",
  jobsWithOperations: "These jobs have operations assigned to this work center:",
  anonymous: "Anonymous",

  // Maintenance schedules table
  scheduleName: "Schedule Name",
  estDuration: "Est. Duration",
  scheduledMaintenance: "Scheduled Maintenance",
  scheduledMaintenances: "Scheduled Maintenances",
  editSchedule: "Edit Schedule",
  deleteSchedule: "Delete Schedule",
  inactive: "Inactive",

  // Toast messages
  createdProcess: "Created process",
  failedToCreateProcess: "Failed to create process: {{message}}",
  createdWorkCenter: "Created work center",
  failedToCheckActiveOperations: "Failed to check active operations",
  failedToUploadImage: "Failed to upload image",
  carbonClientNotAvailable: "Carbon client not available",
  failedToUploadFile: "Failed to upload file: {{name}}",
  fileUploadedSuccessfully: "{{name}} uploaded successfully",
  errorDownloadingFile: "Error downloading file",
  fileDeletedSuccessfully: "{{name}} deleted successfully",
  failedToLoadItemDetails: "Failed to load item details",
  createdFailureMode: "Created failure mode",
  createdLocation: "Created location",
  failedToCreateLocation: "Failed to create location: {{message}}",
  createdMaintenanceSchedule: "Created maintenance schedule"
} as const;
