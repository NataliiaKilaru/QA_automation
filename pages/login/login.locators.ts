import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class LoginLocators extends BasePage {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param page - Playwright page used to interact with the browser.
   * @returns No return value.
   */
  constructor(page: Page) { super(page); }
  readonly usernameInput = this.page.locator('#userName');
  readonly passwordInput = this.page.locator('#password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login', exact: true });
  readonly errorMessage = this.page.locator('#name');
}
