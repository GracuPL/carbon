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
import { useState } from "react";
import type { z } from "zod/v3";
import {
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Array,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
  Boolean,
  Hidden,
  Input,
  Select,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { DataType } from "~/modules/shared";
import { path } from "~/utils/path";
import { attributeValidator } from "../../people.models";

type AttributeFormProps = {
  initialValues: z.infer<typeof attributeValidator>;
  dataTypes: {
    id: number;
    label: string;
    isBoolean: boolean;
    isDate: boolean;
    isList: boolean;
    isNumeric: boolean;
    isText: boolean;
    isFile: boolean;
  }[];
  onClose: () => void;
};

const AttributeForm = ({
  initialValues,
  dataTypes,
  onClose
}: AttributeFormProps) => {
  const { t } = useTranslation(["users", "common"]);
  const permissions = usePermissions();

  const options =
    dataTypes?.map((dt) => ({
      value: dt.id.toString(),
      label: dt.label
    })) ?? [];

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "people")
    : !permissions.can("create", "people");

  const [isList, setIsList] = useState(
    initialValues.attributeDataTypeId === DataType.List
  );

  const onChangeCheckForListType = (
    selected: {
      value: string;
      label: string | JSX.Element;
    } | null
  ) => {
    setIsList(
      selected === null ? false : Number(selected.value) === DataType.List
    );
  };

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={attributeValidator}
          method="post"
          action={
            isEditing
              ? path.to.attribute(initialValues.id!)
              : path.to.newAttribute
          }
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? t("users:editAttribute") : t("users:newAttribute")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <VStack spacing={4}>
              <Input name="name" label={t("users:name")} />
              <Hidden name="userAttributeCategoryId" />

              <Select
                name="attributeDataTypeId"
                label={t("users:dataType")}
                isReadOnly={isEditing}
                helperText={
                  isEditing ? t("users:dataTypeCannotBeChanged") : undefined
                }
                options={options}
                onChange={onChangeCheckForListType}
              />
              {isList && <Array name="listOptions" label={t("users:listOptions")} />}
              <Boolean
                name="canSelfManage"
                label={t("users:selfManaged")}
                description={t("users:selfManagedDescription")}
              />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Button size="md" variant="solid" onClick={onClose}>
                {t("common:cancel")}
              </Button>
              <Submit withBlocker={false} isDisabled={isDisabled}>
                {t("common:save")}
              </Submit>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
};

export default AttributeForm;
