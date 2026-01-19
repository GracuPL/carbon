import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@carbon/react";
import type { z } from "zod/v3";
// biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
import { CustomFormFields, Hidden, Number, Submit } from "~/components/Form";
import { usePermissions, useUser } from "~/hooks";
import { itemUnitSalePriceValidator } from "../../items.models";

type ItemSalePriceFormProps = {
  initialValues: z.infer<typeof itemUnitSalePriceValidator>;
};

const ItemSalePriceForm = ({ initialValues }: ItemSalePriceFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const permissions = usePermissions();
  const { company } = useUser();

  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={itemUnitSalePriceValidator}
        defaultValues={initialValues}
      >
        <CardHeader>
          <CardTitle>{t("items:salePrice")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="itemId" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Number
              name="unitSalePrice"
              label={t("items:unitSalePrice")}
              minValue={0}
              formatOptions={{
                style: "currency",
                currency: company?.baseCurrencyCode ?? "USD"
              }}
            />
            {/* <Currency
              name="currencyCode"
              label={t("common:currency")}
              onChange={(newValue) => {
                if (newValue) setCurrency(newValue?.value);
              }}
            />

            <UnitOfMeasure
              name="salesUnitOfMeasureCode"
              label={t("items:salesUnitOfMeasure")}
            />

            <Boolean name="salesBlocked" label={t("items:salesBlocked")} />
            <Boolean name="priceIncludesTax" label={t("items:priceIncludesTax")} />
            <Boolean
              name="allowInvoiceDiscount"
              label={t("items:allowInvoiceDiscount")}
            /> */}
            <CustomFormFields table="partUnitSalePrice" />
          </div>
        </CardContent>
        <CardFooter>
          <Submit isDisabled={!permissions.can("update", "parts")}>{t("common:save")}</Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default ItemSalePriceForm;
