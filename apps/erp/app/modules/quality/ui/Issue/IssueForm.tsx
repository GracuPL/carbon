import {
  DatePicker,
  MultiSelect,
  Select,
  SelectControlled,
  TextArea,
  ValidatedForm
} from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  VStack
} from "@carbon/react";
import { useState } from "react";
import type { z } from "zod/v3";
import {
  CustomFormFields,
  Hidden,
  Input,
  Location,
  Submit
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { useItems } from "~/stores/items";
import type { ListItem } from "~/types";
import {
  issueValidator,
  nonConformanceApprovalRequirement,
  nonConformancePriority,
  nonConformanceSource
} from "../../quality.models";
import type { IssueWorkflow } from "../../types";
import { getPriorityIcon, getSourceIcon } from "./IssueIcons";

type IssueFormValues = z.infer<typeof issueValidator>;

type IssueFormProps = {
  initialValues: IssueFormValues;
  nonConformanceWorkflows: IssueWorkflow[];
  nonConformanceTypes: ListItem[];
  requiredActions: ListItem[];
};

const IssueForm = ({
  initialValues,
  nonConformanceWorkflows,
  nonConformanceTypes,
  requiredActions
}: IssueFormProps) => {
  const { t } = useTranslation(["quality", "common"]);
  const permissions = usePermissions();
  const isEditing = initialValues.id !== undefined;

  const [workflow, setWorkflow] = useState<{
    priority: string;
    source: string;
    requiredActionIds: string[];
    approvalRequirements: string[];
  }>({
    priority: initialValues.priority,
    source: initialValues.source,
    requiredActionIds: initialValues.requiredActionIds ?? [],
    approvalRequirements: initialValues.approvalRequirements ?? []
  });

  const [items] = useItems();

  const onWorkflowChange = (value: { value: string } | null) => {
    if (value) {
      const selectedWorkflow = nonConformanceWorkflows.find(
        (w) => w.id === value.value
      );

      if (selectedWorkflow) {
        setWorkflow({
          priority: selectedWorkflow.priority,
          source: selectedWorkflow.source,
          requiredActionIds: selectedWorkflow.requiredActionIds ?? [],
          approvalRequirements: selectedWorkflow.approvalRequirements ?? []
        });
      }
    }
  };

  return (
    <Card>
      <ValidatedForm
        method="post"
        validator={issueValidator}
        defaultValues={initialValues}
        className="w-full"
      >
        <CardHeader>
          <CardTitle>{isEditing ? t("quality:issue") : t("quality:newIssue")}</CardTitle>
          {!isEditing && (
            <CardDescription>
              {t("quality:issueDescription")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Hidden name="id" />
          <Hidden name="nonConformanceId" />
          <Hidden name="supplierId" />
          <Hidden name="customerId" />
          <Hidden name="jobId" />
          <Hidden name="jobOperationId" />
          <Hidden name="purchaseOrderId" />
          <Hidden name="purchaseOrderLineId" />
          <Hidden name="salesOrderId" />
          <Hidden name="salesOrderLineId" />
          <Hidden name="shipmentId" />
          <Hidden name="shipmentLineId" />
          <Hidden name="operationSupplierProcessId" />

          <VStack spacing={4}>
            <div className="grid w-full gap-4 grid-cols-1 md:grid-cols-2">
              <Input name="name" label={t("common:name")} />
              <Select
                name="nonConformanceTypeId"
                label={t("quality:issueType")}
                options={nonConformanceTypes.map((type) => ({
                  label: type.name,
                  value: type.id
                }))}
              />
            </div>
            <TextArea name="description" label={t("common:description")} />
            <div className="grid w-full gap-4 grid-cols-1 md:grid-cols-2">
              <Select
                name="nonConformanceWorkflowId"
                label={t("quality:workflow")}
                options={nonConformanceWorkflows.map((workflow) => ({
                  label: workflow.name,
                  value: workflow.id
                }))}
                onChange={onWorkflowChange}
              />

              <MultiSelect
                name="items"
                label={t("quality:items")}
                options={items.map((item) => ({
                  label: item.readableIdWithRevision,
                  value: item.id,
                  helper: item.name
                }))}
              />
            </div>

            <VStack spacing={4}>
              <MultiSelect
                name="requiredActionIds"
                label={t("quality:requiredActions")}
                options={requiredActions.map((action) => ({
                  label: action.name,
                  value: action.id
                }))}
                value={workflow.requiredActionIds}
                onChange={(value) => {
                  setWorkflow({
                    ...workflow,
                    requiredActionIds: value.map((v) => v.value)
                  });
                }}
              />
              <MultiSelect
                name="approvalRequirements"
                label={t("quality:approvalRequirements")}
                options={nonConformanceApprovalRequirement.map(
                  (requirement) => ({
                    label: requirement,
                    value: requirement
                  })
                )}
                value={workflow.approvalRequirements}
                onChange={(value) => {
                  setWorkflow({
                    ...workflow,
                    approvalRequirements: value.map((v) => v.value)
                  });
                }}
              />
            </VStack>
            <div className="grid w-full gap-4 grid-cols-1 md:grid-cols-2">
              <SelectControlled
                name="priority"
                label={t("quality:priority")}
                options={nonConformancePriority.map((priority) => ({
                  label: (
                    <div className="flex gap-2 items-center">
                      {getPriorityIcon(priority, false)}
                      <span>{priority}</span>
                    </div>
                  ),
                  value: priority
                }))}
                value={workflow.priority}
                onChange={(value) => {
                  setWorkflow({
                    ...workflow,
                    priority: value?.value ?? ""
                  });
                }}
              />
              <SelectControlled
                name="source"
                label={t("quality:source")}
                options={nonConformanceSource.map((source) => ({
                  label: (
                    <div className="flex gap-2 items-center">
                      {getSourceIcon(source, false)}
                      <span>{source}</span>
                    </div>
                  ),
                  value: source
                }))}
                value={workflow.source}
                onChange={(value) => {
                  setWorkflow({
                    ...workflow,
                    source: value?.value ?? ""
                  });
                }}
              />

              <DatePicker name="openDate" label={t("quality:openDate")} />
              <Location name="locationId" label={t("common:location")} />
              <CustomFormFields table="nonConformance" />
            </div>
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit
            isDisabled={
              isEditing
                ? !permissions.can("update", "quality")
                : !permissions.can("create", "quality")
            }
          >
            {t("common:save")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default IssueForm;
