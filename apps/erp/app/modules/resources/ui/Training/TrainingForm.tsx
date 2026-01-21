import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
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
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Input, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { trainingValidator } from "~/modules/resources";
import { path } from "~/utils/path";

type TrainingFormProps = {
  initialValues: z.infer<typeof trainingValidator>;
  open?: boolean;
  onClose: (data?: { id: string; name: string }) => void;
};

const TrainingForm = ({
  initialValues,
  open = true,
  onClose
}: TrainingFormProps) => {
  const { t } = useTranslation(["resources", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "resources")
    : !permissions.can("create", "resources");

  return (
    <ModalDrawerProvider type="modal">
      <ModalDrawer
        open={open}
        onOpenChange={(open) => {
          if (!open) onClose?.();
        }}
      >
        <ModalDrawerContent>
          <ValidatedForm
            validator={trainingValidator}
            method="post"
            action={
              isEditing
                ? path.to.training(initialValues.id!)
                : path.to.newTraining
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("resources:editTraining") : t("resources:newTraining")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <VStack spacing={4}>
                <Input name="name" label={t("resources:name")} />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                <Submit
                  isLoading={fetcher.state !== "idle"}
                  isDisabled={fetcher.state !== "idle" || isDisabled}
                >
                  {t("common:save")}
                </Submit>
              </HStack>
            </ModalDrawerFooter>
          </ValidatedForm>
        </ModalDrawerContent>
      </ModalDrawer>
    </ModalDrawerProvider>
  );
};

export default TrainingForm;
