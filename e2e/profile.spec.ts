import { test, expect, Page } from "@playwright/test";

test.describe("profile page", () => {
	test("if the survey was not taken redirect to the intro page", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173/profile");
		await expect(page).toHaveURL(/\/intro/);
	});

	async function takeSurvey(page: Page) {
		await page.goto("http://localhost:5173/survey");
		await page.getByText("Quando mi sento sotto").click();
		await page.getByText("Sento l'impulso salire").click();
		await page.getByText("Un forte senso di colpa,").click();
		await page.getByText("È una cosa recente, iniziata").click();
		await page.clock.install();
		await page.getByText("Poter gesticolare e parlare").click();
		await page.clock.fastForward(3000);
	}

	test("if the survey was taken the page is shown", async ({ page }) => {
		await takeSurvey(page);
		await expect(page).toHaveURL(/\/profile/);
	});

	test("the page has the right contents", async ({ page }) => {
		await takeSurvey(page);

		await expect(page.getByText("Il tuo profilo")).toBeVisible();
		await expect(page.getByText("Le tue mani si muovono quando")).toBeVisible();
		await expect(page.getByText("Percentuale di persone 48%")).toBeVisible();
		await expect(page.getByText("La tua mente fa grandi cose")).toBeVisible();
	});

	test("the cta takes to the home page", async ({ page }) => {
		await takeSurvey(page);
		await page.getByRole("link", { name: "iniziamo" }).click();
		await expect(page).toHaveURL(/\//);
	});
});
