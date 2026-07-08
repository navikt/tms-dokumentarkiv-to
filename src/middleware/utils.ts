import type { APIContext } from "astro";

export const isInternal = (context: APIContext) =>
  context.request.url.includes("/internal");

const BASE = "/dokumentarkiv";
const LOCALES = ["nb", "nn", "en"];
const DEFAULT_LOCALE = "nb";

export const defaultLocaleRedirect = (context: APIContext): string | null => {
  const { pathname, search } = context.url;

  if (!pathname.startsWith(BASE)) {
    return null;
  }

  const rest = pathname.slice(BASE.length);
  const [first] = rest.split("/").filter(Boolean);

  if (first && LOCALES.includes(first)) {
    return null;
  }

  const localizedPath = `${BASE}/${DEFAULT_LOCALE}${rest === "" ? "/" : rest}`;
  return `${localizedPath}${search}`;
};
