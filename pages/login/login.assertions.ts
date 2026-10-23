import { expect, Page } from '@playwright/test';
import { LoginLocators } from './login.locators';

/** Verifies that the login form is ready for interaction. */
export async function expectLoginFormReady(login: LoginLocators): Promise<void> {
  await expect(login.usernameInput).toBeVisible();
  await expect(login.loginButton).toBeEnabled();
}

/** Verifies navigation to the Profile page after login. */
export async function expectLoginSucceeded(page: Page): Promise<void> {
  await expect(page).toHaveURL('https://demoqa.com/profile', { timeout: 15000 });
}
