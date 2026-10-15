import { Locator, Page } from '@playwright/test';

export class BookStorePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly bookDetailLinks: Locator;
  readonly isbnValue: Locator;
  readonly titleValue: Locator;
  readonly authorValue: Locator;
  readonly publisherValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#searchBox');
    this.bookDetailLinks = page.locator('a[href*="book="]');
    this.isbnValue = page.locator('#ISBN-wrapper #userName-value');
    this.titleValue = page.locator('#title-wrapper #userName-value');
    this.authorValue = page.locator('#author-wrapper #userName-value');
    this.publisherValue = page.locator('#publisher-wrapper #userName-value');
  }

  async open(tab: string) {
    await this.page.goto('https://demoqa.com/');
    await this.page.locator('.card-body').filter({ hasText: 'Book Store Application' }).click();
    await this.page.getByText(tab, { exact: true }).click();
  }

  async searchBook(bookName: string) {
    await this.searchInput.fill(bookName);
  }

  getBookLink(bookName: string): Locator {
    return this.page.getByRole('link', { name: bookName, exact: true });
  }

  async addBookToCollection(): Promise<string> {
    // DemoQA displays a native JavaScript alert after the operation.
    const dialogPromise = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
    await this.page.getByRole('button', { name: 'Add To Your Collection' }).click();
    return await dialogPromise;
  }

  async openBook(bookName: string) {
    await this.getBookLink(bookName).click();
  }
}
