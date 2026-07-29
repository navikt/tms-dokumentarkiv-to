import { expect, test } from "@playwright/test";

// A single unknown segment (e.g. /dokumentarkiv/finnes-ikke) is captured by the
// `[locale]` route and renders the front page, so an unmatched path needs an
// extra segment to reach the custom 404 page.
const NOT_FOUND_PATH = "/dokumentarkiv/finnes-ikke/borte";

test.describe("404-siden", () => {
  test("svarer med 404-status for ukjente ruter", async ({ page }) => {
    const response = await page.goto(NOT_FOUND_PATH);

    expect(response?.status()).toBe(404);
  });

  test("viser en feiloverskrift", async ({ page }) => {
    await page.goto(NOT_FOUND_PATH);

    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toHaveText("Beklager, vi fant ikke siden");
  });

  test("viser lenke til forsiden og Min side", async ({ page }) => {
    await page.goto(NOT_FOUND_PATH);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("link", { name: "Gå til forsiden" }),
    ).toBeVisible();
    await expect(
      main.getByRole("button", { name: "Gå til Min side" }),
    ).toBeVisible();
  });
});
