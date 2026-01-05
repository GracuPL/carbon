import { useTranslation } from "@carbon/locale";
import { LuFileBadge2, LuGroup, LuUsers } from "react-icons/lu";
import type { RouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useUsersSubmodules() {
  const { t } = useTranslation("users");

  const usersRoutes: RouteGroup[] = [
    {
      name: t("manage"),
      routes: [
        {
          name: t("accounts"),
          to: path.to.employeeAccounts,
          icon: <LuUsers />
        },
        // {
        //   name: "Customers",
        //   to: path.to.customerAccounts,
        //   icon: <LuSquareUser />,
        // },
        // {
        //   name: "Suppliers",
        //   to: path.to.supplierAccounts,
        //   icon: <LuContainer />,
        // },
        {
          name: t("groups"),
          to: path.to.groups,
          icon: <LuGroup />
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("employeeTypes"),
          to: path.to.employeeTypes,
          icon: <LuFileBadge2 />
        }
      ]
    }
  ];

  return { groups: usersRoutes };
}
