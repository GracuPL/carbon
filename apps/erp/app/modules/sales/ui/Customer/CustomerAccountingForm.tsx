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
import { CustomerType, Hidden, Input, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { customerAccountingValidator } from "../../sales.models";

type CustomerPaymentFormProps = {
  initialValues: z.infer<typeof customerAccountingValidator>;
};

const CustomerAccountingForm = ({
  initialValues
}: CustomerPaymentFormProps) => {
  const { t } = useTranslation(["sales", "common"]);
  const permissions = usePermissions();

  const isDisabled = !permissions.can("update", "sales");

  return (
    <ValidatedForm
      method="post"
      validator={customerAccountingValidator}
      defaultValues={initialValues}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("sales:customerAccounting")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Input name="taxId" label={t("sales:taxId")} />
            <CustomerType
              name="customerTypeId"
              label={t("sales:postingGroup")}
              placeholder={t("sales:selectPostingGroup")}
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

export default CustomerAccountingForm;
