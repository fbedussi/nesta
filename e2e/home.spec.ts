import { test, expect } from "@playwright/test";

test.describe("home page", () => {
	test("has the main menu", async ({ page }) => {
		await page.goto("http://localhost:5173/home");
		await expect(page.getByRole("link", { name: "Percorso" })).toBeVisible();
		await expect(page.getByRole("link", { name: "SOS" })).toBeVisible();
		await expect(
			page.getByRole("link", { name: "Scatta una foto" }),
		).toBeVisible();
	});
});
