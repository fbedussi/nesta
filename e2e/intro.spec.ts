import { test, expect } from "@playwright/test";

test.describe("intro page", () => {
	test("has the trust CTA", async ({ page }) => {
		await page.goto("http://localhost:5173/intro");
		await expect(page.getByRole("link", { name: "Ti fidi?" })).toBeVisible();
	});

	test("the CTA leads to the survey page", async ({ page }) => {
		await page.goto("http://localhost:5173/intro");
		await page.getByRole("link", { name: "Ti fidi?" }).click();
		await expect(page).toHaveURL(/\/survey/);
	});
});
