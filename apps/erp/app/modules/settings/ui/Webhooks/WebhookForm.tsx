// biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
import { Boolean, Input, Select, ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FormControl,
  FormLabel,
  HStack,
  Separator,
  toast,
  useMount,
  VStack
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { webhookValidator } from "../../settings.models";
import type { getWebhookTables } from "../../settings.service";

type WebhookFormProps = {
  initialValues: z.infer<typeof webhookValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: (data?: { id: string; name: string }) => void;
};

const WebhookForm = ({
  initialValues,
  open = true,
  onClose
}: WebhookFormProps) => {
  const { t } = useTranslation(["settings", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  const tables = useWebhookTables();

  useEffect(() => {
    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("settings:createdWebhook"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(
        t("settings:failedToCreateWebhook", { message: fetcher.data.error.message })
      );
    }
  }, [fetcher.data, fetcher.state, onClose, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "parts")
    : !permissions.can("create", "parts");

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
    >
      <DrawerContent size="sm">
        <ValidatedForm
          validator={webhookValidator}
          method="post"
          action={
            isEditing ? path.to.webhook(initialValues.id!) : path.to.newWebhook
          }
          defaultValues={initialValues}
          fetcher={fetcher}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("settings:editWebhook") : t("settings:newWebhook")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />

            <VStack spacing={4}>
              <Select name="table" label={t("settings:table")} options={tables} />
              <FormControl>
                <FormLabel>{t("settings:notifications")}</FormLabel>
                <VStack>
                  <Boolean
                    name="onInsert"
                    description={<Badge variant="green">{t("settings:insert")}</Badge>}
                  />
                  <Boolean
                    name="onUpdate"
                    description={<Badge variant="blue">{t("settings:update")}</Badge>}
                  />
                  <Boolean
                    name="onDelete"
                    description={<Badge variant="red">{t("settings:deleteEvent")}</Badge>}
                  />
                </VStack>
              </FormControl>

              <Separator />

              <Input
                name="name"
                label={t("settings:name")}
                helperText={t("settings:webhookNameHelper")}
              />

              <Input
                name="url"
                label={t("settings:webhookUrl")}
                helperText={t("settings:webhookUrlHelper")}
              />

              <Separator />

              <Boolean name="active" label={t("settings:active")} />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
              <Button size="md" variant="solid" onClick={() => onClose()}>
                {t("common:cancel")}
              </Button>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
};

export default WebhookForm;

export const useWebhookTables = () => {
  const tablesFetcher =
    useFetcher<Awaited<ReturnType<typeof getWebhookTables>>>();

  useMount(() => {
    tablesFetcher.load(path.to.api.webhookTables);
  });

  const tables = tablesFetcher.data?.data ?? [];

  const options = tables.map((t) => ({
    value: t.table,
    label: t.name
  }));

  return options;
};
