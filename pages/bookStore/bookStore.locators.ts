import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

//remove annotation for the class
/** Locators for the BookStore page. */
export class BookStoreLocators extends BasePage {
  constructor(page: Page) { super(page); }
  readonly searchInput = this.page.locator('#searchBox');
  readonly bookDetailLinks = this.page.locator('a[href*="book="]');
  readonly isbnValue = this.page.locator('#ISBN-wrapper #userName-value');
  readonly titleValue = this.page.locator('#title-wrapper #userName-value');
  readonly authorValue = this.page.locator('#author-wrapper #userName-value');
  readonly publisherValue = this.page.locator('#publisher-wrapper #userName-value');
  readonly addToCollectionButton = this.page.getByRole('button', { name: 'Add To Your Collection' });

  //add description to the method
  /** @param bookName - The exact title of the book. */
  getBookLink(bookName: string): Locator {
    return this.page.getByRole('link', { name: bookName, exact: true });
  }
}
