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
import type { z } from "zod/v3";
import {
  CustomFormFields,
  Hidden,
  Input,
  Select,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import {
  accountCategoryValidator,
  accountClassTypes,
  incomeBalanceTypes
} from "../../accounting.models";

type AccountCategoryFormProps = {
  initialValues: z.infer<typeof accountCategoryValidator>;
  onClose: () => void;
};

const AccountCategoryForm = ({
  initialValues,
  onClose
}: AccountCategoryFormProps) => {
  const { t } = useTranslation(["accounting", "common"]);
  const permissions = usePermissions();

  const isEditing = initialValues.id !== undefined;
  const isDisabled = isEditing
    ? !permissions.can("update", "accounting")
    : !permissions.can("create", "accounting");

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={accountCategoryValidator}
          method="post"
          action={
            isEditing
              ? path.to.accountingCategory(initialValues.id!)
              : path.to.newAccountingCategory
          }
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? t("accounting:editAccountCategory") : t("accounting:newAccountCategory")}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <VStack>
              <Input name="category" label={t("accounting:category")} />
              <Select
                name="incomeBalance"
                label={t("accounting:incomeBalance")}
                options={incomeBalanceTypes.map((incomeBalance) => ({
                  value: incomeBalance,
                  label: incomeBalance
                }))}
              />
              <Select
                name="class"
                label={t("accounting:class")}
                options={accountClassTypes.map((accountClass) => ({
                  value: accountClass,
                  label: accountClass
                }))}
              />
              <CustomFormFields table="accountCategory" />
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

export default AccountCategoryForm;
