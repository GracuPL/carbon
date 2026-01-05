import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { LuPencil, LuShapes, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import type { SupplierType } from "~/modules/purchasing";
import { path } from "~/utils/path";

type SupplierTypesTableProps = {
  data: SupplierType[];
  count: number;
};

const SupplierTypesTable = memo(({ data, count }: SupplierTypesTableProps) => {
  const { t } = useTranslation("purchasing");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();
  const customColumns = useCustomColumns<SupplierType>("supplierType");

  const columns = useMemo<ColumnDef<SupplierType>[]>(() => {
    const defaultColumns: ColumnDef<SupplierType>[] = [
      {
        accessorKey: "name",
        header: t("supplierType"),
        cell: ({ row }) => (
          <Enumerable
            value={row.original.name}
            onClick={() => navigate(row.original.id as string)}
            className="cursor-pointer"
          />
        ),
        meta: {
          icon: <LuShapes />
        }
      }
    ];
    return [...defaultColumns, ...customColumns];
  }, [navigate, customColumns, t]);

  const renderContextMenu = useCallback(
    (row: SupplierType) => {
      return (
        <>
          <MenuItem
            onClick={() => {
              navigate(`${path.to.suppliers}?filter=type:eq:${row.name}`);
            }}
          >
            <MenuIcon icon={<BsPeopleFill />} />
            {t("viewSuppliers")}
          </MenuItem>
          <MenuItem
            disabled={row.protected || !permissions.can("update", "purchasing")}
            onClick={() => {
              navigate(`${path.to.supplierType(row.id)}?${params.toString()}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editSupplierType")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={row.protected || !permissions.can("delete", "purchasing")}
            onClick={() => {
              navigate(
                `${path.to.deleteSupplierType(row.id)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteSupplierType")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<SupplierType>
      data={data}
      columns={columns}
      count={count}
      primaryAction={
        permissions.can("create", "purchasing") && (
          <New
            label={t("supplierType")}
            to={`${path.to.newSupplierType}?${params.toString()}`}
          />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("supplierTypes")}
    />
  );
});

SupplierTypesTable.displayName = "SupplierTypesTable";
export default SupplierTypesTable;
