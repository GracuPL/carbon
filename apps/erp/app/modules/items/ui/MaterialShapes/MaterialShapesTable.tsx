import { useTranslation } from "@carbon/locale";
import { Badge, Copy, MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import {
  LuBookMarked,
  LuCircleCheck,
  LuCode,
  LuKeySquare,
  LuPencil,
  LuTrash
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import type { Form } from "../../types";

type MaterialShapesTableProps = {
  data: Form[];
  count: number;
};

const MaterialShapesTable = memo(
  ({ data, count }: MaterialShapesTableProps) => {
    const { t } = useTranslation("items");
    const [params] = useUrlParams();
    const navigate = useNavigate();
    const permissions = usePermissions();

    const rows = useMemo(() => data, [data]);
    const customColumns = useCustomColumns<Form>("materialForm");

    const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(() => {
      const defaultColumns: ColumnDef<(typeof rows)[number]>[] = [
        {
          accessorKey: "name",
          header: t("name"),
          cell: ({ row }) =>
            row.original.companyId === null ? (
              <Enumerable value={row.original.name} />
            ) : (
              <Hyperlink
                to={`${path.to.materialForm(
                  row.original.id
                )}?${params.toString()}`}
              >
                <Enumerable value={row.original.name} />
              </Hyperlink>
            ),
          meta: {
            icon: <LuBookMarked />
          }
        },
        {
          accessorKey: "code",
          header: t("code"),
          cell: ({ row }) => row.original.code,
          meta: {
            icon: <LuCode />
          }
        },
        {
          accessorKey: "id",
          header: t("id"),
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs">{row.original.id}</span>
              <Copy text={row.original.id!} />
            </div>
          ),
          meta: {
            icon: <LuKeySquare />
          }
        },
        {
          accessorKey: "companyId",
          header: t("standard"),
          cell: ({ row }) => {
            return row.original.companyId === null ? (
              <Badge variant="outline">{t("standard")}</Badge>
            ) : (
              <Badge variant="blue">{t("custom")}</Badge>
            );
          },
          meta: {
            icon: <LuCircleCheck />
          }
        }
      ];
      return [...defaultColumns, ...customColumns];
    }, [params, customColumns, t]);

    const renderContextMenu = useCallback(
      (row: (typeof rows)[number]) => {
        return (
          <>
            <MenuItem
              disabled={
                !permissions.can("update", "parts") || row.companyId === null
              }
              onClick={() => {
                navigate(
                  `${path.to.materialForm(row.id)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editMaterialShape")}
            </MenuItem>
            <MenuItem
              disabled={
                !permissions.can("delete", "parts") || row.companyId === null
              }
              destructive
              onClick={() => {
                navigate(
                  `${path.to.deleteMaterialForm(row.id)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteMaterialShape")}
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
              label={t("materialShape")}
              to={`${path.to.newMaterialForm}?${params.toString()}`}
            />
          )
        }
        renderContextMenu={renderContextMenu}
        title={t("materialShapes")}
      />
    );
  }
);

MaterialShapesTable.displayName = "MaterialShapesTable";
export default MaterialShapesTable;
