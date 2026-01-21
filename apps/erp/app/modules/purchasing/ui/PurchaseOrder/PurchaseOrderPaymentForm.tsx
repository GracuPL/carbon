import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@carbon/react";
import { useState } from "react";
import { useFetcher, useParams } from "react-router";
import type { z } from "zod/v3";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  CustomFormFields,
  Hidden,
  PaymentTerm,
  Submit,
  Supplier,
  SupplierContact,
  SupplierLocation
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { purchaseOrderPaymentValidator } from "~/modules/purchasing";
import type { action } from "~/routes/x+/purchase-order+/$orderId.payment";
import { path } from "~/utils/path";

type PurchaseOrderPaymentFormProps = {
  initialValues: z.infer<typeof purchaseOrderPaymentValidator>;
};

const PurchaseOrderPaymentForm = ({
  initialValues
}: PurchaseOrderPaymentFormProps) => {
  const { t } = useTranslation(["purchasing", "common"]);
  const { orderId } = useParams();
  if (!orderId) {
    throw new Error("orderId not found");
  }

  const fetcher = useFetcher<typeof action>();
  const permissions = usePermissions();

  const [supplier, setSupplier] = useState<string | undefined>(
    initialValues.invoiceSupplierId
  );

  return (
    <Card isCollapsible defaultCollapsed>
      <ValidatedForm
        method="post"
        action={path.to.purchaseOrderPayment(orderId)}
        validator={purchaseOrderPaymentValidator}
        defaultValues={initialValues}
        fetcher={fetcher}
      >
        <CardHeader>
          <CardTitle>{t("purchasing:payment")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
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

            <PaymentTerm name="paymentTermId" label={t("purchasing:paymentTerms")} />

            <Boolean name="paymentComplete" label={t("purchasing:paymentComplete")} />
            <CustomFormFields table="purchaseOrderPayment" />
          </div>
        </CardContent>
        <CardFooter>
          <Submit isDisabled={!permissions.can("update", "purchasing")}>
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default PurchaseOrderPaymentForm;
