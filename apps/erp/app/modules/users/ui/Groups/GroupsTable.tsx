import { useTranslation } from "@carbon/locale";
import {
  AvatarGroup,
  AvatarGroupList,
  AvatarOverflowIndicator,
  DropdownMenuIcon,
  MenuItem
} from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { LuBookMarked, LuPencil, LuTrash, LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Avatar, Hyperlink, New, Table } from "~/components";
import { usePermissions, useUrlParams } from "~/hooks";
import type { Group } from "~/modules/users";
import { path } from "~/utils/path";

type GroupsTableProps = {
  data: Group[];
  count: number;
};

const GroupsTable = memo(({ data, count }: GroupsTableProps) => {
  const { t } = useTranslation("users");
  const navigate = useNavigate();
  const permissions = usePermissions();
  const [params] = useUrlParams();

  const rows = data.map((row) => ({
    id: row.data.id,
    name: row.data.name,
    isEmployeeTypeGroup: row.data.isEmployeeTypeGroup,
    isCustomerTypeGroup: row.data.isCustomerTypeGroup,
    isSupplierTypeGroup: row.data.isSupplierTypeGroup,
    members: row.data.users
      .map((user) => ({
        name: user.fullName,
        avatar: user.avatarUrl
      }))
      .concat(
        row.children.map((child) => ({ name: child.data.name, avatar: null }))
      )
  }));

  const columns = useMemo<ColumnDef<(typeof rows)[number]>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: t("groupName"),
        cell: ({ row }) =>
          row.original.isEmployeeTypeGroup ||
          row.original.isCustomerTypeGroup ||
          row.original.isSupplierTypeGroup ? (
            <span>{row.original.name}</span>
          ) : (
            <Hyperlink to={path.to.group(row.original.id)}>
              {row.original.name}
            </Hyperlink>
          ),
        meta: {
          icon: <LuBookMarked />
        }
      },
      {
        header: t("members"),
        // accessorKey: undefined, // makes the column unsortable
        cell: ({ row }) => (
          <AvatarGroup limit={3}>
            <AvatarGroupList>
              {row.original.members.map(
                (
                  member: { name: string | null; avatar: string | null },
                  index: number
                ) => (
                  <Avatar
                    key={index}
                    name={member.name ?? undefined}
                    title={member.name ?? undefined}
                    path={member.avatar}
                  />
                )
              )}
            </AvatarGroupList>
            <AvatarOverflowIndicator />
          </AvatarGroup>
        ),
        meta: {
          icon: <LuUsers />
        }
      }
    ];
  }, [t]);

  const renderContextMenu = useCallback(
    (row: (typeof rows)[number]) => {
      return (
        <>
          <MenuItem
            disabled={
              row.isEmployeeTypeGroup ||
              row.isCustomerTypeGroup ||
              row.isSupplierTypeGroup ||
              !permissions.can("update", "users")
            }
            onClick={() => {
              navigate(path.to.group(row.id));
            }}
          >
            <DropdownMenuIcon icon={<LuPencil />} />
            {t("editGroup")}
          </MenuItem>
          <MenuItem
            destructive
            disabled={
              row.isEmployeeTypeGroup ||
              row.isCustomerTypeGroup ||
              row.isSupplierTypeGroup ||
              !permissions.can("delete", "users")
            }
            onClick={() => {
              navigate(path.to.deleteGroup(row.id));
            }}
          >
            <DropdownMenuIcon icon={<LuTrash />} />
            {t("deleteGroup")}
          </MenuItem>
        </>
      );
    },
    [t, navigate, permissions]
  );

  return (
    <Table<(typeof rows)[number]>
      data={rows}
      count={count}
      columns={columns}
      primaryAction={
        permissions.can("create", "users") && (
          <New label={t("group")} to={`new?${params.toString()}`} />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("groups")}
    />
  );
});

GroupsTable.displayName = "GroupsTable";
export default GroupsTable;
