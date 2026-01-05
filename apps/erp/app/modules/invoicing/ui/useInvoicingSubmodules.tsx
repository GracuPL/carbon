import { useTranslation } from "@carbon/locale";
import { BsCartDash } from "react-icons/bs";
import { usePermissions } from "~/hooks";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useInvoicingSubmodules() {
  const { t } = useTranslation("invoicing");
  const permissions = usePermissions();

  const invoicingRoutes: AuthenticatedRouteGroup[] = [
    {
      name: t("manage"),
      routes: [
        {
          name: t("purchasing"),
          to: path.to.purchaseInvoices,
          role: "employee",
          icon: <BsCartDash />
        }
        // {
        //   name: "Sales",
        //   to: path.to.salesInvoices,
        //   role: "employee",
        //   icon: <BsCartPlus />,
        // },
      ]
    }
  ];

  return {
    groups: invoicingRoutes
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
        routes: group.routes.filter((route) => {
          if (route.role) {
            return permissions.is(route.role);
          } else {
            return true;
          }
        })
      }))
  };
}
