import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HStack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@carbon/react";
import { useNavigate } from "react-router";
import { z } from "zod/v3";
import { Hidden, Select, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import {
  defaultBalanceSheetAccountValidator,
  defaultIncomeAcountValidator
} from "../../accounting.models";
import type { AccountListItem } from "../../types";

const defaultUnion = z.union([
  defaultBalanceSheetAccountValidator,
  defaultIncomeAcountValidator
]);

type AccountDefaultsFormProps = {
  balanceSheetAccounts: AccountListItem[];
  incomeStatementAccounts: AccountListItem[];
  initialValues: z.infer<typeof defaultUnion>;
};

const AccountDefaultsForm = ({
  balanceSheetAccounts,
  incomeStatementAccounts,
  initialValues
}: AccountDefaultsFormProps) => {
  const { t } = useTranslation(["accounting", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const isDisabled = !permissions.can("update", "accounting");

  const incomeStatementAccountOptions = incomeStatementAccounts.map((c) => ({
    value: c.number,
    label: `${c.number} - ${c.name}`
  }));

  const balanceSheetAccountOptions = balanceSheetAccounts.map((c) => ({
    value: c.number,
    label: `${c.number} - ${c.name}`
  }));

  const initialIncomeStatementValues =
    defaultIncomeAcountValidator.safeParse(initialValues);
  const initialBalanceSheetValues =
    defaultBalanceSheetAccountValidator.safeParse(initialValues);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("accounting:defaultAccounts")}</CardTitle>
        <CardDescription>
          {t("accounting:defaultAccountsDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="income">
          <TabsList>
            <TabsTrigger value="income">{t("accounting:incomeStatement")}</TabsTrigger>
            <TabsTrigger value="balance">{t("accounting:balanceSheet")}</TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="py-6">
            <ValidatedForm
              validator={defaultIncomeAcountValidator}
              method="post"
              action={path.to.accountingDefaults}
              defaultValues={initialIncomeStatementValues.data}
              className="w-full flex flex-col space-y-4"
            >
              <Hidden name="intent" value="income" />
              <div className="grid gap-y-4 gap-x-8 grid-cols-1 md:grid-cols-2">
                <Select
                  name="salesAccount"
                  label={t("accounting:salesAccount")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="salesDiscountAccount"
                  label={t("accounting:salesDiscounts")}
                  options={incomeStatementAccountOptions}
                />

                <Select
                  name="costOfGoodsSoldAccount"
                  label={t("accounting:costOfGoodsSold")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="purchaseAccount"
                  label={t("accounting:purchases")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="directCostAppliedAccount"
                  label={t("accounting:directCostApplied")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="overheadCostAppliedAccount"
                  label={t("accounting:overheadCostApplied")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="purchaseVarianceAccount"
                  label={t("accounting:purchaseVarianceAccount")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="inventoryAdjustmentVarianceAccount"
                  label={t("accounting:inventoryAdjustment")}
                  options={incomeStatementAccountOptions}
                />

                <Select
                  name="materialVarianceAccount"
                  label={t("accounting:materialVarianceAccount")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="capacityVarianceAccount"
                  label={t("accounting:capacityVarianceAccount")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="overheadAccount"
                  label={t("accounting:overheadAccount")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="maintenanceAccount"
                  label={t("accounting:maintenanceExpense")}
                  options={incomeStatementAccountOptions}
                />

                <Select
                  name="assetDepreciationExpenseAccount"
                  label={t("accounting:depreciationExpense")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="assetGainsAndLossesAccount"
                  label={t("accounting:gainsAndLosses")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="serviceChargeAccount"
                  label={t("accounting:serviceCharges")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="interestAccount"
                  label={t("accounting:interest")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="supplierPaymentDiscountAccount"
                  label={t("accounting:supplierPaymentDiscounts")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="customerPaymentDiscountAccount"
                  label={t("accounting:customerPaymentDiscounts")}
                  options={incomeStatementAccountOptions}
                />
                <Select
                  name="roundingAccount"
                  label={t("accounting:roundingAccount")}
                  options={incomeStatementAccountOptions}
                />
              </div>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={onClose}>
                  {t("common:cancel")}
                </Button>
              </HStack>
            </ValidatedForm>
          </TabsContent>
          <TabsContent value="balance" className="py-6">
            <ValidatedForm
              validator={defaultBalanceSheetAccountValidator}
              method="post"
              action={path.to.accountingDefaults}
              defaultValues={initialBalanceSheetValues.data}
              className="w-full flex flex-col space-y-4"
            >
              <Hidden name="intent" value="balance" />
              <div className="grid gap-y-4 gap-x-8 grid-cols-1 md:grid-cols-2">
                <Select
                  name="inventoryAccount"
                  label={t("accounting:inventoryAccount")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="inventoryInterimAccrualAccount"
                  label={t("accounting:inventoryInterimAccrual")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="workInProgressAccount"
                  label={t("accounting:workInProgress")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="receivablesAccount"
                  label={t("accounting:receivablesAccount")}
                  options={balanceSheetAccountOptions}
                />

                <Select
                  name="inventoryInvoicedNotReceivedAccount"
                  label={t("accounting:inventoryInvoicedNotReceived")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="bankCashAccount"
                  label={t("accounting:bankCash")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="bankLocalCurrencyAccount"
                  label={t("accounting:bankLocalCurrency")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="bankForeignCurrencyAccount"
                  label={t("accounting:bankForeignCurrency")}
                  options={balanceSheetAccountOptions}
                />

                <Select
                  name="assetAquisitionCostAccount"
                  label={t("accounting:assetAquisitionCost")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="assetAquisitionCostOnDisposalAccount"
                  label={t("accounting:assetCostOnDisposal")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="accumulatedDepreciationAccount"
                  label={t("accounting:accumulatedDepreciation")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="accumulatedDepreciationOnDisposalAccount"
                  label={t("accounting:accumulatedDepreciationOnDisposal")}
                  options={balanceSheetAccountOptions}
                />

                <Select
                  name="prepaymentAccount"
                  label={t("accounting:prepayments")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="payablesAccount"
                  label={t("accounting:payablesAccount")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="inventoryReceivedNotInvoicedAccount"
                  label={t("accounting:inventoryReceivedNotInvoiced")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="inventoryShippedNotInvoicedAccount"
                  label={t("accounting:inventoryShippedNotInvoiced")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="salesTaxPayableAccount"
                  label={t("accounting:salesTaxPayableAccount")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="purchaseTaxPayableAccount"
                  label={t("accounting:purchaseTaxPayableAccount")}
                  options={balanceSheetAccountOptions}
                />
                <Select
                  name="reverseChargeSalesTaxPayableAccount"
                  label={t("accounting:reverseChargeSalesTax")}
                  options={balanceSheetAccountOptions}
                />

                <Select
                  name="retainedEarningsAccount"
                  label={t("accounting:retainedEarnings")}
                  options={balanceSheetAccountOptions}
                />
              </div>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={onClose}>
                  {t("common:cancel")}
                </Button>
              </HStack>
            </ValidatedForm>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountDefaultsForm;
