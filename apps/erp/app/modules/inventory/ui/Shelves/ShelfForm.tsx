import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Button,
  HStack,
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerProvider,
  ModalDrawerTitle,
  VStack
} from "@carbon/react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Input, Location, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { shelfValidator } from "~/modules/inventory";
import { path } from "~/utils/path";

type ShelfFormProps = {
  locationId: string;
  initialValues: z.infer<typeof shelfValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const ShelfForm = ({
  locationId,
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: ShelfFormProps) => {
  const { t } = useTranslation(["inventory", "common"]);
  const fetcher = useFetcher<{}>();

  const permissions = usePermissions();
  const isEditing = !!initialValues?.id;
  const isDisabled = isEditing
    ? !permissions.can("update", "sales")
    : !permissions.can("create", "sales");

  return (
    <ModalDrawerProvider type={type}>
      <ModalDrawer
        open={open}
        onOpenChange={(open) => {
          if (!open) onClose?.();
        }}
      >
        <ModalDrawerContent>
          <ValidatedForm
            validator={shelfValidator}
            method="post"
            action={
              isEditing ? path.to.shelf(initialValues.id!) : path.to.newShelf
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            onSubmit={() => {
              if (type === "modal") {
                onClose?.();
              }
            }}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("inventory:editShelf") : t("inventory:newShelf")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />

              <VStack spacing={4}>
                <Input name="name" label={t("inventory:name")} />
                <Location
                  isReadOnly={isEditing}
                  name="locationId"
                  label={t("inventory:location")}
                />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={onClose}>
                  {t("common:cancel")}
                </Button>
              </HStack>
            </ModalDrawerFooter>
          </ValidatedForm>
        </ModalDrawerContent>
      </ModalDrawer>
    </ModalDrawerProvider>
  );
};

export default ShelfForm;
