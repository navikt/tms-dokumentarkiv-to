import { type APIResponse, expect, test } from "@playwright/test";

const BASE = "/dokumentarkiv";
const LOCALES = ["nb", "nn", "en"] as const;

/**
 * Parses the (relative) `Location` header of a redirect response into a URL so
 * assertions can compare pathname and query independently of whether the header
 * is absolute or relative.
 */
const location = (response: APIResponse): URL => {
  const header = response.headers().location;
  expect(header, "expected a Location header").toBeTruthy();
  return new URL(header, "http://localhost");
};

test.describe("i18n-omdirigering", () => {
  test("omdirigerer roten til standardspråket nb", async ({ request }) => {
    const response = await request.get(BASE, { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(location(response).pathname).toBe(`${BASE}/nb/`);
  });

  test("beholder query-parametere når roten omdirigeres", async ({
    request,
  }) => {
    const response = await request.get(`${BASE}/?tema=FOR`, {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(302);

    const redirect = location(response);
    expect(redirect.pathname).toBe(`${BASE}/nb/`);
    expect(redirect.search).toBe("?tema=FOR");
  });

  test("omdirigerer uprefiksede dyplenker til nb", async ({ request }) => {
    const response = await request.get(`${BASE}/tema/FOR`, {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(302);
    expect(location(response).pathname).toBe(`${BASE}/nb/tema/FOR`);
  });

  test("beholder query-parametere når dyplenker omdirigeres", async ({
    request,
  }) => {
    const response = await request.get(`${BASE}/tema/FOR?tema=FOR`, {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(302);

    const redirect = location(response);
    expect(redirect.pathname).toBe(`${BASE}/nb/tema/FOR`);
    expect(redirect.search).toBe("?tema=FOR");
  });

  for (const locale of LOCALES) {
    test(`omdirigerer ikke stier som allerede har språkprefiks (/${locale})`, async ({
      request,
    }) => {
      const response = await request.get(`${BASE}/${locale}`, {
        maxRedirects: 0,
      });

      expect(response.status()).toBe(200);
    });
  }

  test("omdirigerer ikke interne endepunkter", async ({ request }) => {
    const response = await request.get(`${BASE}/api/internal/isAlive`, {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(200);
  });

  test("navigasjon til en uprefikset dyplenke lander på nb", async ({
    page,
  }) => {
    await page.goto(`${BASE}/tema/FOR`);

    await expect(page).toHaveURL(new RegExp(`${BASE}/nb/tema/FOR`));
  });
});
