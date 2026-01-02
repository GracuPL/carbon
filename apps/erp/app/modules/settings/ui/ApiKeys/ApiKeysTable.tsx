import { useTranslation } from "@carbon/locale";
import { Badge, Button, HStack, MenuIcon, MenuItem } from "@carbon/react";
import { formatDate } from "@carbon/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import {
  LuCalendar,
  LuCode,
  LuKey,
  LuPencil,
  LuTag,
  LuTrash,
  LuUser
} from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router";
import { EmployeeAvatar, Hyperlink, New, Table } from "~/components";
import { usePermissions, useUrlParams } from "~/hooks";
import { type ApiKey } from "~/modules/settings";
import { usePeople } from "~/stores";
import { path } from "~/utils/path";

type ApiKeysTableProps = {
  data: ApiKey[];
  count: number;
};

const ApiKeysTable = memo(({ data, count }: ApiKeysTableProps) => {
  const { t } = useTranslation("settings");
  const navigate = useNavigate();
  const [params] = useUrlParams();
  const permissions = usePermissions();
  const [people] = usePeople();

  const columns = useMemo<ColumnDef<ApiKey>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <Hyperlink to={row.original.id!}>{row.original.name}</Hyperlink>
        ),
        meta: {
          icon: <LuTag />
        }
      },
      {
        accessorKey: "key",
        header: t("key"),
        cell: (item) => (
          <Badge variant="secondary">{item.getValue<string>()}</Badge>
        ),
        meta: {
          icon: <LuKey />
        }
      },
      {
        id: "createdBy",
        header: t("createdBy"),
        cell: ({ row }) => (
          <EmployeeAvatar employeeId={row.original.createdBy} />
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
      },
      {
        accessorKey: "createdAt",
        header: t("createdAt"),
        cell: (item) => formatDate(item.getValue<string>()),
        meta: {
          icon: <LuCalendar />
        }
      }
    ];
  }, [people, t]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
  const renderContextMenu = useCallback(
    (row: (typeof data)[number]) => {
      return (
        <>
          <MenuItem
            onClick={() => {
              navigate(`${path.to.apiKey(row.id!)}?${params?.toString()}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editApiKey")}
          </MenuItem>
          <MenuItem
            destructive
            onClick={() => {
              navigate(
                `${path.to.deleteApiKey(row.id!)}?${params?.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteApiKey")}
          </MenuItem>
        </>
      );
    },

    [navigate, params, permissions, t]
  );

  return (
    <>
      <Table<ApiKey>
        data={data}
        columns={columns}
        count={count ?? 0}
        primaryAction={
          <HStack>
            {permissions.can("update", "users") && (
              <New
                label={t("apiKey")}
                to={`${path.to.newApiKey}?${params.toString()}`}
              />
            )}
            <Button leftIcon={<LuCode />} variant="secondary" asChild>
              <Link to={path.to.apiIntroduction}>{t("apiDocs")}</Link>
            </Button>
          </HStack>
        }
        renderContextMenu={renderContextMenu}
        title={t("apiKeys")}
      />
      <Outlet />
    </>
  );
});

ApiKeysTable.displayName = "ApiKeysTable";
export default ApiKeysTable;
