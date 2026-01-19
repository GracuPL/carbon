import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  VStack
} from "@carbon/react";
import { useState } from "react";
import type { z } from "zod/v3";
import {
  Customer,
  CustomerContact,
  CustomerLocation,
  CustomFormFields,
  DatePicker,
  Employee,
  Hidden,
  Input,
  Location,
  SequenceOrCustomId,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { salesRfqValidator } from "../../sales.models";

type SalesRFQFormValues = z.infer<typeof salesRfqValidator>;

type SalesRFQFormProps = {
  initialValues: SalesRFQFormValues;
};

const SalesRFQForm = ({ initialValues }: SalesRFQFormProps) => {
  const { t } = useTranslation(["sales", "common"]);
  const permissions = usePermissions();
  const [customer, setCustomer] = useState<string | undefined>(
    initialValues.customerId
  );
  const isEditing = initialValues.id !== undefined;
  const isCustomer = permissions.is("customer");
  const isDraft = ["Draft", "Ready to Quote"].includes(
    initialValues.status ?? ""
  );

  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={salesRfqValidator}
        defaultValues={initialValues}
      >
        <CardHeader>
          <CardTitle>{isEditing ? t("sales:rfq") : t("sales:newRFQ")}</CardTitle>
          {!isEditing && (
            <CardDescription>
              {t("sales:rfqFormDescription")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isEditing && <Hidden name="rfqId" />}
          <VStack>
            <div
              className={cn(
                "grid w-full gap-x-8 gap-y-4",
                isEditing
                  ? "grid-cols-1 lg:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {!isEditing && (
                <SequenceOrCustomId
                  name="rfqId"
                  label={t("sales:rfqId")}
                  table="salesRfq"
                />
              )}
              <Customer
                autoFocus={!isEditing}
                name="customerId"
                label={t("sales:customer")}
                onChange={(newValue) =>
                  setCustomer(newValue?.value as string | undefined)
                }
              />
              <Input name="customerReference" label={t("sales:customerRfq")} />
              <CustomerContact
                name="customerContactId"
                label={t("sales:purchasingContact")}
                customer={customer}
              />
              <CustomerContact
                name="customerEngineeringContactId"
                label={t("sales:engineeringContact")}
                customer={customer}
              />
              <CustomerLocation
                name="customerLocationId"
                label={t("sales:customerLocation")}
                customer={customer}
              />
              <DatePicker
                name="rfqDate"
                label={t("sales:rfqDate")}
                isDisabled={isCustomer}
              />
              <DatePicker
                name="expirationDate"
                label={t("sales:dueDate")}
                isDisabled={isCustomer}
              />
              <Location name="locationId" label={t("sales:rfqLocation")} />
              <Employee name="salesPersonId" label={t("sales:salesPerson")} isOptional />
              <CustomFormFields table="salesRfq" />
            </div>
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={
              !isDraft ||
              (isEditing
                ? !permissions.can("update", "sales")
                : !permissions.can("create", "sales"))
            }
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default SalesRFQForm;
