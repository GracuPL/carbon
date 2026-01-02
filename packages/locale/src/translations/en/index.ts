import { account } from "./account";
import { accounting } from "./accounting";
import { common } from "./common";
import { documents } from "./documents";
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

export const en = {
  common,
  account,
  accounting,
  documents,
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
  documents,
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
