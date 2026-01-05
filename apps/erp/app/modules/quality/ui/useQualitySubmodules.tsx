import { useTranslation } from "@carbon/locale";
import {
  LuCircleGauge,
  LuDraftingCompass,
  LuFileText,
  LuListChecks,
  LuOctagonX,
  LuShapes,
  LuShieldAlert,
  LuShieldX,
  LuSquareCheck,
  LuWorkflow
} from "react-icons/lu";
import { usePermissions } from "~/hooks";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useQualitySubmodules() {
  const { t } = useTranslation("quality");
  const permissions = usePermissions();
  const { addSavedViewsToRoutes } = useSavedViews();

  const qualityRoutes: AuthenticatedRouteGroup[] = [
    {
      name: t("issues"),
      routes: [
        {
          name: t("actions"),
          to: path.to.qualityActions,
          icon: <LuListChecks />,
          table: "nonConformanceActionTask"
        },

        {
          name: t("issues"),
          to: path.to.issues,
          icon: <LuShieldX />,
          table: "nonConformance"
        },
        {
          name: t("risks"),
          to: path.to.risks,
          icon: <LuShieldAlert />,
          table: "riskRegister"
        }
        // {
        //   name: "Inspections",
        //   to: "#",
        //   icon: <LuSearchCheck />,
        //   table: "inspection",
        // },
      ]
    },
    {
      name: t("calibrations"),
      routes: [
        {
          name: t("gauges"),
          to: path.to.gauges,
          icon: <LuDraftingCompass />
        },
        {
          name: t("records"),
          to: path.to.calibrations,
          icon: <LuCircleGauge />
        }
      ]
    },
    {
      name: t("documents"),
      routes: [
        {
          name: t("documents"),
          to: path.to.qualityDocuments,
          icon: <LuFileText />,
          table: "qualityDocument"
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("actionTypes"),
          to: path.to.requiredActions,
          icon: <LuSquareCheck />
        },

        {
          name: t("gaugeTypes"),
          to: path.to.gaugeTypes,
          icon: <LuShapes />
        },
        {
          name: t("issueTypes"),
          to: path.to.issueTypes,
          icon: <LuOctagonX />
        },
        {
          name: t("issueWorkflows"),
          to: path.to.issueWorkflows,
          icon: <LuWorkflow />
        }
      ]
    }
  ];

  return {
    groups: qualityRoutes
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
