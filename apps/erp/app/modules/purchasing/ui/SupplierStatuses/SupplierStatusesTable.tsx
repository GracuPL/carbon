import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { LuPencil, LuStar, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import type { SupplierStatus } from "~/modules/purchasing";
import { path } from "~/utils/path";

type SupplierStatusesTableProps = {
  data: SupplierStatus[];
  count: number;
};

const SupplierStatusesTable = memo(
  ({ data, count }: SupplierStatusesTableProps) => {
    const { t } = useTranslation("purchasing");
    const [params] = useUrlParams();
    const navigate = useNavigate();
    const permissions = usePermissions();

    const customColumns = useCustomColumns<SupplierStatus>("supplierStatus");
    const columns = useMemo<ColumnDef<SupplierStatus>[]>(() => {
      const defaultColumns: ColumnDef<SupplierStatus>[] = [
        {
          accessorKey: "name",
          header: t("supplierStatus"),
          cell: ({ row }) => (
            <Hyperlink to={`${row.original.id}?${params.toString()}`}>
              <Enumerable value={row.original.name} />
            </Hyperlink>
          ),
          meta: {
            icon: <LuStar />
          }
        }
      ];
      return [...defaultColumns, ...customColumns];
    }, [params, customColumns, t]);

    const renderContextMenu = useCallback(
      (row: SupplierStatus) => {
        return (
          <>
            <MenuItem
              onClick={() => {
                navigate(`${path.to.suppliers}?filter=status:eq:${row.name}`);
              }}
            >
              <MenuIcon icon={<BsPeopleFill />} />
              {t("viewSuppliers")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(
                  `${path.to.supplierStatus(row.id)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editSupplierStatus")}
            </MenuItem>
            <MenuItem
              destructive
              disabled={!permissions.can("delete", "purchasing")}
              onClick={() => {
                navigate(
                  `${path.to.deleteSupplierStatus(row.id)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteSupplierStatus")}
            </MenuItem>
          </>
        );
      },
      [navigate, params, permissions, t]
    );

    return (
      <Table<SupplierStatus>
        data={data}
        columns={columns}
        count={count}
        primaryAction={
          permissions.can("create", "purchasing") && (
            <New
              label={t("supplierStatus")}
              to={`${path.to.newSupplierStatus}?${params.toString()}`}
            />
          )
        }
        renderContextMenu={renderContextMenu}
        title={t("statuses")}
      />
    );
  }
);

SupplierStatusesTable.displayName = "SupplierStatusesTable";
export default SupplierStatusesTable;
