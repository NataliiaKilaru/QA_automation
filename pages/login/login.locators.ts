import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

/** Locators for the Login page. */
export class LoginLocators extends BasePage {
  constructor(page: Page) { super(page); }
  readonly usernameInput = this.page.locator('#userName');
  readonly passwordInput = this.page.locator('#password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login', exact: true });
  readonly errorMessage = this.page.locator('#name');
}
