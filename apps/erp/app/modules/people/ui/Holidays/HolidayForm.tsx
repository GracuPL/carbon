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
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  DatePicker,
  Hidden,
  Input,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { holidayValidator } from "../../people.models";

type HolidayFormProps = {
  initialValues: z.infer<typeof holidayValidator>;
};

const HolidayForm = ({ initialValues }: HolidayFormProps) => {
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
          validator={holidayValidator}
          method="post"
          action={
            isEditing ? path.to.holiday(initialValues.id!) : path.to.newHoliday
          }
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("users:editHoliday") : t("users:newHoliday")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <VStack spacing={4}>
              <Input name="name" label={t("users:holidayName")} />
              <DatePicker name="date" label={t("users:date")} />
              <CustomFormFields table="holiday" />
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

export default HolidayForm;
