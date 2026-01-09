import { Select, ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@carbon/react";
import { useState } from "react";
import { useParams } from "react-router";
import type { z } from "zod/v3";
import {
  ConversionFactor,
  Hidden,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Submit,
  UnitOfMeasure
} from "~/components/Form";
import { usePermissions, useRouteData } from "~/hooks";
import { useSuppliers } from "~/stores/suppliers";
import { path } from "~/utils/path";
import { itemPurchasingValidator } from "../../items.models";
import type { PartSummary } from "../../types";

type ItemPurchasingFormProps = {
  initialValues: z.infer<typeof itemPurchasingValidator>;
  allowedSuppliers?: string[];
};

const ItemPurchasingForm = ({
  initialValues,
  allowedSuppliers
}: ItemPurchasingFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const permissions = usePermissions();
  const { itemId } = useParams();
  if (!itemId) throw new Error("itemId not found");

  const [suppliers] = useSuppliers();
  const allowedSuppliersOptions = suppliers?.reduce(
    (acc, supplier) => {
      if (allowedSuppliers?.includes(supplier.id)) {
        acc.push({
          label: supplier.name,
          value: supplier.id
        });
      }
      return acc;
    },
    [] as { label: string; value: string }[]
  );

  const routeData = useRouteData<{ partSummary: PartSummary }>(
    path.to.part(itemId)
  );

  const inventoryCode = routeData?.partSummary?.unitOfMeasureCode;
  const [purchasingCode, setPurchasingCode] = useState<string | null>(
    initialValues.purchasingUnitOfMeasureCode ?? null
  );

  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={itemPurchasingValidator}
        defaultValues={initialValues}
      >
        <CardHeader>
          <CardTitle>{t("items:purchasing")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="itemId" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Select
              name="preferredSupplierId"
              label={t("items:preferredSupplier")}
              options={allowedSuppliersOptions}
            />
            <Number name="leadTime" label={t("items:leadTimeDays")} />
            <UnitOfMeasure
              name="purchasingUnitOfMeasureCode"
              label={t("items:purchasingUnitOfMeasure")}
              onChange={(newValue) => {
                if (newValue) setPurchasingCode(newValue.value);
              }}
            />
            <ConversionFactor
              name="conversionFactor"
              isReadOnly={!purchasingCode || !inventoryCode}
              purchasingCode={purchasingCode ?? undefined}
              inventoryCode={inventoryCode ?? undefined}
            />
            {/* <Boolean name="purchasingBlocked" label="Purchasing Blocked" /> */}
          </div>
        </CardContent>
        <CardFooter>
          <Submit isDisabled={!permissions.can("update", "parts")}>{t("common:save")}</Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default ItemPurchasingForm;
