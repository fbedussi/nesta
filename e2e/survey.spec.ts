import { test, expect } from "@playwright/test";

test.describe("survey page", () => {
	test("has the questions", async ({ page }) => {
		await page.goto("http://localhost:5173/survey");
		await expect(page.getByText("Osserva le tue giornate: in")).toBeVisible();
		await expect(page.getByText("Di solito, in quale preciso")).toBeVisible();
		await expect(page.getByText("Cosa provi subito dopo haber")).toBeVisible();
		await expect(page.getByText("Da quanti anni questa")).toBeVisible();
		await expect(page.getByText("Pensa al giorno in cui avrai")).toBeVisible();
	});

	test("the initial progress bar value is 1", async ({ page }) => {
		await page.goto("http://localhost:5173/survey");
		await expect(page.getByRole("progressbar")).toBeVisible();
		await expect(page.getByRole("progressbar")).toHaveAttribute("value", "1");
	});

	test("answering the question make the progress bar value increase and at the end the cta is shown", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173/survey");
		await expect(page.getByRole("link", { name: "prosegui" })).toHaveCount(0);

		await page.getByText("Quando mi sento sotto").click();
		await expect(page.getByRole("progressbar")).toHaveAttribute("value", "2");
		await page.getByText("Sento l'impulso salire").click();
		await expect(page.getByRole("progressbar")).toHaveAttribute("value", "3");

		await page.getByText("Un forte senso di colpa,").click();
		await expect(page.getByRole("progressbar")).toHaveAttribute("value", "4");

		await page.getByText("È una cosa recente, iniziata").click();
		await expect(page.getByRole("progressbar")).toHaveAttribute("value", "5");

		await page.getByText("Poter gesticolare e parlare").click();
		await expect(page.getByRole("progressbar")).toHaveAttribute("value", "5");

		await expect(page.getByRole("link", { name: "prosegui" })).toBeVisible();
	});

	test("the cta leads to the loading page", async ({ page }) => {
		await page.goto("http://localhost:5173/survey");

		await page.getByText("Quando mi sento sotto").click();
		await page.getByText("Sento l'impulso salire").click();
		await page.getByText("Un forte senso di colpa,").click();
		await page.getByText("È una cosa recente, iniziata").click();
		await page.getByText("Poter gesticolare e parlare").click();
		await page.getByRole("link", { name: "prosegui" }).click();
		await expect(page).toHaveURL(/\/loading/);
	});
});
