import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import {
  LuArrowRight,
  LuHash,
  LuMaximize,
  LuPencil,
  LuStepForward,
  LuText,
  LuTextCursor
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, Table } from "~/components";
import { usePermissions, useUrlParams } from "~/hooks";
import type { Sequence } from "~/modules/settings";
import { path } from "~/utils/path";

type SequencesTableProps = {
  data: Sequence[];
  count: number;
};

const SequencesTable = memo(({ data, count }: SequencesTableProps) => {
  const { t } = useTranslation("settings");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <Hyperlink to={row.original.table}>{row.original.name}</Hyperlink>
        ),
        meta: {
          icon: <LuText />
        }
      },
      {
        accessorKey: "prefix",
        header: t("prefix"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuTextCursor />
        }
      },
      {
        accessorKey: "next",
        header: t("current"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuArrowRight />
        }
      },
      {
        accessorKey: "size",
        header: t("size"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuMaximize />
        }
      },
      {
        accessorKey: "step",
        header: t("step"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuStepForward />
        }
      },
      {
        accessorKey: "suffix",
        header: t("suffix"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuHash />
        }
      }
    ];
  }, [t]);

  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("update", "settings")}
            onClick={() => {
              navigate(
                `${path.to.tableSequence(row.table)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editSequence")}
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
      renderContextMenu={renderContextMenu}
      title={t("sequences")}
    />
  );
});

SequencesTable.displayName = "SequencesTable";
export default SequencesTable;
