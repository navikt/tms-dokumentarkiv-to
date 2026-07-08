import type { APIContext } from "astro";

export const isInternal = (context: APIContext) =>
  context.request.url.includes("/internal");

const BASE = "/dokumentarkiv";
const LOCALES = ["nb", "nn", "en"];
const DEFAULT_LOCALE = "nb";

/**
 * Astro's `redirectToDefaultLocale` only redirects the exact site root, so
 * unprefixed deep links (e.g. `/dokumentarkiv/tema/[temakode]`, still linked by
 * other Nav apps and old bookmarks) 404 under `prefixDefaultLocale: true`. This
 * builds a redirect to the default-locale-prefixed URL, preserving query params
 * (which the built-in root redirect drops), or returns null when the request is
 * already localized or is an asset/internal route that must not be rewritten.
 */
export const defaultLocaleRedirect = (context: APIContext): string | null => {
  const { pathname, search } = context.url;

  if (!pathname.startsWith(BASE)) {
    return null;
  }

  const rest = pathname.slice(BASE.length);
  const [first] = rest.split("/").filter(Boolean);

  // Skip requests that are already localized or must not be rewritten:
  // internal probes/metrics, API routes and static assets (which carry a file
  // extension or the Astro `_astro`/`_image` prefix).
  if (
    first &&
    (LOCALES.includes(first) ||
      first === "api" ||
      first.startsWith("_") ||
      first.includes("."))
  ) {
    return null;
  }

  const localizedPath = `${BASE}/${DEFAULT_LOCALE}${rest === "" ? "/" : rest}`;
  return `${localizedPath}${search}`;
};
