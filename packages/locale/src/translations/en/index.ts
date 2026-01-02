import { account } from "./account";
import { common } from "./common";
import { errors } from "./errors";
import { inventory } from "./inventory";
import { invoicing } from "./invoicing";
import { items } from "./items";
import { navigation } from "./navigation";
import { production } from "./production";
import { purchasing } from "./purchasing";
import { quality } from "./quality";
import { resources } from "./resources";
import { sales } from "./sales";
import { users } from "./users";

export const en = {
  common,
  account,
  errors,
  navigation,
  sales,
  production,
  inventory,
  invoicing,
  items,
  purchasing,
  quality,
  resources,
  users
} as const;

export {
  account,
  common,
  errors,
  inventory,
  invoicing,
  items,
  navigation,
  production,
  purchasing,
  quality,
  resources,
  sales,
  users
};
