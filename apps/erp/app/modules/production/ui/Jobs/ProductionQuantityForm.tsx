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
  VStack
} from "@carbon/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
import {
  Employee,
  Hidden,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Select,
  Submit,
  TextArea
} from "~/components/Form";
import ScrapReason from "~/components/Form/ScrapReason";
import { usePermissions } from "~/hooks";
import { productionQuantityValidator } from "../../production.models";

type ProductionQuantityFormProps = {
  initialValues: z.infer<typeof productionQuantityValidator>;
};

const ProductionQuantityForm = ({
  initialValues
}: ProductionQuantityFormProps) => {
  const { t } = useTranslation(["production", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const [type, setType] = useState<"Production" | "Scrap" | "Rework">(
    initialValues.type
  );

  const isDisabled = !permissions.can("update", "production");
  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={productionQuantityValidator}
          method="post"
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{t("production:editProductionQuantity")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden name="jobOperationId" />
            <VStack spacing={4}>
              <Employee name="createdBy" label={t("production:employee")} />
              <Number name="quantity" label={t("production:quantity")} />
              <Select
                name="type"
                label={t("production:quantityType")}
                options={[
                  { label: t("production:productionType"), value: "Production" },
                  { label: t("production:scrap"), value: "Scrap" },
                  { label: t("production:rework"), value: "Rework" }
                ]}
                onChange={(value) =>
                  setType(value?.value as "Production" | "Scrap" | "Rework")
                }
              />
              {type === "Scrap" && (
                <ScrapReason name="scrapReasonId" label={t("production:scrapReason")} />
              )}
              <TextArea name="notes" label={t("production:notes")} />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
              <Button variant="solid" onClick={onClose}>
                {t("common:cancel")}
              </Button>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductionQuantityForm;
