import { ValidatedForm } from "@carbon/form";
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
import { useEffect, useState } from "react";
import { useTranslation } from "@carbon/locale";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Input, InputControlled, Submit } from "~/components/Form";
import Shape from "~/components/Form/Shape";
import Substance from "~/components/Form/Substance";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { materialTypeValidator } from "../../items.models";

type MaterialTypeFormProps = {
  initialValues: z.infer<typeof materialTypeValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: (data?: { id: string; name: string }) => void;
};

const MaterialTypeForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: MaterialTypeFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string; name: string }>>();
  const [code, setCode] = useState<string>(initialValues.code);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "parts")
    : !permissions.can("create", "parts");

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdMaterialType"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("failedToCreateMaterialType", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type]);

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
            validator={materialTypeValidator}
            method="post"
            action={
              isEditing
                ? path.to.materialType(initialValues.id!)
                : path.to.newMaterialType
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("items:editMaterialType") : t("items:newMaterialType")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Substance name="materialSubstanceId" label={t("items:substance")} />
                <Shape name="materialFormId" label={t("items:shape")} />
                <Input name="name" label={t("common:name")} />
                <InputControlled
                  name="code"
                  label={t("common:code")}
                  value={code}
                  onChange={(value) =>
                    setCode(value.toUpperCase().replace(/\s/g, ""))
                  }
                  helperText={t("items:codeHelperText")}
                />
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

export default MaterialTypeForm;
