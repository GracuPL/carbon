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
import AddressAutocomplete from "~/components/Form/AddressAutocomplete";
import { usePermissions } from "~/hooks";
import { supplierLocationValidator } from "~/modules/purchasing";
import { path } from "~/utils/path";

type SupplierLocationFormProps = {
  supplierId: string;
  initialValues: z.infer<typeof supplierLocationValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const SupplierLocationForm = ({
  supplierId,
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: SupplierLocationFormProps) => {
  const { t } = useTranslation(["purchasing", "common"]);
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("purchasing:createdSupplierLocation"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("purchasing:failedToCreateSupplierLocation", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const permissions = usePermissions();
  const isEditing = !!initialValues?.id;
  const isDisabled = isEditing
    ? !permissions.can("update", "purchasing")
    : !permissions.can("create", "purchasing");

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
            validator={supplierLocationValidator}
            method="post"
            action={
              isEditing
                ? path.to.supplierLocation(supplierId, initialValues.id!)
                : path.to.newSupplierLocation(supplierId)
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("purchasing:editLocation") : t("purchasing:newLocation")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <Hidden name="addressId" />
              <VStack spacing={4}>
                <Input name="name" label={t("purchasing:name")} />
                <AddressAutocomplete />
                <CustomFormFields table="supplierLocation" />
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

export default SupplierLocationForm;
