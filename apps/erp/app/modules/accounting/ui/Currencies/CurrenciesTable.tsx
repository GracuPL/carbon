import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { LuBookMarked, LuEuro, LuPencil, LuPercent } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, Table } from "~/components";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import type { Currency } from "../../types";

type CurrenciesTableProps = {
  data: Currency[];
  count: number;
};

const CurrenciesTable = memo(({ data, count }: CurrenciesTableProps) => {
  const { t } = useTranslation("accounting");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();
  const customColumns = useCustomColumns<Currency>("currency");

  const columns = useMemo<ColumnDef<Currency>[]>(() => {
    const defaultColumns: ColumnDef<Currency>[] = [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <Hyperlink to={row.original.id as string}>
            {row.original.name}
          </Hyperlink>
        ),
        meta: {
          icon: <LuBookMarked />
        }
      },
      {
        accessorKey: "code",
        header: t("code"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuEuro />
        }
      },
      {
        accessorKey: "exchangeRate",
        header: t("exchangeRate"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuPercent />
        }
      }
    ];
    return [...defaultColumns, ...customColumns];
  }, [customColumns, t]);

  const renderContextMenu = useCallback(
    (row: Currency) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("update", "accounting")}
            onClick={() => {
              navigate(
                `${path.to.currency(row.id as string)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editCurrency")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<Currency>
      data={data}
      columns={columns}
      count={count}
      renderContextMenu={renderContextMenu}
      title={t("currencies")}
    />
  );
});

CurrenciesTable.displayName = "CurrenciesTable";
export default CurrenciesTable;
