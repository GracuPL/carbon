import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  HStack
} from "@carbon/react";
import type { z } from "zod/v3";
import { Hidden, Input, Submit, SupplierType } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { supplierAccountingValidator } from "~/modules/purchasing";

type SupplierPaymentFormProps = {
  initialValues: z.infer<typeof supplierAccountingValidator>;
};

const SupplierAccountingForm = ({
  initialValues
}: SupplierPaymentFormProps) => {
  const { t } = useTranslation(["purchasing", "common"]);
  const permissions = usePermissions();

  const isDisabled = !permissions.can("update", "purchasing");

  return (
    <ValidatedForm
      method="post"
      validator={supplierAccountingValidator}
      defaultValues={initialValues}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("purchasing:supplierAccounting")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Input name="taxId" label={t("purchasing:taxId")} />
            <SupplierType
              name="supplierTypeId"
              label={t("purchasing:postingGroup")}
              placeholder={t("purchasing:selectPostingGroup")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <HStack>
            <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
          </HStack>
        </CardFooter>
      </Card>
    </ValidatedForm>
  );
};

export default SupplierAccountingForm;
