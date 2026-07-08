import { REDIRECT_URI } from "astro:env/server";
import { getToken, validateToken } from "@navikt/oasis";
import { isLocal } from "@src/utils/server/environment";
import { defineMiddleware } from "astro/middleware";
import { isInternal, defaultLocaleRedirect } from "./utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);
  const params = encodeURIComponent(context.url.search);
  const loginUrl = `${REDIRECT_URI}/oauth2/login?redirect=${REDIRECT_URI}`;

  if (isInternal(context)) {
    return next();
  }

  const localeRedirect = defaultLocaleRedirect(context);
  if (localeRedirect) {
    return context.redirect(localeRedirect);
  }

  if (isLocal) {
    return next();
  }

  if (!token) {
    context.logger.info(
      "Could not find any bearer token on the request. Redirecting to login.",
    );
    return context.redirect(`${loginUrl}${params}`);
  }

  const validation = await validateToken(token);

  if (!validation.ok) {
    context.logger.info("Validation of token failed. Redirecting to login");
    return context.redirect(`${loginUrl}${params}`);
  }

  context.locals.token = token;

  return next();
});
