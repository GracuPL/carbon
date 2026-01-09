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
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  CustomerLocation,
  CustomFormFields,
  Hidden,
  Input,
  PhoneInput,
  Submit,
  TextArea
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { useAsyncFetcher } from "~/hooks/useAsyncFetcher";
import { path } from "~/utils/path";
import { customerContactValidator } from "../../sales.models";

type CustomerContactFormProps = {
  customerId: string;
  initialValues: z.infer<typeof customerContactValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const CustomerContactForm = ({
  customerId,
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: CustomerContactFormProps) => {
  const { t } = useTranslation(["sales", "common"]);
  const fetcher = useAsyncFetcher<{ success?: boolean; message: string }>({
    onStateChange(state) {
      if (state === "idle" && fetcher.data && !fetcher.data.success) {
        toast.error(fetcher.data.message);
      }
    }
  });

  const permissions = usePermissions();
  const isEditing = !!initialValues?.id;
  const isDisabled = isEditing
    ? !permissions.can("update", "sales")
    : !permissions.can("create", "sales");

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={customerContactValidator}
          method="post"
          action={
            isEditing
              ? path.to.customerContact(customerId, initialValues.id!)
              : path.to.newCustomerContact(customerId)
          }
          defaultValues={initialValues}
          // @ts-expect-error TODO: ValidatedForm types doesn't yet support useAsyncFetcher - @sidwebworks
          fetcher={fetcher}
          className="flex flex-col h-full"
          onAfterSubmit={() => {
            if (type === "modal") {
              onClose?.();
            }
          }}
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("sales:editContact") : t("sales:newContact")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden name="type" value={type} />
            <Hidden name="contactId" />
            <VStack spacing={4}>
              <Input name="email" label={t("sales:email")} />
              <Input name="firstName" label={t("sales:firstName")} />
              <Input name="lastName" label={t("sales:lastName")} />
              <Input name="title" label={t("sales:title")} />
              <PhoneInput name="mobilePhone" label={t("sales:mobilePhone")} />
              <PhoneInput name="homePhone" label={t("sales:homePhone")} />
              <PhoneInput name="workPhone" label={t("sales:workPhone")} />
              <PhoneInput name="fax" label={t("sales:fax")} />
              <CustomerLocation
                name="customerLocationId"
                label={t("sales:location")}
                customer={customerId}
              />
              <TextArea name="notes" label={t("sales:notes")} />
              <CustomFormFields table="customerContact" />
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

export default CustomerContactForm;
