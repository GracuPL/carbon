import { useTranslation } from "@carbon/locale";
import { HStack, MenuIcon, MenuItem, useDisclosure } from "@carbon/react";
import { formatDate } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo, useState } from "react";
import {
  LuBookMarked,
  LuCalendar,
  LuMap,
  LuPencil,
  LuQrCode,
  LuSquareUser,
  LuStar,
  LuTrash,
  LuUser
} from "react-icons/lu";
import { useNavigate } from "react-router";
import {
  CustomerAvatar,
  EmployeeAvatar,
  Hyperlink,
  New,
  Table
} from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { useCustomers, usePeople } from "~/stores";
import { path } from "~/utils/path";
import { salesRFQStatusType } from "../../sales.models";
import type { SalesRFQ } from "../../types";
import { SalesRFQStatus } from ".";

type SalesRFQsTableProps = {
  data: SalesRFQ[];
  count: number;
};

const SalesRFQsTable = memo(({ data, count }: SalesRFQsTableProps) => {
  const { t } = useTranslation("sales");
  const permissions = usePermissions();
  const navigate = useNavigate();

  const [selectedSalesRFQ, setSelectedSalesRFQ] = useState<SalesRFQ | null>(
    null
  );
  const deleteSalesRFQModal = useDisclosure();

  const [customers] = useCustomers();
  const [people] = usePeople();

  const customColumns = useCustomColumns<SalesRFQ>("salesRFQ");
  const columns = useMemo<ColumnDef<SalesRFQ>[]>(() => {
    const defaultColumns: ColumnDef<SalesRFQ>[] = [
      {
        accessorKey: "rfqId",
        header: t("rfqNumber"),
        cell: ({ row }) => (
          <HStack>
            <Hyperlink to={path.to.salesRfqDetails(row.original.id!)}>
              {row.original.rfqId}
            </Hyperlink>
          </HStack>
        ),
        meta: {
          icon: <LuBookMarked />
        }
      },

      {
        id: "customerId",
        header: t("customer"),
        cell: ({ row }) => (
          <CustomerAvatar customerId={row.original.customerId} />
        ),
        meta: {
          filter: {
            type: "static",
            options: customers?.map((customer) => ({
              value: customer.id,
              label: customer.name
            }))
          },
          icon: <LuSquareUser />
        }
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: (item) => {
          const status = item.getValue<(typeof salesRFQStatusType)[number]>();
          return <SalesRFQStatus status={status} />;
        },
        meta: {
          filter: {
            type: "static",
            options: salesRFQStatusType.map((status) => ({
              value: status,
              label: <SalesRFQStatus status={status} />
            }))
          },
          pluralHeader: t("statuses"),
          icon: <LuStar />
        }
      },
      {
        accessorKey: "customerReference",
        header: t("customerRfq"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuQrCode />
        }
      },
      {
        accessorKey: "rfqDate",
        header: t("rfqDate"),
        cell: (item) => formatDate(item.getValue<string>()),
        meta: {
          icon: <LuCalendar />
        }
      },
      {
        accessorKey: "expirationDate",
        header: t("dueDate"),
        cell: (item) => formatDate(item.getValue<string>()),
        meta: {
          icon: <LuCalendar />
        }
      },

      {
        id: "assignee",
        header: t("assignee"),
        cell: ({ row }) => (
          <EmployeeAvatar employeeId={row.original.assignee} />
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
        accessorKey: "locationName",
        header: t("location"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />,
        meta: {
          filter: {
            type: "fetcher",
            endpoint: path.to.api.locations,
            transform: (data: { id: string; name: string }[] | null) =>
              data?.map(({ name }) => ({
                value: name,
                label: <Enumerable value={name} />
              })) ?? []
          },
          icon: <LuMap />
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
  }, [customers, people, customColumns, t]);

  const renderContextMenu = useMemo(() => {
    return (row: SalesRFQ) => (
      <>
        <MenuItem onClick={() => navigate(path.to.salesRfqDetails(row.id!))}>
          <MenuIcon icon={<LuPencil />} />
          {t("edit")}
        </MenuItem>
        <MenuItem
          destructive
          disabled={!permissions.can("delete", "sales")}
          onClick={() => {
            setSelectedSalesRFQ(row);
            deleteSalesRFQModal.onOpen();
          }}
        >
          <MenuIcon icon={<LuTrash />} />
          {t("delete")}
        </MenuItem>
      </>
    );
  }, [deleteSalesRFQModal, navigate, permissions, t]);

  return (
    <>
      <Table<SalesRFQ>
        count={count}
        columns={columns}
        data={data}
        defaultColumnPinning={{
          left: ["rfqId"]
        }}
        defaultColumnVisibility={{
          createdAt: false,
          updatedAt: false,
          updatedBy: false
        }}
        primaryAction={
          permissions.can("create", "sales") && (
            <New label={t("rfq")} to={path.to.newSalesRFQ} />
          )
        }
        renderContextMenu={renderContextMenu}
        title={t("rfqs")}
        table="salesRfq"
        withSavedView
      />
      {selectedSalesRFQ && selectedSalesRFQ.id && (
        <ConfirmDelete
          action={path.to.deleteSalesRfq(selectedSalesRFQ.id)}
          isOpen={deleteSalesRFQModal.isOpen}
          name={selectedSalesRFQ.rfqId!}
          text={t("confirmDeleteRfq", { name: selectedSalesRFQ.rfqId! })}
          onCancel={() => {
            deleteSalesRFQModal.onClose();
            setSelectedSalesRFQ(null);
          }}
          onSubmit={() => {
            deleteSalesRFQModal.onClose();
            setSelectedSalesRFQ(null);
          }}
        />
      )}
    </>
  );
});

SalesRFQsTable.displayName = "SalesRFQsTable";

export default SalesRFQsTable;
