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
  useMount,
  VStack
} from "@carbon/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Employees, Hidden, Radios, Submit } from "~/components/Form";
import type { CompanyPermission } from "~/modules/users";
import { bulkPermissionsValidator } from "~/modules/users";
import { path } from "~/utils/path";
import PermissionCheckboxes from "../components/Permission";

type BulkEditPermissionsProps = {
  userIds: string[];
  isOpen: boolean;
  onClose: () => void;
};

const BulkEditPermissions = ({
  userIds,
  isOpen,
  onClose
}: BulkEditPermissionsProps) => {
  const { t } = useTranslation(["users", "common"]);
  const [permissions, setPermissions] = useState<
    Record<string, CompanyPermission>
  >({});

  const updatePermissions = (module: string, permission: CompanyPermission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [module]: permission
    }));
  };

  const emptyPermissionsFetcher = useFetcher<{
    permissions: Record<
      string,
      {
        name: string;
        permission: CompanyPermission;
      }
    >;
  }>();

  useMount(() => {
    emptyPermissionsFetcher.load(path.to.api.emptyPermissions);
  });

  useEffect(() => {
    if (emptyPermissionsFetcher.data) {
      let emptyPermissions: Record<string, CompanyPermission> = {};
      Object.entries(emptyPermissionsFetcher.data.permissions).forEach(
        ([module, data]) => {
          emptyPermissions[module] = data.permission;
        }
      );
      setPermissions(emptyPermissions);
    }
  }, [emptyPermissionsFetcher.data]);

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      open={isOpen}
    >
      <DrawerContent>
        <ValidatedForm
          validator={bulkPermissionsValidator}
          method="post"
          action={path.to.bulkEditPermissions}
          onSubmit={onClose}
          defaultValues={{ userIds }}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{t("users:editPermissions")}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <div className="border border-border p-4 w-full rounded-lg">
                <Radios
                  name="editType"
                  label={t("users:typeOfPermissionUpdate")}
                  options={[
                    {
                      label: t("users:addPermissions"),
                      value: "add"
                    },
                    {
                      label: t("users:updatePermissions"),
                      value: "update"
                    }
                  ]}
                />
              </div>

              <Employees
                name="userIds"
                selectionsMaxHeight={"calc(100vh - 330px)"}
                label={t("users:usersToUpdate")}
              />

              <label className="block text-sm font-medium leading-none">
                {t("users:permissions")}
              </label>
              <VStack spacing={8}>
                {Object.entries(permissions)
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([module, data], index) => (
                    <PermissionCheckboxes
                      key={index}
                      module={module}
                      permissions={data}
                      updatePermissions={updatePermissions}
                    />
                  ))}
              </VStack>
              <Hidden name="data" value={JSON.stringify(permissions)} />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit>{t("common:save")}</Submit>
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

export default BulkEditPermissions;
