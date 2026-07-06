import { expect, test } from "@playwright/test";

test("captures desktop first-screen smoke evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Factory run monitor" })).toBeVisible();
  await expect(page.getByLabel("Run readiness summary")).toContainText("web-smoke");
  await expect(page.getByLabel("Task dependency board")).toContainText("WEB-104");
  await expect(page.getByLabel("Quality scoreboard")).toContainText("gate pass rate");
  await page.screenshot({
    path: "artifacts/web-smoke/first-screen.png"
  });
});

test("captures mobile first-screen smoke evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Factory run monitor" })).toBeVisible();
  await expect(page.getByLabel("Run readiness summary")).toContainText("3 interventions");
  await expect(page.getByLabel("Task dependency board")).toContainText("WEB-104");
  await page.screenshot({
    path: "artifacts/web-smoke/mobile-first-screen.png"
  });
});

test("filters tasks and opens local detail panels with keyboard-visible controls", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Task state filters").getByRole("button", { name: "blocked", exact: true }).click();
  await expect(page.getByLabel("Task dependency board")).toContainText("OPS-201");
  await expect(page.getByRole("button", { name: /WEB-104 Polish responsive/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /WEB-103 Add task/i })).toHaveCount(0);
  await expect(page.getByLabel("Selected task detail")).toContainText("OPS-201");

  await page.getByRole("button", { name: /desktop screenshot/i }).click();
  await expect(page.getByLabel("Artifact status")).toContainText("artifacts/web-smoke/first-screen.png");

  await page.getByRole("button", { name: /INT-1/i }).click();
  await expect(page.getByLabel("Intervention recommendation")).toContainText("Continue with gh for PR checks");

  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveCSS("outline-style", "solid");
});
