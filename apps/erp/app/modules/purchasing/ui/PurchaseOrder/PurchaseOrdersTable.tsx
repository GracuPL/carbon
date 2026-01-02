import { useTranslation } from "@carbon/locale";
import {
  Checkbox,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  HStack,
  MenuIcon,
  MenuItem,
  toast,
  useDisclosure
} from "@carbon/react";
import { formatDate } from "@carbon/utils";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  LuBookMarked,
  LuCalendar,
  LuContainer,
  LuCreditCard,
  LuDollarSign,
  LuHandCoins,
  LuPencil,
  LuQrCode,
  LuStar,
  LuTrash,
  LuTruck,
  LuUser
} from "react-icons/lu";
import { useFetcher } from "react-router";
import {
  EmployeeAvatar,
  Hyperlink,
  ItemThumbnail,
  New,
  SupplierAvatar,
  Table
} from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePaymentTerm } from "~/components/Form/PaymentTerm";
import { useShippingMethod } from "~/components/Form/ShippingMethod";
import { ConfirmDelete } from "~/components/Modals";
import { useCurrencyFormatter, usePermissions, useRealtime } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import type { PurchaseOrder } from "~/modules/purchasing";
import { purchaseOrderStatusType } from "~/modules/purchasing";
import type { action } from "~/routes/x+/purchase-order+/update";
import { usePeople, useSuppliers } from "~/stores";
import { path } from "~/utils/path";
import PurchasingStatus from "./PurchasingStatus";
import { usePurchaseOrder } from "./usePurchaseOrder";

type PurchaseOrdersTableProps = {
  data: PurchaseOrder[];
  count: number;
};

