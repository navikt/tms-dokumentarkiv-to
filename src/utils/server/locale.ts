import type { APIContext } from "astro";

const BASE = "/dokumentarkiv";
const LOCALES = ["nb", "nn", "en"];
const DEFAULT_LOCALE = "nb";

const isInternal = (context: APIContext) =>
  context.url.pathname.includes("/internal/");

export const defaultLocaleRedirect = (context: APIContext): string | null => {
  const { pathname, search } = context.url;

  if (!pathname.startsWith(BASE)) {
    return null;
  }

  if (isInternal(context)) {
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
