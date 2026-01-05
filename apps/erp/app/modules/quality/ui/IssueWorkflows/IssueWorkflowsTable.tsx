import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem, useDisclosure } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import {
  LuBookMarked,
  LuChartNoAxesColumnIncreasing,
  LuDna,
  LuPencil,
  LuTrash
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import type { IssueWorkflow } from "../../types";
import { getPriorityIcon, getSourceIcon } from "../Issue/IssueIcons";

type IssueWorkflowsTableProps = {
  data: IssueWorkflow[];
  count: number;
};

const IssueWorkflowsTable = memo(
  ({ data, count }: IssueWorkflowsTableProps) => {
    const { t } = useTranslation("quality");
    const navigate = useNavigate();
    const permissions = usePermissions();
    const deleteDisclosure = useDisclosure();
    const [selectedIssueWorkflow, setSelectedIssueWorkflow] =
      useState<IssueWorkflow | null>(null);

    const columns = useMemo<ColumnDef<IssueWorkflow>[]>(() => {
      const defaultColumns: ColumnDef<IssueWorkflow>[] = [
        {
          accessorKey: "name",
          header: t("name"),
          cell: ({ row }) => (
            <div className="flex flex-col gap-0">
              <Hyperlink to={path.to.issueWorkflow(row.original.id!)}>
                {row.original.name}
              </Hyperlink>
            </div>
          ),
          meta: {
            icon: <LuBookMarked />
          }
        },
        {
          accessorKey: "source",
          header: t("defaultSource"),
          cell: ({ row }) => (
            <div className="flex gap-2 items-center">
              {getSourceIcon(row.original.source, false)}
              {row.original.source}
            </div>
          ),
          meta: {
            icon: <LuDna />
          }
        },
        {
          accessorKey: "priority",
          header: t("defaultPriority"),
          cell: ({ row }) => (
            <div className="flex gap-2 items-center">
              {getPriorityIcon(row.original.priority, false)}
              {row.original.priority}
            </div>
          ),
          meta: {
            icon: <LuChartNoAxesColumnIncreasing />
          }
        }
      ];
      return [...defaultColumns];
    }, [t]);

    const renderContextMenu = useCallback(
      (row: IssueWorkflow) => {
        return (
          <>
            <MenuItem
              disabled={!permissions.can("update", "quality")}
              onClick={() => {
                navigate(`${path.to.issueWorkflow(row.id!)}`);
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editTemplate")}
            </MenuItem>
            <MenuItem
              destructive
              disabled={!permissions.can("delete", "quality")}
              onClick={() => {
                flushSync(() => {
                  setSelectedIssueWorkflow(row);
                });
                deleteDisclosure.onOpen();
              }}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteTemplate")}
            </MenuItem>
          </>
        );
      },
      [navigate, permissions, deleteDisclosure, t]
    );

    return (
      <>
        <Table<IssueWorkflow>
          data={data}
          columns={columns}
          count={count}
          primaryAction={
            permissions.can("create", "quality") && (
              <New label={t("issueWorkflow")} to={path.to.newIssueWorkflow} />
            )
          }
          renderContextMenu={renderContextMenu}
          title={t("issueWorkflows")}
          table="nonConformanceWorkflow"
          withSavedView
        />
        {deleteDisclosure.isOpen && selectedIssueWorkflow && (
          <ConfirmDelete
            action={path.to.deleteIssueWorkflow(selectedIssueWorkflow.id!)}
            isOpen
            onCancel={() => {
              setSelectedIssueWorkflow(null);
              deleteDisclosure.onClose();
            }}
            onSubmit={() => {
              setSelectedIssueWorkflow(null);
              deleteDisclosure.onClose();
            }}
            name={selectedIssueWorkflow.name ?? t("issueWorkflow")}
            text={t("confirmDeleteIssueWorkflow")}
          />
        )}
      </>
    );
  }
);

IssueWorkflowsTable.displayName = "IssueWorkflowsTable";
export default IssueWorkflowsTable;
