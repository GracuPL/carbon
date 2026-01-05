import { useTranslation } from "@carbon/locale";
import {
  LuCalendarClock,
  LuCalendarHeart,
  LuListChecks,
  LuNetwork,
  LuUsers
} from "react-icons/lu";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { RouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function usePeopleSubmodules() {
  const { t } = useTranslation("users");
  const { addSavedViewsToRoutes } = useSavedViews();

  const peopleRoutes: RouteGroup[] = [
    {
      name: t("manage"),
      routes: [
        {
          name: t("people"),
          to: path.to.people,
          icon: <LuUsers />,
          table: "employee"
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("attributes"),
          to: path.to.attributes,
          icon: <LuListChecks />
        },
        {
          name: t("departments"),
          to: path.to.departments,
          icon: <LuNetwork />
        },
        {
          name: t("holidays"),
          to: path.to.holidays,
          icon: <LuCalendarHeart />
        },
        {
          name: t("shifts"),
          to: path.to.shifts,
          icon: <LuCalendarClock />
        }
      ]
    }
  ];

  return {
    groups: peopleRoutes.map((group) => ({
      ...group,
      routes: group.routes.map(addSavedViewsToRoutes)
    }))
  };
}
