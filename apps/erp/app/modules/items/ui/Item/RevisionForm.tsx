import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  HStack,
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerDescription,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerProvider,
  ModalDrawerTitle,
  toast,
  VStack
} from "@carbon/react";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Input, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { revisionValidator } from "../../items.models";

type RevisionFormProps = {
  initialValues: z.infer<typeof revisionValidator>;
  hasSizesInsteadOfRevisions?: boolean;
  open?: boolean;
  onClose: (data?: { id: string; name: string }) => void;
};

const RevisionForm = ({
  initialValues,
  hasSizesInsteadOfRevisions = false,
  open = true,
  onClose
}: RevisionFormProps) => {
  const { t } = useTranslation(["items", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<
    { success: false; message: string } | { success: true; link: string }
  >();
  const navigate = useNavigate();

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "parts")
    : !permissions.can("create", "parts");

  // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
  useEffect(() => {
    if (fetcher.data?.success) {
      onClose();
      navigate(fetcher.data.link);
    }
    if (fetcher.data?.success === false) {
      toast.error(fetcher.data.message);
    }
  }, [fetcher.data]);

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
            validator={revisionValidator}
            method="post"
            action={
              isEditing
                ? path.to.revision(initialValues.id!)
                : path.to.newRevision
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing
                  ? (hasSizesInsteadOfRevisions ? t("items:editSize") : t("items:editRevision"))
                  : (hasSizesInsteadOfRevisions ? t("items:newSize") : t("items:newRevision"))}
              </ModalDrawerTitle>
              {!isEditing && (
                <ModalDrawerDescription>
                  {hasSizesInsteadOfRevisions
                    ? t("items:newSizeDescription")
                    : t("items:newRevisionDescription")}
                </ModalDrawerDescription>
              )}
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" />
              <Hidden name="copyFromId" />

              <VStack spacing={4}>
                <Input
                  name="revision"
                  label={hasSizesInsteadOfRevisions ? t("items:size") : t("items:revision")}
                  helperText={
                    hasSizesInsteadOfRevisions
                      ? t("items:sizeHelperText")
                      : t("items:revisionHelperText")
                  }
                />
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

export default RevisionForm;
