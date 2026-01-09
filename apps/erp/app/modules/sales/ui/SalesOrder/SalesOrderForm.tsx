import { useCarbon } from "@carbon/auth";
import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  toast,
  VStack
} from "@carbon/react";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  Currency,
  Customer,
  CustomerContact,
  CustomerLocation,
  CustomFormFields,
  DatePicker,
  Employee,
  Hidden,
  Input,
  Location,
  SequenceOrCustomId,
  Submit
} from "~/components/Form";
import ExchangeRate from "~/components/Form/ExchangeRate";
import { usePermissions, useUser } from "~/hooks";
import { path } from "~/utils/path";
import { salesOrderValidator } from "../../sales.models";

type SalesOrderFormValues = z.infer<typeof salesOrderValidator>;

type SalesOrderFormProps = {
  initialValues: SalesOrderFormValues & {
    originatedFromQuote: boolean;
    digitalQuoteAcceptedBy: string | undefined;
    digitalQuoteAcceptedByEmail: string | undefined;
  };
};

const SalesOrderForm = ({ initialValues }: SalesOrderFormProps) => {
  const { t } = useTranslation(["sales", "common"]);
  const permissions = usePermissions();
  const { carbon } = useCarbon();
  const { company } = useUser();
  const [customer, setCustomer] = useState<{
    id: string | undefined;
    currencyCode: string | undefined;
  }>({
    id: initialValues.customerId,
    currencyCode: initialValues.currencyCode
  });
  const isEditing = initialValues.id !== undefined;
  const isCustomer = permissions.is("customer");

  const exchangeRateFetcher = useFetcher<{ exchangeRate: number }>();

  const onCustomerChange = async (
    newValue: {
      value: string | undefined;
      label: string;
    } | null
  ) => {
    if (!carbon) {
      toast.error(t("carbonClientNotFound"));
      return;
    }

    if (newValue?.value) {
      flushSync(() => {
        // update the customer immediately
        setCustomer({
          id: newValue?.value,
          currencyCode: undefined
        });
      });

      const { data, error } = await carbon
        ?.from("customer")
        .select("currencyCode")
        .eq("id", newValue.value)
        .single();
      if (error) {
        toast.error(t("errorFetchingCustomerData"));
      } else {
        setCustomer((prev) => ({
          ...prev,
          currencyCode: data.currencyCode ?? undefined
        }));
      }
    } else {
      setCustomer({
        id: undefined,
        currencyCode: undefined
      });
    }
  };

  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={salesOrderValidator}
        defaultValues={initialValues}
      >
        <CardHeader>
          <CardTitle>{isEditing ? t("sales:salesOrder") : t("sales:newSalesOrder")}</CardTitle>
          {!isEditing && (
            <CardDescription>
              {t("sales:salesOrderDescription")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isEditing && <Hidden name="salesOrderId" />}
          <Hidden name="status" />
          <VStack>
            <div
              className={cn(
                "grid w-full gap-x-8 gap-y-4",
                isEditing
                  ? "grid-cols-1 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {!isEditing && (
                <SequenceOrCustomId
                  name="salesOrderId"
                  label={t("sales:salesOrderId")}
                  table="salesOrder"
                />
              )}
              <Customer
                autoFocus={!isEditing}
                name="customerId"
                label={t("common:customer")}
                onChange={onCustomerChange}
              />
              <Input name="customerReference" label={t("sales:customerPoNumber")} />

              <CustomerContact
                name="customerContactId"
                label={t("sales:purchasingContact")}
                customer={customer.id}
              />
              <CustomerContact
                name="customerEngineeringContactId"
                label={t("sales:engineeringContact")}
                customer={customer.id}
              />
              <CustomerLocation
                name="customerLocationId"
                label={t("sales:customerLocation")}
                customer={customer.id}
              />

              {initialValues.originatedFromQuote &&
                initialValues.digitalQuoteAcceptedBy &&
                initialValues.digitalQuoteAcceptedByEmail && (
                  <>
                    <Input
                      name="digitalQuoteAcceptedBy"
                      label={t("sales:quoteAcceptedBy")}
                      isDisabled
                    />
                    <Input
                      name="digitalQuoteAcceptedByEmail"
                      label={t("sales:quoteAcceptedByEmail")}
                      isDisabled
                    />
                  </>
                )}

              <DatePicker
                name="requestedDate"
                label={t("sales:requestedDate")}
                helperText={t("sales:requestedDateHelper")}
                isDisabled={isCustomer}
              />

              <DatePicker
                name="promisedDate"
                label={t("sales:promisedDate")}
                helperText={t("sales:promisedDateHelper")}
                isDisabled={isCustomer}
              />

              <Location name="locationId" label={t("sales:salesLocation")} />

              <Employee name="salesPersonId" label={t("sales:salesPerson")} />

              <Currency
                name="currencyCode"
                label={t("common:currency")}
                value={customer.currencyCode}
                onChange={(newValue) => {
                  if (newValue?.value) {
                    setCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      currencyCode: newValue.value
                    }));
                  }
                }}
                disabled={initialValues.originatedFromQuote}
              />

              {isEditing &&
                !!customer.currencyCode &&
                customer.currencyCode !== company.baseCurrencyCode && (
                  <ExchangeRate
                    name="exchangeRate"
                    value={initialValues.exchangeRate ?? 1}
                    exchangeRateUpdatedAt={initialValues.exchangeRateUpdatedAt}
                    isReadOnly
                    onRefresh={
                      !initialValues.originatedFromQuote
                        ? () => {
                            const formData = new FormData();
                            formData.append(
                              "currencyCode",
                              customer.currencyCode ?? ""
                            );
                            exchangeRateFetcher.submit(formData, {
                              method: "post",
                              action: path.to.salesOrderExchangeRate(
                                initialValues.id ?? ""
                              )
                            });
                          }
                        : undefined
                    }
                  />
                )}

              <CustomFormFields table="salesOrder" />
            </div>
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={
              isEditing
                ? !permissions.can("update", "sales")
                : !permissions.can("create", "sales")
            }
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default SalesOrderForm;
