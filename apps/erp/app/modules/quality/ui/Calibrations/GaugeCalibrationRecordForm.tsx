import { useCarbon } from "@carbon/auth";
import type { Database } from "@carbon/database";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  DatePicker,
  Input,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  ValidatedForm
} from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import type { JSONContent } from "@carbon/react";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Combobox,
  HStack,
  Label,
  Loading,
  Modal,
  ModalBody,
  ModalContent,
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerProvider,
  ModalDrawerTitle,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Table,
  Tbody,
  Td,
  Tr,
  toast,
  useDisclosure,
  VStack
} from "@carbon/react";
import { Editor } from "@carbon/react/Editor";
import type { FileObject } from "@supabase/storage-js";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { LuDraftingCompass, LuHash, LuShapes, LuShield } from "react-icons/lu";
import { useFetcher, useLocation } from "react-router";
import type { z } from "zod/v3";
import { Documents } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import {
  CustomFormFields,
  Employee,
  Hidden,
  Submit,
  Supplier
} from "~/components/Form";
import { useGauges } from "~/components/Form/Gauge";
import { usePermissions, useRouteData, useUser } from "~/hooks";
import { getPrivateUrl, path } from "~/utils/path";
import { gaugeCalibrationRecordValidator } from "../../quality.models";
import type { Gauge } from "../../types";
import { GaugeRole } from "../Gauge/GaugeStatus";

type GaugeCalibrationRecordFormProps = {
  initialValues: z.infer<typeof gaugeCalibrationRecordValidator>;
  type?: "modal" | "drawer";
  files: FileObject[];
  open?: boolean;
  onClose?: () => void;
};

