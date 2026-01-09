import {
  Boolean,
  Number,
  Select,
  useControlField,
  ValidatedForm
} from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerProvider,
  ModalDrawerTitle,
  toast,
  VStack
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect } from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import { HighPriorityIcon } from "~/assets/icons/HighPriorityIcon";
import { LowPriorityIcon } from "~/assets/icons/LowPriorityIcon";
import { MediumPriorityIcon } from "~/assets/icons/MediumPriorityIcon";
import { Enumerable } from "~/components/Enumerable";
import { Hidden, Input, Submit, WorkCenter } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import {
  maintenanceDispatchPriority,
  maintenanceFrequency,
  maintenanceScheduleValidator
} from "../../resources.models";

function getPriorityIcon(
  priority: (typeof maintenanceDispatchPriority)[number]
) {
  switch (priority) {
    case "Critical":
      return <BsExclamationSquareFill className="text-red-500" />;
    case "High":
      return <HighPriorityIcon />;
    case "Medium":
      return <MediumPriorityIcon />;
    case "Low":
      return <LowPriorityIcon />;
  }
}

// Component to show day selector and skip holidays when Daily frequency is selected
function DailyScheduleOptions() {
  const { t } = useTranslation("resources");
  const [frequency] = useControlField<string>("frequency");
  const isDaily = frequency === "Daily";

  if (!isDaily) return null;

  return (
    <>
      <FormControl>
        <FormLabel>{t("days")}</FormLabel>
        <VStack>
          <Boolean name="monday" description={t("monday")} />
          <Boolean name="tuesday" description={t("tuesday")} />
          <Boolean name="wednesday" description={t("wednesday")} />
          <Boolean name="thursday" description={t("thursday")} />
          <Boolean name="friday" description={t("friday")} />
          <Boolean name="saturday" description={t("saturday")} />
          <Boolean name="sunday" description={t("sunday")} />
        </VStack>
      </FormControl>
      <Boolean
        name="skipHolidays"
        label={t("skipHolidays")}
        description={t("skipHolidaysDescription")}
      />
    </>
  );
}

type MaintenanceScheduleFormProps = {
  initialValues: z.infer<typeof maintenanceScheduleValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const MaintenanceScheduleForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: MaintenanceScheduleFormProps) => {
  const { t } = useTranslation(["resources", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdMaintenanceSchedule"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("failedToCreateProcess", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "production")
    : !permissions.can("create", "production");

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
            validator={maintenanceScheduleValidator}
            method="post"
            action={
              isEditing
                ? path.to.maintenanceSchedule(initialValues.id!)
                : path.to.newMaintenanceSchedule
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("resources:editScheduledMaintenance") : t("resources:newScheduledMaintenance")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Input name="name" label={t("resources:scheduleName")} />
                <WorkCenter name="workCenterId" label={t("resources:workCenter")} />
                <Select
                  name="frequency"
                  label={t("resources:frequency")}
                  options={maintenanceFrequency.map((freq) => ({
                    value: freq,
                    label: <Enumerable value={freq} />
                  }))}
                />
                <Select
                  name="priority"
                  label={t("resources:priority")}
                  options={maintenanceDispatchPriority.map((priority) => ({
                    value: priority,
                    label: (
                      <div className="flex gap-1 items-center">
                        {getPriorityIcon(priority)}
                        <span>{priority}</span>
                      </div>
                    )
                  }))}
                />
                <Number
                  name="estimatedDuration"
                  label={t("resources:estimatedDurationMinutes")}
                  minValue={0}
                />
                <Boolean name="active" label={t("resources:active")} />
                <DailyScheduleOptions />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={() => onClose()}>
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

export default MaintenanceScheduleForm;
