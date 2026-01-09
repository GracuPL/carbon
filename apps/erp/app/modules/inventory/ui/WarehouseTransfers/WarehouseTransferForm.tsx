import { InputControlled, ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  VStack
} from "@carbon/react";
import type { z } from "zod/v3";
import {
  DatePicker,
  Hidden,
  Input,
  Location,
  SequenceOrCustomId,
  Submit,
  TextArea
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { warehouseTransferValidator } from "../../inventory.models";

type WarehouseTransferFormProps = {
  initialValues: z.infer<typeof warehouseTransferValidator>;
};

const WarehouseTransferForm = ({
  initialValues
}: WarehouseTransferFormProps) => {
  const { t } = useTranslation(["inventory", "common"]);
  const permissions = usePermissions();
  const isEditing = !!initialValues.id;
  const canEdit =
    permissions.can("update", "inventory") &&
    ["Draft"].includes(initialValues.status ?? "");

  return (
    <ValidatedForm
      validator={warehouseTransferValidator}
      method="post"
      defaultValues={initialValues}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{isEditing ? t("inventory:warehouseTransfer") : t("inventory:newWarehouseTransfer")}</CardTitle>
          {!isEditing && (
            <CardDescription>
              {t("inventory:warehouseTransferDescription")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          <VStack spacing={4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
              {isEditing ? (
                <InputControlled
                  name="transferId"
                  label={t("inventory:transferId")}
                  isDisabled
                  value={initialValues.transferId!}
                />
              ) : (
                <SequenceOrCustomId
                  name="transferId"
                  label={t("inventory:transferId")}
                  table="warehouseTransfer"
                />
              )}
              <Input name="reference" label={t("inventory:reference")} />
              <Location name="fromLocationId" label={t("inventory:fromLocation")} />
              <Location name="toLocationId" label={t("inventory:toLocation")} />
              {isEditing && (
                <>
                  <DatePicker name="transferDate" label={t("inventory:transferDate")} />
                  <DatePicker
                    name="expectedReceiptDate"
                    label={t("inventory:expectedReceipt")}
                  />
                </>
              )}
            </div>

            <TextArea name="notes" label={t("inventory:notes")} />

            <Submit disabled={!canEdit}>{t("common:save")}</Submit>
          </VStack>
        </CardContent>
      </Card>
    </ValidatedForm>
  );
};

export default WarehouseTransferForm;
