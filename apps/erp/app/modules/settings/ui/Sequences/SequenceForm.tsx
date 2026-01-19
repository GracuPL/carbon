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
  Heading,
  HStack,
  VStack
} from "@carbon/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { z } from "zod/v3";
// biome-ignore lint/suspicious/noShadowRestrictedNames: suppressed due to migration
import { Hidden, Input, Number, Submit } from "~/components/Form";
import { usePermissions } from "~/hooks";
import { sequenceValidator } from "~/modules/settings";
import { path } from "~/utils/path";
import { interpolateSequenceDate } from "~/utils/string";

type SequenceFormProps = {
  initialValues: z.infer<typeof sequenceValidator> & {
    name: string;
  };
};

const SequenceForm = ({ initialValues }: SequenceFormProps) => {
  const { t } = useTranslation(["settings", "common"]);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const [prefix, setPrefix] = useState(initialValues.prefix ?? "");
  const [suffix, setSuffix] = useState(initialValues.suffix ?? "");
  const [next, setNext] = useState(initialValues.next ?? "1");
  const [size, setSize] = useState(initialValues.size ?? 5);

  const makePreview = () => {
    const p = interpolateSequenceDate(prefix);
    const s = interpolateSequenceDate(suffix);

    return `${p}${next.toString().padStart(size, "0")}${s}`;
  };

  const isDisabled = !permissions.can("update", "settings");

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={sequenceValidator}
          method="post"
          action={path.to.tableSequence(initialValues.table)}
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{t("settings:sequenceTitle", { name: initialValues.name })}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="table" />
            <VStack spacing={4}>
              <Heading size="h2">{makePreview()}</Heading>

              <Input
                name="prefix"
                label={t("settings:prefix")}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <Number
                name="next"
                minValue={0}
                label={t("settings:current")}
                onChange={setNext}
              />
              <Number
                name="size"
                minValue={0}
                maxValue={30}
                label={t("settings:size")}
                onChange={setSize}
              />
              <Number name="step" minValue={0} maxValue={10000} label={t("settings:step")} />
              <Input
                name="suffix"
                label={t("settings:suffix")}
                onChange={(e) => setSuffix(e.target.value)}
              />
              <VStack spacing={0}>
                <p className="text-muted-foreground text-sm">{`%{yyyy} = ${t("settings:fullYear")}`}</p>
                <p className="text-muted-foreground text-sm">{`%{yy} = ${t("settings:year")}`}</p>
                <p className="text-muted-foreground text-sm">{`%{mm} = ${t("settings:month")}`}</p>
                <p className="text-muted-foreground text-sm">{`%{dd} = ${t("settings:day")}`}</p>
                <p className="text-muted-foreground text-sm">{`%{hh} = ${t("settings:hour")}`}</p>
                <p className="text-muted-foreground text-sm">{`%{mm} = ${t("settings:minute")}`}</p>
                <p className="text-muted-foreground text-sm">{`%{ss} = ${t("settings:second")}`}</p>
              </VStack>
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

export default SequenceForm;