const GaugeCalibrationRecordForm = ({
  initialValues,
  open = true,
  files,
  type = "drawer",
  onClose
}: GaugeCalibrationRecordFormProps) => {
  const { t } = useTranslation(["quality", "common"]);
  const permissions = usePermissions();
  const {
    company: { id: companyId }
  } = useUser();
  const fetcher = useFetcher<{}>();
  const location = useLocation();
  const isEditing = !location.pathname.includes("new");
  const isDisabled = isEditing
    ? !permissions.can("update", "quality")
    : !permissions.can("create", "quality");

  const routeData = useRouteData<{
    companySettings: Database["public"]["Tables"]["companySettings"]["Row"];
  }>(path.to.authenticatedRoot);
  const isMetric = routeData?.companySettings?.useMetric ?? false;

  const [selectedGauge, setSelectedGauge] = useState<Gauge | null>(null);
  const gaugeSelectionModal = useDisclosure({
    defaultIsOpen: !initialValues.gaugeId
  });
  const [loading, setLoading] = useState(false);

  const { carbon } = useCarbon();
  const { options: gaugeOptions, gaugeTypes } = useGauges();

  // biome-ignore lint/correctness/useExhaustiveDependencies: suppressed due to migration
  useEffect(() => {
    if (initialValues.gaugeId) {
      onGaugeSelected(initialValues.gaugeId);
    }
  }, [initialValues.gaugeId]);

  const onGaugeSelected = async (gaugeId: string) => {
    flushSync(() => {
      setLoading(true);
    });
    const result = await carbon
      ?.from("gauges")
      .select("*")
      .eq("id", gaugeId)
      .single();
    if (!result?.data) {
      toast.error(t("gaugeNotFound"));
      setSelectedGauge(null);
      setLoading(false);
      return;
    }
    setSelectedGauge(result.data);
    setLoading(false);
  };

  const [notes, setNotes] = useState<JSONContent>(
    (JSON.parse(initialValues?.notes ?? {}) as JSONContent) ?? {}
  );
  const [numAttempts, setNumAttempts] = useState<number>(
    initialValues?.calibrationAttempts?.length || 0
  );

  const addAttempt = () =>
    setNumAttempts((old) => {
      return old + 1;
    });

  const removeAttempt = () =>
    setNumAttempts((old) => {
      return Math.max(0, old - 1);
    });

  const onUploadImage = async (file: File) => {
    const fileType = file.name.split(".").pop();
    const fileName = `${companyId}/parts/${nanoid()}.${fileType}`;

    const result = await carbon?.storage.from("private").upload(fileName, file);

    if (result?.error) {
      toast.error(t("failedToUploadImage"));
      throw new Error(result.error.message);
    }

    if (!result?.data) {
      throw new Error(t("failedToUploadImage"));
    }

    return getPrivateUrl(result.data.path);
  };

  return (
    <ModalDrawerProvider type={type}>
      <ModalDrawer
        open={open}
        onOpenChange={(open) => {
          if (!open && onClose) onClose();
        }}
      >
        <ModalDrawerContent>
          <ValidatedForm
            method="post"
            validator={gaugeCalibrationRecordValidator}
            defaultValues={initialValues}
            fetcher={fetcher}
            action={
              isEditing
                ? path.to.gaugeCalibrationRecord(initialValues.id!)
                : path.to.newGaugeCalibrationRecord
            }
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing
                  ? t("quality:editCalibrationRecord")
                  : t("quality:newGaugeCalibrationRecord")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <Hidden name="notes" value={JSON.stringify(notes)} />

              <VStack spacing={4}>
                <Card className="p-2">
                  <Loading isLoading={loading}>
                    <HStack className="w-full justify-between">
                      <CardHeader>
                        <CardTitle>
                          {selectedGauge?.gaugeId ?? t("quality:noGaugeSelected")}
                        </CardTitle>
                        {selectedGauge?.description && (
                          <CardDescription>
                            {selectedGauge.description}
                          </CardDescription>
                        )}
                        <Hidden
                          name="gaugeId"
                          value={
                            selectedGauge?.id ?? initialValues.gaugeId ?? ""
                          }
                        />
                      </CardHeader>
                      <CardAction>
                        <Button
                          leftIcon={<LuDraftingCompass />}
                          variant="secondary"
                          onClick={gaugeSelectionModal.onOpen}
                        >
                          {t("quality:selectGauge")}
                        </Button>
                      </CardAction>
                    </HStack>
                    <CardContent>
                      <VStack>
                        {selectedGauge && (
                          <div className="w-full space-y-2 text-xs">
                            <div className="flex flex-col gap-4 py-2">
                              {selectedGauge.modelNumber && (
                                <div className="flex items-center gap-2">
                                  <LuHash className="text-muted-foreground" />
                                  <span className="font-medium">
                                    {t("quality:modelNumber")}:
                                  </span>
                                  <span>
                                    {selectedGauge.modelNumber || "N/A"}
                                  </span>
                                </div>
                              )}
                              {selectedGauge.serialNumber && (
                                <div className="flex items-center gap-2">
                                  <LuHash className="text-muted-foreground" />
                                  <span className="font-medium">
                                    {t("quality:serialNumber")}:
                                  </span>
                                  <span>
                                    {selectedGauge.serialNumber || "N/A"}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-2">
                                <LuShield className="text-muted-foreground" />
                                <span className="font-medium">{t("quality:role")}:</span>
                                <GaugeRole role={selectedGauge.gaugeRole} />
                              </div>
                              <div className="flex items-center gap-2">
                                <LuShapes className="text-muted-foreground" />
                                <span className="font-medium">{t("quality:type")}:</span>
                                <Enumerable
                                  value={
                                    gaugeTypes.find(
                                      (type) =>
                                        type.id === selectedGauge.gaugeTypeId
                                    )?.name ?? null
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </VStack>
                    </CardContent>
                  </Loading>
                </Card>
                <DatePicker name="dateCalibrated" label={t("quality:dateCalibrated")} />
                <Supplier
                  name="supplierId"
                  label={t("quality:calibrationSupplier")}
                  isOptional
                />
                <Boolean name="requiresAction" label={t("quality:requiresAction")} />
                <Boolean
                  name="requiresAdjustment"
                  label={t("quality:requiresAdjustment")}
                />
                <Boolean name="requiresRepair" label={t("quality:requiresRepair")} />
                <Number
                  name="temperature"
                  label={t("quality:temperature")}
                  formatOptions={{
                    maximumFractionDigits: 2,
                    style: "unit",
                    unit: isMetric ? "celsius" : "fahrenheit"
                  }}
                />
                <Number
                  name="humidity"
                  label={t("quality:humidity")}
                  formatOptions={{
                    maximumFractionDigits: 2,
                    style: "percent",
                    minimumFractionDigits: 0
                  }}
                />
                <Input
                  name="measurementStandard"
                  label={t("quality:measurementStandard")}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {t("quality:calibrationAttempts")}
                </span>
                <Card className="flex-grow px-0">
                  <Table>
                    <Tbody>
                      {Array.from({ length: numAttempts }).map((_, index) => (
                        <Tr key={index}>
                          <Td>
                            <Number
                              name={`calibrationAttempts[${index}].reference`}
                              label={t("quality:reference")}
                            />
                          </Td>
                          <Td>
                            <Number
                              name={`calibrationAttempts[${index}].actual`}
                              label={t("quality:actual")}
                            />
                          </Td>
                        </Tr>
                      ))}
                      <Tr>
                        <Td colSpan={2} className="text-right">
                          <Button onClick={addAttempt} className="mr-2">
                            {t("quality:add")}
                          </Button>
                          {numAttempts > 0 ? (
                            <Button
                              onClick={removeAttempt}
                              variant="destructive"
                            >
                              {t("quality:remove")}
                            </Button>
                          ) : null}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Card>
                <Employee name="approvedBy" label={t("quality:approvedBy")} />
                <div className="flex flex-col gap-2 w-full">
                  <Label>{t("quality:notes")}</Label>
                  <Editor
                    initialValue={notes}
                    onUpload={onUploadImage}
                    onChange={(value) => {
                      setNotes(value);
                    }}
                    className="[&_.is-empty]:text-muted-foreground min-h-[120px] py-3 px-4 border rounded-md w-full"
                  />
                </div>
                <CustomFormFields table="gaugeCalibrationRecord" />
                <Documents
                  files={files}
                  sourceDocument="Gauge Calibration Record"
                  sourceDocumentId={initialValues.id}
                  writeBucket="quality"
                  writeBucketPermission="quality"
                />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                {onClose && (
                  <Button size="md" variant="solid" onClick={onClose}>
                    {t("common:cancel")}
                  </Button>
                )}
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
              </HStack>
            </ModalDrawerFooter>
          </ValidatedForm>
        </ModalDrawerContent>
      </ModalDrawer>
      {gaugeSelectionModal.isOpen && (
        <Modal
          open={gaugeSelectionModal.isOpen}
          onOpenChange={(open) => {
            if (!open) gaugeSelectionModal.onClose();
          }}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{t("quality:selectGauge")}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <VStack className="w-full">
                <div className="w-full">
                  <Combobox
                    options={gaugeOptions}
                    onChange={(value) => {
                      onGaugeSelected(value);
                      gaugeSelectionModal.onClose();
                    }}
                    value={
                      selectedGauge?.id ?? initialValues.gaugeId ?? undefined
                    }
                    size="lg"
                  />
                </div>
              </VStack>
              <ModalFooter>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (
                      selectedGauge &&
                      selectedGauge.id !== initialValues.gaugeId
                    ) {
                      onGaugeSelected(initialValues.gaugeId!);
                    } else {
                      setSelectedGauge(null);
                    }
                    gaugeSelectionModal.onClose();
                  }}
                >
                  {t("common:cancel")}
                </Button>
                <Button onClick={gaugeSelectionModal.onClose}>{t("quality:confirm")}</Button>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </ModalDrawerProvider>
  );
};

export default GaugeCalibrationRecordForm;
