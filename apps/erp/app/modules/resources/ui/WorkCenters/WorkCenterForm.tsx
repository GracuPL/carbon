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
  toast,
  VStack
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  // Ability,
  CustomFormFields,
  Hidden,
  Input,
  Location,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Processes,
  StandardFactor,
  Submit,
  TextArea
} from "~/components/Form";
import { usePermissions, useUser } from "~/hooks";
import { workCenterValidator } from "~/modules/resources";
import { path } from "~/utils/path";

type WorkCenterFormProps = {
  initialValues: z.infer<typeof workCenterValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  showProcesses?: boolean;
  onClose: () => void;
};

const WorkCenterForm = ({
  initialValues,
  open = true,
  type = "drawer",
  showProcesses = true,
  onClose
}: WorkCenterFormProps) => {
  const { t } = useTranslation(["resources", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  const { company } = useUser();
  const baseCurrency = company?.baseCurrencyCode ?? "USD";

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdWorkCenter"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("failedToCreateProcess", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "resources")
    : !permissions.can("create", "resources");

  return (
    <ModalDrawerProvider type={type}>
      <ModalDrawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose?.();
        }}
      >
        <ModalDrawerContent>
          <ValidatedForm
            validator={workCenterValidator}
            method="post"
            action={
              isEditing
                ? path.to.workCenter(initialValues.id!)
                : path.to.newWorkCenter
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("resources:editWorkCenter") : t("resources:newWorkCenter")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Input name="name" label={t("common:name")} />
                {showProcesses && (
                  <Processes name="processes" label={t("resources:processes")} />
                )}
                <TextArea name="description" label={t("common:description")} />
                <Location name="locationId" label={t("common:location")} />

                <Number
                  name="laborRate"
                  label={t("resources:laborRateHourly")}
                  formatOptions={{
                    style: "currency",
                    currency: baseCurrency
                  }}
                />
                <Number
                  name="machineRate"
                  label={t("resources:machineRateHourly")}
                  formatOptions={{
                    style: "currency",
                    currency: baseCurrency
                  }}
                />
                <Number
                  name="overheadRate"
                  label={t("resources:overheadRateHourly")}
                  formatOptions={{
                    style: "currency",
                    currency: baseCurrency
                  }}
                />

                <StandardFactor
                  name="defaultStandardFactor"
                  label={t("resources:defaultUnit")}
                  value={initialValues.defaultStandardFactor}
                />
                {/* <Ability
                  name="requiredAbilityId"
                  label="Required Ability"
                  isClearable
                /> */}
                <CustomFormFields table="workCenter" />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={() => onClose?.()}>
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

export default WorkCenterForm;
