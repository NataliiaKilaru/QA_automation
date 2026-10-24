import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class BookStoreLocators extends BasePage {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param page - Playwright page used to interact with the browser.
   * @returns No return value.
   */
  constructor(page: Page) { super(page); }
  readonly searchInput = this.page.locator('#searchBox');
  readonly bookDetailLinks = this.page.locator('a[href*="book="]');
  readonly isbnValue = this.page.locator('#ISBN-wrapper #userName-value');
  readonly titleValue = this.page.locator('#title-wrapper #userName-value');
  readonly authorValue = this.page.locator('#author-wrapper #userName-value');
  readonly publisherValue = this.page.locator('#publisher-wrapper #userName-value');
  readonly addToCollectionButton = this.page.getByRole('button', { name: 'Add To Your Collection' });

  /**
   * Returns the link for the specified book.
   *
   * @param bookName - Title of the book.
   * @returns The matching Playwright locator.
   */
  getBookLink(bookName: string): Locator {
    return this.page.getByRole('link', { name: bookName, exact: true });
  }
}
