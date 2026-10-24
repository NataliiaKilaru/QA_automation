import { BookStoreLocators } from './bookStore.locators';
export class BookStoreActions extends BookStoreLocators {
  /**
   * Opens the specified Book Store navigation tab.
   *
   * @param tab - Name of the navigation tab to open.
   * @returns A promise that resolves when the operation completes.
   */
  async open(tab: string): Promise<void> {
    await this.openSection('Book Store Application', tab);
  }
  /**
   * Searches the Book Store for a book by title.
   *
   * @param bookName - Title of the book.
   * @returns A promise that resolves when the operation completes.
   */
  async searchBook(bookName: string): Promise<void> {
    await this.searchInput.fill(bookName);
  }

  /**
   * Adds the selected book to the user collection and captures the confirmation.
   * @returns A promise that resolves to the confirmation message.
   */
  async addBookToCollection(): Promise<string> {
    const dialogPromise = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
    await this.addToCollectionButton.click();
    return await dialogPromise;
  }

  /**
   * Opens the details page for the specified book.
   *
   * @param bookName - Title of the book.
   * @returns A promise that resolves when the operation completes.
   */
  async openBook(bookName: string): Promise<void> {
    await this.getBookLink(bookName).click();
  }
}
