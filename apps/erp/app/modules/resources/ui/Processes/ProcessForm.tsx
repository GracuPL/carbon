import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuTrigger,
  HStack,
  IconButton,
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerFooter,
  ModalDrawerHeader,
  ModalDrawerProvider,
  ModalDrawerTitle,
  toast,
  useDisclosure,
  VStack
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  LuCirclePlus,
  LuEllipsisVertical,
  LuPencil,
  LuTrash
} from "react-icons/lu";
import { useFetcher, useNavigate } from "react-router";
import type { z } from "zod/v3";
import { SupplierAvatar } from "~/components";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  CustomFormFields,
  Hidden,
  Input,
  Select,
  StandardFactor,
  Submit
} from "~/components/Form";
import { useSupplierProcesses } from "~/components/Form/SupplierProcess";
import WorkCenters from "~/components/Form/WorkCenters";
import { usePermissions } from "~/hooks";
import { SupplierProcessForm } from "~/modules/purchasing/ui/Supplier";

import { processValidator } from "~/modules/resources";
import { processTypes } from "~/modules/shared";
import { path } from "~/utils/path";

type ProcessFormProps = {
  initialValues: z.infer<typeof processValidator>;
  type?: "modal" | "drawer";
  open?: boolean;
  onClose: () => void;
};

const ProcessForm = ({
  initialValues,
  open = true,
  type = "drawer",
  onClose
}: ProcessFormProps) => {
  const { t } = useTranslation(["resources", "common"]);
  const permissions = usePermissions();
  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdProcess"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(t("failedToCreateProcess", { message: fetcher.data.error.message }));
    }
  }, [fetcher.data, fetcher.state, onClose, type, t]);

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "resources")
    : !permissions.can("create", "resources");

  const [processType, setProcessType] = useState(initialValues.processType);

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
            validator={processValidator}
            method="post"
            action={
              isEditing
                ? path.to.process(initialValues.id!)
                : path.to.newProcess
            }
            defaultValues={initialValues}
            fetcher={fetcher}
            className="flex flex-col h-full"
          >
            <ModalDrawerHeader>
              <ModalDrawerTitle>
                {isEditing ? t("resources:editProcess") : t("resources:newProcess")}
              </ModalDrawerTitle>
            </ModalDrawerHeader>
            <ModalDrawerBody>
              <Hidden name="id" />
              <Hidden name="type" value={type} />
              <VStack spacing={4}>
                <Input name="name" label={t("resources:processName")} />
                <Select
                  name="processType"
                  label={t("resources:processType")}
                  options={processTypes.map((pt) => ({
                    value: pt,
                    label: pt
                  }))}
                  onChange={(newValue) => {
                    setProcessType(
                      newValue?.value as (typeof processTypes)[number]
                    );
                  }}
                />
                {processType !== "Outside" && (
                  <>
                    <StandardFactor
                      name="defaultStandardFactor"
                      label={t("resources:defaultUnit")}
                      value={initialValues.defaultStandardFactor}
                    />
                    <WorkCenters name="workCenters" label={t("resources:workCenters")} />
                  </>
                )}
                {processType !== "Inside" && (
                  <SupplierProcesses processId={initialValues.id} />
                )}
                <Boolean
                  name="completeAllOnScan"
                  label=""
                  description={t("resources:completeAllDescription")}
                />
                <CustomFormFields table="process" />
              </VStack>
            </ModalDrawerBody>
            <ModalDrawerFooter>
              <HStack>
                <Submit isDisabled={isDisabled}>{t("common:save")}</Submit>
                <Button size="md" variant="solid" onClick={() => onClose?.()}>
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

export default ProcessForm;

function SupplierProcesses({ processId }: { processId?: string }) {
  const { t } = useTranslation("resources");
  const permissions = usePermissions();
  const processes = useSupplierProcesses({ processId });
  const navigate = useNavigate();
  const isEditing = processId !== undefined;
  const newSupplierProcessModal = useDisclosure();

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {processes.length > 0 && (
          <>
            <label className="text-muted-foreground text-xs">{t("suppliers")}</label>
            {processes.map((sp) => (
              <HStack
                key={sp.id}
                className="w-full justify-between rounded-md border border-border p-2 text-sm"
              >
                <SupplierAvatar supplierId={sp.supplierId} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton
                      aria-label={t("editProcess")}
                      icon={<LuEllipsisVertical />}
                      size="md"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          path.to.supplierProcess(sp.supplierId!, sp.id!)
                        )
                      }
                      disabled={!permissions.can("update", "purchasing")}
                    >
                      <DropdownMenuIcon icon={<LuPencil />} />
                      {t("editProcess")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          path.to.deleteSupplierProcess(sp.supplierId!, sp.id!)
                        )
                      }
                      disabled={!permissions.can("delete", "purchasing")}
                    >
                      <DropdownMenuIcon icon={<LuTrash />} />
                      {t("deleteProcess")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </HStack>
            ))}
          </>
        )}
        <Button
          isDisabled={!isEditing}
          leftIcon={<LuCirclePlus />}
          variant="secondary"
          onClick={newSupplierProcessModal.onOpen}
        >
          {t("addSupplier")}
        </Button>
      </div>
      {newSupplierProcessModal.isOpen && processId && (
        <SupplierProcessForm
          type="modal"
          onClose={() => {
            newSupplierProcessModal.onClose();
          }}
          initialValues={{
            processId: processId,
            supplierId: "",
            minimumCost: 0,
            leadTime: 0
          }}
        />
      )}
    </>
  );
}
