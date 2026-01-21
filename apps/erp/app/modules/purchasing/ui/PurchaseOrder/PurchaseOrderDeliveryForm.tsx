import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@carbon/react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useFetcher, useParams } from "react-router";
import type { z } from "zod/v3";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  Customer,
  CustomerLocation,
  CustomFormFields,
  DatePicker,
  Hidden,
  Input,
  Location,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  ShippingMethod,
  Submit
} from "~/components/Form";
import { usePermissions, useRouteData } from "~/hooks";
import type { PurchaseOrder } from "~/modules/purchasing";
import { purchaseOrderDeliveryValidator } from "~/modules/purchasing";
import type { action } from "~/routes/x+/purchase-order+/$orderId.delivery";
import { path } from "~/utils/path";

type PurchaseOrderDeliveryFormProps = {
  initialValues: z.infer<typeof purchaseOrderDeliveryValidator>;
  currencyCode: string;
  defaultCollapsed?: boolean;
};

export type PurchaseOrderDeliveryFormRef = {
  focusShippingCost: () => void;
};

const PurchaseOrderDeliveryForm = forwardRef<
  PurchaseOrderDeliveryFormRef,
  PurchaseOrderDeliveryFormProps
>(({ initialValues, currencyCode, defaultCollapsed = true }, ref) => {
  const { t } = useTranslation(["purchasing", "sales", "common"]);
  const { orderId } = useParams();
  if (!orderId) {
    throw new Error("orderId not found");
  }

  const routeData = useRouteData<{
    purchaseOrder: PurchaseOrder;
  }>(path.to.purchaseOrder(orderId));

  const isEditable = ["Draft", "To Review"].includes(
    routeData?.purchaseOrder?.status ?? ""
  );

  const permissions = usePermissions();
  const fetcher = useFetcher<typeof action>();
  const [dropShip, setDropShip] = useState<boolean>(
    initialValues.dropShipment ?? false
  );
  const [customer, setCustomer] = useState<string | undefined>(
    initialValues.customerId
  );
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const shippingCostRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focusShippingCost: () => {
      setIsCollapsed(false);
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        shippingCostRef.current?.focus();
      }, 100);
    }
  }));

  const isSupplier = permissions.is("supplier");

  return (
    <Card
      ref={cardRef}
      isCollapsible
      defaultCollapsed={defaultCollapsed}
      isCollapsed={isCollapsed}
      onCollapsedChange={setIsCollapsed}
    >
      <ValidatedForm
        method="post"
        action={path.to.purchaseOrderDelivery(orderId)}
        validator={purchaseOrderDeliveryValidator}
        defaultValues={initialValues}
        fetcher={fetcher}
      >
        <CardHeader>
          <CardTitle>{t("purchasing:shipping")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Number
              name="supplierShippingCost"
              label={t("purchasing:shippingCost")}
              minValue={0}
              formatOptions={{
                style: "currency",
                currency: currencyCode
              }}
              ref={shippingCostRef}
            />
            <Location
              name="locationId"
              label={t("purchasing:deliveryLocation")}
              isReadOnly={isSupplier}
              isClearable
            />
            <ShippingMethod name="shippingMethodId" label={t("purchasing:shippingMethod")} />

            <DatePicker name="receiptRequestedDate" label={t("purchasing:requestedDate")} />
            <DatePicker name="receiptPromisedDate" label={t("purchasing:promisedDate")} />
            <DatePicker name="deliveryDate" label={t("purchasing:deliveryDate")} />

            <Input name="trackingNumber" label={t("purchasing:trackingNumber")} />
            <Boolean
              name="dropShipment"
              label={t("purchasing:dropShipment")}
              onChange={setDropShip}
            />
            {dropShip && (
              <>
                <Customer
                  name="customerId"
                  label={t("sales:customer")}
                  onChange={(value) => setCustomer(value?.value as string)}
                />
                <CustomerLocation
                  name="customerLocationId"
                  label={t("purchasing:location")}
                  customer={customer}
                />
              </>
            )}
            <CustomFormFields table="purchaseOrderDelivery" />
          </div>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={!permissions.can("update", "purchasing") || !isEditable}
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
});

PurchaseOrderDeliveryForm.displayName = "PurchaseOrderDeliveryForm";

export default PurchaseOrderDeliveryForm;
