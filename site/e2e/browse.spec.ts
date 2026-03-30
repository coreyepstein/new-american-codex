/**
 * US-007: Curriculum Browser — E2E acceptance tests
 *
 * Playwright spec stub for future US-010 which will install Playwright.
 * These tests cover the 5 acceptance criteria from the PRD.
 *
 * To run (after US-010 installs Playwright):
 *   pnpm exec playwright test e2e/browse.spec.ts
 */
import { test, expect } from "@playwright/test";

test.describe("US-007: Curriculum browser", () => {
  // ------------------------------------------------------------------
  // 1. Stage filter — selecting 'Explorer' shows only Explorer content
  // ------------------------------------------------------------------
  test("stage filter shows only Explorer content", async ({ page }) => {
    await page.goto("/browse?stage=explorer");

    // Wait for the grid to render
    const grid = page.locator(".curriculum-grid");
    await expect(grid).toBeVisible();

    // Every card's stage badge should say "Explorer"
    const stageBadges = grid.locator("a > div:first-child > span:last-child");
    const count = await stageBadges.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(stageBadges.nth(i)).toHaveText("Explorer");
    }

    // The results count text should reflect filtering
    await expect(page.locator("text=Showing")).toBeVisible();
  });

  // ------------------------------------------------------------------
  // 2. Content type filter — selecting 'Recipe' shows only recipes
  // ------------------------------------------------------------------
  test("content type filter shows only Recipe content", async ({ page }) => {
    await page.goto("/browse?type=recipe");

    const grid = page.locator(".curriculum-grid");
    await expect(grid).toBeVisible();

    // Every card should have a "Recipe" content type badge
    const cards = grid.locator("a");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      // The content type badge is inside .flex.flex-wrap.gap-1\\.5 > second span
      const typeBadge = cards.nth(i).locator(".flex.flex-wrap span:last-child");
      await expect(typeBadge).toHaveText("Recipe");
    }
  });

  // ------------------------------------------------------------------
  // 3. Content detail — clicking a card renders full markdown content
  // ------------------------------------------------------------------
  test("clicking a card renders full content from markdown", async ({
    page,
  }) => {
    await page.goto("/browse");

    // Click the first curriculum card
    const firstCard = page.locator(".curriculum-grid a").first();
    await expect(firstCard).toBeVisible();
    const cardTitle = await firstCard
      .locator("h3")
      .textContent();

    await firstCard.click();

    // Should navigate to the detail page
    await expect(page).toHaveURL(/\/browse\/.+\/.+\/.+/);

    // The detail page should render the item title
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(cardTitle!);

    // The markdown article content should be present
    const article = page.locator("article");
    await expect(article).toBeVisible();
    const articleText = await article.textContent();
    expect(articleText!.length).toBeGreaterThan(50);

    // Breadcrumb navigation should be present
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('a:has-text("Browse")')).toBeVisible();

    // Metadata section should be visible
    const metaGrid = page.locator(".grid.grid-cols-2");
    await expect(metaGrid).toBeVisible();
  });

  // ------------------------------------------------------------------
  // 4. Mobile responsive — grid collapses to single column on mobile
  // ------------------------------------------------------------------
  test("grid collapses to single column on mobile", async ({ page }) => {
    // Set mobile viewport (iPhone SE dimensions)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/browse");

    const grid = page.locator(".curriculum-grid");
    await expect(grid).toBeVisible();

    // Verify the grid has the responsive class that produces 1 column on mobile
    // Tailwind: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
    await expect(grid).toHaveClass(/grid-cols-1/);

    // All cards should be full width (equal to grid width minus padding)
    const cards = grid.locator("> a");
    const gridBox = await grid.boundingBox();
    expect(gridBox).toBeTruthy();

    const firstCardBox = await cards.first().boundingBox();
    expect(firstCardBox).toBeTruthy();

    // Card width should be approximately equal to grid width (single column)
    expect(firstCardBox!.width).toBeCloseTo(gridBox!.width, -1);
  });

  // ------------------------------------------------------------------
  // 5. Scaffold stage — shows 'Contribute' CTA for sparse stages
  // ------------------------------------------------------------------
  test("scaffold stage with few items shows Contribute CTA", async ({
    page,
  }) => {
    // 'genesis' is a scaffold stage with very few items (< 5)
    await page.goto("/browse?stage=genesis");

    // The Contribute CTA should be visible (either full empty state or banner)
    const contributeCTA = page.locator(
      'a:has-text("Contribute on GitHub")'
    );
    await expect(contributeCTA).toBeVisible();

    // CTA should link to the GitHub repo
    await expect(contributeCTA).toHaveAttribute(
      "href",
      "https://github.com/coreyepstein/new-american-codex"
    );

    // CTA should open in a new tab
    await expect(contributeCTA).toHaveAttribute("target", "_blank");
  });
});
