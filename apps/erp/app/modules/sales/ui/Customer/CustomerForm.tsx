import { PhoneInput, ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  cn,
  HStack,
  ModalCard,
  ModalCardBody,
  ModalCardContent,
  ModalCardDescription,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardProvider,
  ModalCardTitle,
  toast
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  Currency,
  CustomerContact,
  CustomerStatus,
  CustomerType,
  CustomFormFields,
  Employee,
  Hidden,
  Input,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { customerValidator } from "../../sales.models";
import type { Customer } from "../../types";

type CustomerFormProps = {
  initialValues: z.infer<typeof customerValidator>;
  type?: "card" | "modal";
  onClose?: () => void;
};

const CustomerForm = ({
  initialValues,
  type = "card",
  onClose
}: CustomerFormProps) => {
  const { t } = useTranslation(["sales", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<Customer>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      // @ts-ignore
      toast.success(t("createdCustomer", { name: fetcher.data.data.name }));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(t("failedToCreateCustomer", { message: fetcher.data.error.message }));
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "sales")
    : !permissions.can("create", "sales");

  return (
    <div>
      <ModalCardProvider type={type}>
        <ModalCard onClose={onClose}>
          <ModalCardContent size="medium">
            <ValidatedForm
              method="post"
              action={isEditing ? undefined : path.to.newCustomer}
              validator={customerValidator}
              defaultValues={initialValues}
              fetcher={fetcher}
            >
              <ModalCardHeader>
                <ModalCardTitle>
                  {isEditing ? t("sales:customerOverview") : t("sales:newCustomer")}
                </ModalCardTitle>
                {!isEditing && (
                  <ModalCardDescription>
                    {t("sales:customerDescription")}
                  </ModalCardDescription>
                )}
              </ModalCardHeader>
              <ModalCardBody>
                <Hidden name="id" />
                <Hidden name="type" value={type} />
                <div
                  className={cn(
                    "grid w-full gap-x-8 gap-y-4",
                    type === "modal"
                      ? "grid-cols-1"
                      : isEditing
                        ? "grid-cols-1 lg:grid-cols-3"
                        : "grid-cols-1 md:grid-cols-2"
                  )}
                >
                  <Input name="name" label={t("common:name")} autoFocus={!isEditing} />

                  <CustomerStatus
                    name="customerStatusId"
                    label={t("sales:customerStatus")}
                    placeholder={t("sales:selectCustomerStatus")}
                  />
                  <CustomerType
                    name="customerTypeId"
                    label={t("sales:customerType")}
                    placeholder={t("sales:selectCustomerType")}
                  />
                  <Employee name="accountManagerId" label={t("sales:accountManager")} />

                  <Currency name="currencyCode" label={t("common:currency")} />

                  <Number
                    name="taxPercent"
                    label={t("sales:taxPercent")}
                    minValue={0}
                    maxValue={1}
                    step={0.0001}
                    formatOptions={{
                      style: "percent",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    }}
                  />

                  <Input name="website" label={t("common:website")} />

                  {isEditing && (
                    <>
                      <CustomerContact
                        customer={initialValues.id}
                        name="salesContactId"
                        label={t("sales:salesContact")}
                      />
                      <CustomerContact
                        customer={initialValues.id}
                        name="invoicingContactId"
                        label={t("sales:invoicingContact")}
                      />
                    </>
                  )}

                  <CustomFormFields table="customer" />
                </div>
              </ModalCardBody>
              <ModalCardFooter>
                <HStack>
                  <Submit isDisabled={isDisabled} />
                </HStack>
              </ModalCardFooter>
            </ValidatedForm>
          </ModalCardContent>
        </ModalCard>
      </ModalCardProvider>
    </div>
  );
};

export default CustomerForm;
