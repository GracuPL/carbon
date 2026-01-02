export const users = {
  // Module title
  title: "Users",

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

  // Group fields
  groupName: "Group Name",
  members: "Members",
  editGroup: "Edit Group",
  deleteGroup: "Delete Group",

  // Messages
  noEmployeesFound: "No employees found",
  noCustomersFound: "No customers found",
  noSuppliersFound: "No suppliers found"
} as const;
