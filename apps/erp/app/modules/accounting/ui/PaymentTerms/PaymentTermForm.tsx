import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  HStack,
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerProvider,
  ModalDrawerTitle,
  toast,
  VStack
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  Hidden,
  Input,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Select,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import {
  paymentTermsCalculationMethod,
  paymentTermValidator
} from "../../accounting.models";
import type { PaymentTermCalculationMethod } from "../../types";

type PaymentTermFormProps = {
  initialValues: z.infer<typeof paymentTermValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: (data?: { id: string; name: string }) => void;
};

const PaymentTermForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: PaymentTermFormProps) => {
  const { t } = useTranslation(["accounting", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();
  const [selectedCalculationMethod, setSelectedCalculationMethod] =
    useState<PaymentTermCalculationMethod>(initialValues.calculationMethod);

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("accounting:createdPaymentTerm"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("accounting:failedToCreatePaymentTerm", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "accounting")
    : !permissions.can("create", "accounting");

  const calculationMethodOptions = paymentTermsCalculationMethod.map((v) => ({
    label: v,
    value: v
  }));

  return (
    <ModalDrawerProvider type={type}>
      <ModalDrawer
        open={open}
        onOpenChange={(open) => {
          if (!open) onClose?.();
        }}
      >
        <ModalDrawerContent>
          <ValidatedForm
            validator={paymentTermValidator}
            method="post"
            action={
              isEditing
                ? path.to.paymentTerm(initialValues.id!)
                : path.to.newPaymentTerm
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("accounting:editPaymentTerm") : t("accounting:newPaymentTerm")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Input name="name" label={t("accounting:name")} />
                <Select
                  name="calculationMethod"
                  label={t("accounting:after")}
                  options={calculationMethodOptions}
                  onChange={(value) => {
                    setSelectedCalculationMethod(
                      value?.value as PaymentTermCalculationMethod
                    );
                  }}
                />
                <Number
                  name="daysDue"
                  label={t("accounting:dueDaysAfter", { calculationMethod: selectedCalculationMethod })}
                  minValue={0}
                  helperText={t("accounting:dueDaysHelper")}
                />
                <Number
                  name="daysDiscount"
                  label={t("accounting:discountDaysAfter", { calculationMethod: selectedCalculationMethod })}
                  minValue={0}
                  helperText={t("accounting:discountDaysHelper")}
                />
                <Number
                  name="discountPercentage"
                  label={t("accounting:discountPercent")}
                  minValue={0}
                  maxValue={100}
                  helperText={t("accounting:discountPercentHelper")}
                />
                <CustomFormFields table="paymentTerm" />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
              </HStack>
            </ModalDrawerFooter>
          </ValidatedForm>
        </ModalDrawerContent>
      </ModalDrawer>
    </ModalDrawerProvider>
  );
};

export default PaymentTermForm;
