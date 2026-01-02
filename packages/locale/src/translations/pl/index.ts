import { account } from "./account";
import { common } from "./common";
import { errors } from "./errors";
import { inventory } from "./inventory";
import { items } from "./items";
import { navigation } from "./navigation";
import { production } from "./production";
import { purchasing } from "./purchasing";
import { quality } from "./quality";
import { resources } from "./resources";
import { sales } from "./sales";
import { users } from "./users";

export const pl = {
  common,
  account,
  errors,
  navigation,
  sales,
  production,
  inventory,
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
  items,
  navigation,
  production,
  purchasing,
  quality,
  resources,
  sales,
  users
};
