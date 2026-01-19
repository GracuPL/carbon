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
import type { ReactNode } from "react";
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
import { quoteValidator } from "../../sales.models";

type QuoteFormValues = z.infer<typeof quoteValidator>;

type QuoteFormProps = {
  initialValues: QuoteFormValues;
};

const QuoteForm = ({ initialValues }: QuoteFormProps) => {
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
  const isCustomer = permissions.is("customer");
  const isDisabled = initialValues?.status !== "Draft";
  const isEditing = initialValues.id !== undefined;

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
        validator={quoteValidator}
        defaultValues={initialValues}
      >
        <CardHeader>
          <CardTitle>{isEditing ? t("sales:quote") : t("sales:newQuote")}</CardTitle>
          {!isEditing && (
            <CardDescription>
              {t("sales:quoteDescription")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isEditing && <Hidden name="quoteId" />}
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
                  name="quoteId"
                  label={t("sales:quoteId")}
                  table="quote"
                />
              )}
              <Customer
                autoFocus={!isEditing}
                name="customerId"
                label={t("sales:customer")}
                onChange={onCustomerChange}
              />
              <Input name="customerReference" label={t("sales:customerRfq")} />
              <CustomerContact
                name="customerContactId"
                label={t("sales:purchasingContact")}
                isOptional
                customer={customer.id}
              />
              <CustomerContact
                name="customerEngineeringContactId"
                label={t("sales:engineeringContact")}
                isOptional
                customer={customer.id}
              />
              <CustomerLocation
                name="customerLocationId"
                label={t("sales:customerLocation")}
                isOptional
                customer={customer.id}
              />
              <Employee name="salesPersonId" label={t("sales:salesPerson")} isOptional />
              <Employee name="estimatorId" label={t("sales:estimator")} isOptional />
              <Location name="locationId" label={t("sales:quoteLocation")} />

              <DatePicker
                name="dueDate"
                label={t("sales:dueDate")}
                isDisabled={isCustomer}
              />
              <DatePicker
                name="expirationDate"
                label={t("sales:expirationDate")}
                isDisabled={isCustomer}
              />

              <Currency
                name="currencyCode"
                label={t("sales:currency")}
                value={customer.currencyCode}
                onChange={(
                  newValue: {
                    value: string | undefined;
                    label: string | ReactNode;
                  } | null
                ) => {
                  if (newValue?.value) {
                    setCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      currencyCode: newValue.value
                    }));
                  }
                }}
              />

              {isEditing &&
                !!customer.currencyCode &&
                customer.currencyCode !== company.baseCurrencyCode && (
                  <ExchangeRate
                    name="exchangeRate"
                    value={initialValues.exchangeRate ?? 1}
                    exchangeRateUpdatedAt={initialValues.exchangeRateUpdatedAt}
                    isReadOnly
                    onRefresh={() => {
                      const formData = new FormData();
                      formData.append(
                        "currencyCode",
                        customer.currencyCode ?? ""
                      );
                      exchangeRateFetcher.submit(formData, {
                        method: "post",
                        action: path.to.quoteExchangeRate(
                          initialValues.id ?? ""
                        )
                      });
                    }}
                  />
                )}

              <CustomFormFields table="quote" />
            </div>
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={
              isDisabled ||
              (isEditing
                ? !permissions.can("update", "sales")
                : !permissions.can("create", "sales"))
            }
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default QuoteForm;
