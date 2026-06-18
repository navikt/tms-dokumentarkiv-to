import { expect, test } from "@playwright/test";
import { DokumentarkivPage } from "./pages/dokumentarkiv.page";

test.describe("Responsivt design", () => {
  test("viser dokumenter på mobil viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const dokumentarkiv = new DokumentarkivPage(page);
    await dokumentarkiv.goto();

    await expect(dokumentarkiv.heading).toBeVisible();
    await dokumentarkiv.expectAtLeastOneJournalpost();
  });

  test("viser dokumenter på desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const dokumentarkiv = new DokumentarkivPage(page);
    await dokumentarkiv.goto();

    await expect(dokumentarkiv.heading).toBeVisible();
    await dokumentarkiv.expectAtLeastOneJournalpost();
  });
});
