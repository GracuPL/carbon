import { useTranslation } from "@carbon/locale";
import {
  Checkbox,
  DropdownMenuContent,
  DropdownMenuItem,
  HStack,
  MenuIcon,
  MenuItem,
  useDisclosure
} from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import {
  LuBan,
  LuMail,
  LuMailCheck,
  LuSquareUser,
  LuStar,
  LuUser,
  LuUserCheck
} from "react-icons/lu";
import { Avatar, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import type { Customer } from "~/modules/users";
import {
  DeactivateUsersModal,
  ResendInviteModal,
  RevokeInviteModal
} from "~/modules/users";
import { useCustomers } from "~/stores";
import type { ListItem } from "~/types";
import { path } from "~/utils/path";

type CustomerAccountsTableProps = {
  data: Customer[];
  count: number;
  customerTypes: ListItem[];
};

const defaultColumnVisibility = {
  user_firstName: false,
  user_lastName: false
};

const CustomerAccountsTable = memo(
  ({ data, count, customerTypes }: CustomerAccountsTableProps) => {
    const { t } = useTranslation("users");
    const permissions = usePermissions();
    const [params] = useUrlParams();
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    const deactivateCustomerModal = useDisclosure();
    const resendInviteModal = useDisclosure();
    const revokeInviteModal = useDisclosure();
    const [customers] = useCustomers();

    const canEdit = permissions.can("update", "users");

    const rows = useMemo(
      () =>
        data.map((d) => {
          // we should only have one user and customer per customer id
          if (
            d.user === null ||
            d.customer === null ||
            Array.isArray(d.user) ||
            Array.isArray(d.customer)
          ) {
            throw new Error("Expected user and customer to be objects");
          }

          return d;
        }),
      [data]
    );

    const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(() => {
      return [
        {
          header: t("user"),
          cell: ({ row }) => (
            <HStack>
              <Avatar
                size="sm"
                // @ts-ignore
                name={row.original.user?.fullName}
                // @ts-ignore
                path={row.original.user?.avatarUrl}
              />

              <span>
                {row.original.user?.fullName ??
                  row.original.user?.email ??
                  "Unknown"}
              </span>
            </HStack>
          ),
          meta: {
            icon: <LuUser />
          }
        },

        {
          accessorKey: "user.firstName",
          header: t("firstName"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuUserCheck />
          }
        },
        {
          accessorKey: "user.lastName",
          header: t("lastName"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuUserCheck />
          }
        },
        {
          accessorKey: "user.email",
          header: t("email"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuMail />
          }
        },
        {
          accessorKey: "customer.name",
          header: t("customer"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuSquareUser />,
            filter: {
              type: "static",
              options: customers.map(({ name }) => ({
                value: name,
                label: name
              }))
            }
          }
        },
        {
          accessorKey: "customer.customerTypeId",
          header: t("customerType"),
          cell: ({ row }) => (
            // @ts-ignore
            <Enumerable value={row.original.customer?.customerType?.name} />
          ),
          meta: {
            icon: <LuStar />,
            filter: {
              type: "static",
              options: customerTypes.map((type) => ({
                value: type.id,
                label: <Enumerable value={type.name} />
              }))
            }
          }
        },
        {
          accessorKey: "active",
          header: t("active"),
          cell: (item) => <Checkbox isChecked={item.getValue<boolean>()} />,
          meta: {
            icon: <LuUserCheck />,
            filter: {
              type: "static",
              options: [
                {
                  value: "true",
                  label: t("active")
                },
                {
                  value: "false",
                  label: t("inactive")
                }
              ]
            }
          }
        }
      ];
    }, [customerTypes, customers, t]);

    const renderActions = useCallback(
      (selectedRows: typeof data) => {
        return (
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUserIds(
                  selectedRows
                    .filter((row) => row.active === false)
                    .map((row) => row.user.id)
                );
                resendInviteModal.onOpen();
              }}
              disabled={
                !permissions.can("create", "users") ||
                selectedRows.every((row) => row.active === true)
              }
            >
              <LuMailCheck className="mr-2 h-4 w-4" />
              <span>{t("resendInvite")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUserIds(
                  selectedRows
                    .filter((row) => row.active === true)
                    .map((row) => row.user.id)
                );
                deactivateCustomerModal.onOpen();
              }}
              disabled={
                !permissions.can("delete", "users") ||
                selectedRows.every((row) => row.active === false)
              }
            >
              <LuBan className="mr-2 h-4 w-4" />
              <span>{t("deactivateUsers")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        );
      },
      [permissions, deactivateCustomerModal, resendInviteModal, t]
    );

    const renderContextMenu = useCallback(
      (row: (typeof data)[number]) => {
        return (
          <>
            {row.active === true ? (
              <>
                <MenuItem
                  onClick={(e) => {
                    setSelectedUserIds([row.user.id]);
                    deactivateCustomerModal.onOpen();
                  }}
                  className="text-red-500 hover:text-red-500"
                >
                  <MenuIcon icon={<LuBan />} />
                  {t("deactivateAccount")}
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setSelectedUserIds([row.user.id]);
                    resendInviteModal.onOpen();
                  }}
                >
                  <MenuIcon icon={<LuMailCheck />} />
                  {t("resendAccountInvite")}
                </MenuItem>
                {permissions.can("delete", "users") && (
                  <MenuItem
                    onClick={() => {
                      setSelectedUserIds([row.user.id]);
                      revokeInviteModal.onOpen();
                    }}
                    destructive
                  >
                    <MenuIcon icon={<LuBan />} />
                    {t("revokeInvite")}
                  </MenuItem>
                )}
              </>
            )}
          </>
        );
      },
      [
        deactivateCustomerModal,
        permissions,
        resendInviteModal,
        revokeInviteModal,
        t
      ]
    );

    return (
      <>
        <Table<(typeof rows)[number]>
          count={count}
          columns={columns}
          data={rows}
          defaultColumnVisibility={defaultColumnVisibility}
          primaryAction={
            permissions.can("create", "users") && (
              <New label={t("customer")} to={`new?${params.toString()}`} />
            )
          }
          renderActions={renderActions}
          renderContextMenu={renderContextMenu}
          title={t("customerAccounts")}
          withSelectableRows={canEdit}
        />

        {deactivateCustomerModal.isOpen && (
          <DeactivateUsersModal
            userIds={selectedUserIds}
            isOpen={deactivateCustomerModal.isOpen}
            redirectTo={path.to.customerAccounts}
            onClose={deactivateCustomerModal.onClose}
          />
        )}
        {resendInviteModal.isOpen && (
          <ResendInviteModal
            userIds={selectedUserIds}
            isOpen={resendInviteModal.isOpen}
            onClose={resendInviteModal.onClose}
          />
        )}
        {revokeInviteModal.isOpen && (
          <RevokeInviteModal
            userIds={selectedUserIds}
            isOpen={revokeInviteModal.isOpen}
            onClose={revokeInviteModal.onClose}
          />
        )}
      </>
    );
  }
);

CustomerAccountsTable.displayName = "CustomerTable";

export default CustomerAccountsTable;
