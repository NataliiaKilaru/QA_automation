import { Page } from '@playwright/test';

export class BasePage {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param page - Playwright page used to interact with the browser.
   * @returns No return value.
   */
  constructor(public readonly page: Page) {}

  /**
   * Navigates to the specified URL.
   *
   * @param url - Destination URL.
   * @returns A promise that resolves when the operation completes.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Opens a navigation tab within the specified category.
   *
   * @param category - Name of the navigation category.
   * @param tab - Name of the navigation tab to open.
   * @returns A promise that resolves when the operation completes.
   */
  async openSection(category: string, tab: string): Promise<void> {
    await this.navigate('https://demoqa.com/');
    await this.page.locator('.card-body').filter({ hasText: category }).click();
    await this.page.getByText(tab, { exact: true }).click();
  }
}
