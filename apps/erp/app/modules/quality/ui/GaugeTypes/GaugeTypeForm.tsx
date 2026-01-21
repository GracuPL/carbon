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
import { CustomFormFields, Hidden, Input, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { gaugeTypeValidator } from "../../quality.models";

type GaugeTypeFormProps = {
  initialValues: z.infer<typeof gaugeTypeValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const GaugeTypeForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: GaugeTypeFormProps) => {
  const { t } = useTranslation(["quality", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("quality:createdGaugeType"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(t("quality:failedToCreateGaugeType", { message: fetcher.data.error.message }));
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "quality")
    : !permissions.can("create", "quality");

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
            validator={gaugeTypeValidator}
            method="post"
            action={
              isEditing
                ? path.to.gaugeType(initialValues.id!)
                : path.to.newGaugeType
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("quality:editGaugeType") : t("quality:newGaugeType")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Input name="name" label={t("quality:gaugeType")} />
                <CustomFormFields table="gaugeType" />
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

export default GaugeTypeForm;
