import { useTranslation } from "@carbon/locale";
import { Badge, MenuIcon, MenuItem, useDisclosure } from "@carbon/react";
import { formatDateTime, formatDurationMilliseconds } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import {
  EmployeeAvatar,
  Hyperlink,
  New,
  Table,
  TimeTypeIcon
} from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions, useUrlParams } from "~/hooks";
import type { WorkCenter } from "~/modules/resources/types";
import { usePeople } from "~/stores";
import { path } from "~/utils/path";
import type { ProductionEvent } from "../../types";

type ProductionEventsTableProps = {
  data: ProductionEvent[];
  count: number;
  operations: { id: string; description: string | null }[];
  workCenters: WorkCenter[];
};

const ProductionEventsTable = memo(
  ({ data, count, operations, workCenters }: ProductionEventsTableProps) => {
    const { t } = useTranslation("production");
    const { jobId } = useParams();
    if (!jobId) throw new Error("Job ID is required");
    const [people] = usePeople();

    const columns = useMemo<ColumnDef<ProductionEvent>[]>(() => {
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
          accessorKey: "employeeId",
          header: t("employee"),
          cell: ({ row }) => (
            <EmployeeAvatar employeeId={row.original.employeeId} />
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
                row.original.type === "Labor"
                  ? "green"
                  : row.original.type === "Machine"
                    ? "blue"
                    : "yellow"
              }
            >
              <TimeTypeIcon type={row.original.type ?? ""} className="mr-2" />
              {row.original.type}
            </Badge>
          ),
          meta: {
            filter: {
              type: "static",
              options: ["Setup", "Labor", "Machine"].map((type) => ({
                value: type,
                label: (
                  <Badge
                    variant={
                      type === "Labor"
                        ? "green"
                        : type === "Machine"
                          ? "blue"
                          : "yellow"
                    }
                  >
                    <TimeTypeIcon type={type} className="mr-2" />
                    {type}
                  </Badge>
                )
              }))
            }
          }
        },
        {
          accessorKey: "duration",
          header: t("duration"),
          cell: ({ row }) =>
            row.original.duration
              ? formatDurationMilliseconds(row.original.duration * 1000)
              : null
        },
        {
          accessorKey: "workCenterId",
          header: t("workCenter"),
          cell: ({ row }) => {
            const workCenter = workCenters.find(
              (wc) => wc.id === row.original.workCenterId
            );
            return <Enumerable value={workCenter?.name ?? null} />;
          },
          meta: {
            filter: {
              type: "static",
              options: workCenters.map((workCenter) => ({
                value: workCenter.id!,
                label: <Enumerable value={workCenter.name} />
              }))
            }
          }
        },
        {
          accessorKey: "startTime",
          header: t("startTime"),
          cell: ({ row }) => formatDateTime(row.original.startTime)
        },
        {
          accessorKey: "endTime",
          header: t("endTime"),
          cell: ({ row }) =>
            row.original.endTime ? formatDateTime(row.original.endTime) : null
        },
        {
          accessorKey: "notes",
          header: t("notes"),
          cell: ({ row }) => (
            <div
              className="max-w-[200px] truncate"
              title={row.original.notes ?? ""}
            >
              {row.original.notes}
            </div>
          )
        }
      ];
    }, [operations, people, workCenters, t]);

    const permissions = usePermissions();

    const deleteModal = useDisclosure();
    const [selectedEvent, setSelectedEvent] = useState<ProductionEvent | null>(
      null
    );

    const onDelete = (data: ProductionEvent) => {
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
      (row: ProductionEvent) => JSX.Element
    >(
      (row) => (
        <>
          <MenuItem
            disabled={!permissions.can("update", "production")}
            onClick={() => navigate(row.id)}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editEvent")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "production")}
            onClick={() => onDelete(row)}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteEvent")}
          </MenuItem>
        </>
      ),

      [permissions, t]
    );
    const [params] = useUrlParams();

    return (
      <>
        <Table<ProductionEvent>
          compact
          count={count}
          columns={columns}
          data={data}
          primaryAction={
            permissions.can("update", "accounting") && (
              <New label={t("productionEvent")} to={`new?${params.toString()}`} />
            )
          }
          renderContextMenu={renderContextMenu}
          title={t("productionEvents")}
        />
        {deleteModal.isOpen && selectedEvent && (
          <ConfirmDelete
            action={path.to.deleteProductionEvent(selectedEvent.id)}
            isOpen
            name={`${
              selectedEvent.jobOperation?.description ?? t("operation")
            } by ${
              people.find((p) => p.id === selectedEvent.employeeId)?.name ??
              t("employee")
            }`}
            text={t("confirmDeleteEvent")}
            onCancel={onDeleteCancel}
            onSubmit={onDeleteCancel}
          />
        )}
      </>
    );
  }
);

ProductionEventsTable.displayName = "ProductionEventsTable";

export default ProductionEventsTable;
