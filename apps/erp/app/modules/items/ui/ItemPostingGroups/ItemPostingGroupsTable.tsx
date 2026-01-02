import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import type { ItemPostingGroup } from "../../types";

type ItemGroupsTableProps = {
  data: ItemPostingGroup[];
  count: number;
};

const ItemGroupsTable = memo(({ data, count }: ItemGroupsTableProps) => {
  const { t } = useTranslation("items");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();

  const rows = useMemo(() => data, [data]);
  const customColumns = useCustomColumns<ItemPostingGroup>("itemGroup");

  const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(() => {
    const defaultColumns: ColumnDef<(typeof rows)[number]>[] = [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <Enumerable
            value={row.original.name}
            onClick={() =>
              navigate(
                `${path.to.itemPostingGroup(
                  row.original.id
                )}?${params.toString()}`
              )
            }
            className="cursor-pointer"
          />
        )
      },
      {
        accessorKey: "description",
        header: t("description"),
        cell: (item) => item.getValue()
      }
    ];
    return [...defaultColumns, ...customColumns];
  }, [navigate, params, customColumns, t]);

  const renderContextMenu = useCallback(
    (row: (typeof rows)[number]) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("update", "parts")}
            onClick={() => {
              navigate(
                `${path.to.itemPostingGroup(row.id)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editItemGroup")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "parts")}
            onClick={() => {
              navigate(
                `${path.to.deleteItemPostingGroup(row.id)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteItemGroup")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<(typeof rows)[number]>
      data={data}
      columns={columns}
      count={count}
      primaryAction={
        permissions.can("create", "parts") && (
          <New
            label={t("itemGroup")}
            to={`${path.to.newItemPostingGroup}?${params.toString()}`}
          />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("itemGroups")}
    />
  );
});

ItemGroupsTable.displayName = "ItemGroupsTable";
export default ItemGroupsTable;
