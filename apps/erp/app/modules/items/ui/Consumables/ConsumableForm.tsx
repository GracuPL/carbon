import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  cn,
  ModalCard,
  ModalCardBody,
  ModalCardContent,
  ModalCardDescription,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardProvider,
  ModalCardTitle,
  toast
} from "@carbon/react";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  DefaultMethodType,
  Hidden,
  Input,
  InputControlled,
  ItemPostingGroup,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Number,
  Select,
  Submit,
  TextArea,
  UnitOfMeasure
} from "~/components/Form";
import { TrackingTypeIcon } from "~/components/Icons";
import { useNextItemId, usePermissions, useUser } from "~/hooks";
import { path } from "~/utils/path";
import { consumableValidator, itemTrackingTypes } from "../../items.models";

type ConsumableFormProps = {
  initialValues: z.infer<typeof consumableValidator> & { tags: string[] };
  type?: "card" | "modal";
  onClose?: () => void;
};

function startsWithLetter(value: string) {
  return /^[A-Za-z]/.test(value);
}

const ConsumableForm = ({
  initialValues,
  type = "card",
  onClose
}: ConsumableFormProps) => {
  const { t } = useTranslation("items");
  const { company } = useUser();
  const baseCurrency = company?.baseCurrencyCode ?? "USD";

  const fetcher = useFetcher<PostgrestResponse<{ id: string }>>();

  useEffect(() => {
    if (type !== "modal") return;

    if (fetcher.state === "loading" && fetcher.data?.data) {
      onClose?.();
      toast.success(t("createdConsumable"));
    } else if (fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(t("failedToCreateConsumable", { message: fetcher.data.error.message }));
    }
  }, [fetcher.data, fetcher.state, onClose, type]);

  const { id, onIdChange, loading } = useNextItemId("Consumable");
  const permissions = usePermissions();
  const isEditing = !!initialValues.id;

  const [defaultMethodType, setDefaultMethodType] = useState<string>(
    initialValues.defaultMethodType ?? "Buy"
  );

  const itemTrackingTypeOptions = itemTrackingTypes.map((itemTrackingType) => ({
    label: (
      <span className="flex items-center gap-2">
        <TrackingTypeIcon type={itemTrackingType} />
        {itemTrackingType}
      </span>
    ),
    value: itemTrackingType
  }));

  return (
    <ModalCardProvider type={type}>
      <ModalCard onClose={onClose}>
        <ModalCardContent>
          <ValidatedForm
            action={isEditing ? undefined : path.to.newConsumable}
            method="post"
            validator={consumableValidator}
            defaultValues={initialValues}
            fetcher={fetcher}
          >
            <ModalCardHeader>
              <ModalCardTitle>
                {isEditing ? t("consumableDetails") : t("newConsumable")}
              </ModalCardTitle>
              {!isEditing && (
                <ModalCardDescription>
                  {t("consumableDescription")}
                </ModalCardDescription>
              )}
            </ModalCardHeader>
            <ModalCardBody>
              <Hidden name="type" value={type} />
              <Hidden name="replenishmentSystem" value="Buy" />
              <div
                className={cn(
                  "grid w-full gap-x-8 gap-y-4",
                  isEditing
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                )}
              >
                {isEditing ? (
                  <Input name="id" label={t("consumableId")} isReadOnly />
                ) : (
                  <InputControlled
                    name="id"
                    label={t("consumableId")}
                    helperText={
                      startsWithLetter(id)
                        ? t("useEllipsisForNextId", { type: t("consumable").toLowerCase() })
                        : undefined
                    }
                    value={id}
                    onChange={onIdChange}
                    isDisabled={loading}
                    isUppercase
                    autoFocus
                  />
                )}

                <Input name="name" label={t("shortDescription")} />
                <Select
                  name="itemTrackingType"
                  label={t("trackingType")}
                  options={itemTrackingTypeOptions}
                />
                {isEditing && (
                  <TextArea name="description" label={t("longDescription")} />
                )}

                <DefaultMethodType
                  name="defaultMethodType"
                  label={t("defaultMethodType")}
                  replenishmentSystem="Buy"
                  value={defaultMethodType}
                  onChange={(newValue) =>
                    setDefaultMethodType(newValue?.value ?? "Buy")
                  }
                />
                <UnitOfMeasure
                  name="unitOfMeasureCode"
                  label={t("unitOfMeasure")}
                />
                {!isEditing && (
                  <ItemPostingGroup name="postingGroupId" label={t("itemGroup")} />
                )}
                {!isEditing && (
                  <Number
                    name="unitCost"
                    label={t("unitCost")}
                    formatOptions={{
                      style: "currency",
                      currency: baseCurrency
                    }}
                    minValue={0}
                  />
                )}

                <CustomFormFields
                  table="consumable"
                  tags={initialValues.tags}
                />
              </div>
            </ModalCardBody>
            <ModalCardFooter>
              <Submit
                isLoading={fetcher.state !== "idle"}
                isDisabled={
                  isEditing
                    ? !permissions.can("update", "parts")
                    : !permissions.can("create", "parts")
                }
              >
                {t("save")}
              </Submit>
            </ModalCardFooter>
          </ValidatedForm>
        </ModalCardContent>
      </ModalCard>
    </ModalCardProvider>
  );
};

export default ConsumableForm;
