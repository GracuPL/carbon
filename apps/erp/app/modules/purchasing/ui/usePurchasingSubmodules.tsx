import { useTranslation } from "@carbon/locale";
import {
  LuContainer,
  LuCreditCard,
  LuLayoutList,
  LuPackageSearch,
  LuShapes,
  LuSquareChartGantt,
  LuStar
} from "react-icons/lu";
import { usePermissions } from "~/hooks";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function usePurchasingSubmodules() {
  const { t } = useTranslation("purchasing");
  const permissions = usePermissions();
  const { addSavedViewsToRoutes } = useSavedViews();

  const purchasingRoutes: AuthenticatedRouteGroup[] = [
    {
      name: t("manage"),
      routes: [
        {
          name: t("suppliers"),
          to: path.to.suppliers,
          icon: <LuContainer />,
          table: "supplier"
        },
        {
          name: t("supplierQuotes"),
          to: path.to.supplierQuotes,
          icon: <LuPackageSearch />,
          table: "supplierQuote"
        },
        {
          name: t("purchaseOrders"),
          to: path.to.purchaseOrders,
          icon: <LuLayoutList />,
          table: "purchaseOrder"
        },
        {
          name: t("purchaseInvoices"),
          to: path.to.purchaseInvoices,
          icon: <LuCreditCard />,
          table: "purchaseInvoice",
          permission: "invoicing"
        }
      ]
    },
    {
      name: t("plan"),
      routes: [
        {
          name: t("planning"),
          to: path.to.purchasingPlanning,
          icon: <LuSquareChartGantt />,
          table: "purchase-planning"
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("statuses"),
          to: path.to.supplierStatuses,
          role: "employee",
          icon: <LuShapes />
        },
        {
          name: t("types"),
          to: path.to.supplierTypes,
          role: "employee",
          icon: <LuStar />
        }
      ]
    }
  ];

  return {
    groups: purchasingRoutes
      .filter((group) => {
        const filteredRoutes = group.routes.filter((route) => {
          if (route.role) {
            return permissions.is(route.role);
          } else if (route.permission) {
            return permissions.can("view", route.permission);
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
            } else if (route.permission) {
              return permissions.can("view", route.permission);
            } else {
              return true;
            }
          })
          .map(addSavedViewsToRoutes)
      }))
  };
}
