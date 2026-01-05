import { useTranslation } from "@carbon/locale";
import { AiOutlinePartition } from "react-icons/ai";
import {
  LuAtom,
  LuAxis3D,
  LuBeef,
  LuDessert,
  LuGlassWater,
  LuGroup,
  LuHammer,
  LuPizza,
  LuPuzzle,
  LuRuler,
  LuShapes
} from "react-icons/lu";
import { usePermissions } from "~/hooks";
import { useSavedViews } from "~/hooks/useSavedViews";
import type { AuthenticatedRouteGroup } from "~/types";
import { path } from "~/utils/path";

export default function useItemsSubmodules() {
  const { t } = useTranslation("items");
  const permissions = usePermissions();
  const { addSavedViewsToRoutes } = useSavedViews();

  const itemsRoutes: AuthenticatedRouteGroup[] = [
    {
      name: t("manage"),
      routes: [
        {
          name: t("parts"),
          to: path.to.parts,
          icon: <AiOutlinePartition />,
          table: "part"
        },
        {
          name: t("materials"),
          to: path.to.materials,
          icon: <LuAtom />,
          table: "material"
        },
        {
          name: t("tools"),
          to: path.to.tools,
          icon: <LuHammer />,
          table: "tool"
        },
        {
          name: t("consumables"),
          to: path.to.consumables,
          icon: <LuPizza />,
          table: "consumable"
        }
        // {
        //   name: "Services",
        //   to: path.to.services,
        //   icon: <LuHeadphones />,
        // },
      ]
    },
    // {
    //   name: "Methods",
    //   routes: [
    //     {
    //       name: "Materials",
    //       to: path.to.methodMaterials,
    //       icon: <LuPackage />,
    //     },
    //     {
    //       name: "Operations",
    //       to: path.to.methodOperations,
    //       icon: <LuClock />,
    //     },
    //   ],
    // },
    {
      name: t("configureMaterials"),
      routes: [
        {
          name: t("dimensions"),
          to: path.to.materialDimensions,
          icon: <LuAxis3D />,
          role: "employee"
        },
        {
          name: t("finishes"),
          to: path.to.materialFinishes,
          icon: <LuDessert />,
          role: "employee"
        },
        {
          name: t("grades"),
          to: path.to.materialGrades,
          icon: <LuBeef />,
          role: "employee"
        },
        {
          name: t("shapes"),
          to: path.to.materialForms,
          icon: <LuShapes />,
          role: "employee"
        },
        {
          name: t("substances"),
          to: path.to.materialSubstances,
          icon: <LuGlassWater />,
          role: "employee"
        },
        {
          name: t("types"),
          to: path.to.materialTypes,
          icon: <LuPuzzle />,
          role: "employee"
        }
      ]
    },
    {
      name: t("configure"),
      routes: [
        {
          name: t("itemGroups"),
          to: path.to.itemPostingGroups,
          role: "employee",
          icon: <LuGroup />
        },
        {
          name: t("units"),
          to: path.to.uoms,
          role: "employee",
          icon: <LuRuler />
        }
      ]
    }
  ];

  return {
    groups: itemsRoutes
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
