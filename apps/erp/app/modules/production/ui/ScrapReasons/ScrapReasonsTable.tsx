import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import type { ScrapReason } from "../../types";

type ScrapReasonsTableProps = {
  data: ScrapReason[];
  count: number;
};

const ScrapReasonsTable = memo(({ data, count }: ScrapReasonsTableProps) => {
  const { t } = useTranslation("production");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();

  const customColumns = useCustomColumns<ScrapReason>("scrapReason");
  const columns = useMemo<ColumnDef<ScrapReason>[]>(() => {
    const defaultColumns: ColumnDef<ScrapReason>[] = [
      {
        accessorKey: "name",
        header: t("scrapReason"),
        cell: ({ row }) => (
          <Hyperlink to={row.original.id}>
            <Enumerable value={row.original.name} />
          </Hyperlink>
        ),
        meta: {
          icon: <LuTrash />
        }
      }
    ];
    return [...defaultColumns, ...customColumns];
  }, [customColumns, t]);

  const renderContextMenu = useCallback(
    (row: ScrapReason) => {
      return (
        <>
          <MenuItem
            onClick={() => {
              navigate(`${path.to.scrapReason(row.id)}?${params.toString()}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editScrapReason")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "sales")}
            onClick={() => {
              navigate(
                `${path.to.deleteScrapReason(row.id)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteScrapReason")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<ScrapReason>
      data={data}
      columns={columns}
      count={count}
      primaryAction={
        permissions.can("create", "sales") && (
          <New
            label={t("scrapReason")}
            to={`${path.to.newScrapReason}?${params.toString()}`}
          />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("scrapReasons")}
    />
  );
});

ScrapReasonsTable.displayName = "ScrapReasonsTable";
export default ScrapReasonsTable;
