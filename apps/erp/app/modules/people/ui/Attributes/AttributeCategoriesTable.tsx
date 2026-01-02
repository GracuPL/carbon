import { useTranslation } from "@carbon/locale";
import {
  Badge,
  Button,
  HStack,
  MenuIcon,
  MenuItem,
  useDisclosure
} from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsListUl } from "react-icons/bs";
import { LuListChecks, LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions, useUrlParams } from "~/hooks";
import { path } from "~/utils/path";
import type { AttributeCategory } from "../../types";

type AttributeCategoriesTableProps = {
  data: AttributeCategory[];
  count: number;
};

const AttributeCategoriesTable = memo(
  ({ data, count }: AttributeCategoriesTableProps) => {
    const { t } = useTranslation("users");
    const navigate = useNavigate();
    const [params] = useUrlParams();
    const permissions = usePermissions();
    const deleteModal = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<
      AttributeCategory | undefined
    >();

    const onDelete = (data: AttributeCategory) => {
      setSelectedCategory(data);
      deleteModal.onOpen();
    };

    const onDeleteCancel = () => {
      setSelectedCategory(undefined);
      deleteModal.onClose();
    };

    const columns = useMemo<ColumnDef<AttributeCategory>[]>(() => {
      return [
        {
          accessorKey: "name",
          header: t("category"),
          cell: ({ row }) => (
            <Hyperlink to={row.original.id} className="flex items-center gap-2">
              {row.original.emoji ? (
                <span className="text-base">{row.original.emoji}</span>
              ) : (
                <LuListChecks />
              )}{" "}
              <span>{row.original.name}</span>
            </Hyperlink>
          )
        },
        {
          header: t("attributes"),
          cell: ({ row }) => (
            <HStack className="text-xs text-muted-foreground">
              <LuListChecks />
              <span>
                {Array.isArray(row.original.userAttribute)
                  ? (row.original.userAttribute?.length ?? 0)
                  : 0}{" "}
                {t("attributes")}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  navigate(
                    `${path.to.attributeCategoryList(
                      row.original.id
                    )}?${params?.toString()}`
                  );
                }}
              >
                {t("edit")}
              </Button>
            </HStack>
          )
        },
        {
          accessorKey: "public",
          header: t("visibility"),
          cell: (item) => {
            const isPublic = item.getValue<boolean>()?.toString() === "true";
            return (
              <Badge variant={isPublic ? undefined : "outline"}>
                {isPublic ? t("public") : t("private")}
              </Badge>
            );
          },
          meta: {
            filter: {
              type: "static",
              options: [
                { label: t("public"), value: "true" },
                { label: t("private"), value: "false" }
              ]
            },
            pluralHeader: t("visibilities")
          }
        }
      ];
    }, [navigate, params, t]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
    const renderContextMenu = useCallback(
      (row: AttributeCategory) => {
        return (
          <>
            <MenuItem
              onClick={() => {
                navigate(
                  `${path.to.newAttributeForCategory(
                    row.id
                  )}?${params?.toString()}`
                );
              }}
            >
              <MenuIcon icon={<BiAddToQueue />} />
              {t("newAttribute")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(
                  `${path.to.attributeCategoryList(
                    row.id
                  )}?${params?.toString()}`
                );
              }}
            >
              <MenuIcon icon={<BsListUl />} />
              {t("viewAttributes")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(path.to.attributeCategory(row.id));
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editCategory")}
            </MenuItem>
            <MenuItem
              destructive
              disabled={row.protected || !permissions.can("delete", "users")}
              onClick={() => onDelete(row)}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteCategory")}
            </MenuItem>
          </>
        );
      },

      [navigate, params, permissions, t]
    );

    return (
      <>
        <Table<AttributeCategory>
          data={data}
          columns={columns}
          count={count ?? 0}
          primaryAction={
            permissions.can("update", "people") && (
              <New label={t("category")} to={`new?${params.toString()}`} />
            )
          }
          renderContextMenu={renderContextMenu}
          title={t("attributes")}
        />
        {selectedCategory && selectedCategory.id && (
          <ConfirmDelete
            action={path.to.deleteAttributeCategory(selectedCategory.id)}
            name={selectedCategory?.name ?? ""}
            text={t("confirmDeleteAttributeCategory", { name: selectedCategory?.name })}
            isOpen={deleteModal.isOpen}
            onCancel={onDeleteCancel}
            onSubmit={onDeleteCancel}
          />
        )}
      </>
    );
  }
);

AttributeCategoriesTable.displayName = "AttributeCategoriesTable";
export default AttributeCategoriesTable;
