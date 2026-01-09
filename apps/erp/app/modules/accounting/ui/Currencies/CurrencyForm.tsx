import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  HStack,
  VStack
} from "@carbon/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  Hidden,
  Input,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Submit
} from "~/components/Form";
import { usePermissions, useUser } from "~/hooks";
import { path } from "~/utils/path";
import { currencyValidator } from "../../accounting.models";

type CurrencyFormProps = {
  initialValues: z.infer<typeof currencyValidator>;
};

const CurrencyForm = ({ initialValues }: CurrencyFormProps) => {
  const { t } = useTranslation(["accounting", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);
  const [decimalPlaces, setDecimalPlaces] = useState(
    initialValues.decimalPlaces ?? 2
  );

  const { company } = useUser();

  const isBaseCurrency = company?.baseCurrencyCode === initialValues.code;
  const exchangeRateHelperText = isBaseCurrency
    ? t("accounting:baseCurrencyHelper")
    : t("accounting:exchangeRateHelper", { baseCurrency: company?.baseCurrencyCode, currency: initialValues.code });

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "accounting")
    : !permissions.can("create", "accounting");
  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={currencyValidator}
          method="post"
          action={
            isEditing
              ? path.to.currency(initialValues.id!)
              : path.to.newCurrency
          }
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("accounting:editCurrencyTitle") : t("accounting:newCurrency")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <VStack spacing={4}>
              <Input name="name" label={t("common:name")} isReadOnly />
              <Input name="code" label={t("common:code")} isReadOnly />
              <Number
                name="decimalPlaces"
                label={t("accounting:decimalPlaces")}
                minValue={0}
                maxValue={4}
                onChange={setDecimalPlaces}
              />
              <Number
                name="exchangeRate"
                label={t("accounting:exchangeRate")}
                minValue={isBaseCurrency ? 1 : 0}
                maxValue={isBaseCurrency ? 1 : undefined}
                formatOptions={{
                  minimumFractionDigits: decimalPlaces ?? 0
                }}
                helperText={exchangeRateHelperText}
              />

              <CustomFormFields table="currency" />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
              <Button variant="solid" onClick={onClose}>
                {t("common:cancel")}
              </Button>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
};

export default CurrencyForm;
