import { authenticate } from "@navikt/astro-auth";
import type { APIContext } from "astro";
import { defineMiddleware, sequence } from "astro/middleware";

const BASE = "/dokumentarkiv";
const LOCALES = ["nb", "nn", "en"];
const DEFAULT_LOCALE = "nb";

const isInternal = (context: APIContext) =>
  context.url.pathname.includes("/internal/");

const defaultLocaleRedirect = (context: APIContext): string | null => {
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

const localeMiddleware = defineMiddleware(async (context, next) => {
  const localeRedirect = defaultLocaleRedirect(context);
  if (localeRedirect) {
    return context.redirect(localeRedirect);
  }

  return next();
});

export const onRequest = sequence(authenticate(), localeMiddleware);
