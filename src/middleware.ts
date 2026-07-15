import { authenticate } from "@navikt/astro-auth";
import { defineMiddleware, sequence } from "astro/middleware";
import { defaultLocaleRedirect } from "@src/utils/server/locale";

export const onRequest = sequence(
  authenticate(),
  defineMiddleware(async (context, next) => {
    const localeRedirect = defaultLocaleRedirect(context);

    if (localeRedirect) {
      return context.redirect(localeRedirect);
    }

    return next();
  }),
);
