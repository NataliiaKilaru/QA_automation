import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', {
      name: 'Login',
      exact: true,
    });
    this.errorMessage = page.locator('#name');
  }

  async open() {
    await this.page.goto('https://demoqa.com/login');

    // Wait until the login form is ready
    await expect(this.usernameInput).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Wait for successful authorization
    await expect(this.page).toHaveURL(
      'https://demoqa.com/profile',
      { timeout: 15000 }
    );
  }
}