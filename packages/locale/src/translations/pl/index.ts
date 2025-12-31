import { account } from "./account";
import { common } from "./common";
import { errors } from "./errors";

export const pl = {
  common,
  account,
  errors
} as const;

export { account, common, errors };
