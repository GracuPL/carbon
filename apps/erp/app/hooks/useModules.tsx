import { useTranslation } from "@carbon/locale";
import {
  LuBox,
  LuCrown,
  LuFactory,
  LuFiles,
  LuFolderCheck,
  LuLandmark,
  LuSettings,
  LuShield,
  LuShoppingCart,
  LuSquareStack,
  LuTvMinimalPlay,
  LuUsers,
  LuWrench
} from "react-icons/lu";
import type { Authenticated, NavItem } from "~/types";
import { path } from "~/utils/path";
import { usePermissions } from "./usePermissions";

export function useModules() {
  const permissions = usePermissions();
  const { t } = useTranslation("navigation");

  const modules: Authenticated<NavItem>[] = [
    {
      name: t("shopFloor"),
      to: path.to.external.mes,
      icon: LuTvMinimalPlay,
      role: "employee"
    },
    {
      permission: "sales",
      name: t("sales"),
      to: path.to.sales,
      icon: LuCrown
    },
    {
      permission: "production",
      name: t("production"),
      to: path.to.production,
      icon: LuFactory
    },
    {
      permission: "parts",
      name: t("items"),
      to: path.to.parts,
      icon: LuSquareStack
    },
    {
      permission: "inventory",
      name: t("inventory"),
      to: path.to.inventory,
      icon: LuBox
    },
    {
      permission: "purchasing",
      name: t("purchasing"),
      to: path.to.purchasing,
      icon: LuShoppingCart
    },
    {
      permission: "quality",
      name: t("quality"),
      to: path.to.quality,
      icon: LuFolderCheck
    },
    {
      permission: "accounting",
      name: t("finance"),
      to: path.to.currencies,
      icon: LuLandmark
    },
    // {
    //   permission: "invoicing",
    //   name: "Invoicing",
    //   to: path.to.purchaseInvoices,
    //   icon: LuCreditCard,
    // },
    {
      permission: "people",
      name: t("people"),
      to: path.to.people,
      icon: LuUsers
    },
    {
      permission: "resources",
      name: t("resources"),
      to: path.to.resources,
      icon: LuWrench
    },
    {
      permission: "documents",
      name: t("documents"),
      to: path.to.documents,
      icon: LuFiles
    },
    {
      permission: "users",
      name: t("users"),
      to: path.to.employeeAccounts,
      icon: LuShield
    },
    {
      permission: "settings",
      name: t("settings"),
      to: path.to.company,
      icon: LuSettings
    }
  ];

  return modules.filter((item) => {
    if (item.permission) {
      return permissions.can("view", item.permission);
    } else if (item.role) {
      return permissions.is(item.role);
    } else {
      return true;
    }
  });
}
