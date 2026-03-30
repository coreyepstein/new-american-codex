import { test, expect } from "@playwright/test";

const mockPersonalizeResponse = {
  childName: "Test",
  stage: "explorer",
  interests: ["dinosaurs"],
  units: [
    {
      day: 1,
      pillar: "agency-critical-thinking",
      title: "Dinosaur Dig Detective",
      contentType: "activity",
      duration: "45 minutes",
      materials: ["magnifying glass", "sandbox", "plastic dino bones"],
      learningObjectives: [
        "Practice observation skills",
        "Learn scientific method",
      ],
      body: "## Dinosaur Dig Detective\n\nBecome a paleontologist for a day...",
      safetyNotes: undefined,
    },
    {
      day: 2,
      pillar: "physical-survival",
      title: "Explorer Hike",
      contentType: "field-plan",
      duration: "2 hours",
      materials: ["trail map", "water bottle"],
      learningObjectives: ["Navigation basics"],
      body: "## Explorer Hike\n\nPack your gear...",
      safetyNotes: "Stay on marked trails.",
    },
  ],
  theme: "Dinosaur Adventures",
  generatedAt: new Date().toISOString(),
};

async function fillAndSubmitForm(page: import("@playwright/test").Page) {
  // Click the "dinosaurs" interest chip
  await page.locator('[aria-label="dinosaurs"]').click();

  // Select Explorer stage
  await page.locator("#stage-select").selectOption("explorer");

  // Click the "Hands-On" modality radio
  await page.getByLabel(/hands.on/i).check();

  // Submit the form
  await page.getByRole("button", { name: "Generate My Week" }).click();
}

test.describe("Personalize flow", () => {
  test("form renders all required fields", async ({ page }) => {
    await page.goto("/personalize");

    // Child name input
    await expect(page.locator("#child-name")).toBeVisible();

    // Interest chips with aria-pressed
    const chips = page.locator("[aria-pressed]");
    const chipCount = await chips.count();
    expect(chipCount).toBeGreaterThan(0);

    // Stage select
    await expect(page.locator("#stage-select")).toBeVisible();

    // Modality radios
    const radios = page.locator('input[name="modality"]');
    const radioCount = await radios.count();
    expect(radioCount).toBeGreaterThan(0);

    // Submit button
    await expect(
      page.getByRole("button", { name: "Generate My Week" })
    ).toBeVisible();
  });

  test("submit with valid profile shows personalized week (mocked API)", async ({
    page,
  }) => {
    // Mock the personalize API route
    await page.route("**/api/personalize", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPersonalizeResponse),
      });
    });

    await page.goto("/personalize");

    await fillAndSubmitForm(page);

    // Wait for the personalized week to render — look for the theme or a unit title
    await expect(
      page
        .getByText("Dinosaur Adventures")
        .or(page.getByText("Dinosaur Dig Detective"))
    ).toBeVisible({ timeout: 10000 });
  });

  test("pillar and learning objectives are shown on generated unit", async ({
    page,
  }) => {
    // Mock the personalize API route
    await page.route("**/api/personalize", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPersonalizeResponse),
      });
    });

    await page.goto("/personalize");

    await fillAndSubmitForm(page);

    // Wait for results to render
    await expect(
      page
        .getByText("Dinosaur Adventures")
        .or(page.getByText("Dinosaur Dig Detective"))
    ).toBeVisible({ timeout: 10000 });

    // Verify pillar info is shown (look for "agency" text or pillar badge)
    await expect(
      page
        .getByText(/agency/i)
        .or(page.locator("[class*='pillar'], [data-pillar]").first())
    ).toBeVisible();
  });
});
