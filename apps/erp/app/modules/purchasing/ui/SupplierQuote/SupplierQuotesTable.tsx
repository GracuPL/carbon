import { useTranslation } from "@carbon/locale";
import { HStack, MenuIcon, MenuItem, useDisclosure } from "@carbon/react";
import { formatDate } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo, useState } from "react";
import {
  LuBookMarked,
  LuCalendar,
  LuPencil,
  LuQrCode,
  LuSquareUser,
  LuStar,
  LuTrash,
  LuUser
} from "react-icons/lu";
import { useNavigate } from "react-router";
import {
  EmployeeAvatar,
  Hyperlink,
  ItemThumbnail,
  New,
  SupplierAvatar,
  Table
} from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { usePeople, useSuppliers } from "~/stores";
import { path } from "~/utils/path";
import { supplierQuoteStatusType } from "../../purchasing.models";
import type { SupplierQuote } from "../../types";
import {
  default as QuoteStatus,
  default as SupplierQuoteStatus
} from "./SupplierQuoteStatus";

type SupplierQuotesTableProps = {
  data: SupplierQuote[];
  count: number;
};

const SupplierQuotesTable = memo(
  ({ data, count }: SupplierQuotesTableProps) => {
    const { t } = useTranslation("purchasing");
    const permissions = usePermissions();
    const navigate = useNavigate();

    const [selectedSupplierQuote, setSelectedSupplierQuote] =
      useState<SupplierQuote | null>(null);
    const deleteSupplierQuoteModal = useDisclosure();

    const [suppliers] = useSuppliers();
    const [people] = usePeople();

    // const optimisticFavorite = useOptimisticFavorite();

    const customColumns = useCustomColumns<SupplierQuote>("quote");
    const columns = useMemo<ColumnDef<SupplierQuote>[]>(() => {
      const employeeOptions = people.map((employee) => ({
        value: employee.id,
        label: employee.name
      }));

      const defaultColumns: ColumnDef<SupplierQuote>[] = [
        {
          accessorKey: "supplierQuoteId",
          header: t("quoteNumber"),
          cell: ({ row }) => (
            <HStack>
              <ItemThumbnail
                size="sm"
                thumbnailPath={row.original.thumbnailPath}
                // @ts-ignore
                type={row.original.itemType}
              />
              <Hyperlink to={path.to.supplierQuoteDetails(row.original.id!)}>
                {row.original.supplierQuoteId}
              </Hyperlink>
            </HStack>
          ),
          meta: {
            icon: <LuBookMarked />
          }
        },
        {
          id: "supplierId",
          header: t("supplier"),
          cell: ({ row }) => (
            <SupplierAvatar supplierId={row.original.supplierId} />
          ),
          meta: {
            filter: {
              type: "static",
              options: suppliers?.map((supplier) => ({
                value: supplier.id,
                label: supplier.name
              }))
            },
            icon: <LuSquareUser />
          }
        },

        {
          accessorKey: "status",
          header: t("status"),
          cell: ({ row }) => (
            <SupplierQuoteStatus status={row.original.status} />
          ),
          meta: {
            filter: {
              type: "static",
              options: supplierQuoteStatusType.map((status) => ({
                value: status,
                label: <QuoteStatus status={status} />
              }))
            },
            pluralHeader: t("statuses"),
            icon: <LuStar />
          }
        },
        {
          accessorKey: "supplierReference",
          header: t("supplierReference"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuQrCode />
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
              options: employeeOptions
            },
            icon: <LuUser />
          }
        },
        {
          accessorKey: "quotedDate",
          header: t("quotedDate"),
          cell: (item) => formatDate(item.getValue<string>()),
          meta: {
            icon: <LuCalendar />
          }
        },
        {
          accessorKey: "expirationDate",
          header: t("expirationDate"),
          cell: (item) => formatDate(item.getValue<string>()),
          meta: {
            icon: <LuCalendar />
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
    }, [suppliers, people, customColumns, t]);

    const renderContextMenu = useMemo(() => {
      return (row: SupplierQuote) => (
        <>
          <MenuItem
            onClick={() => navigate(path.to.supplierQuoteDetails(row.id!))}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("edit")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "purchasing")}
            onClick={() => {
              setSelectedSupplierQuote(row);
              deleteSupplierQuoteModal.onOpen();
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("delete")}
          </MenuItem>
        </>
      );
    }, [deleteSupplierQuoteModal, navigate, permissions, t]);

    return (
      <>
        <Table<SupplierQuote>
          count={count}
          columns={columns}
          data={data}
          defaultColumnPinning={{
            left: ["supplierQuoteId"]
          }}
          defaultColumnVisibility={{
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false
          }}
          primaryAction={
            permissions.can("create", "purchasing") && (
              <New label={t("supplierQuote")} to={path.to.newSupplierQuote} />
            )
          }
          renderContextMenu={renderContextMenu}
          title={t("supplierQuotes")}
          table="supplierQuote"
          withSavedView
        />
        {selectedSupplierQuote && selectedSupplierQuote.id && (
          <ConfirmDelete
            action={path.to.deleteSupplierQuote(selectedSupplierQuote.id)}
            isOpen={deleteSupplierQuoteModal.isOpen}
            name={selectedSupplierQuote.supplierQuoteId!}
            text={t("confirmDeleteSupplierQuote", { name: selectedSupplierQuote.supplierQuoteId! })}
            onCancel={() => {
              deleteSupplierQuoteModal.onClose();
              setSelectedSupplierQuote(null);
            }}
            onSubmit={() => {
              deleteSupplierQuoteModal.onClose();
              setSelectedSupplierQuote(null);
            }}
          />
        )}
      </>
    );
  }
);

SupplierQuotesTable.displayName = "SupplierQuotesTable";

export default SupplierQuotesTable;
