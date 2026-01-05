import { useTranslation } from "@carbon/locale";
import {
  LuClock,
  LuFolder,
  LuFolderHeart,
  LuPin,
  LuTrash
} from "react-icons/lu";
import type { Route } from "~/types";
import { path } from "~/utils/path";

export default function useDocumentsSubmodules() {
  const { t } = useTranslation("documents");

  const documentsRoutes: Route[] = [
    {
      name: t("allDocuments"),
      to: path.to.documents,
      icon: <LuFolder />
    },
    {
      name: t("myDocuments"),
      to: path.to.documents,
      q: "my",
      icon: <LuFolderHeart />
    },
    {
      name: t("recent"),
      to: path.to.documents,
      q: "recent",
      icon: <LuClock />
    },
    {
      name: t("pinned"),
      to: path.to.documents,
      q: "starred",
      icon: <LuPin />
    },
    {
      name: t("trash"),
      to: path.to.documents,
      q: "trash",
      icon: <LuTrash />
    }
  ];

  return { links: documentsRoutes };
}
