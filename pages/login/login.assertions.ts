import { expect, type Page } from '@playwright/test';
import { LoginLocators } from './login.locators';

/**
 * Verifies that the login form is ready for interaction.
 *
 * @param login - Login page locators.
 * @returns A promise that resolves when the form is ready.
 */
export async function expectLoginFormReady(
  login: LoginLocators,
): Promise<void> {
  await expect(login.usernameInput).toBeVisible();
  await expect(login.loginButton).toBeEnabled();
}

/**
 * Verifies that the user has successfully logged in.
 *
 * @param page - Playwright page instance.
 * @returns A promise that resolves when login is confirmed.
 */
export async function expectLoginSucceeded(page: Page): Promise<void> {
  await expect(page).toHaveURL(/\/profile$/, {
    timeout: 15000,
  });

  await expect(page.locator('#userName-value')).toBeVisible();
}