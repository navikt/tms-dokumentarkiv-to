import { authenticate } from "@navikt/astro-auth";
import { defineMiddleware, sequence } from "astro/middleware";
import { defaultLocaleRedirect } from "./utils";

const localeMiddleware = defineMiddleware(async (context, next) => {
  const localeRedirect = defaultLocaleRedirect(context);
  if (localeRedirect) {
    return context.redirect(localeRedirect);
  }

  return next();
});

export const onRequest = sequence(authenticate(), localeMiddleware);
