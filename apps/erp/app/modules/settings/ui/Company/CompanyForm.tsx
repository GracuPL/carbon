import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import { VStack } from "@carbon/react";
import type { z } from "zod/v3";
import { Currency, Hidden, Input, Submit } from "~/components/Form";
import AddressAutocomplete from "~/components/Form/AddressAutocomplete";
import { companyValidator } from "~/modules/settings";
import { path } from "~/utils/path";

type CompanyFormProps = {
  company: z.infer<typeof companyValidator>;
};

const CompanyForm = ({ company }: CompanyFormProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <ValidatedForm
        method="post"
        action={path.to.company}
        validator={companyValidator}
        defaultValues={company}
      >
        <Hidden name="intent" value="about" />

        <VStack spacing={4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input name="name" label={t("companyName")} />
            <Input name="taxId" label={t("taxId")} />
            <AddressAutocomplete variant="grid" />
            <Currency
              name="baseCurrencyCode"
              label={t("baseCurrency")}
              disabled={true}
            />
            <Input name="phone" label={t("phoneNumber")} />
            <Input name="fax" label={t("faxNumber")} />
            <Input name="email" label={t("email")} />
            <Input name="website" label={t("website")} />
          </div>
          <Submit />
        </VStack>
      </ValidatedForm>
    </>
  );
};

export default CompanyForm;
