export const users = {
  // Module title
  title: "Users",

  // Navigation groups
  manage: "Manage",
  configure: "Configure",
  accounts: "Accounts",
  people: "People",

  // Main entities
  user: "User",
  users: "Users",
  employee: "Employee",
  employees: "Employees",
  customer: "Customer",
  customers: "Customers",
  supplier: "Supplier",
  suppliers: "Suppliers",
  group: "Group",
  groups: "Groups",

  // Employee types
  employeeType: "Employee Type",
  employeeTypes: "Employee Types",
  viewEmployees: "View Employees",
  editEmployeeType: "Edit Employee Type",
  deleteEmployeeType: "Delete Employee Type",

  // Customer/Supplier types
  customerType: "Customer Type",
  customerTypes: "Customer Types",
  supplierType: "Supplier Type",
  supplierTypes: "Supplier Types",
  customerAccounts: "Customer Accounts",
  supplierAccounts: "Supplier Accounts",

  // Table headers
  name: "Name",
  email: "Email",
  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone",
  role: "Role",
  department: "Department",
  manager: "Manager",
  hireDate: "Hire Date",
  status: "Status",

  // Customer/Supplier fields
  company: "Company",
  contactPerson: "Contact Person",
  address: "Address",
  city: "City",
  country: "Country",
  taxId: "Tax ID",

  // Statuses
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  invited: "Invited",
  deactivated: "Deactivated",

  // Actions
  addEmployee: "Add Employee",
  addCustomer: "Add Customer",
  addSupplier: "Add Supplier",
  addGroup: "Add Group",
  editEmployee: "Edit Employee",
  deleteEmployee: "Delete Employee",
  inviteUser: "Invite User",
  resendInvite: "Resend Invite",
  resendAccountInvite: "Resend Account Invite",
  revokeInvite: "Revoke Invite",
  deactivateUser: "Deactivate User",
  deactivateUsers: "Deactivate Users",
  deactivateAccount: "Deactivate Account",
  activateUser: "Activate User",
  editPermissions: "Edit Permissions",
  bulkEditPermissions: "Bulk Edit Permissions",
  account: "Account",
  employeeAccounts: "Employee Accounts",

  // Permissions
  permission: "Permission",
  permissions: "Permissions",
  viewPermission: "View",
  createPermission: "Create",
  updatePermission: "Update",
  deletePermission: "Delete",

  // Department fields
  departments: "Departments",
  subDepartments: "Sub-Departments",
  editDepartment: "Edit Department",
  deleteDepartment: "Delete Department",

  // Group fields
  groupName: "Group Name",
  members: "Members",
  editGroup: "Edit Group",
  deleteGroup: "Delete Group",

  // Messages
  noEmployeesFound: "No employees found",
  noCustomersFound: "No customers found",
  noSuppliersFound: "No suppliers found",

  // Attribute categories
  attributeCategories: "Attribute Categories",
  attributeCategory: "Attribute Category",
  category: "Category",
  attributes: "Attributes",
  visibility: "Visibility",
  visibilities: "Visibilities",
  public: "Public",
  private: "Private",
  newAttribute: "New Attribute",
  viewAttributes: "View Attributes",
  editCategory: "Edit Category",
  deleteCategory: "Delete Category",
  confirmDeleteAttributeCategory: "Are you sure you want to deactivate the {{name}} attribute category?",

  // Holidays
  holidays: "Holidays",
  holiday: "Holiday",
  year: "Year",
  date: "Date",
  editHoliday: "Edit Holiday",
  deleteHoliday: "Delete Holiday",

  // Shifts
  shifts: "Shifts",
  shift: "Shift",
  startTime: "Start Time",
  endTime: "End Time",
  location: "Location",
  days: "Days",
  editShift: "Edit Shift",
  deleteShift: "Delete Shift",
  edit: "Edit",

  // Toast messages
  createdDepartment: "Created department",
  failedToCreateDepartment: "Failed to create department: {{message}}"
} as const;
