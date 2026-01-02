import { useTranslation } from "@carbon/locale";
import { Badge, Button, HStack, MenuIcon, MenuItem } from "@carbon/react";
import { formatDate } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import {
  LuBookMarked,
  LuCalendar,
  LuEuro,
  LuGlobe,
  LuPencil,
  LuPhone,
  LuPrinter,
  LuShapes,
  LuStar,
  LuTag,
  LuUser
} from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import {
  EmployeeAvatar,
  Hyperlink,
  New,
  SupplierAvatar,
  Table
} from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { useSupplierTypes } from "~/components/Form/SupplierType";
import { usePermissions } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import type { Supplier, SupplierStatus } from "~/modules/purchasing";
import { usePeople } from "~/stores";
import { path } from "~/utils/path";

type SuppliersTableProps = {
  data: Supplier[];
  count: number;
  tags: { name: string }[];
  supplierStatuses: SupplierStatus[];
};

const SuppliersTable = memo(
  ({ data, count, tags, supplierStatuses }: SuppliersTableProps) => {
    const { t } = useTranslation("purchasing");
    const navigate = useNavigate();
    const permissions = usePermissions();
    const [people] = usePeople();
    const supplierTypes = useSupplierTypes();

    const customColumns = useCustomColumns<Supplier>("supplier");
    const columns = useMemo<ColumnDef<Supplier>[]>(() => {
      const defaultColumns: ColumnDef<Supplier>[] = [
        {
          accessorKey: "name",
          header: t("name"),
          cell: ({ row }) => (
            <div className="max-w-[320px] truncate">
              <Hyperlink to={path.to.supplierDetails(row.original.id!)}>
                <SupplierAvatar supplierId={row.original.id!} />
              </Hyperlink>
            </div>
          ),
          meta: {
            icon: <LuBookMarked />
          }
        },
        {
          accessorKey: "status",
          header: t("supplierStatus"),
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
          meta: {
            filter: {
              type: "static",
              options: supplierStatuses?.map((status) => ({
                value: status.name,
                label: <Enumerable value={status.name ?? ""} />
              }))
            },
            icon: <LuStar />
          }
        },
        {
          accessorKey: "supplierTypeId",
          header: t("type"),
          cell: (item) => {
            if (!item.getValue<string>()) return null;
            const supplierType = supplierTypes?.find(
              (type) => type.value === item.getValue<string>()
            )?.label;
            return <Enumerable value={supplierType ?? ""} />;
          },
          meta: {
            icon: <LuShapes />,
            filter: {
              type: "static",
              options: supplierTypes?.map((type) => ({
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
        // {
        //   id: "assignee",
        //   header: "Assignee",
        //   cell: ({ row }) => (
        //     <EmployeeAvatar employeeId={row.original.assignee} />
        //   ),
        //   meta: {
        //     filter: {
        //       type: "static",
        //       options: people.map((employee) => ({
        //         value: employee.id,
        //         label: employee.name,
        //       })),
        //     },
        //   },
        // },
        // {
        //   id: "orders",
        //   header: "Orders",
        //   cell: ({ row }) => (
        //     <Button variant="secondary" asChild>
        //       <Link
        //         to={`${path.to.purchaseOrders}?filter=supplierId:eq:${row.original.id}`}
        //       >
        //         {row.original.orderCount ?? 0} Orders
        //       </Link>
        //     </Button>
        //   ),
        // },

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
    }, [t, supplierStatuses, supplierTypes, people, tags, customColumns]);

    const renderContextMenu = useMemo(
      () => (row: Supplier) => (
        <MenuItem onClick={() => navigate(path.to.supplier(row.id!))}>
          <MenuIcon icon={<LuPencil />} />
          {t("editSupplier")}
        </MenuItem>
      ),
      [t, navigate]
    );

    return (
      <>
        <Table<Supplier>
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
              table: "supplier",
              label: t("suppliers")
            },
            {
              table: "supplierContact",
              label: t("contacts")
            }
          ]}
          primaryAction={
            permissions.can("create", "purchasing") && (
              <div className="flex items-center gap-2">
                <Button variant="secondary" leftIcon={<LuShapes />} asChild>
                  <Link to={path.to.supplierTypes}>{t("supplierTypes")}</Link>
                </Button>
                <New label={t("supplier")} to={path.to.newSupplier} />
              </div>
            )
          }
          renderContextMenu={renderContextMenu}
          title={t("suppliers")}
          table="supplier"
          withSavedView
        />
      </>
    );
  }
);

SuppliersTable.displayName = "SupplierTable";

export default SuppliersTable;
