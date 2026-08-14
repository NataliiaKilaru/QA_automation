import { test, expect } from '@playwright/test';

const loginUrl = "https://demoqa.com/login";
const validUsername = "TestUser";
const validPassword = "Qwerty123!";
const profileUrl= "https://demoqa.com/profile";
const invalidPassword = "Qwerty123111!";

test('Successful login for valid user', async ({ page }) => {
await page.goto(loginUrl);

await page.locator("#userName").fill(validUsername);
await page.locator("#password").fill(validPassword);
await page.getByRole("button", { name: "Login" }).click();

await expect(page.locator("#userName-value")).toContainText(validUsername);
await expect(page).toHaveURL(profileUrl);
});


test('User cannot login with invalid password', async ({ page }) => {
const errorMessage = page.locator("#name");

await page.goto(loginUrl);

await page.locator("#userName").fill(validUsername);
await page.locator("#password").fill(invalidPassword );
await page.getByRole("button", { name: "Login" }).click();

await expect(page).toHaveURL(loginUrl);
await expect(errorMessage).toHaveText("Invalid username or password!");
});