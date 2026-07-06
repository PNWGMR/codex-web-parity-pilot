import { test, expect } from "@playwright/test";

test("captures desktop and mobile first-screen smoke evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Factory run monitor" })).toBeVisible();
  await expect(page.getByLabel("Quality scoreboard")).toContainText("gate pass rate");
  await page.screenshot({
    path: "artifacts/web-smoke/first-screen.png",
    fullPage: true
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Factory run monitor" })).toBeVisible();
  await expect(page.getByLabel("Intervention queue")).toContainText("Public artifact URL");
  await page.screenshot({
    path: "artifacts/web-smoke/mobile-first-screen.png",
    fullPage: true
  });
});

