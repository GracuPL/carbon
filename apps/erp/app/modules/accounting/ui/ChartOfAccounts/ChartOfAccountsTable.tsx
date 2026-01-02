import { useTranslation } from "@carbon/locale";
import { Button, Checkbox, cn, HStack } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import { Link as ReactRouterLink } from "react-router";
import { Hyperlink } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import Grid from "~/components/Grid";
import { useRealtime } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import type { Chart } from "../../types";

type ChartOfAccountsTableProps = {
  data: Chart[];
};

const ChartOfAccountsTable = memo(({ data }: ChartOfAccountsTableProps) => {
  const { t } = useTranslation("accounting");
  useRealtime("journal");

  const customColumns = useCustomColumns<Chart>("journal");

  const columns = useMemo<ColumnDef<Chart>[]>(() => {
    const defaultColumns: ColumnDef<Chart>[] = [
      {
        accessorKey: "number",
        header: t("number"),
        cell: ({ row }) => {
          const isPosting = row.original.type === "Posting";

          return (
            <HStack>
              <Hyperlink
                to={row.original.id as string}
                className={cn(!isPosting && "font-bold")}
              >
                {row.original.number}
              </Hyperlink>

              <div className="relative w-6 h-6">
                <Button
                  asChild
                  isIcon
                  variant="ghost"
                  className="absolute right-[-3px] top-[-3px] outline-none border-none active:outline-none focus-visible:outline-none"
                  aria-label="Edit account"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ReactRouterLink to={`${row.original.id}`}>
                    <LuEllipsisVertical />
                  </ReactRouterLink>
                </Button>
              </div>
            </HStack>
          );
        }
      },
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => {
          const isPosting = row.original.type === "Posting";
          return (
            <div
              className={cn(!isPosting && "font-bold")}
              style={{ paddingLeft: `calc(${0.75 * row.original.level}rem)` }}
            >
              {row.original.name}
            </div>
          );
        }
      },
      {
        accessorKey: "netChange",
        header: t("netChange"),
        cell: ({ row }) => {
          const hasValue = ["Posting", "End Total", "Total"].includes(
            row.original.type
          );
          return hasValue ? (row.original.netChange ?? 0).toFixed(2) : null;
        }
      },
      {
        accessorKey: "balanceAtDate",
        header: t("balanceAtDate"),
        cell: ({ row }) => {
          const hasValue = ["Posting", "End Total", "Total"].includes(
            row.original.type
          );
          return hasValue ? (row.original.balanceAtDate ?? 0).toFixed(2) : null;
        }
      },
      {
        accessorKey: "balance",
        header: t("balance"),
        cell: ({ row }) => {
          const hasValue = ["Posting", "End Total", "Total"].includes(
            row.original.type
          );
          return hasValue ? (row.original.balance ?? 0).toFixed(2) : null;
        }
      },
      {
        accessorKey: "incomeBalance",
        header: t("incomeBalance"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />
      },
      {
        accessorKey: "type",
        header: t("accountType"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />
      },
      {
        accessorKey: "totaling",
        header: t("totaling"),
        cell: ({ row }) => row.original.totaling ?? ""
      },
      {
        accessorKey: "accountCategory",
        header: t("accountCategory"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />
      },
      {
        accessorKey: "accountSubCategory",
        header: t("accountSubcategory"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />
      },
      {
        accessorKey: "directPosting",
        header: t("directPosting"),
        cell: (item) => <Checkbox isChecked={item.getValue<boolean>()} />
      }
    ];

    return [...defaultColumns, ...customColumns];
  }, [customColumns, t]);

  return <Grid<Chart> data={data} columns={columns} withSimpleSorting />;
});

ChartOfAccountsTable.displayName = "ChartOfAccountsTable";
export default ChartOfAccountsTable;
