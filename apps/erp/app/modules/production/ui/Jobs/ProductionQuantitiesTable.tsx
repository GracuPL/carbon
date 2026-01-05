import { useTranslation } from "@carbon/locale";
import { Badge, MenuIcon, MenuItem, useDisclosure } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { EmployeeAvatar, Hyperlink, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { usePeople } from "~/stores";
import { path } from "~/utils/path";
import type { ProductionQuantity, ScrapReason } from "../../types";

type ProductionQuantitiesTableProps = {
  data: ProductionQuantity[];
  count: number;
  operations: { id: string; description: string | null }[];
  scrapReasons: ScrapReason[];
};

const ProductionQuantitiesTable = memo(
  ({
    data,
    count,
    operations,
    scrapReasons
  }: ProductionQuantitiesTableProps) => {
    const { t } = useTranslation("production");
    const { jobId } = useParams();
    if (!jobId) throw new Error("Job ID is required");
    const [people] = usePeople();

    const columns = useMemo<ColumnDef<ProductionQuantity>[]>(() => {
      return [
        {
          accessorKey: "jobOperationId",
          header: t("operation"),
          cell: ({ row }) => (
            <Hyperlink to={row.original.id}>
              {row.original.jobOperation?.description ?? null}
            </Hyperlink>
          ),
          meta: {
            filter: {
              type: "static",
              options: operations.map((operation) => ({
                value: operation.id,
                label: <Enumerable value={operation.description} />
              }))
            }
          }
        },
        {
          id: "item",
          header: t("item"),
          cell: ({ row }) => {
            return row.original.jobOperation?.jobMakeMethod?.item
              ?.readableIdWithRevision;
          }
        },
        {
          accessorKey: "createdBy",
          header: t("employee"),
          cell: ({ row }) => (
            <EmployeeAvatar employeeId={row.original.createdBy} />
          ),
          meta: {
            filter: {
              type: "static",
              options: people.map((employee) => ({
                value: employee.id,
                label: <Enumerable value={employee.name} />
              }))
            }
          }
        },
        {
          accessorKey: "type",
          header: t("type"),
          cell: ({ row }) => (
            <Badge
              variant={
                row.original.type === "Production"
                  ? "green"
                  : row.original.type === "Rework"
                    ? "orange"
                    : "red"
              }
            >
              {row.original.type}
            </Badge>
          ),
          meta: {
            filter: {
              type: "static",
              options: ["Production", "Rework", "Scrap"].map((type) => ({
                value: type,
                label: (
                  <Badge
                    variant={
                      type === "Production"
                        ? "green"
                        : type === "Rework"
                          ? "orange"
                          : "red"
                    }
                  >
                    {type}
                  </Badge>
                )
              }))
            }
          }
        },
        {
          accessorKey: "quantity",
          header: t("quantity"),
          cell: ({ row }) => row.original.quantity
        },
        {
          accessorKey: "scrapReasonId",
          header: t("scrapReason"),
          cell: ({ row }) => {
            const scrapReason = scrapReasons.find(
              (reason) => reason.id === row.original.scrapReasonId
            );
            return <Enumerable value={scrapReason?.name ?? ""} />;
          },
          meta: {
            filter: {
              type: "static",
              options: scrapReasons?.map((reason) => ({
                value: reason.id,
                label: <Enumerable value={reason.name ?? ""} />
              }))
            }
          }
        },
        {
          accessorKey: "notes",
          header: t("notes"),
          cell: ({ row }) => (
            <span className="max-w-[200px] truncate block">
              {row.original.notes}
            </span>
          )
        }
      ];
    }, [operations, people, scrapReasons, t]);

    const permissions = usePermissions();

    const deleteModal = useDisclosure();
    const [selectedEvent, setSelectedEvent] =
      useState<ProductionQuantity | null>(null);

    const onDelete = (data: ProductionQuantity) => {
      setSelectedEvent(data);
      deleteModal.onOpen();
    };

    const onDeleteCancel = () => {
      setSelectedEvent(null);
      deleteModal.onClose();
    };

    const navigate = useNavigate();

    // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
    const renderContextMenu = useCallback<
      (row: ProductionQuantity) => JSX.Element
    >(
      (row) => (
        <>
          <MenuItem
            disabled={!permissions.can("update", "production")}
            onClick={() => navigate(row.id)}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editQuantity")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "production")}
            onClick={() => onDelete(row)}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteQuantity")}
          </MenuItem>
        </>
      ),

      [permissions, t]
    );

    return (
      <>
        <Table<ProductionQuantity>
          compact
          count={count}
          columns={columns}
          data={data}
          renderContextMenu={renderContextMenu}
          title={t("productionQuantities")}
        />
        {deleteModal.isOpen && selectedEvent && (
          <ConfirmDelete
            action={path.to.deleteProductionQuantity(selectedEvent.id)}
            isOpen
            name={`${
              selectedEvent.jobOperation?.description ?? t("operation")
            } by ${
              people.find((p) => p.id === selectedEvent.createdBy)?.name ??
              t("employee")
            }`}
            text={t("confirmDeleteQuantity")}
            onCancel={onDeleteCancel}
            onSubmit={onDeleteCancel}
          />
        )}
      </>
    );
  }
);

ProductionQuantitiesTable.displayName = "ProductionQuantitiesTable";

export default ProductionQuantitiesTable;
