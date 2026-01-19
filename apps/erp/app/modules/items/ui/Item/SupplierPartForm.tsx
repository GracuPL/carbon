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
import type { z } from "zod/v3";
import {
  ConversionFactor,
  CustomFormFields,
  Hidden,
  Input,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Submit,
  Supplier,
  UnitOfMeasure
} from "~/components/Form";
import { usePermissions, useUser } from "~/hooks";
import { path } from "~/utils/path";
import { supplierPartValidator } from "../../items.models";

type SupplierPartFormProps = {
  initialValues: z.infer<typeof supplierPartValidator>;
  type: "Part" | "Service" | "Tool" | "Consumable" | "Material";
  unitOfMeasureCode: string;
  onClose: () => void;
};

const SupplierPartForm = ({
  initialValues,
  type,
  unitOfMeasureCode,
  onClose
}: SupplierPartFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const permissions = usePermissions();

  const { company } = useUser();
  const baseCurrency = company?.baseCurrencyCode ?? "USD";

  let { itemId } = useParams();

  if (!itemId) {
    itemId = initialValues.itemId;
  }

  const [purchaseUnitOfMeasure, setPurchaseUnitOfMeasure] = useState<
    string | undefined
  >(initialValues.supplierUnitOfMeasureCode);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "parts")
    : !permissions.can("create", "parts");

  const action = getAction(isEditing, type, itemId, initialValues.id);
  const fetcher = useFetcher<{ success: boolean; message: string }>();

  useEffect(() => {
    if (fetcher.data?.success) {
      onClose();
    } else if (fetcher.data?.message) {
      toast.error(fetcher.data.message);
    }
  }, [fetcher.data?.success, fetcher.data?.message, onClose]);

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
          validator={supplierPartValidator}
          method="post"
          action={action}
          className="flex flex-col h-full"
          fetcher={fetcher}
        >
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? t("items:editSupplierPart") : t("items:newSupplierPart")}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden name="itemId" />

            <VStack spacing={4}>
              <Supplier name="supplierId" label={t("items:supplier")} />
              <Input name="supplierPartId" label={t("items:supplierPartId")} />
              <Number
                name="unitPrice"
                label={t("items:unitPrice")}
                minValue={0}
                formatOptions={{
                  style: "currency",
                  currency: baseCurrency
                }}
              />
              <UnitOfMeasure
                name="supplierUnitOfMeasureCode"
                label={t("items:unitOfMeasure")}
                onChange={(value) => {
                  if (value) setPurchaseUnitOfMeasure(value.value);
                }}
              />
              <ConversionFactor
                name="conversionFactor"
                label={t("items:conversionFactor")}
                inventoryCode={unitOfMeasureCode ?? undefined}
                purchasingCode={purchaseUnitOfMeasure}
              />
              <Number
                name="minimumOrderQuantity"
                label={t("items:minimumOrderQuantity")}
                minValue={0}
              />
              <CustomFormFields table="partSupplier" />
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

export default SupplierPartForm;

function getAction(
  isEditing: boolean,
  type: "Part" | "Service" | "Tool" | "Consumable" | "Material",
  itemId: string,
  id?: string
) {
  if (type === "Part") {
    if (isEditing) {
      return path.to.partSupplier(itemId, id!);
    } else {
      return path.to.newPartSupplier(itemId);
    }
  }
  if (type === "Service") {
    if (isEditing) {
      return path.to.serviceSupplier(itemId, id!);
    } else {
      return path.to.newServiceSupplier(itemId);
    }
  }

  if (type === "Tool") {
    if (isEditing) {
      return path.to.toolSupplier(itemId, id!);
    } else {
      return path.to.newToolSupplier(itemId);
    }
  }

  if (type === "Consumable") {
    if (isEditing) {
      return path.to.consumableSupplier(itemId, id!);
    } else {
      return path.to.newConsumableSupplier(itemId);
    }
  }

  if (type === "Material") {
    if (isEditing) {
      return path.to.materialSupplier(itemId, id!);
    } else {
      return path.to.newMaterialSupplier(itemId);
    }
  }

  throw new Error("Invalid type");
}
