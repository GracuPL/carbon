import { useTranslation } from "@carbon/locale";
import {
  Button,
  Checkbox,
  Combobox,
  HStack,
  MenuIcon,
  MenuItem,
  useDisclosure,
  VStack
} from "@carbon/react";
import type { ColumnDef } from "@tanstack/react-table";
import { memo, useCallback, useMemo, useState } from "react";
import {
  LuBookMarked,
  LuCheck,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash
} from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { Hyperlink, Table } from "~/components";
import { Enumerable } from "~/components/Enumerable";
import { useLocations } from "~/components/Form/Location";
import { ConfirmDelete } from "~/components/Modals";
import { usePermissions, useUrlParams } from "~/hooks";
import { path } from "~/utils/path";

type Shelf = {
  id: string;
  name: string;
  locationId: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string | null;
};

type ShelvesTableProps = {
  data: Shelf[];
  count: number;
  locationId: string;
};

const ShelvesTable = memo(({ data, count, locationId }: ShelvesTableProps) => {
  const { t } = useTranslation("inventory");
  const [params] = useUrlParams();
  const navigate = useNavigate();
  const permissions = usePermissions();
  const locations = useLocations();

  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const deleteShelfModal = useDisclosure();

  const columns = useMemo<ColumnDef<Shelf>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => (
          <HStack className="py-1">
            <Hyperlink to={`${path.to.shelf(row.original.id!)}?${params}`}>
              <VStack spacing={0}>{row.original.name}</VStack>
            </Hyperlink>
          </HStack>
        ),
        meta: {
          icon: <LuBookMarked />
        }
      },
      {
        accessorKey: "locationId",
        header: t("location"),
        cell: ({ row }) => {
          const location = locations.find(
            (l) => l.value === row.original.locationId
          );
          return (
            <Enumerable value={location?.label ?? row.original.locationId} />
          );
        },
        meta: {
          icon: <LuMapPin />
        }
      },
      {
        accessorKey: "active",
        header: t("active"),
        cell: (item) => <Checkbox isChecked={item.getValue<boolean>()} />,
        meta: {
          filter: {
            type: "static",
            options: [
              { value: "true", label: t("active") },
              { value: "false", label: t("inactive") }
            ]
          },
          pluralHeader: t("activeStatuses"),
          icon: <LuCheck />
        }
      }
    ];
  }, [locations, params, t]);

  const defaultColumnVisibility = {
    active: false
  };

  const defaultColumnPinning = {
    left: ["name"]
  };

  const actions = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        <Combobox
          asButton
          size="sm"
          value={locationId}
          options={locations}
          onChange={(selected) => {
            // hard refresh because initialValues update has no effect otherwise
            window.location.href = getLocationPath(selected);
          }}
        />
        <Button asChild leftIcon={<LuPlus />}>
          <Link to={`${path.to.newShelf}?location=${locationId}`}>
            {t("newShelf")}
          </Link>
        </Button>
      </div>
    );
  }, [locationId, locations, t]);

  const renderContextMenu = useCallback(
    (row: Shelf) => {
      return (
        <>
          <MenuItem
            disabled={!permissions.can("update", "inventory")}
            onClick={() => {
              navigate(`${path.to.shelf(row.id)}?${params.toString()}`);
            }}
          >
            <MenuIcon icon={<LuPencil />} />
            {t("editShelf")}
          </MenuItem>
          <MenuItem
            disabled={!permissions.can("delete", "inventory")}
            destructive
            onClick={() => {
              setSelectedShelf(row);
              deleteShelfModal.onOpen();
            }}
          >
            <MenuIcon icon={<LuTrash />} />
            {t("deleteShelf")}
          </MenuItem>
        </>
      );
    },
    [deleteShelfModal, navigate, params, permissions, t]
  );

  return (
    <>
      <Table<Shelf>
        count={count}
        columns={columns}
        data={data}
        defaultColumnVisibility={defaultColumnVisibility}
        defaultColumnPinning={defaultColumnPinning}
        primaryAction={actions}
        renderContextMenu={renderContextMenu}
        title={t("shelves")}
        table="shelf"
        withSavedView
      />
      {selectedShelf && selectedShelf.id && (
        <ConfirmDelete
          action={path.to.deleteShelf(selectedShelf.id)}
          isOpen={deleteShelfModal.isOpen}
          name={selectedShelf.name!}
          text={t("confirmDeleteShelf", { name: selectedShelf.name! })}
          onCancel={() => {
            deleteShelfModal.onClose();
            setSelectedShelf(null);
          }}
          onSubmit={() => {
            deleteShelfModal.onClose();
            setSelectedShelf(null);
          }}
        />
      )}
    </>
  );
});

ShelvesTable.displayName = "ShelvesTable";

export default ShelvesTable;

function getLocationPath(locationId: string) {
  return `${path.to.shelves}?location=${locationId}`;
}
