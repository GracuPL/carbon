import { useTranslation } from "@carbon/locale";
import {
  Badge,
  HStack,
  MenuIcon,
  MenuItem,
  useDisclosure
} from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import {
  LuBookOpen,
  LuClock,
  LuPencil,
  LuRepeat,
  LuShapes,
  LuStar,
  LuTag,
  LuTrash,
  LuUser
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { EmployeeAvatar, Hyperlink, New, Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import type { TrainingListItem } from "~/modules/resources";
import { path } from "~/utils/path";
import TrainingStatus from "./TrainingStatus";

type TrainingsTableProps = {
  data: TrainingListItem[];
  count: number;
  tags: Array<{ name: string }>;
};

const TrainingsTable = memo(({ data, count, tags }: TrainingsTableProps) => {
  const { t } = useTranslation("resources");
  const navigate = useNavigate();
  const permissions = usePermissions();

  const deleteDisclosure = useDisclosure();
  const [selectedTraining, setSelectedTraining] =
    useState<TrainingListItem | null>(null);

  const columns = useMemo<ColumnDef<TrainingListItem>[]>(() => {
    const defaultColumns: ColumnDef<TrainingListItem>[] = [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <Hyperlink to={path.to.training(row.original.id!)}>
            {row.original.name}
          </Hyperlink>
        ),
        meta: {
          icon: <LuBookOpen />
        }
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <TrainingStatus status={row.original.status} />,
        meta: {
          filter: {
            type: "static",
            options: [
              { value: "Draft", label: <TrainingStatus status="Draft" /> },
              { value: "Active", label: <TrainingStatus status="Active" /> },
              {
                value: "Archived",
                label: <TrainingStatus status="Archived" />
              }
            ]
          },
          icon: <LuStar />
        }
      },
      {
        accessorKey: "type",
        header: t("type"),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.type === "Mandatory" ? "default" : "secondary"
            }
          >
            {row.original.type}
          </Badge>
        ),
        meta: {
          filter: {
            type: "static",
            options: [
              { value: "Mandatory", label: t("mandatory") },
              { value: "Optional", label: t("optional") }
            ]
          },
          icon: <LuShapes />
        }
      },
      {
        accessorKey: "frequency",
        header: t("frequency"),
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.frequency}</Badge>
        ),
        meta: {
          icon: <LuRepeat />,
          filter: {
            type: "static",
            options: [
              { value: "Once", label: t("once") },
              { value: "Quarterly", label: t("quarterly") },
              { value: "Annual", label: t("annual") }
            ]
          }
        }
      },
      {
        accessorKey: "estimatedDuration",
        header: t("duration"),
        cell: ({ row }) =>
          row.original.estimatedDuration ? (
            <div className="flex items-center gap-1">
              <LuClock />{" "}
              <span className="text-xs text-muted-foreground">
                {row.original.estimatedDuration}
              </span>
            </div>
          ) : (
            "-"
          ),
        meta: {
          icon: <LuClock />
        }
      },
      {
        accessorKey: "assignee",
        header: t("assignee"),
        cell: ({ row }) => (
          <EmployeeAvatar employeeId={row.original.assignee} />
        ),
        meta: {
          icon: <LuUser />
        }
      },
      {
        accessorKey: "tags",
        header: t("tags"),
        cell: ({ row }) => (
          <HStack spacing={0} className="gap-1">
            {row.original.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </HStack>
        ),
        meta: {
          filter: {
            type: "static",
            options: tags.map((tag) => ({
              value: tag.name,
              label: <Badge variant="secondary">{tag.name}</Badge>
            })),
            isArray: true
          },
          icon: <LuTag />
        }
      }
    ];
    return [...defaultColumns];
  }, [tags, t]);

  const renderContextMenu = useCallback(
    (row: TrainingListItem) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("update", "resources")}
            onClick={() => {
              navigate(`${path.to.training(row.id!)}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editTraining")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={!permissions.can("delete", "resources")}
            onClick={() => {
              flushSync(() => {
                setSelectedTraining(row);
              });
              deleteDisclosure.onOpen();
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteTraining")}
          </MenuItem>
        </>
      );
    },
    [navigate, permissions, deleteDisclosure, t]
  );

  return (
    <>
      <Table<TrainingListItem>
        data={data}
        columns={columns}
        count={count}
        primaryAction={
          permissions.can("create", "resources") && (
            <New label={t("training")} to={path.to.newTraining} />
          )
        }
        renderContextMenu={renderContextMenu}
        title={t("trainings")}
        table="training"
        withSavedView
      />
      {deleteDisclosure.isOpen && selectedTraining && (
        <ConfirmDelete
          action={path.to.deleteTraining(selectedTraining.id!)}
          isOpen
          onCancel={() => {
            setSelectedTraining(null);
            deleteDisclosure.onClose();
          }}
          onSubmit={() => {
            setSelectedTraining(null);
            deleteDisclosure.onClose();
          }}
          name={selectedTraining.name ?? t("training")}
          text={t("confirmDeleteTraining")}
        />
      )}
    </>
  );
});

TrainingsTable.displayName = "TrainingsTable";
export default TrainingsTable;
