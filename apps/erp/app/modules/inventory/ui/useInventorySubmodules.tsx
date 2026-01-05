import { useTranslation } from "@carbon/locale";
import {
  LuArrowRightLeft,
  LuHandCoins,
  LuListChecks,
  LuNetwork,
  LuQrCode,
  LuTally5,
  LuTruck,
  LuWarehouse
} from "react-icons/lu";
import { usePermissions } from "~/hooks";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useInventorySubmodules() {
  const { t } = useTranslation("inventory");
  const permissions = usePermissions();
  const { addSavedViewsToRoutes } = useSavedViews();

  const inventoryRoutes: AuthenticatedRouteGroup[] = [
    {
      name: t("manage"),
      routes: [
        {
          name: t("receipts"),
          to: path.to.receipts,
          icon: <LuHandCoins />,
          table: "receipt"
        },
        {
          name: t("shipments"),
          to: path.to.shipments,
          icon: <LuTruck />,
          table: "shipment"
        },
        {
          name: t("stockTransfers"),
          to: path.to.stockTransfers,
          icon: <LuListChecks />,
          table: "stockTransfer"
        },
        {
          name: t("warehouseTransfers"),
          to: path.to.warehouseTransfers,
          icon: <LuArrowRightLeft />,
          table: "warehouseTransfer"
        }
      ]
    },
    {
      name: t("track"),
      routes: [
        {
          name: t("kanbans"),
          to: path.to.kanbans,
          role: "employee",
          icon: <LuQrCode />
        },
        {
          name: t("quantities"),
          to: path.to.inventory,
          role: "employee",
          icon: <LuTally5 />,
          table: "inventory"
        },
        {
          name: t("trackedEntities"),
          to: path.to.trackedEntities,
          role: "employee",
          icon: <LuQrCode />
        },
        {
          name: t("traceability"),
          to: path.to.traceability,
          role: "employee",
          icon: <LuNetwork />
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("shelves"),
          to: path.to.shelves,
          role: "employee",
          icon: <LuWarehouse />,
          table: "shelf"
        },
        {
          name: t("shippingMethods"),
          to: path.to.shippingMethods,
          role: "employee",
          icon: <LuTruck />
        }
      ]
    }
  ];

  return {
    groups: inventoryRoutes
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
