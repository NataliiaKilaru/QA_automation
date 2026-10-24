import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class ProfileLocators extends BasePage {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param page - Playwright page used to interact with the browser.
   * @returns No return value.
   */
  constructor(page: Page) { super(page); }
  readonly username = this.page.locator('#userName-value');
  readonly logoutButton = this.page.getByRole('button', { name: 'Logout', exact: true });
  readonly loginLink = this.page.getByRole('link', { name: 'login', exact: true });
  readonly registerLink = this.page.getByRole('link', { name: 'register', exact: true });
  readonly deleteAccountButton = this.page.getByRole('button', { name: 'Delete Account', exact: true });
  readonly confirmationDialog = this.page.getByRole('dialog');

  /**
   * Returns the link for the specified book.
   *
   * @param title - Title of the book.
   * @returns The matching Playwright locator.
   */
  getBookLink(title: string): Locator {
    return this.page.getByRole('link', { name: title, exact: true });
  }

  /**
   * Returns the row containing the specified book.
   *
   * @param title - Title of the book.
   * @returns The matching Playwright locator.
   */
  getBookRow(title: string): Locator {
    return this.page.getByRole('row').filter({ has: this.getBookLink(title) });
  }

  /**
   * Returns the remove button for the specified book.
   *
   * @param title - Title of the book.
   * @returns The matching Playwright locator.
   */
  getRemoveBookButton(title: string): Locator {
    return this.getBookRow(title).locator('[id^="delete-record-"]');
  }
}
