import { useTranslation } from "@carbon/locale";
import { Avatar, HStack, MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import type { Partner } from "~/modules/resources";
import { useSuppliers } from "~/stores";
import { path } from "~/utils/path";

type PartnersTableProps = {
  data: Partner[];
  count: number;
  // abilities: Partial<Ability>[];
};

const PartnersTable = memo(({ data, count }: PartnersTableProps) => {
  const { t } = useTranslation("resources");
  const navigate = useNavigate();
  const permissions = usePermissions();
  const [params] = useUrlParams();
  const [suppliers] = useSuppliers();

  const customColumns = useCustomColumns<Partner>("partner");
  const columns = useMemo<ColumnDef<Partner>[]>(() => {
    const defaultColumns: ColumnDef<Partner>[] = [
      {
        accessorKey: "supplierName",
        header: t("supplier"),
        cell: ({ row }) => (
          <HStack>
            <Avatar size="sm" name={row.original.supplierName ?? ""} />

            <Hyperlink
              to={`${path.to.partner(
                row.original.supplierLocationId!,
                row.original.abilityId!
              )}?${params.toString()}`}
            >
              {row.original.supplierName}
            </Hyperlink>
          </HStack>
        ),
        meta: {
          filter: {
            type: "static",
            options: suppliers.map((supplier) => ({
              value: supplier.name,
              label: supplier.name
            }))
          }
        }
      },
      {
        header: t("location"),
        cell: ({ row }) => `${row.original.city}, ${row.original.state}`
      },
      // {
      //   accessorKey: "abilityName",
      //   header: "Ability",
      //   cell: (item) => <Enumerable value={item.getValue<string>()} />,
      //   meta: {
      //     filter: {
      //       type: "static",
      //       options: abilities.map((ability) => ({
      //         value: ability.name!,
      //         label: <Enumerable value={ability.name!} />,
      //       })),
      //     },
      //   },
      // },
      {
        accessorKey: "hoursPerWeek",
        header: t("hoursPerWeek"),
        cell: (item) => item.getValue()
      }
    ];

    return [...defaultColumns, ...customColumns];
  }, [params, customColumns, suppliers, t]);

  const renderContextMenu = useCallback(
    (row: Partner) => {
      return (
        <>
          <MenuItem
            onClick={() => {
              navigate(
                `${path.to.partner(
                  row.supplierLocationId!,
                  row.abilityId!
                )}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editPartner")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "resources")}
            onClick={() => {
              navigate(
                `${path.to.deletePartner(
                  row.supplierLocationId!
                )}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deletePartner")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<Partner>
      data={data}
      count={count}
      columns={columns}
      primaryAction={
        permissions.can("create", "resources") && (
          <New label={t("partner")} to={`new?${params.toString()}`} />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("partners")}
    />
  );
});

PartnersTable.displayName = "PartnersTable";
export default PartnersTable;
