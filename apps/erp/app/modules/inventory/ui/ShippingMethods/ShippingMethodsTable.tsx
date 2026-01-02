import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import {
  LuBanknote,
  LuBookMarked,
  LuGlobe,
  LuPencil,
  LuTrash,
  LuTruck
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { type ShippingMethod, shippingCarrierType } from "~/modules/inventory";
import { path } from "~/utils/path";

type ShippingMethodsTableProps = {
  data: ShippingMethod[];
  count: number;
};

const ShippingMethodsTable = memo(
  ({ data, count }: ShippingMethodsTableProps) => {
    const { t } = useTranslation("inventory");
    const [params] = useUrlParams();
    const navigate = useNavigate();
    const permissions = usePermissions();
    const hasAccounting =
      permissions.has("accounting") && permissions.can("view", "accounting");

    const rows = useMemo(() => data, [data]);

    const customColumns =
      useCustomColumns<(typeof data)[number]>("shippingMethod");

    // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
    const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
      let result: ColumnDef<(typeof rows)[number]>[] = [
        {
          accessorKey: "name",
          header: t("name"),
          cell: ({ row }) => (
            <Hyperlink
              to={`${path.to.shippingMethod(
                row.original.id
              )}?${params.toString()}`}
            >
              {row.original.name}
            </Hyperlink>
          ),
          meta: {
            icon: <LuBookMarked />
          }
        },
        {
          accessorKey: "carrier",
          header: t("carrier"),
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
          meta: {
            filter: {
              type: "static",
              options: shippingCarrierType.map((v) => ({
                label: v,
                value: v
              }))
            },
            icon: <LuTruck />
          }
        },
        {
          accessorKey: "trackingUrl",
          header: t("trackingUrl"),
          cell: (item) => item.getValue(),
          meta: {
            icon: <LuGlobe />
          }
        }
      ];
      result = [...result, ...customColumns];

      return hasAccounting
        ? result.concat([
            {
              accessorKey: "carrierAccountId",
              header: t("carrierAccount"),
              cell: (item) => item.getValue(),
              meta: {
                icon: <LuBanknote />
              }
            }
          ])
        : result;
    }, [permissions, customColumns, t]);

    const renderContextMenu = useCallback(
      (row: (typeof data)[number]) => {
        return (
          <>
            <MenuItem
              disabled={!permissions.can("update", "inventory")}
              onClick={() => {
                navigate(
                  `${path.to.shippingMethod(row.id)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editShippingMethod")}
            </MenuItem>
            <MenuItem
              disabled={!permissions.can("delete", "inventory")}
              destructive
              onClick={() => {
                navigate(
                  `${path.to.deleteShippingMethod(row.id)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteShippingMethod")}
            </MenuItem>
          </>
        );
      },
      [navigate, params, permissions, t]
    );

    return (
      <Table<(typeof data)[number]>
        data={data}
        columns={columns}
        count={count}
        primaryAction={
          permissions.can("create", "inventory") && (
            <New
              label={t("shippingMethod")}
              to={`${path.to.newShippingMethod}?${params.toString()}`}
            />
          )
        }
        renderContextMenu={renderContextMenu}
        title={t("shippingMethods")}
      />
    );
  }
);

ShippingMethodsTable.displayName = "ShippingMethodsTable";
export default ShippingMethodsTable;
