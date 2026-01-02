import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { LuCircleGauge, LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import type { GaugeType } from "../../types";

type GaugeTypesTableProps = {
  data: GaugeType[];
  count: number;
};

const GaugeTypesTable = memo(({ data, count }: GaugeTypesTableProps) => {
  const { t } = useTranslation("quality");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();

  const customColumns = useCustomColumns<GaugeType>("gaugeType");

  const columns = useMemo<ColumnDef<GaugeType>[]>(() => {
    const defaultColumns: ColumnDef<GaugeType>[] = [
      {
        accessorKey: "name",
        header: t("gaugeType"),
        cell: ({ row }) => (
          <Hyperlink to={row.original.id}>
            <Enumerable value={row.original.name} />
          </Hyperlink>
        ),
        meta: {
          icon: <LuCircleGauge />
        }
      }
    ];
    return [...defaultColumns, ...customColumns];
  }, [customColumns, t]);

  const renderContextMenu = useCallback(
    (row: GaugeType) => {
      return (
        <>
          <MenuItem
            onClick={() => {
              navigate(`${path.to.gaugeType(row.id)}?${params.toString()}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editGaugeType")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "sales")}
            onClick={() => {
              navigate(
                `${path.to.deleteGaugeType(row.id)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteGaugeType")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<GaugeType>
      data={data}
      columns={columns}
      count={count}
      primaryAction={
        permissions.can("create", "quality") && (
          <New
            label={t("gaugeType")}
            to={`${path.to.newGaugeType}?${params.toString()}`}
          />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("gaugeTypes")}
    />
  );
});

GaugeTypesTable.displayName = "GaugeTypesTable";
export default GaugeTypesTable;
