import { test, expect } from '@playwright/test';

test.describe('Text Box', () => {
  const textBoxUrl = 'https://demoqa.com/text-box';
  const name = 'Natalia';
  const email = 'someemail@gmail.com';
  const invalidEmail = 'test.gmail.com';
  const currentAddress = 'Khmelnytskyi, Ukraine';
  const permanentAddress = 'Chernivtsi, Ukraine';

  test('User can submit Text Box form', async ({ page }) => {
    await page.goto(textBoxUrl);
    await page.locator('#userName').fill(name);
    await page.locator('#userEmail').fill(email);
    await page.locator('#currentAddress').fill(currentAddress);
    await page.locator('#permanentAddress').fill(permanentAddress);
    await page.getByRole('button', { name: 'Submit' }).click();

    const output = page.locator('#output');
    await expect(output.locator('#name')).toContainText(name);
    await expect(output.locator('#email')).toContainText(email);
    await expect(output.locator('#currentAddress')).toContainText(currentAddress);
    await expect(output.locator('#permanentAddress')).toContainText(permanentAddress);
  });

  test('Text Box form shows validation error for invalid email', async ({ page }) => {
    await page.goto(textBoxUrl);
    await page.locator('#userName').fill(name);
    await page.locator('#userEmail').fill(invalidEmail);
    await page.locator('#currentAddress').fill(currentAddress);
    await page.locator('#permanentAddress').fill(permanentAddress);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
    await expect(page.locator('#name')).toHaveCount(0);
  });
});
