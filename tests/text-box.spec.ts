import { test, expect } from '@playwright/test';
const textBoxUrl = "https://demoqa.com/text-box";
test('User can submit Text Box form', async ({ page }) => {
 await page.goto(textBoxUrl);

 await page.locator("#userName").fill("Natalia");
 await page.locator("#userEmail").fill("someemail@gmail.com");
 await page.locator("#currentAddress").fill("Khmelnytskyi, Ukraine");
 await page.locator("#permanentAddress").fill("Chernivtsi, Ukraine");

 await page.getByRole("button", { name: "Submit" }).click();

const output = page.locator("#output");

await expect(output.locator("#name")).toContainText("Natalia");

await expect(output.locator("#email")).toContainText("someemail@gmail.com");

await expect(output.locator("#currentAddress")).toContainText("Khmelnytskyi, Ukraine");

await expect(output.locator("#permanentAddress")).toContainText("Chernivtsi, Ukraine");

});

test('Text Box form shows validation error for invalid email', async ({ page }) => {
 await page.goto(textBoxUrl);

 await page.locator("#userName").fill("Natalia");
 await page.locator("#userEmail").fill("test.gmail.com");
 await page.locator("#currentAddress").fill("Khmelnytskyi, Ukraine");
 await page.locator("#permanentAddress").fill("Chernivtsi, Ukraine");

 await page.getByRole("button", { name: "Submit" }).click();

await expect(page.locator("#userEmail")).toHaveClass(/field-error/);
await expect(page.locator("#name")).toHaveCount(0);
});