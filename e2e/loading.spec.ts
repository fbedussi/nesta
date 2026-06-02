import { test, expect, Page } from "@playwright/test";

test.describe("loading page", () => {
	async function takeSurvey(page: Page) {
		await page.goto("http://localhost:5173/survey");
		await page.getByText("Quando mi sento sotto").click();
		await page.getByText("Sento l'impulso salire").click();
		await page.getByText("Un forte senso di colpa,").click();
		await page.getByText("È una cosa recente, iniziata").click();
		await page.getByText("Poter gesticolare e parlare").click();
	}

	test("redirects to /profile after 2 seconds", async ({ page }) => {
		await page.clock.install();
		await takeSurvey(page);
		await expect(page).toHaveURL(/\/loading/);
		await page.clock.fastForward(2000);

		await expect(page).toHaveURL(/\/profile/);
	});
});
