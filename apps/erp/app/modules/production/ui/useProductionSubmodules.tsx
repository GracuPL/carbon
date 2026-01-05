import { useTranslation } from "@carbon/locale";
import {
  LuChartLine,
  LuHardHat,
  LuListChecks,
  LuSquareChartGantt,
  LuSquareKanban,
  LuTrash
} from "react-icons/lu";
import { usePermissions } from "~/hooks";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useProductionSubmodules() {
  const { t } = useTranslation("production");
  const permissions = usePermissions();
  const { addSavedViewsToRoutes } = useSavedViews();

  const productionRoutes: AuthenticatedRouteGroup[] = [
    {
      name: t("title"),
      routes: [
        {
          name: t("jobs"),
          to: path.to.jobs,
          icon: <LuHardHat />,
          table: "job"
        },
        {
          name: t("procedures"),
          to: path.to.procedures,
          icon: <LuListChecks />,
          table: "procedure",
          role: "employee"
        }
      ]
    },
    {
      name: t("plan"),
      routes: [
        {
          name: t("planning"),
          to: path.to.productionPlanning,
          icon: <LuSquareChartGantt />,
          table: "production-planning"
        },
        {
          name: t("projections"),
          to: path.to.demandProjections,
          icon: <LuChartLine />,
          table: "demand-projection"
        },
        {
          name: t("schedule"),
          to: path.to.scheduleDates,
          icon: <LuSquareKanban />
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("scrapReasons"),
          to: path.to.scrapReasons,
          role: "employee",
          icon: <LuTrash />
        }
      ]
    }
  ];

  return {
    groups: productionRoutes
      .filter((group) => {
        const filteredRoutes = group.routes.filter((route) => {
          if (route.role) {
            return permissions.is(route.role);
          } else {
            return true;
          }
        });

        return filteredRoutes.length > 0;
      })
      .map((group) => ({
        ...group,
        routes: group.routes
          .filter((route) => {
            if (route.role) {
              return permissions.is(route.role);
            } else {
              return true;
            }
          })
          .map(addSavedViewsToRoutes)
      }))
  };
}
