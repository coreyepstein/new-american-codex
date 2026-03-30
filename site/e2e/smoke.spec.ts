import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads with hero and CTA", async ({ page }) => {
    await page.goto("/");

    // Hero section contains the project name
    await expect(page.getByText("New American Codex")).toBeVisible();

    // A visible CTA link or button exists
    const cta = page.locator("a, button").filter({ hasText: /get started|explore|browse|learn/i });
    await expect(cta.first()).toBeVisible();
  });

  test("framework page loads with heading and pillar cards", async ({ page }) => {
    await page.goto("/framework");

    // Page heading is visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Pillar cards render
    const pillarCards = page.locator("[class*='pillar'], [data-pillar], .grid > div, .grid > a");
    await expect(pillarCards.first()).toBeVisible();
  });

  test("browse page loads with content", async ({ page }) => {
    await page.goto("/browse");

    // Wait for the curriculum grid to be visible
    const grid = page.locator(".curriculum-grid");
    await expect(grid).toBeVisible();

    // Grid has at least one item
    const items = grid.locator("> *");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test("personalize page form renders", async ({ page }) => {
    await page.goto("/personalize");

    // Child name input
    await expect(page.locator("#child-name")).toBeVisible();

    // At least one interest chip with aria-pressed
    const chips = page.locator("[aria-pressed]");
    const chipCount = await chips.count();
    expect(chipCount).toBeGreaterThan(0);

    // Stage select
    await expect(page.locator("#stage-select")).toBeVisible();

    // Modality radio inputs
    const radios = page.locator('input[name="modality"]');
    const radioCount = await radios.count();
    expect(radioCount).toBeGreaterThan(0);

    // Submit button
    await expect(page.getByRole("button", { name: "Generate My Week" })).toBeVisible();
  });
});
