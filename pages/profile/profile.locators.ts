import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

/** Locators for the Profile page. */
export class ProfileLocators extends BasePage {
  constructor(page: Page) { super(page); }
  readonly username = this.page.locator('#userName-value');
  readonly logoutButton = this.page.getByRole('button', { name: 'Logout', exact: true });
  readonly loginLink = this.page.getByRole('link', { name: 'login', exact: true });
  readonly registerLink = this.page.getByRole('link', { name: 'register', exact: true });
  readonly deleteAccountButton = this.page.getByRole('button', { name: 'Delete Account', exact: true });
  readonly confirmationDialog = this.page.getByRole('dialog');

  /** @param title - The exact book title. */
  getBookLink(title: string): Locator {
    return this.page.getByRole('link', { name: title, exact: true });
  }

  /** @param title - The title of the book in the collection row. */
  getBookRow(title: string): Locator {
    return this.page.getByRole('row').filter({ has: this.getBookLink(title) });
  }

  /** @param title - The title of the book to delete. */
  getRemoveBookButton(title: string): Locator {
    return this.getBookRow(title).locator('[id^="delete-record-"]');
  }
}
