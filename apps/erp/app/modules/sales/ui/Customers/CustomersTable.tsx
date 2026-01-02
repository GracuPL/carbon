import { useTranslation } from "@carbon/locale";
import {
  Badge,
  Button,
  HStack,
  MenuIcon,
  MenuItem,
  useDisclosure
} from "@carbon/react";
import { formatDate } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo, useState } from "react";
import {
  LuBookMarked,
  LuCalendar,
  LuEuro,
  LuGlobe,
  LuGroup,
  LuPencil,
  LuPhone,
  LuPrinter,
  LuShapes,
  LuStar,
  LuTag,
  LuTrash,
  LuUser
} from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import {
  CustomerAvatar,
  EmployeeAvatar,
  Hyperlink,
  New,
  Table
} from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { useCustomerTypes } from "~/components/Form/CustomerType";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { usePeople } from "~/stores";
import { path } from "~/utils/path";
import type { Customer, CustomerStatus } from "../../types";

type CustomersTableProps = {
  data: Customer[];
  count: number;
  customerStatuses: CustomerStatus[];
  tags: { name: string }[];
};

const CustomersTable = memo(
  ({ data, count, customerStatuses, tags }: CustomersTableProps) => {
    const { t } = useTranslation("sales");
    const { t: tc } = useTranslation("common");
    const navigate = useNavigate();
    const permissions = usePermissions();
    const [people] = usePeople();
    const deleteModal = useDisclosure();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
      null
    );

    const customerTypes = useCustomerTypes();

    const customColumns = useCustomColumns<Customer>("customer");
    const columns = useMemo<ColumnDef<Customer>[]>(() => {
      const defaultColumns: ColumnDef<Customer>[] = [
        {
          accessorKey: "name",
          header: t("name"),
          cell: ({ row }) => (
            <div className="max-w-[320px] truncate">
              <Hyperlink to={path.to.customerDetails(row.original.id!)}>
                <CustomerAvatar customerId={row.original.id!} />
              </Hyperlink>
            </div>
          ),
          meta: {
            icon: <LuBookMarked />
          }
        },
        {
          accessorKey: "status",
          header: t("status"),
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
          meta: {
            filter: {
              type: "static",
              options: customerStatuses?.map((status) => ({
                value: status.name,
                label: <Enumerable value={status.name ?? ""} />
              }))
            },
            pluralHeader: t("statuses"),
            icon: <LuStar />
          }
        },
        {
          accessorKey: "customerTypeId",
          header: t("type"),
          cell: (item) => {
            if (!item.getValue<string>()) return null;
            const customerType = customerTypes?.find(
              (type) => type.value === item.getValue<string>()
            )?.label;
            return <Enumerable value={customerType ?? ""} />;
          },
          meta: {
            icon: <LuShapes />,
            filter: {
              type: "static",
              options: customerTypes?.map((type) => ({
                value: type.value,
                label: <Enumerable value={type.label} />
              }))
            }
          }
        },
        {
          id: "accountManagerId",
          header: t("accountManager"),
          cell: ({ row }) => (
            <EmployeeAvatar employeeId={row.original.accountManagerId} />
          ),
          meta: {
            filter: {
              type: "static",
              options: people.map((employee) => ({
                value: employee.id,
                label: employee.name
              }))
            },
            icon: <LuUser />
          }
        },
        {
          accessorKey: "tags",
          header: t("tags"),
          cell: ({ row }) => (
            <HStack spacing={0} className="gap-1">
              {row.original.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </HStack>
          ),
          meta: {
            filter: {
              type: "static",
              options: tags?.map((tag) => ({
                value: tag.name,
                label: <Badge variant="secondary">{tag.name}</Badge>
              })),
              isArray: true
            },
            icon: <LuTag />
          }
        },
        {
          accessorKey: "currencyCode",
          header: t("currency"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuEuro />
          }
        },
        {
          accessorKey: "phone",
          header: t("phone"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuPhone />
          }
        },
        {
          accessorKey: "fax",
          header: t("fax"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuPrinter />
          }
        },
        {
          accessorKey: "website",
          header: t("website"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuGlobe />
          }
        },
        {
          id: "createdBy",
          header: t("createdBy"),
          cell: ({ row }) => (
            <EmployeeAvatar employeeId={row.original.createdBy} />
          ),
          meta: {
            filter: {
              type: "static",
              options: people.map((employee) => ({
                value: employee.id,
                label: employee.name
              }))
            },
            icon: <LuUser />
          }
        },
        {
          accessorKey: "createdAt",
          header: t("createdAt"),
          cell: (item) => formatDate(item.getValue<string>()),
          meta: {
            icon: <LuCalendar />
          }
        },
        {
          id: "updatedBy",
          header: t("updatedBy"),
          cell: ({ row }) => (
            <EmployeeAvatar employeeId={row.original.updatedBy} />
          ),
          meta: {
            filter: {
              type: "static",
              options: people.map((employee) => ({
                value: employee.id,
                label: employee.name
              }))
            },
            icon: <LuUser />
          }
        },
        {
          accessorKey: "updatedAt",
          header: t("updatedAt"),
          cell: (item) => formatDate(item.getValue<string>()),
          meta: {
            icon: <LuCalendar />
          }
        }
      ];

      return [...defaultColumns, ...customColumns];
    }, [t, customerStatuses, customerTypes, people, customColumns, tags]);

    const renderContextMenu = useMemo(
      () => (row: Customer) => (
        <>
          <MenuItem onClick={() => navigate(path.to.customer(row.id!))}>
            <MenuIcon icon={<LuPencil />} />
            {t("edit")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "sales")}
            onClick={() => {
              setSelectedCustomer(row);
              deleteModal.onOpen();
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {tc("delete")}
          </MenuItem>
        </>
      ),
      [t, tc, navigate, deleteModal, permissions]
    );

    return (
      <>
        <Table<Customer>
          count={count}
          columns={columns}
          data={data}
          defaultColumnPinning={{
            left: ["name"]
          }}
          defaultColumnVisibility={{
            currencyCode: false,
            phone: false,
            fax: false,
            website: false,
            createdBy: false,
            createdAt: false,
            updatedBy: false,
            updatedAt: false
          }}
          importCSV={[
            {
              table: "customer",
              label: t("customers")
            },
            {
              table: "customerContact",
              label: t("contacts")
            }
          ]}
          primaryAction={
            permissions.can("create", "sales") && (
              <div className="flex items-center gap-2">
                <Button
                  className="hidden md:inline-flex"
                  variant="secondary"
                  leftIcon={<LuShapes />}
                  asChild
                >
                  <Link to={path.to.customerTypes}>{t("customerTypes")}</Link>
                </Button>
                <New label={t("customer")} to={path.to.newCustomer} />
              </div>
            )
          }
          renderContextMenu={renderContextMenu}
          table="customer"
          title={t("customers")}
          withSavedView
        />
        {selectedCustomer && selectedCustomer.id && (
          <ConfirmDelete
            action={path.to.deleteCustomer(selectedCustomer.id)}
            isOpen={deleteModal.isOpen}
            name={selectedCustomer.name!}
            text={t("confirmDeleteCustomer", { name: selectedCustomer.name })}
            onCancel={() => {
              deleteModal.onClose();
              setSelectedCustomer(null);
            }}
            onSubmit={() => {
              deleteModal.onClose();
              setSelectedCustomer(null);
            }}
          />
        )}
      </>
    );
  }
);

CustomersTable.displayName = "CustomerTable";

export default CustomersTable;
