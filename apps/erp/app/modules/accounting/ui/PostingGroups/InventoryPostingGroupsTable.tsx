import { useTranslation } from "@carbon/locale";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Table } from "~/components";
import { EditableList } from "~/components/Editable";
import { Enumerable } from "~/components/Enumerable";
import type { ListItem } from "~/types";
import type { AccountListItem, InventoryPostingGroup } from "../../types";
import usePostingGroups from "./usePostingGroups";

type InventoryPostingGroupsTableProps = {
  data: InventoryPostingGroup[];
  count: number;
  itemPostingGroups: ListItem[];
  locations: ListItem[];
  balanceSheetAccounts: AccountListItem[];
  incomeStatementAccounts: AccountListItem[];
};

const InventoryPostingGroupsTable = ({
  data,
  count,
  itemPostingGroups,
  locations,
  balanceSheetAccounts,
  incomeStatementAccounts
}: InventoryPostingGroupsTableProps) => {
  const { t } = useTranslation("accounting");
  const { canEdit, onCellEdit } = usePostingGroups("postingGroupInventory");

  const balanceSheetAccountOptions = useMemo(() => {
    return balanceSheetAccounts.map((account) => ({
      label: account.number,
      value: account.number
    }));
  }, [balanceSheetAccounts]);

  const incomeStatementAccountOptions = useMemo(() => {
    return incomeStatementAccounts.map((account) => ({
      label: account.number,
      value: account.number
    }));
  }, [incomeStatementAccounts]);

  const columns = useMemo<ColumnDef<InventoryPostingGroup>[]>(() => {
    return [
      {
        id: "itemPostingGroupId",
        header: t("postingGroup"),
        cell: ({ row }) => (
          <Enumerable
            value={
              itemPostingGroups.find(
                (group) => group.id === row.original.itemPostingGroupId
              )?.name ?? null
            }
          />
        ),
        meta: {
          filter: {
            type: "static",
            options: itemPostingGroups.map((group) => ({
              label: <Enumerable value={group.name} />,
              value: group.id
            }))
          }
        }
      },
      {
        id: "locationId",
        header: t("location"),
        cell: ({ row }) => (
          <Enumerable
            value={
              locations.find((type) => type.id === row.original.locationId)
                ?.name ?? null
            }
          />
        ),
        meta: {
          filter: {
            type: "static",
            options: locations.map((l) => ({
              label: <Enumerable value={l.name} />,
              value: l.id
            }))
          }
        }
      },
      {
        accessorKey: "costOfGoodsSoldAccount",
        header: t("cogs"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "inventoryAccount",
        header: t("inventory"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "inventoryInterimAccrualAccount",
        header: t("invInterimAccrual"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "inventoryReceivedNotInvoicedAccount",
        header: t("receivedNotInvoiced"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "inventoryInvoicedNotReceivedAccount",
        header: t("invoicedNotReceived"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "inventoryShippedNotInvoicedAccount",
        header: t("shippedNotInvoiced"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "workInProgressAccount",
        header: t("wip"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "directCostAppliedAccount",
        header: t("directCostApplied"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "overheadCostAppliedAccount",
        header: t("overheadCostApplied"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "purchaseVarianceAccount",
        header: t("purchaseVariance"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "inventoryAdjustmentVarianceAccount",
        header: t("invAdjustmentVariance"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "materialVarianceAccount",
        header: t("materialVariance"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "capacityVarianceAccount",
        header: t("capacityVariance"),
        cell: (item) => item.getValue()
      },
      {
        accessorKey: "overheadAccount",
        header: t("overhead"),
        cell: (item) => item.getValue()
      }
    ];
  }, [locations, itemPostingGroups, t]);

  const editableComponents = useMemo(
    () => ({
      costOfGoodsSoldAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      inventoryAccount: EditableList(onCellEdit, balanceSheetAccountOptions),
      inventoryInterimAccrualAccount: EditableList(
        onCellEdit,
        balanceSheetAccountOptions
      ),
      inventoryReceivedNotInvoicedAccount: EditableList(
        onCellEdit,
        balanceSheetAccountOptions
      ),
      inventoryInvoicedNotReceivedAccount: EditableList(
        onCellEdit,
        balanceSheetAccountOptions
      ),
      inventoryShippedNotInvoicedAccount: EditableList(
        onCellEdit,
        balanceSheetAccountOptions
      ),
      workInProgressAccount: EditableList(
        onCellEdit,
        balanceSheetAccountOptions
      ),
      directCostAppliedAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      overheadCostAppliedAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      purchaseVarianceAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      inventoryAdjustmentVarianceAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      materialVarianceAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      capacityVarianceAccount: EditableList(
        onCellEdit,
        incomeStatementAccountOptions
      ),
      overheadAccount: EditableList(onCellEdit, incomeStatementAccountOptions)
    }),
    [onCellEdit, balanceSheetAccountOptions, incomeStatementAccountOptions]
  );

  return (
    <Table<InventoryPostingGroup>
      data={data}
      columns={columns}
      count={count}
      editableComponents={editableComponents}
      withInlineEditing={canEdit}
      withSearch={false}
      title={t("inventoryPostingGroups")}
    />
  );
};

export default InventoryPostingGroupsTable;
