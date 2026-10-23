import { BookStoreLocators } from './bookStore.locators';
//remove annotation for the class
/** Actions supported by the BookStore page. */
export class BookStoreActions extends BookStoreLocators {
  //add description to the method
  /** @param tab - The Book Store navigation tab name. */
  async open(tab: string): Promise<void> {
    await this.openSection('Book Store Application', tab);
  }
//add description to the method
  /** @param bookName - The title used to filter books. */
  async searchBook(bookName: string): Promise<void> {
    await this.searchInput.fill(bookName);
  }

  /**
   * Adds the current book to the user collection and accepts its native alert.
   * @returns The browser alert message.
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

  //add description to the method
  /** @param bookName - The exact title of the book to open. */
  async openBook(bookName: string): Promise<void> {
    await this.getBookLink(bookName).click();
  }
}
