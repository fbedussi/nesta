import { test, expect } from "@playwright/test";

test.describe("loading page", () => {
	test("redirects to /profile after 2 seconds", async ({ page }) => {
		await page.clock.install();
		await page.goto("http://localhost:5173/loading");
		await page.clock.fastForward(2000);
		await expect(page).toHaveURL(/\/profile/);
	});
});
