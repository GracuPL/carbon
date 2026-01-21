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
import { useState } from "react";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  Hidden,
  Submit,
  Supplier,
  SupplierContact,
  SupplierLocation
} from "~/components/Form";
import PaymentTerm from "~/components/Form/PaymentTerm";
import { usePermissions } from "~/hooks";
import { supplierPaymentValidator } from "~/modules/purchasing";

type SupplierPaymentFormProps = {
  initialValues: z.infer<typeof supplierPaymentValidator>;
};

const SupplierPaymentForm = ({ initialValues }: SupplierPaymentFormProps) => {
  const { t } = useTranslation(["purchasing", "common"]);
  const permissions = usePermissions();
  const [supplier, setSupplier] = useState<string | undefined>(
    initialValues.invoiceSupplierId
  );

  const isDisabled = !permissions.can("update", "purchasing");

  return (
    <ValidatedForm
      method="post"
      validator={supplierPaymentValidator}
      defaultValues={initialValues}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("purchasing:paymentTerms")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="supplierId" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Supplier
              name="invoiceSupplierId"
              label={t("purchasing:invoiceSupplier")}
              onChange={(value) => setSupplier(value?.value as string)}
            />
            <SupplierLocation
              name="invoiceSupplierLocationId"
              label={t("purchasing:invoiceLocation")}
              supplier={supplier}
            />
            <SupplierContact
              name="invoiceSupplierContactId"
              label={t("purchasing:invoiceContact")}
              supplier={supplier}
            />

            <PaymentTerm name="paymentTermId" label={t("purchasing:paymentTerm")} />
            <CustomFormFields table="supplierPayment" />
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

export default SupplierPaymentForm;
