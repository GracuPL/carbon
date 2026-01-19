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
import {
  CustomFormFields,
  Hidden,
  Input,
  InputControlled,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { unitOfMeasureValidator } from "../../items.models";

type UnitOfMeasureFormProps = {
  initialValues: z.infer<typeof unitOfMeasureValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: (data?: { id: string; name: string }) => void;
};

const UnitOfMeasureForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: UnitOfMeasureFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();
  const [code, setCode] = useState<string>(initialValues.code);

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdUnitOfMeasure"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("failedToCreateUnitOfMeasure", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "parts")
    : !permissions.can("create", "parts");

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
            validator={unitOfMeasureValidator}
            method="post"
            action={isEditing ? path.to.uom(initialValues.id!) : path.to.newUom}
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("items:editUnitOfMeasure") : t("items:newUnitOfMeasure")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Input name="name" label={t("items:unitOfMeasure")} />
                <InputControlled
                  name="code"
                  label={t("common:code")}
                  value={code}
                  onChange={(value) =>
                    setCode(value.toUpperCase().replace(/\s/g, ""))
                  }
                  helperText={t("items:codeHelperText")}
                />
                <CustomFormFields table="unitOfMeasure" />
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

export default UnitOfMeasureForm;
