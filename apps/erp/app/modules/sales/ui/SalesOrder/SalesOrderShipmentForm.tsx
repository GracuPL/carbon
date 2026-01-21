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
import { usePermissions, useRouteData, useUser } from "~/hooks";
import type { action } from "~/routes/x+/sales-order+/$orderId.shipment";
import { path } from "~/utils/path";
import { salesOrderShipmentValidator } from "../../sales.models";
import type { SalesOrder } from "../../types";

type SalesOrderShipmentFormProps = {
  initialValues: z.infer<typeof salesOrderShipmentValidator>;
  defaultCollapsed?: boolean;
};

export type SalesOrderShipmentFormRef = {
  focusShippingCost: () => void;
};

const SalesOrderShipmentForm = forwardRef<
  SalesOrderShipmentFormRef,
  SalesOrderShipmentFormProps
>(({ initialValues, defaultCollapsed = true }, ref) => {
  const { t } = useTranslation(["sales", "common"]);
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

  const { orderId } = useParams();
  if (!orderId) throw new Error("orderId not found");
  const routeData = useRouteData<{
    salesOrder: SalesOrder;
  }>(path.to.salesOrder(orderId));

  const { company } = useUser();

  const isCustomer = permissions.is("customer");

  return (
    <Card
      ref={cardRef}
      isCollapsible
      defaultCollapsed={defaultCollapsed}
      isCollapsed={isCollapsed}
      onCollapsedChange={setIsCollapsed}
    >
      <ValidatedForm
        action={path.to.salesOrderShipment(initialValues.id)}
        method="post"
        validator={salesOrderShipmentValidator}
        defaultValues={initialValues}
        fetcher={fetcher}
      >
        <CardHeader>
          <CardTitle>{t("sales:shipping")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 w-full">
            <Number
              name="shippingCost"
              label={t("sales:shippingCost")}
              minValue={0}
              formatOptions={{
                style: "currency",
                currency:
                  routeData?.salesOrder?.currencyCode ??
                  company?.baseCurrencyCode
              }}
              ref={shippingCostRef}
            />
            <Location
              name="locationId"
              label={t("sales:shipmentLocation")}
              isReadOnly={isCustomer}
              isClearable
            />
            <ShippingMethod name="shippingMethodId" label={t("sales:shippingMethod")} />

            <DatePicker name="receiptRequestedDate" label={t("sales:requestedDate")} />
            <DatePicker name="receiptPromisedDate" label={t("sales:promisedDate")} />
            <DatePicker name="shipmentDate" label={t("sales:shipmentDate")} />

            <Input name="trackingNumber" label={t("sales:trackingNumber")} />
            <Boolean
              name="dropShipment"
              label={t("sales:dropShipment")}
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
                  label={t("common:location")}
                  customer={customer}
                />
              </>
            )}
            <CustomFormFields table="salesOrderShipment" />
          </div>
        </CardContent>
        <CardFooter>
          <Submit isDisabled={!permissions.can("update", "sales")}>{t("common:save")}</Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
});

SalesOrderShipmentForm.displayName = "SalesOrderShipmentForm";

export default SalesOrderShipmentForm;
