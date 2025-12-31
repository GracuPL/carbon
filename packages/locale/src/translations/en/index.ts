import { account } from "./account";
import { common } from "./common";
import { errors } from "./errors";
import { inventory } from "./inventory";
import { navigation } from "./navigation";
import { production } from "./production";
import { purchasing } from "./purchasing";
import { resources } from "./resources";
import { sales } from "./sales";

export const en = {
  common,
  account,
  errors,
  navigation,
  sales,
  production,
  inventory,
  purchasing,
  resources
} as const;

export {
  account,
  common,
  errors,
  inventory,
  navigation,
  production,
  purchasing,
  resources,
  sales
};
