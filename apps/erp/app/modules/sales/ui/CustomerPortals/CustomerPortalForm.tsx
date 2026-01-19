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
import { Customer, CustomFormFields, Hidden, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { customerPortalValidator } from "../../sales.models";

type CustomerPortalFormProps = {
  initialValues: z.infer<typeof customerPortalValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const CustomerPortalForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: CustomerPortalFormProps) => {
  const { t } = useTranslation(["sales", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdCustomerPortal"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("failedToCreateCustomerPortal", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "sales")
    : !permissions.can("create", "sales");

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
            validator={customerPortalValidator}
            method="post"
            action={
              isEditing
                ? path.to.customerPortal(initialValues.id!)
                : path.to.newCustomerPortal
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("sales:editPortal") : t("sales:newCustomerPortal")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Customer name="customerId" label={t("sales:customer")} />
                <CustomFormFields table="externalLink" />
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

export default CustomerPortalForm;
