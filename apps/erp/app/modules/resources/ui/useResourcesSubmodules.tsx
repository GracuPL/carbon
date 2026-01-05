import { useTranslation } from "@carbon/locale";
import {
  LuCalendarClock,
  LuCircleAlert,
  LuClipboardCheck,
  LuCog,
  LuGraduationCap,
  LuMailbox,
  LuMapPin,
  LuWrench
} from "react-icons/lu";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { RouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useResourcesSubmodules() {
  const { t } = useTranslation("resources");
  const { addSavedViewsToRoutes } = useSavedViews();

  const resourcesRoutes: RouteGroup[] = [
    {
      name: t("maintenance"),
      routes: [
        {
          name: t("dispatches"),
          to: path.to.maintenanceDispatches,
          icon: <LuWrench />,
          table: "maintenanceDispatch"
        },
        {
          name: t("schedules"),
          to: path.to.maintenanceSchedules,
          icon: <LuCalendarClock />,
          table: "maintenanceSchedule"
        },
        {
          name: t("failureModes"),
          to: path.to.failureModes,
          icon: <LuCircleAlert />
        }
      ]
    },
    {
      name: t("infrastructure"),
      routes: [
        {
          name: t("locations"),
          to: path.to.locations,
          icon: <LuMapPin />,
          table: "location"
        },
        {
          name: t("processes"),
          to: path.to.processes,
          icon: <LuCog />,
          table: "process"
        },
        {
          name: t("workCenters"),
          to: path.to.workCenters,
          icon: <LuWrench />,
          table: "workCenter"
        }
      ]
    },
    {
      name: t("people"),
      routes: [
        {
          name: t("trainings"),
          to: path.to.trainings,
          icon: <LuGraduationCap />,
          table: "training"
        },
        {
          name: t("assignments"),
          to: path.to.trainingAssignments,
          icon: <LuClipboardCheck />
        },
        {
          name: t("suggestions"),
          to: path.to.suggestions,
          icon: <LuMailbox />,
          table: "suggestion"
        }
      ]
    }
  ];

  return {
    groups: resourcesRoutes.map((group) => ({
      ...group,
      routes: group.routes.map(addSavedViewsToRoutes)
    }))
  };
}
