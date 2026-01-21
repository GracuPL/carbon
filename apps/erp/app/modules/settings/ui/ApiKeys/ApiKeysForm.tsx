import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Alert,
  AlertTitle,
  Button,
  HStack,
  IconButton,
  Input as InputBase,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  VStack
} from "@carbon/react";
import { useEffect, useState } from "react";
import { LuCheck, LuClipboard, LuLock } from "react-icons/lu";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import { Hidden, Input, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { apiKeyValidator } from "~/modules/settings";
import { path } from "~/utils/path";
import { copyToClipboard } from "~/utils/string";

type ApiKeyFormProps = {
  initialValues: z.infer<typeof apiKeyValidator>;
  onClose: () => void;
};

const ApiKeyForm = ({ initialValues, onClose }: ApiKeyFormProps) => {
  const { t } = useTranslation(["settings", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<{ key: string }>();

  const isEditing = initialValues.id !== undefined;
  const isDisabled = !permissions.can("update", "users");

  const [key, setKey] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
  useEffect(() => {
    if (fetcher.data?.key) {
      setKey(fetcher.data.key);
    }
  }, [fetcher.data, fetcher.state, onClose]);

  return (
    <>
      <Modal
        open
        onOpenChange={(open) => {
          if (!open) onClose?.();
        }}
      >
        <ModalContent>
          <ValidatedForm
            validator={apiKeyValidator}
            method="post"
            action={
              isEditing ? path.to.apiKey(initialValues.id!) : path.to.newApiKey
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalHeader>
              <ModalTitle>{isEditing ? t("settings:editApiKey") : t("settings:newApiKey")}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Hidden name="id" />
              <VStack spacing={4}>
                <Input name="name" label={t("common:name")} />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={() => onClose()}>
                  {t("common:cancel")}
                </Button>
              </HStack>
            </ModalFooter>
          </ValidatedForm>
        </ModalContent>
      </Modal>
      {key && <ApiKeyView apiKey={key} onClose={onClose} />}
    </>
  );
};

export default ApiKeyForm;

type ApiKeyViewProps = {
  apiKey: string;
  onClose: () => void;
};

function ApiKeyView({ apiKey, onClose }: ApiKeyViewProps) {
  const { t } = useTranslation(["settings", "common"]);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Modal
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t("settings:apiKey")}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Alert variant="warning">
              <LuLock className="w-4 h-4" />
              <AlertTitle>
                {t("settings:apiKeyWarning")}
              </AlertTitle>
            </Alert>
            <InputGroup>
              <InputBase value={apiKey} />
              <InputRightElement className="w-[2.75rem]">
                <IconButton
                  aria-label={t("common:copy")}
                  icon={copied ? <LuCheck /> : <LuClipboard />}
                  variant="ghost"
                  onClick={() => {
                    copyToClipboard(apiKey, () => {
                      setCopied(true);
                    });
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              size="md"
              variant="solid"
              onClick={() => {
                onClose();
              }}
            >
              {t("common:close")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
