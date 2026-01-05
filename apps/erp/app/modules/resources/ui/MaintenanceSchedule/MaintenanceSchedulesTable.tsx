import { useTranslation } from "@carbon/locale";
import {
  Badge,
  Combobox,
  HStack,
  MenuIcon,
  MenuItem,
  Status
} from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import {
  LuActivity,
  LuBuilding,
  LuCalendar,
  LuChartNoAxesColumnIncreasing,
  LuClock,
  LuMapPin,
  LuPencil,
  LuToggleRight,
  LuTrash
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { useLocations } from "~/components/Form/Location";
import { usePermissions, useUrlParams } from "~/hooks";
import { path } from "~/utils/path";
import {
  maintenanceDispatchPriority,
  maintenanceFrequency
} from "../../resources.models";
import type { MaintenanceSchedule } from "../../types";
import { MaintenancePriority } from "../Maintenance";

type MaintenanceSchedulesTableProps = {
  data: MaintenanceSchedule[];
  count: number;
  locations: { id: string; name: string }[];
  locationId: string | null;
};

const MaintenanceSchedulesTable = memo(
  ({ data, count, locations, locationId }: MaintenanceSchedulesTableProps) => {
    const { t } = useTranslation("resources");
    const [params] = useUrlParams();
    const navigate = useNavigate();
    const permissions = usePermissions();
    const allLocations = useLocations();

    const renderDays = useCallback((row: MaintenanceSchedule) => {
      const days = [
        row.monday && "M",
        row.tuesday && "Tu",
        row.wednesday && "W",
        row.thursday && "Th",
        row.friday && "F",
        row.saturday && "Sa",
        row.sunday && "Su"
      ].filter(Boolean);

      return days.map((day) => (
        <Badge key={day as string} variant="outline" className="mr-0.5">
          {day}
        </Badge>
      ));
    }, []);

    const allDaysSelected = useCallback((row: MaintenanceSchedule) => {
      return (
        row.monday &&
        row.tuesday &&
        row.wednesday &&
        row.thursday &&
        row.friday &&
        row.saturday &&
        row.sunday
      );
    }, []);

    const locationOptions = useMemo(
      () =>
        locations.map((location) => ({
          value: location.id,
          label: location.name
        })),
      [locations]
    );

    const getLocationPath = (locId: string) => {
      return `${path.to.maintenanceSchedules}?location=${locId}`;
    };

    const columns = useMemo<ColumnDef<MaintenanceSchedule>[]>(() => {
      return [
        {
          accessorKey: "name",
          header: t("scheduleName"),
          cell: ({ row }) => (
            <Hyperlink to={row.original.id!}>
              <Enumerable value={row.original.name} />
            </Hyperlink>
          )
        },
        {
          accessorKey: "workCenter",
          header: t("workCenter"),
          cell: ({ row }) => <Enumerable value={row.original.workCenterName} />,
          meta: {
            icon: <LuBuilding />
          }
        },
        {
          accessorKey: "locationId",
          header: t("location"),
          cell: ({ row }) => <Enumerable value={row.original.locationName} />,
          meta: {
            icon: <LuMapPin />,
            filter: {
              type: "static",
              options: allLocations.map((location) => ({
                value: location.value,
                label: <Enumerable value={location.label!} />
              }))
            }
          }
        },
        {
          accessorKey: "frequency",
          header: t("frequency"),
          cell: ({ row }) => {
            const frequency = row.original.frequency;
            const showDays =
              frequency === "Daily" && !allDaysSelected(row.original);
            return (
              <HStack>
                {showDays ? (
                  renderDays(row.original)
                ) : (
                  <Enumerable value={frequency} />
                )}
              </HStack>
            );
          },
          meta: {
            icon: <LuActivity />,
            filter: {
              type: "static",
              options: maintenanceFrequency.map((freq) => ({
                value: freq,
                label: freq
              }))
            },
            pluralHeader: "Frequencies"
          }
        },
        {
          accessorKey: "priority",
          header: t("priority"),
          cell: (item) => {
            const priority =
              item.getValue<(typeof maintenanceDispatchPriority)[number]>();
            return <MaintenancePriority priority={priority} />;
          },
          meta: {
            filter: {
              icon: <LuChartNoAxesColumnIncreasing />,
              type: "static",
              options: maintenanceDispatchPriority.map((priority) => ({
                value: priority,
                label: <MaintenancePriority priority={priority} />
              }))
            },
            pluralHeader: "Priorities"
          }
        },
        {
          accessorKey: "estimatedDuration",
          header: t("estDuration"),
          cell: ({ row }) =>
            row.original.estimatedDuration
              ? `${row.original.estimatedDuration} min`
              : "-",
          meta: {
            icon: <LuClock />
          }
        },
        {
          accessorKey: "active",
          header: t("status"),
          cell: ({ row }) =>
            row.original.active ? (
              <Status color="green">{t("active")}</Status>
            ) : (
              <Status color="gray">{t("inactive")}</Status>
            ),
          meta: {
            icon: <LuToggleRight />
          }
        },
        {
          accessorKey: "nextDueAt",
          header: t("nextDue"),
          cell: ({ row }) =>
            row.original.nextDueAt
              ? new Date(row.original.nextDueAt).toLocaleDateString()
              : "-",
          meta: {
            icon: <LuCalendar />
          }
        }
      ];
    }, [allDaysSelected, allLocations, renderDays, t]);

    const renderContextMenu = useCallback(
      (row: MaintenanceSchedule) => {
        return (
          <>
            <MenuItem
              onClick={() => {
                navigate(
                  `${path.to.maintenanceSchedule(row.id!)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editSchedule")}
            </MenuItem>
            <MenuItem
              destructive
              disabled={!permissions.can("delete", "production")}
              onClick={() => {
                navigate(
                  `${path.to.deleteMaintenanceSchedule(row.id!)}?${params.toString()}`
                );
              }}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteSchedule")}
            </MenuItem>
          </>
        );
      },
      [navigate, params, permissions, t]
    );

    return (
      <Table<MaintenanceSchedule>
        data={data}
        columns={columns}
        count={count}
        primaryAction={
          <div className="flex items-center gap-2">
            {locationId && (
              <Combobox
                asButton
                size="sm"
                value={locationId}
                options={locationOptions}
                onChange={(selected) => {
                  // hard refresh because initialValues update has no effect otherwise
                  window.location.href = getLocationPath(selected);
                }}
              />
            )}
            {permissions.can("create", "production") && (
              <New
                label={t("scheduledMaintenance")}
                to={`${path.to.newMaintenanceSchedule}?${params.toString()}`}
              />
            )}
          </div>
        }
        renderContextMenu={renderContextMenu}
        title={t("scheduledMaintenances")}
      />
    );
  }
);

MaintenanceSchedulesTable.displayName = "MaintenanceSchedulesTable";
export default MaintenanceSchedulesTable;
