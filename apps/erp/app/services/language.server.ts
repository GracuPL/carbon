import { DOMAIN } from "@carbon/auth";
import * as cookie from "cookie";

const cookieName = "language";
const languages = ["en", "pl"] as const;
type Language = (typeof languages)[number];

export function getLanguage(request: Request): Language {
  const cookieHeader = request.headers.get("cookie");
  const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : "en";
  if (languages.includes(parsed as Language)) return parsed as Language;
  return "en";
}

export function setLanguage(language: string) {
  return cookie.serialize(cookieName, language, {
    path: "/",
    maxAge: 31536000, // 1 year
    domain: DOMAIN
  });
}

export { languages, type Language };
