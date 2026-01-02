import { languageNames, useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HStack,
  RadioGroup,
  RadioGroupItem
} from "@carbon/react";
import { useFetcher } from "react-router";
import { path } from "~/utils/path";

type LanguageFormProps = {
  currentLanguage: string;
};

const LanguageForm = ({ currentLanguage }: LanguageFormProps) => {
  const { t } = useTranslation("account");
  const fetcher = useFetcher();

  const handleLanguageChange = (language: string) => {
    const formData = new FormData();
    formData.append("language", language);
    fetcher.submit(formData, {
      method: "post",
      action: path.to.profile
    });
  };

  const isSubmitting = fetcher.state !== "idle";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("language")}</CardTitle>
        <CardDescription>{t("languageDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={currentLanguage}
          onValueChange={handleLanguageChange}
          disabled={isSubmitting}
        >
          <HStack spacing={4}>
            {Object.entries(languageNames).map(([code, name]) => (
              <label
                key={code}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <RadioGroupItem value={code} id={`lang-${code}`} />
                <span className="text-sm font-medium">{name}</span>
              </label>
            ))}
          </HStack>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default LanguageForm;
