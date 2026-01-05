import { useTranslation } from "@carbon/locale";
import {
  LuBarcode,
  LuBox,
  LuClipboardCheck,
  LuCreditCard,
  LuCrown,
  LuFactory,
  LuImage,
  LuLayoutDashboard,
  LuSheet,
  LuShoppingCart,
  LuSquareStack,
  LuWebhook,
  LuWorkflow,
  LuWrench
} from "react-icons/lu";
import { usePermissions } from "~/hooks";
import { useFlags } from "~/hooks/useFlags";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useSettingsSubmodules() {
  const { t } = useTranslation("settings");
  const permissions = usePermissions();
  const { isCloud } = useFlags();

  const settingsRoutes: AuthenticatedRouteGroup<{
    requiresOwnership?: boolean;
    requiresCloudEnvironment?: boolean;
  }>[] = [
    {
      name: t("company"),
      routes: [
        {
          name: t("company"),
          to: path.to.company,
          role: "employee",
          icon: <LuFactory />
        },
        {
          name: t("billing"),
          to: path.to.billing,
          role: "employee",
          icon: <LuCreditCard />,
          requiresOwnership: true,
          requiresCloudEnvironment: true
        },
        {
          name: t("labels"),
          to: path.to.labelsSettings,
          role: "employee",
          icon: <LuBarcode />
        },
        {
          name: t("logos"),
          to: path.to.logos,
          role: "employee",
          icon: <LuImage />
        }
      ]
    },
    {
      name: t("modules"),
      routes: [
        {
          name: t("inventory"),
          to: path.to.inventorySettings,
          role: "employee",
          icon: <LuBox />
        },
        {
          name: t("items"),
          to: path.to.itemsSettings,
          role: "employee",
          icon: <LuSquareStack />
        },
        {
          name: t("purchasing"),
          to: path.to.purchasingSettings,
          role: "employee",
          icon: <LuShoppingCart />
        },
        {
          name: t("production"),
          to: path.to.productionSettings,
          role: "employee",
          icon: <LuFactory />
        },
        {
          name: t("quality"),
          to: path.to.qualitySettings,
          role: "employee",
          icon: <LuClipboardCheck />
        },
        {
          name: t("sales"),
          to: path.to.salesSettings,
          role: "employee",
          icon: <LuCrown />
        },
        {
          name: t("resources"),
          to: path.to.resourcesSettings,
          role: "employee",
          icon: <LuWrench />
        }
      ]
    },
    {
      name: t("system"),
      routes: [
        {
          name: t("customFields"),
          to: path.to.customFields,
          role: "employee",
          icon: <LuLayoutDashboard />
        },
        {
          name: t("integrations"),
          to: path.to.integrations,
          role: "employee",
          icon: <LuWorkflow />
        },
        {
          name: t("sequences"),
          to: path.to.sequences,
          role: "employee",
          icon: <LuSheet />
        },
        {
          name: t("webhooks"),
          to: path.to.webhooks,
          role: "employee",
          icon: <LuWebhook />
        }
      ]
    }
  ];

  return {
    groups: settingsRoutes
      .filter((group) => {
        const filteredRoutes = group.routes.filter((route) => {
          // Check role permission
          if (route.role && !permissions.is(route.role)) {
            return false;
          }

          return true;
        });

        return filteredRoutes.length > 0;
      })
      .map((group) => ({
        ...group,
        routes: group.routes.filter((route) => {
          // Check role permission
          if (route.role && !permissions.is(route.role)) {
            return false;
          }

          // Check ownership requirement
          if (route.requiresOwnership && !permissions.isOwner()) {
            return false;
          }

          if (route.requiresCloudEnvironment && !isCloud) {
            return false;
          }

          return true;
        })
      }))
  };
}
