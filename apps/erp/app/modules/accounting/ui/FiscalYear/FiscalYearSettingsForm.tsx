import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  VStack
} from "@carbon/react";
import type { z } from "zod/v3";
import { Select, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { months } from "~/modules/shared";
import { path } from "~/utils/path";
import { fiscalYearSettingsValidator } from "../../accounting.models";

type FiscalYearSettingsFormProps = {
  initialValues: z.infer<typeof fiscalYearSettingsValidator>;
};

const FiscalYearSettingsForm = ({
  initialValues
}: FiscalYearSettingsFormProps) => {
  const { t } = useTranslation(["accounting", "common"]);
  const permissions = usePermissions();
  return (
    <Card>
      <ValidatedForm
        method="post"
        action={path.to.fiscalYears}
        defaultValues={initialValues}
        validator={fiscalYearSettingsValidator}
      >
        <CardHeader>
          <CardTitle>{t("accounting:fiscalYearSettings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack spacing={4} className="my-4 w-full max-w-[440px]">
            <Select
              name="startMonth"
              label={t("accounting:fiscalYearStart")}
              options={months.map((month) => ({ label: month, value: month }))}
              helperText={t("accounting:fiscalYearStartHelper")}
            />
            <Select
              name="taxStartMonth"
              label={t("accounting:taxYearStart")}
              options={months.map((month) => ({ label: month, value: month }))}
              helperText={t("accounting:taxYearStartHelper")}
            />
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={
              !permissions.can("update", "accounting") ||
              !permissions.is("employee")
            }
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default FiscalYearSettingsForm;
