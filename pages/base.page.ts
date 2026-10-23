import { Page } from '@playwright/test';

/** Provides shared navigation methods for all page objects. */
export class BasePage {
  constructor(public readonly page: Page) {}

  /**
   * Navigates to the specified URL.
   * @param url - The absolute URL of the destination page.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Opens a section of DemoQA using its category card and navigation tab.
   * @param category - The category displayed on the homepage card.
   * @param tab - The exact navigation tab text.
   */
  async openSection(category: string, tab: string): Promise<void> {
    await this.navigate('https://demoqa.com/');
    await this.page.locator('.card-body').filter({ hasText: category }).click();
    await this.page.getByText(tab, { exact: true }).click();
  }
}
