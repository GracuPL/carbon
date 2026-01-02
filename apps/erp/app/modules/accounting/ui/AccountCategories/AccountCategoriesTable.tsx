import { useTranslation } from "@carbon/locale";
import {
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
import { Link, useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import { accountClassTypes, incomeBalanceTypes } from "../../accounting.models";
import type { AccountCategory } from "../../types";

type AccountCategoriesTableProps = {
  data: AccountCategory[];
  count: number;
};

const AccountCategoriesTable = memo(
  ({ data, count }: AccountCategoriesTableProps) => {
    const { t } = useTranslation("accounting");
    const navigate = useNavigate();
    const [params] = useUrlParams();
    const permissions = usePermissions();
    const deleteModal = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<
      AccountCategory | undefined
    >();

    const onDelete = (data: AccountCategory) => {
      setSelectedCategory(data);
      deleteModal.onOpen();
    };

    const onDeleteCancel = () => {
      setSelectedCategory(undefined);
      deleteModal.onClose();
    };

    const customColumns = useCustomColumns<AccountCategory>("accountCategory");

    const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => {
      const defaultColumns: ColumnDef<(typeof data)[number]>[] = [
        {
          accessorKey: "category",
          header: t("category"),
          cell: ({ row }) => (
            <Hyperlink to={row.original.id as string}>
              {row.original.category}
            </Hyperlink>
          )
        },
        {
          header: t("incomeBalance"),
          accessorKey: "incomeBalance",
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
          meta: {
            filter: {
              type: "static",
              options: incomeBalanceTypes.map((incomeBalance) => ({
                value: incomeBalance,
                label: <Enumerable value={incomeBalance} />
              }))
            },
            pluralHeader: t("incomeBalance")
          }
        },
        {
          header: t("class"),
          accessorKey: "class",
          cell: (item) => <Enumerable value={item.getValue<string>()} />,
          meta: {
            filter: {
              type: "static",
              options: accountClassTypes.map((accountClass) => ({
                value: accountClass,
                label: <Enumerable value={accountClass} />
              }))
            },
            pluralHeader: t("incomeBalance")
          }
        },

        {
          header: t("subcategories"),
          cell: ({ row }) => (
            <HStack className="text-xs text-muted-foreground">
              <LuListChecks />
              <span>{row.original.subCategoriesCount ?? 0} {t("subcategories")}</span>
              <Button variant="secondary" size="sm" asChild>
                <Link
                  to={`${path.to.accountingCategoryList(
                    row.original.id!
                  )}?${params?.toString()}`}
                  prefetch="intent"
                >
                  {t("edit")}
                </Link>
              </Button>
            </HStack>
          )
        }
      ];

      return [...defaultColumns, ...customColumns];
    }, [params, customColumns, t]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
    const renderContextMenu = useCallback(
      (row: (typeof data)[number]) => {
        if (!row.id) return null;
        return (
          <>
            <MenuItem
              onClick={() => {
                navigate(
                  `${path.to.newAccountingSubcategory(
                    row.id!
                  )}${params?.toString()}`
                );
              }}
            >
              <MenuIcon icon={<BiAddToQueue />} />
              {t("newSubcategory")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(
                  `${path.to.accountingCategoryList(
                    row.id!
                  )}?${params?.toString()}`
                );
              }}
            >
              <MenuIcon icon={<BsListUl />} />
              {t("viewSubcategories")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(path.to.accountingCategory(row.id!));
              }}
            >
              <MenuIcon icon={<LuPencil />} />
              {t("editAccountCategory")}
            </MenuItem>
            <MenuItem
              disabled={!permissions.can("delete", "users")}
              onClick={() => onDelete(row)}
            >
              <MenuIcon icon={<LuTrash />} />
              {t("deleteAccountCategory")}
            </MenuItem>
          </>
        );
      },

      [navigate, params, permissions, t]
    );

    return (
      <>
        <Table<AccountCategory>
          data={data}
          columns={columns}
          count={count ?? 0}
          primaryAction={
            permissions.can("update", "accounting") && (
              <New label={t("accountCategory")} to={`new?${params.toString()}`} />
            )
          }
          renderContextMenu={renderContextMenu}
          title={t("accountCategories")}
        />

        {selectedCategory && selectedCategory.id && (
          <ConfirmDelete
            action={path.to.deleteAccountingCategory(selectedCategory.id)}
            name={selectedCategory?.category ?? ""}
            text={t("confirmDeleteAccountCategory", { name: selectedCategory?.category ?? "" })}
            isOpen={deleteModal.isOpen}
            onCancel={onDeleteCancel}
            onSubmit={onDeleteCancel}
          />
        )}
      </>
    );
  }
);

AccountCategoriesTable.displayName = "AccountCategoriesTable";
export default AccountCategoriesTable;
