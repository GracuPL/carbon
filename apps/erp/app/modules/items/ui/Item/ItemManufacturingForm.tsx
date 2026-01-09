import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@carbon/react";
import { useFetcher, useParams } from "react-router";
import type { z } from "zod/v3";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  CustomFormFields,
  Hidden,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";

import type { action } from "~/routes/x+/part+/$itemId.manufacturing.$methodId.method";
import { itemManufacturingValidator } from "../../items.models";

type ItemManufacturingFormProps = {
  initialValues: z.infer<typeof itemManufacturingValidator>;
  withConfiguration?: boolean;
};

const ItemManufacturingForm = ({
  initialValues,
  withConfiguration = true
}: ItemManufacturingFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const fetcher = useFetcher<typeof action>();
  const permissions = usePermissions();
  const { itemId } = useParams();

  if (!itemId) throw new Error("Could not find itemId");

  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={itemManufacturingValidator}
        defaultValues={initialValues}
        fetcher={fetcher}
      >
        <CardHeader>
          <CardTitle>{t("items:manufacturing")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="itemId" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Number name="lotSize" label={t("items:batchSize")} />
            <Number
              name="scrapPercentage"
              label={t("items:scrapPercent")}
              formatOptions={{
                style: "percent"
              }}
            />
            <Number name="leadTime" label={t("items:leadTimeDays")} />
            {/* <Boolean
              name="manufacturingBlocked"
              label="Manufacturing Blocked"
            /> */}
            <div className="col-span-2" />

            {withConfiguration && (
              <Boolean
                name="requiresConfiguration"
                label=""
                description={t("items:configured")}
              />
            )}
            <CustomFormFields table="partReplenishment" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Submit
            withBlocker={false}
            isDisabled={!permissions.can("update", "parts")}
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default ItemManufacturingForm;
