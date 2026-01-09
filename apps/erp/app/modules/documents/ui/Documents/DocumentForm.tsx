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
  VStack
} from "@carbon/react";
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Input, Submit, TextArea, Users } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { documentValidator } from "~/modules/documents";
import { path } from "~/utils/path";

type DocumentFormProps = {
  initialValues: z.infer<typeof documentValidator>;
  ownerId: string;
};

const DocumentForm = ({ initialValues, ownerId }: DocumentFormProps) => {
  const { t } = useTranslation(["documents", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const isDisabled = !permissions.can("update", "documents");

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={documentValidator}
          method="post"
          action={path.to.document(initialValues.id)}
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{`${initialValues.name}.${initialValues.extension}`}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden name="extension" />
            <Hidden name="type" />
            <Hidden name="size" />
            <VStack spacing={4}>
              <Input
                name="name"
                label={t("documents:name")}
                suffix={`.${initialValues.extension}`}
              />
              <TextArea name="description" label={t("documents:description")} />
              <Users
                alwaysSelected={[ownerId]}
                name="readGroups"
                label={t("documents:viewPermissions")}
              />
              <Users
                alwaysSelected={[ownerId]}
                name="writeGroups"
                label={t("documents:editPermissions")}
              />
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

export default DocumentForm;
