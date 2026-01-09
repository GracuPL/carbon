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
  FormControl,
  FormLabel,
  HStack,
  VStack
} from "@carbon/react";
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  CustomFormFields,
  Hidden,
  Input,
  Location,
  Submit,
  TimePicker
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { shiftValidator } from "../../people.models";

type ShiftFormProps = {
  initialValues: z.infer<typeof shiftValidator>;
};

const ShiftForm = ({ initialValues }: ShiftFormProps) => {
  const { t } = useTranslation(["users", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "people")
    : !permissions.can("create", "people");

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={shiftValidator}
          method="post"
          action={
            isEditing ? path.to.shift(initialValues.id!) : path.to.newShift
          }
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("users:editShift") : t("users:newShift")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <VStack spacing={4}>
              <Input name="name" label={t("users:shiftName")} />
              <Location name="locationId" label={t("users:location")} />
              <TimePicker name="startTime" label={t("users:startTime")} />
              <TimePicker name="endTime" label={t("users:endTime")} />

              <FormControl>
                <FormLabel>{t("users:days")}</FormLabel>
                <VStack>
                  <Boolean name="monday" description={t("users:monday")} />
                  <Boolean name="tuesday" description={t("users:tuesday")} />
                  <Boolean name="wednesday" description={t("users:wednesday")} />
                  <Boolean name="thursday" description={t("users:thursday")} />
                  <Boolean name="friday" description={t("users:friday")} />
                  <Boolean name="saturday" description={t("users:saturday")} />
                  <Boolean name="sunday" description={t("users:sunday")} />
                </VStack>
              </FormControl>
              <CustomFormFields table="shift" />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
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

export default ShiftForm;
