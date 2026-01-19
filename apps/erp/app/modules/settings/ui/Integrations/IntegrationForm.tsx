import { integrations as availableIntegrations } from "@carbon/ee";
import { useTranslation } from "@carbon/locale";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Array,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  Input,
  Select,
  Submit,
  ValidatedForm
} from "@carbon/form";
import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Heading,
  HStack,
  ScrollArea,
  toast,
  VStack
} from "@carbon/react";
import { SUPPORT_EMAIL } from "@carbon/utils";
import { useParams } from "react-router";
import { Processes } from "~/components/Form";
import { MethodIcon, TrackingTypeIcon } from "~/components/Icons";
import { usePermissions, useUser } from "~/hooks";
import { path } from "~/utils/path";

interface IntegrationFormProps {
  metadata: Record<string, unknown>;
  installed: boolean;
  onClose: () => void;
}

export function IntegrationForm({
  installed,
  metadata,
  onClose
}: IntegrationFormProps) {
  const { t } = useTranslation(["settings", "common"]);
  const permissions = usePermissions();
  const isDisabled = !permissions.can("update", "settings");
  const {
    company: { id: companyId }
  } = useUser();

  const { id: integrationId } = useParams();
  if (!integrationId) {
    throw new Error("Integration ID is required");
  }

  const integration = availableIntegrations.find((i) => i.id === integrationId);

  if (!integration) {
    toast.error(t("settings:integrationNotFound"));
    return null;
  }

  const initialValues = integration.settings.reduce((acc, setting) => {
    return {
      ...acc,
      [setting.name]: metadata[setting.name]
    };
  }, {});

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={integration.schema}
          method="post"
          action={path.to.integration(integration.id)}
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <VStack spacing={2}>
              <integration.logo className="h-10 w-auto" />
              <div>
                <div className="flex items-center space-x-2">
                  <Heading size="h3">{integration.name}</Heading>

                  {installed && <Badge variant="green">{t("settings:installed")}</Badge>}
                </div>

                <span className="text-xs text-[#878787] text-right">
                  <Badge variant="secondary">{integration.category}</Badge> •
                  {t("settings:publishedByCarbon")}
                </span>
              </div>
            </VStack>
          </DrawerHeader>
          <DrawerBody>
            <ScrollArea className="h-[calc(100dvh-240px)] -mx-2 pb-8">
              <VStack spacing={4} className="px-2">
                <Heading size="h3">{t("settings:howItWorks")}</Heading>
                <div className="text-sm text-muted-foreground">
                  {integration.description}
                </div>

                {integration.setupInstructions && (
                  <>
                    <Heading size="h3">{t("settings:setupInstructions")}</Heading>
                    <integration.setupInstructions companyId={companyId} />
                  </>
                )}

                {integration.settings.map((setting) => {
                  switch (setting.type) {
                    case "text":
                      return (
                        <Input
                          key={setting.name}
                          name={setting.name}
                          label={setting.label}
                          isOptional={!setting.required}
                        />
                      );
                    case "switch":
                      return (
                        <Boolean
                          key={setting.name}
                          name={setting.name}
                          label={setting.label}
                          description={setting.label}
                        />
                      );
                    case "processes":
                      return (
                        <Processes
                          key={setting.name}
                          name={setting.name}
                          label={setting.label}
                        />
                      );
                    case "array":
                      return (
                        <Array
                          key={setting.name}
                          name={setting.name}
                          label={setting.label}
                        />
                      );
                    case "options":
                      return (
                        <Select
                          key={setting.name}
                          name={setting.name}
                          label={setting.label}
                          options={
                            setting.listOptions?.map((option) => {
                              let icon: JSX.Element | null = null;
                              if (setting.name === "methodType") {
                                // @ts-ignore
                                icon = <MethodIcon type={option} />;
                              } else if (setting.name === "trackingType") {
                                // @ts-ignore
                                icon = <TrackingTypeIcon type={option} />;
                              }

                              return {
                                label: (
                                  <Badge
                                    variant="secondary"
                                    className="flex items-center gap-2"
                                  >
                                    {icon ? icon : null} {option}
                                  </Badge>
                                ),
                                value: option
                              };
                            }) ?? []
                          }
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </VStack>
            </ScrollArea>
            <p className="text-sm text-muted-foreground">
              {t("settings:integrationDisclaimer")}
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm text-red-500"
            >
              {t("settings:reportIntegration")}
            </a>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              {integration.settings.length > 0 ? (
                installed ? (
                  <Submit isDisabled={isDisabled}>{t("common:update")}</Submit>
                ) : (
                  <Submit isDisabled={isDisabled}>{t("settings:install")}</Submit>
                )
              ) : null}

              <Button variant="solid" onClick={onClose}>
                {t("common:close")}
              </Button>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
}
