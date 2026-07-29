import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { DokumentarkivPage } from "./pages/dokumentarkiv.page";

test.describe("Tilgjengelighet (a11y)", () => {
  test("forsiden har ingen WCAG-brudd", async ({ page }) => {
    const dokumentarkiv = new DokumentarkivPage(page);
    await dokumentarkiv.goto();
    await dokumentarkiv.expectAtLeastOneJournalpost();

    const results = await new AxeBuilder({ page })
      .include("#maincontent")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("404-siden har ingen WCAG-brudd", async ({ page }) => {
    await page.goto("/dokumentarkiv/finnes-ikke/borte");
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include("#maincontent")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
