import { expectProfileBookVisible, expectProfileBookRemoved, expectConfirmationDialogVisible, expectConfirmationEnabled } from './profile.assertions';
import { ProfileLocators } from './profile.locators';

export class ProfileActions extends ProfileLocators {
  /**
   * Opens the profile page.
   * @returns A promise that resolves when the operation completes.
   */
  async open(): Promise<void> {
    await this.navigate('https://demoqa.com/profile');
  }

  /**
   * Opens the Book Store page.
   * @returns A promise that resolves when the operation completes.
   */
  async openBookStore(): Promise<void> {
    await this.navigate('https://demoqa.com/books');
  }

  /**
   * Removes the specified book from the profile collection.
   *
   * @param title - Title of the book.
   * @returns A promise that resolves when the operation completes.
   */
  async removeBook(title: string): Promise<void> {
    await expectProfileBookVisible(this, title);
    await this.getRemoveBookButton(title).click();
    await expectConfirmationDialogVisible(this);
    await this.confirmationDialog.getByRole('button', { name: 'OK', exact: true }).click();
    await expectProfileBookRemoved(this, title);
  }

  /**
   * Deletes the current account using the confirmation dialog.
   * @returns A promise that resolves when the operation completes.
   */
  async deleteAccount(): Promise<void> {
    await this.deleteAccountButton.click();
    const confirmButton = this.confirmationDialog.getByRole('button', { name: 'OK', exact: true });
    await expectConfirmationDialogVisible(this);
    await expectConfirmationEnabled(this);
    this.page.once('dialog', async (dialog) => { await dialog.accept(); });
    await confirmButton.click();
  }

  /**
   * Signs out of the current account.
   * @returns A promise that resolves when the operation completes.
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Opens the login page using the profile login link.
   * @returns A promise that resolves when the operation completes.
   */
  async followLoginLink(): Promise<void> {
    await this.loginLink.click();
  }
}
