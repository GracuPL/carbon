import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  HStack,
  toast,
  VStack
} from "@carbon/react";
import { useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router";
import { z } from "zod/v3";
import { zfd } from "zod-form-data";
import {
  CustomFormFields,
  Hidden,
  Item,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Shelf,
  Submit,
  TextArea
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import type { MethodItemType } from "~/modules/shared/types";
import { useItems } from "~/stores/items";
import { path } from "~/utils/path";
import type { WarehouseTransfer } from "../../types";

const warehouseTransferLineFormValidator = z.discriminatedUnion("type", [
  z.object({
    id: zfd.text(z.string().optional()),
    type: z.literal("create"),
    transferId: z.string().min(1),
    fromLocationId: z.string().min(1),
    toLocationId: z.string().min(1),
    itemId: z.string().min(1),
    quantity: zfd.numeric(z.number().min(0.0001)),
    fromShelfId: zfd.text(z.string().optional()),
    toShelfId: zfd.text(z.string().optional()),
    notes: zfd.text(z.string().optional())
  }),
  z.object({
    type: z.literal("update"),
    id: z.string().min(1),
    transferId: z.string().min(1),
    itemId: z.string().min(1),
    fromLocationId: z.string().min(1),
    toLocationId: z.string().min(1),
    quantity: zfd.numeric(z.number().min(0.0001)),
    fromShelfId: zfd.text(z.string().optional()),
    toShelfId: zfd.text(z.string().optional()),
    notes: zfd.text(z.string().optional())
  })
]);

type WarehouseTransferLineFormProps = {
  initialValues: z.infer<typeof warehouseTransferLineFormValidator>;
  warehouseTransfer: WarehouseTransfer;
  onClose: () => void;
};

const WarehouseTransferLineForm = ({
  initialValues,
  warehouseTransfer,
  onClose
}: WarehouseTransferLineFormProps) => {
  const { t } = useTranslation(["inventory", "common"]);
  const permissions = usePermissions();
  const { transferId } = useParams();

  if (!transferId) {
    throw new Error("transferId is required");
  }

  const [itemId, setItemId] = useState<string>(
    initialValues.type === "update" ? initialValues.itemId : ""
  );

  const [items] = useItems();
  const [itemType, setItemType] = useState<MethodItemType>(
    // @ts-expect-error - Service
    items.find((item) => item.id === initialValues.itemId)?.type ?? "Item"
  );

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "inventory")
    : !permissions.can("create", "inventory");

  const action = initialValues.id
    ? path.to.warehouseTransferLine(transferId, initialValues.id)
    : path.to.newWarehouseTransferLine(transferId);

  const fetcher = useFetcher<{ success: boolean; message: string }>();

  useEffect(() => {
    if (fetcher.data?.success === false) {
      toast.error(fetcher.data.message);
    }
  }, [fetcher.data?.success, fetcher.data?.message]);

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          defaultValues={initialValues}
          validator={warehouseTransferLineFormValidator}
          method="post"
          action={action}
          className="flex flex-col h-full"
          fetcher={fetcher}
        >
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? t("inventory:editTransferLine") : t("inventory:newTransferLine")}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden name="transferId" />
            <Hidden name="fromLocationId" />
            <Hidden name="toLocationId" />
            <Hidden name="type" value={isEditing ? "update" : "create"} />

            <VStack spacing={4}>
              <Item
                name="itemId"
                label={t("inventory:item")}
                type={itemType}
                onTypeChange={(t) => setItemType(t as MethodItemType)}
                value={itemId}
                onChange={(value) => {
                  setItemId(value?.value as string);
                }}
              />
              <Number
                name="quantity"
                label={t("inventory:quantity")}
                minValue={0.0001}
                step={0.0001}
              />
              <Shelf
                name="fromShelfId"
                label={t("inventory:fromShelf")}
                itemId={itemId ?? undefined}
                locationId={warehouseTransfer.fromLocationId}
              />
              <Shelf
                name="toShelfId"
                label={t("inventory:toShelf")}
                itemId={itemId ?? undefined}
                locationId={warehouseTransfer.toLocationId}
              />
              <TextArea name="notes" label={t("inventory:notes")} rows={3} />
              <CustomFormFields table="warehouseTransferLine" />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit
                isDisabled={isDisabled || fetcher.state !== "idle"}
                isLoading={fetcher.state !== "idle"}
                withBlocker={false}
              >
                {t("common:save")}
              </Submit>
              <Button size="md" variant="solid" onClick={onClose}>
                {t("common:cancel")}
              </Button>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
};

export default WarehouseTransferLineForm;
