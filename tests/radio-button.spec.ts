import { test, expect } from '@playwright/test';

test.describe('Radio Button', () => {
  const radioButtonUrl = 'https://demoqa.com/radio-button';

  test('User can select Yes radio button', async ({ page }) => {
    await page.goto(radioButtonUrl);
    await page.getByLabel('Yes').click();
    await expect(page.locator('.text-success')).toContainText('Yes');
  });
});
