import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem, useDisclosure } from "@carbon/react";
import { getItemReadableId } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import {
  LuAlignLeft,
  LuDice5,
  LuDna,
  LuPencil,
  LuShapes,
  LuSquareStack,
  LuStar,
  LuTrash,
  LuTriangleAlert,
  LuUser
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { EmployeeAvatar, Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { Confirm } from "~/components/Modals";
import { usePermissions, useUrlParams } from "~/hooks";
import {
  riskRegisterType,
  riskSource,
  riskStatus
} from "~/modules/quality/quality.models";
import type { Risk } from "~/modules/quality/types";
import { useItems, usePeople } from "~/stores";
import { path } from "~/utils/path";
import { RiskRating } from "./RiskRating";
import RiskStatus from "./RiskStatus";
import RiskType from "./RiskType";

type RiskRegistersTableProps = {
  data: Risk[];
  count: number;
};

const defaultColumnVisibility = {
  itemId: false,
  description: false,
  createdAt: true,
  updatedAt: false
};

const RiskRegistersTable = memo(({ data, count }: RiskRegistersTableProps) => {
  const { t } = useTranslation("quality");
  const navigate = useNavigate();
  const [params] = useUrlParams();
  const [items] = useItems();
  const [people] = usePeople();

  const permissions = usePermissions();
  const deleteModal = useDisclosure();
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const onDelete = useCallback(
    (risk: Risk) => {
      setSelectedRisk(risk);
      deleteModal.onOpen();
    },
    [deleteModal]
  );

  const onCancel = useCallback(() => {
    setSelectedRisk(null);
    deleteModal.onClose();
  }, [deleteModal]);

  const columns = useMemo<ColumnDef<Risk>[]>(() => {
    const defaultColumns: ColumnDef<Risk>[] = [
      {
        accessorKey: "title",
        header: t("title"),
        cell: ({ row }) => (
          <Hyperlink to={row.original.id!} className="font-medium">
            <div className="flex flex-col gap-1">
              <span>{row.original.title}</span>
              {row.original.itemId && (
                <span className="text-muted-foreground text-xs">
                  {getItemReadableId(items, row.original.itemId)}
                </span>
              )}
            </div>
          </Hyperlink>
        )
      },
      {
        accessorKey: "type",
        header: t("type"),
        cell: ({ row }) => {
          return <RiskType type={row.original.type} />;
        },
        meta: {
          icon: <LuShapes />,
          filter: {
            type: "static",
            options: riskRegisterType.map((t) => ({
              value: t,
              label: <RiskType type={t} />
            }))
          }
        }
      },
      {
        accessorKey: "itemId",
        header: t("item"),
        cell: ({ row }) => getItemReadableId(items, row.original.itemId),
        meta: {
          icon: <LuSquareStack />,
          filter: {
            type: "static",
            options: items.map((item) => ({
              value: item.id,
              label: item.readableIdWithRevision
            }))
          }
        }
      },
      {
        accessorKey: "source",
        header: t("source"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />,
        meta: {
          icon: <LuDna />,
          filter: {
            type: "static",
            options: riskSource.map((c) => ({
              value: c,
              label: <Enumerable value={c} />
            }))
          }
        }
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <RiskStatus status={row.original.status} />,
        meta: {
          icon: <LuStar />,
          filter: {
            type: "static",
            options: riskStatus.map((s) => ({
              value: s,
              label: <RiskStatus status={s} />
            }))
          },
          pluralHeader: "Statuses"
        }
      },
      {
        accessorKey: "severity",
        header: t("severity"),
        cell: ({ row }) => <RiskRating rating={row.original.severity ?? 1} />,
        meta: {
          icon: <LuTriangleAlert />,
          filter: {
            type: "static",
            options: [1, 2, 3, 4, 5].map((s) => ({
              value: s.toString(),
              label: <RiskRating rating={s} />
            }))
          },
          pluralHeader: "Severities"
        }
      },
      {
        accessorKey: "likelihood",
        header: t("likelihood"),
        cell: ({ row }) => <RiskRating rating={row.original.likelihood ?? 1} />,
        meta: {
          icon: <LuDice5 />,
          filter: {
            type: "static",
            options: [1, 2, 3, 4, 5].map((s) => ({
              value: s.toString(),
              label: <RiskRating rating={s} />
            }))
          }
        }
      },
      {
        id: "assignee",
        header: t("assignee"),
        cell: ({ row }) => (
          <EmployeeAvatar employeeId={row.original.assignee} />
        ),
        meta: {
          icon: <LuUser />,
          filter: {
            type: "static",
            options: people.map((employee) => ({
              value: employee.id,
              label: employee.name
            }))
          }
        }
      }
    ];
    return defaultColumns;
  }, [people, items, t]);

  const renderContextMenu = useCallback<(row: Risk) => JSX.Element>(
    (row) => (
      <>
        <MenuItem
          onClick={() => {
            navigate(`${path.to.risk(row.id!)}?${params?.toString()}`);
          }}
        >
          <MenuIcon icon={<LuPencil />} />
          {t("editRisk")}
        </MenuItem>
        <MenuItem
          destructive
          disabled={!permissions.can("delete", "quality")}
          onClick={() => onDelete(row)}
        >
          <MenuIcon icon={<LuTrash />} />
          {t("deleteRisk")}
        </MenuItem>
      </>
    ),
    [permissions, navigate, params, onDelete, t]
  );

  return (
    <>
      <Table<Risk>
        data={data}
        defaultColumnVisibility={defaultColumnVisibility}
        columns={columns}
        count={count ?? 0}
        primaryAction={
          permissions.can("create", "quality") && (
            <New label={t("risk")} to={`new?${params.toString()}`} />
          )
        }
        renderContextMenu={renderContextMenu}
        title={t("risks")}
        table="riskRegister"
        withSavedView
      />

      {selectedRisk && selectedRisk.id && (
        <Confirm
          action={path.to.deleteRisk(selectedRisk.id)}
          title={`${t("deleteRisk")} ${selectedRisk?.title}`}
          text={t("confirmDeleteRisk")}
          confirmText={t("delete")}
          isOpen={deleteModal.isOpen}
          onCancel={onCancel}
          onSubmit={onCancel}
        />
      )}
    </>
  );
});

RiskRegistersTable.displayName = "RiskRegistersTable";
export default RiskRegistersTable;
