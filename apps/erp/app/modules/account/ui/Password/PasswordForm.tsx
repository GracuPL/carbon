import { ValidatedForm } from "@carbon/form";
import { useTranslation } from "@carbon/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  VStack
} from "@carbon/react";
import { useRef, useState } from "react";
import { Password, Submit } from "~/components/Form";
import { path } from "~/utils/path";
import { accountPasswordValidator } from "../../account.models";

const PasswordForm = () => {
  const { t } = useTranslation(["account"]);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onPasswordChange = () => {
    if (passwordRef.current && confirmPasswordRef.current) {
      setPasswordsMatch(
        passwordRef.current.value.length >= 6 &&
          confirmPasswordRef.current.value.length >= 6 &&
          passwordRef.current.value === confirmPasswordRef.current.value
      );
    }
  };

  return (
    <Card>
      <ValidatedForm
        method="post"
        action={path.to.accountPassword}
        validator={accountPasswordValidator}
      >
        <CardHeader>
          <CardTitle>{t("account:updatePassword")}</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack spacing={4} className="my-4 max-w-[440px]">
            <Password name="currentPassword" label={t("account:currentPassword")} />
            <Password
              ref={passwordRef}
              onChange={onPasswordChange}
              name="password"
              label={t("account:newPassword")}
            />
            <Password
              ref={confirmPasswordRef}
              onChange={onPasswordChange}
              name="confirmPassword"
              label={t("account:confirmPassword")}
            />
          </VStack>
        </CardContent>
        <CardFooter>
          <Submit isDisabled={!passwordsMatch} withBlocker={false}>
            {t("account:updatePassword")}
          </Submit>
        </CardFooter>
      </ValidatedForm>
    </Card>
  );
};

export default PasswordForm;
