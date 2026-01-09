import { useCarbon } from "@carbon/auth";
import { useTranslation } from "@carbon/locale";
import { File, toast } from "@carbon/react";
import { nanoid } from "nanoid";
import type { ChangeEvent } from "react";
import { LuUpload } from "react-icons/lu";
import { useSubmit } from "react-router";
import { useUser } from "~/hooks";
import { path } from "~/utils/path";

const DocumentCreateForm = () => {
  const { t } = useTranslation("documents");
  const submit = useSubmit();
  const { carbon } = useCarbon();
  const {
    company: { id: companyId }
  } = useUser();

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && carbon) {
      const file = e.target.files[0];
      toast.info(t("uploadingFile", { name: file.name }));
      const fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);
      const fileName = `${companyId}/${nanoid()}.${fileExtension}`;

      const fileUpload = await carbon.storage
        .from("private")
        .upload(fileName, file, {
          cacheControl: `${12 * 60 * 60}`,
          upsert: true
        });

      if (fileUpload.error) {
        console.error(fileUpload.error);
        toast.error(t("failedToUploadFile"));
      }

      if (fileUpload.data?.path) {
        submitFileData({
          path: fileUpload.data.path,
          name: file.name,
          size: file.size
        });
      }
    }
  };

  const submitFileData = ({
    path: filePath,
    name,
    size
  }: {
    path: string;
    name: string;
    size: number;
  }) => {
    const formData = new FormData();
    formData.append("path", filePath);
    formData.append("name", name);
    formData.append("size", Math.round(size / 1024).toString());
    submit(formData, {
      method: "post",
      action: path.to.newDocument,
      navigate: false
    });
  };

  return (
    <File leftIcon={<LuUpload />} onChange={uploadFile}>
      {t("upload")}
    </File>
  );
};

export default DocumentCreateForm;
