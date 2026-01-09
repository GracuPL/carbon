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
import type { z } from "zod/v3";
import {
  Currency,
  Customer,
  CustomerContact,
  CustomerLocation,
  CustomFormFields,
  DatePicker,
  Hidden,
  Input,
  Location,
  SequenceOrCustomId,
  Submit
} from "~/components/Form";
import PaymentTerm from "~/components/Form/PaymentTerm";
import { usePermissions } from "~/hooks";
import { salesInvoiceValidator } from "~/modules/invoicing";

type SalesInvoiceFormValues = z.infer<typeof salesInvoiceValidator>;

type SalesInvoiceFormProps = {
  initialValues: SalesInvoiceFormValues;
};

const SalesInvoiceForm = ({ initialValues }: SalesInvoiceFormProps) => {
  const { t } = useTranslation(["invoicing", "common"]);
  const permissions = usePermissions();
  const { carbon } = useCarbon();
  const isEditing = initialValues.id !== undefined;

  const [invoiceCustomer, setInvoiceCustomer] = useState<{
    id: string | undefined;
    invoiceCustomerContactId: string | undefined;
    invoiceCustomerLocationId: string | undefined;
    currencyCode: string | undefined;
    paymentTermId: string | undefined;
  }>({
    id: initialValues.invoiceCustomerId,
    invoiceCustomerContactId: initialValues.invoiceCustomerContactId,
    invoiceCustomerLocationId: initialValues.invoiceCustomerLocationId,
    currencyCode: initialValues.currencyCode,
    paymentTermId: initialValues.paymentTermId
  });

  const [customer, setCustomer] = useState<{
    id: string | undefined;
  }>({
    id: initialValues.customerId
  });

  const onCustomerChange = async (
    newValue: {
      value: string | undefined;
      label: string;
    } | null
  ) => {
    setCustomer({ id: newValue?.value });
    if (newValue?.value !== invoiceCustomer.id) {
      onInvoiceCustomerChange(newValue);
    }
  };

  const onInvoiceCustomerChange = async (
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
        setInvoiceCustomer({
          id: newValue?.value,
          currencyCode: undefined,
          paymentTermId: undefined,
          invoiceCustomerContactId: undefined,
          invoiceCustomerLocationId: undefined
        });
      });

      const [customerData, paymentTermData] = await Promise.all([
        carbon
          ?.from("customer")
          .select("currencyCode")
          .eq("id", newValue.value)
          .single(),
        carbon
          ?.from("customerPayment")
          .select("*")
          .eq("customerId", newValue.value)
          .single()
      ]);

      if (customerData.error || paymentTermData.error) {
        toast.error(t("errorFetchingCustomerData"));
      } else {
        setInvoiceCustomer((prev) => ({
          ...prev,
          id: newValue.value,
          invoiceCustomerContactId:
            paymentTermData.data.invoiceCustomerContactId ?? undefined,
          invoiceCustomerLocationId:
            paymentTermData.data.invoiceCustomerLocationId ?? undefined,
          currencyCode: customerData.data.currencyCode ?? undefined,
          paymentTermId: paymentTermData.data.paymentTermId ?? undefined
        }));
      }
    } else {
      setInvoiceCustomer({
        id: undefined,
        currencyCode: undefined,
        paymentTermId: undefined,
        invoiceCustomerContactId: undefined,
        invoiceCustomerLocationId: undefined
      });
    }
  };

  return (
    <ValidatedForm
      method="post"
      validator={salesInvoiceValidator}
      defaultValues={initialValues}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? t("invoicing:salesInvoice") : t("invoicing:newSalesInvoice")}
          </CardTitle>
          {!isEditing && (
            <CardDescription>
              {t("invoicing:salesInvoiceDescription")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          {isEditing && <Hidden name="invoiceId" />}
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
                  name="invoiceId"
                  label={t("invoicing:invoiceId")}
                  table="salesInvoice"
                />
              )}
              <Customer
                name="customerId"
                label={t("common:customer")}
                onChange={onCustomerChange}
              />
              <Input name="customerReference" label={t("invoicing:customerInvoiceNumber")} />

              <Customer
                name="invoiceCustomerId"
                label={t("invoicing:invoiceCustomer")}
                value={invoiceCustomer.id}
                onChange={onInvoiceCustomerChange}
              />
              <CustomerLocation
                name="invoiceCustomerLocationId"
                label={t("invoicing:invoiceCustomerLocation")}
                customer={customer.id}
                value={invoiceCustomer.invoiceCustomerLocationId}
                onChange={(newValue) => {
                  if (newValue?.id) {
                    setInvoiceCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      invoiceCustomerLocationId: newValue.id
                    }));
                  }
                }}
              />
              <CustomerContact
                name="invoiceCustomerContactId"
                label={t("invoicing:invoiceCustomerContact")}
                customer={customer.id}
                value={invoiceCustomer.invoiceCustomerContactId}
                onChange={(newValue) => {
                  if (newValue?.id) {
                    setInvoiceCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      invoiceCustomerContactId: newValue.id
                    }));
                  }
                }}
              />

              <DatePicker name="dateDue" label={t("invoicing:dueDate")} />
              <DatePicker name="dateIssued" label={t("invoicing:dateIssued")} />

              <PaymentTerm
                name="paymentTermId"
                label={t("invoicing:paymentTerms")}
                value={invoiceCustomer?.paymentTermId}
                onChange={(newValue) => {
                  if (newValue?.value) {
                    setInvoiceCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      paymentTermId: newValue.value
                    }));
                  }
                }}
              />
              <Currency
                name="currencyCode"
                label={t("common:currency")}
                value={invoiceCustomer?.currencyCode}
                onChange={(newValue) => {
                  if (newValue?.value) {
                    setInvoiceCustomer((prevCustomer) => ({
                      ...prevCustomer,
                      currencyCode: newValue.value
                    }));
                  }
                }}
              />
              <Location name="locationId" label={t("common:location")} />
              <CustomFormFields table="salesInvoice" />
            </div>
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={
              isEditing
                ? !permissions.can("update", "invoicing")
                : !permissions.can("create", "invoicing")
            }
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </Card>
    </ValidatedForm>
  );
};

export default SalesInvoiceForm;
