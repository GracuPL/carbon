import { account } from "./account";
import { accounting } from "./accounting";
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
import { settings } from "./settings";
import { users } from "./users";

export const pl = {
  common,
  account,
  accounting,
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
  sales,
  settings,
  users
} as const;

export {
  account,
  accounting,
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
  settings,
  users
};
