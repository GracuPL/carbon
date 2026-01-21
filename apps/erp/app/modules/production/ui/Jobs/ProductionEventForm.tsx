import { TextArea, ValidatedForm } from "@carbon/form";
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
import type { CalendarDateTime } from "@internationalized/date";
import {
  getLocalTimeZone,
  parseAbsolute,
  toCalendarDateTime
} from "@internationalized/date";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
import {
  DateTimePicker,
  Employee,
  Hidden,
  Select,
  Submit,
  WorkCenter
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { productionEventValidator } from "../../production.models";

type ProductionEventFormProps = {
  initialValues: z.infer<typeof productionEventValidator>;
  operationOptions: {
    label: string;
    value: string;
    helperText?: string;
  }[];
};

const ProductionEventForm = ({
  initialValues,
  operationOptions
}: ProductionEventFormProps) => {
  const { t } = useTranslation(["production", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const [startTime, setStartTime] = useState(
    toCalendarDateTime(
      parseAbsolute(initialValues.startTime, getLocalTimeZone())
    )
  );
  const [endTime, setEndTime] = useState<CalendarDateTime | undefined>(
    initialValues.endTime
      ? toCalendarDateTime(
          parseAbsolute(initialValues.endTime, getLocalTimeZone())
        )
      : undefined
  );
  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "production")
    : !permissions.can("create", "production");
  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={productionEventValidator}
          method="post"
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? t("production:editProductionEvent") : t("production:newProductionEvent")}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />

            <VStack spacing={4}>
              <Select
                name="jobOperationId"
                label={t("production:operation")}
                options={operationOptions ?? []}
              />
              <Employee name="employeeId" label={t("production:employee")} />
              <WorkCenter
                name="workCenterId"
                label={t("production:workCenter")}
                processId={initialValues.jobOperationId}
              />
              <Select
                name="type"
                label={t("production:eventType")}
                options={[
                  { label: t("production:labor"), value: "Labor" },
                  { label: t("production:machine"), value: "Machine" },
                  { label: t("production:setup"), value: "Setup" }
                ]}
              />
              <DateTimePicker
                name="startTime"
                label={t("production:startTime")}
                maxValue={endTime}
                onChange={setStartTime}
              />
              <DateTimePicker
                name="endTime"
                label={t("production:endTime")}
                minValue={startTime}
                onChange={setEndTime}
              />
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

export default ProductionEventForm;
