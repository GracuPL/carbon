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
  toast,
  VStack
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  Hidden,
  Input,
  PhoneInput,
  Submit,
  SupplierLocation,
  TextArea
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { supplierContactValidator } from "~/modules/purchasing";
import { path } from "~/utils/path";

type SupplierContactFormProps = {
  supplierId: string;
  initialValues: z.infer<typeof supplierContactValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const SupplierContactForm = ({
  supplierId,
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: SupplierContactFormProps) => {
  const { t } = useTranslation(["purchasing", "common"]);
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("purchasing:createdSupplierContact"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("purchasing:failedToCreateSupplierContact", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const permissions = usePermissions();
  const isEditing = !!initialValues?.id;
  const isDisabled = isEditing
    ? !permissions.can("update", "purchasing")
    : !permissions.can("create", "purchasing");

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={supplierContactValidator}
          method="post"
          action={
            isEditing
              ? path.to.supplierContact(supplierId, initialValues.id!)
              : path.to.newSupplierContact(supplierId)
          }
          defaultValues={initialValues}
          fetcher={fetcher}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("purchasing:editContact") : t("purchasing:newContact")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden name="type" value={type} />
            <Hidden name="contactId" />
            <VStack spacing={4}>
              <Input name="email" label={t("purchasing:email")} />
              <Input name="firstName" label={t("purchasing:firstName")} />
              <Input name="lastName" label={t("purchasing:lastName")} />
              <Input name="title" label={t("purchasing:title")} />
              <PhoneInput name="mobilePhone" label={t("purchasing:mobilePhone")} />
              <PhoneInput name="homePhone" label={t("purchasing:homePhone")} />
              <PhoneInput name="workPhone" label={t("purchasing:workPhone")} />
              <PhoneInput name="fax" label={t("purchasing:fax")} />
              <SupplierLocation
                name="supplierLocationId"
                label={t("purchasing:location")}
                supplier={supplierId}
              />
              <TextArea name="notes" label={t("purchasing:notes")} />
              <CustomFormFields table="supplierContact" />
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

export default SupplierContactForm;
