import { useTranslation } from "@carbon/locale";
import { CgProfile } from "react-icons/cg";
import type { Route } from "~/types";
import { path } from "~/utils/path";

export default function useAccountSubmodules() {
  const { t } = useTranslation("account");

  const accountRoutes: Route[] = [
    {
      name: t("profile"),
      to: path.to.profile,
      icon: <CgProfile />
    }
  ];

  return { links: accountRoutes };
}
