import { test, expect } from '@playwright/test';

const loginUrl = 'https://demoqa.com/login';
const profileUrl = 'https://demoqa.com/profile';
const validUsername = process.env.DEMOQA_USERNAME;
const validPassword = process.env.DEMOQA_PASSWORD;
const invalidPassword = 'IncorrectPasswordForNegativeTest!';

// Keep the existing Junior scenarios; credentials now come from .env.
test.beforeAll(() => {
  if (!validUsername || !validPassword) {
    throw new Error('Set DEMOQA_USERNAME and DEMOQA_PASSWORD in .env');
  }
});

test('Successful login for valid user', async ({ page }) => {
  await page.goto(loginUrl);
  await page.locator('#userName').fill(validUsername!);
  await page.locator('#password').fill(validPassword!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#userName-value')).toContainText(validUsername!);
  await expect(page).toHaveURL(profileUrl);
});

test('User cannot login with invalid password', async ({ page }) => {
  const errorMessage = page.locator('#name');
  await page.goto(loginUrl);
  await page.locator('#userName').fill(validUsername!);
  await page.locator('#password').fill(invalidPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(loginUrl);
  await expect(errorMessage).toHaveText('Invalid username or password!');
});