const PurchaseOrdersTable = memo(
  ({ data, count }: PurchaseOrdersTableProps) => {
    const { t } = useTranslation("purchasing");
    useRealtime("purchaseOrder");

    const permissions = usePermissions();
    const currencyFormatter = useCurrencyFormatter();

    const [selectedPurchaseOrder, setSelectedPurchaseOrder] =
      useState<PurchaseOrder | null>(null);

    const deletePurchaseOrderModal = useDisclosure();

    const [people] = usePeople();
    const [suppliers] = useSuppliers();
    const shippingMethods = useShippingMethod();
    const paymentTerms = usePaymentTerm();

    const { edit, receive } = usePurchaseOrder();

    const customColumns = useCustomColumns<PurchaseOrder>("purchaseOrder");

    const columns = useMemo<ColumnDef<PurchaseOrder>[]>(() => {
      const defaultColumns: ColumnDef<PurchaseOrder>[] = [
        {
          accessorKey: "purchaseOrderId",
          header: t("poNumber"),
          cell: ({ row }) => (
            <HStack>
              <ItemThumbnail
                size="sm"
                thumbnailPath={row.original.thumbnailPath}
                // @ts-ignore
                type={row.original.itemType}
              />
              <Hyperlink to={path.to.purchaseOrderDetails(row.original.id!)}>
                {row.original.purchaseOrderId}
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
          cell: ({ row }) => {
            return <SupplierAvatar supplierId={row.original.supplierId} />;
          },
          meta: {
            filter: {
              type: "static",
              options: suppliers?.map((supplier) => ({
                value: supplier.id,
                label: supplier.name
              }))
            },
            icon: <LuContainer />
          }
        },
        {
          accessorKey: "status",
          header: t("status"),
          cell: (item) => {
            const status =
              item.getValue<(typeof purchaseOrderStatusType)[number]>();
            return <PurchasingStatus status={status} />;
          },
          meta: {
            filter: {
              type: "static",
              options: purchaseOrderStatusType.map((status) => ({
                value: status,
                label: <PurchasingStatus status={status} />
              }))
            },
            pluralHeader: t("statuses"),
            icon: <LuStar />
          }
        },
        {
          accessorKey: "supplierReference",
          header: t("supplierRef"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuQrCode />
          }
        },
        {
          accessorKey: "orderDate",
          header: t("orderDate"),
          cell: (item) => formatDate(item.getValue<string>()),
          meta: {
            icon: <LuCalendar />
          }
        },
        {
          accessorKey: "receiptRequestedDate",
          header: t("requestedDate"),
          cell: (item) => formatDate(item.getValue<string>()),
          meta: {
            icon: <LuCalendar />
          }
        },
        {
          accessorKey: "receiptPromisedDate",
          header: t("promisedDate"),
          cell: ({ row }) => {
            const isReceivedOnTime =
              row.original.deliveryDate &&
              row.original.receiptPromisedDate &&
              row.original.deliveryDate <= row.original.receiptPromisedDate;

            const isOverdue =
              ["Cancelled", "Draft"].includes(row.original.status ?? "") &&
              row.original.receiptPromisedDate &&
              row.original.receiptPromisedDate <
                today(getLocalTimeZone()).toString();

            return (
              <span
                className={
                  isReceivedOnTime
                    ? "text-emerald-500"
                    : isOverdue
                      ? "text-red-500"
                      : ""
                }
              >
                {formatDate(row.original.receiptPromisedDate)}
              </span>
            );
          },
          meta: {
            icon: <LuCalendar />
          }
        },
        {
          accessorKey: "orderTotal",
          header: t("orderTotal"),
          cell: (item) => currencyFormatter.format(item.getValue<number>()),
          meta: {
            icon: <LuDollarSign />,
            formatter: currencyFormatter.format,
            renderTotal: true
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
          accessorKey: "shippingMethodId",
          header: t("shippingMethod"),
          cell: (item) => (
            <Enumerable
              value={
                shippingMethods.find(
                  (sm) => sm.value === item.getValue<string>()
                )?.label ?? null
              }
            />
          ),
          meta: {
            icon: <LuTruck />
          }
        },
        {
          accessorKey: "paymentTermId",
          header: t("paymentMethod"),
          cell: (item) => (
            <Enumerable
              value={
                paymentTerms.find((pt) => pt.value === item.getValue<string>())
                  ?.label ?? null
              }
            />
          ),
          meta: {
            icon: <LuCreditCard />
          }
        },
        {
          accessorKey: "dropShipment",
          header: t("dropShipment"),
          cell: (item) => <Checkbox isChecked={item.getValue<boolean>()} />,
          meta: {
            filter: {
              type: "static",
              options: [
                { value: "true", label: "Yes" },
                { value: "false", label: "No" }
              ]
            },
            pluralHeader: t("dropShipmentStatuses"),
            icon: <LuTruck />
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
    }, [
      suppliers,
      people,
      customColumns,
      currencyFormatter,
      shippingMethods,
      paymentTerms,
      t
    ]);

    const fetcher = useFetcher<typeof action>();
    useEffect(() => {
      if (fetcher.data?.error) {
        toast.error(fetcher.data.error.message);
      }
    }, [fetcher.data]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
    const onBulkUpdate = useCallback(
      (selectedRows: typeof data, field: "delete", value?: string) => {
        const formData = new FormData();
        selectedRows.forEach((row) => {
          if (row.id) formData.append("ids", row.id);
        });
        formData.append("field", field);
        if (value) formData.append("value", value);
        fetcher.submit(formData, {
          method: "post",
          action: path.to.bulkUpdatePurchaseOrder
        });
      },

      []
    );

    const renderActions = useCallback(
      (selectedRows: typeof data) => {
        return (
          <DropdownMenuContent align="end" className="min-w-[200px]">
            <DropdownMenuLabel>{t("update")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={
                  !permissions.can("delete", "purchasing") ||
                  selectedRows.some(
                    (row) => !["Draft", "Planned"].includes(row.status ?? "")
                  )
                }
                destructive
                onClick={() => onBulkUpdate(selectedRows, "delete")}
              >
                <MenuIcon icon={<LuTrash />} />
                {t("deletePurchaseOrders")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        );
      },
      [onBulkUpdate, permissions, t]
    );

    const renderContextMenu = useCallback(
      (row: PurchaseOrder) => (
        <>
          <MenuItem
            disabled={!permissions.can("view", "purchasing")}
            onClick={() => edit(row)}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("edit")}
          </MenuItem>

          <MenuItem
            disabled={
              !["To Receive", "To Receive and Invoice"].includes(
                row.status ?? ""
              ) || !permissions.can("update", "inventory")
            }
            onClick={() => {
              receive(row);
            }}
          >
            <MenuIcon icon={<LuHandCoins />} />
            {t("receive")}
          </MenuItem>
          <MenuItem
            disabled={
              !permissions.can("delete", "purchasing") ||
              !["Draft", "Planned"].includes(row.status ?? "")
            }
            destructive
            onClick={() => {
              setSelectedPurchaseOrder(row);
              deletePurchaseOrderModal.onOpen();
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("delete")}
          </MenuItem>
        </>
      ),
      [deletePurchaseOrderModal, edit, permissions, receive, t]
    );

    return (
      <>
        <Table<PurchaseOrder>
          count={count}
          columns={columns}
          data={data}
          defaultColumnPinning={{
            left: ["purchaseOrderId"]
          }}
          defaultColumnVisibility={{
            shippingMethodName: false,
            paymentTermName: false,
            dropShipment: false,
            createdBy: false,
            createdAt: false,
            updatedBy: false,
            updatedAt: false
          }}
          primaryAction={
            permissions.can("create", "purchasing") && (
              <New label={t("purchaseOrder")} to={path.to.newPurchaseOrder} />
            )
          }
          renderContextMenu={renderContextMenu}
          renderActions={renderActions}
          title={t("purchaseOrders")}
          table="purchaseOrder"
          withSavedView
          withSelectableRows
        />

        {selectedPurchaseOrder && selectedPurchaseOrder.id && (
          <ConfirmDelete
            action={path.to.deletePurchaseOrder(selectedPurchaseOrder.id)}
            isOpen={deletePurchaseOrderModal.isOpen}
            name={selectedPurchaseOrder.purchaseOrderId!}
            text={t("confirmDeletePurchaseOrder", { name: selectedPurchaseOrder.purchaseOrderId! })}
            onCancel={() => {
              deletePurchaseOrderModal.onClose();
              setSelectedPurchaseOrder(null);
            }}
            onSubmit={() => {
              deletePurchaseOrderModal.onClose();
              setSelectedPurchaseOrder(null);
            }}
          />
        )}
      </>
    );
  }
);
PurchaseOrdersTable.displayName = "PurchaseOrdersTable";

export default PurchaseOrdersTable;
