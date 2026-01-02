import { useTranslation } from "@carbon/locale";
import { MenuIcon, MenuItem } from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import {
  LuBookMarked,
  LuCalendar,
  LuClock,
  LuPencil,
  LuPercent,
  LuTrash
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { Hyperlink, New, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { usePermissions, useUrlParams } from "~/hooks";
import { useCustomColumns } from "~/hooks/useCustomColumns";
import { path } from "~/utils/path";
import { paymentTermsCalculationMethod } from "../../accounting.models";
import type { PaymentTerm } from "../../types";

type PaymentTermsTableProps = {
  data: PaymentTerm[];
  count: number;
};

const PaymentTermsTable = memo(({ data, count }: PaymentTermsTableProps) => {
  const { t } = useTranslation("accounting");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();
  const customColumns = useCustomColumns<PaymentTerm>("paymentTerm");

  const columns = useMemo<ColumnDef<PaymentTerm>[]>(() => {
    const defaultColumns: ColumnDef<PaymentTerm>[] = [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <Hyperlink to={`${row.original.id}?${params.toString()}`}>
            {row.original.name}
          </Hyperlink>
        ),
        meta: {
          icon: <LuBookMarked />
        }
      },
      {
        accessorKey: "daysDue",
        header: t("daysDue"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuCalendar />
        }
      },
      {
        accessorKey: "daysDiscount",
        header: t("daysDiscount"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuCalendar />
        }
      },
      {
        accessorKey: "discountPercentage",
        header: t("discountPercentage"),
        cell: (item) => item.getValue(),
        meta: {
          icon: <LuPercent />
        }
      },
      {
        accessorKey: "calculationMethod",
        header: t("calculationMethod"),
        cell: (item) => <Enumerable value={item.getValue<string>()} />,
        meta: {
          filter: {
            type: "static",
            options: paymentTermsCalculationMethod.map((v) => ({
              label: <Enumerable value={v} />,
              value: v
            }))
          },
          icon: <LuClock />
        }
      }
    ];
    return [...defaultColumns, ...customColumns];
  }, [params, customColumns, t]);

  const renderContextMenu = useCallback(
    (row: PaymentTerm) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("update", "accounting")}
            onClick={() => {
              navigate(`${path.to.paymentTerm(row.id)}?${params.toString()}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editPaymentTerm")}
          </MenuItem>
          <MenuItem
            disabled={!permissions.can("delete", "accounting")}
            onClick={() => {
              navigate(
                `${path.to.deletePaymentTerm(row.id)}?${params.toString()}`
              );
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deletePaymentTerm")}
          </MenuItem>
        </>
      );
    },
    [navigate, params, permissions, t]
  );

  return (
    <Table<PaymentTerm>
      data={data}
      columns={columns}
      count={count}
      primaryAction={
        permissions.can("create", "accounting") && (
          <New label={t("paymentTerm")} to={`new?${params.toString()}`} />
        )
      }
      renderContextMenu={renderContextMenu}
      title={t("paymentTerms")}
    />
  );
});

PaymentTermsTable.displayName = "PaymentTermsTable";
export default PaymentTermsTable;
