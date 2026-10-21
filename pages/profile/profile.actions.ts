import { expectProfileBookVisible, expectProfileBookRemoved, expectConfirmationDialogVisible, expectConfirmationEnabled } from './profile.assertions';
import { ProfileLocators } from './profile.locators';

/** Actions supported by the Profile page. */
export class ProfileActions extends ProfileLocators {
  /** Opens the Profile page. */
  async open(): Promise<void> {
    await this.navigate('https://demoqa.com/profile');
  }

  /** Opens the Book Store page. */
  async openBookStore(): Promise<void> {
    await this.navigate('https://demoqa.com/books');
  }

  /** @param title - The title of the book to remove from the profile. */
  async removeBook(title: string): Promise<void> {
    await expectProfileBookVisible(this, title);
    await this.getRemoveBookButton(title).click();
    await expectConfirmationDialogVisible(this);
    await this.confirmationDialog.getByRole('button', { name: 'OK', exact: true }).click();
    await expectProfileBookRemoved(this, title);
  }

  /** Deletes the account using the Profile confirmation dialog. */
  async deleteAccount(): Promise<void> {
    await this.deleteAccountButton.click();
    const confirmButton = this.confirmationDialog.getByRole('button', { name: 'OK', exact: true });
    await expectConfirmationDialogVisible(this);
    await expectConfirmationEnabled(this);
    this.page.once('dialog', async (dialog) => { await dialog.accept(); });
    await confirmButton.click();
  }

  /** Logs out of the current account. */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  /** Follows the login link displayed for unauthenticated visitors. */
  async followLoginLink(): Promise<void> {
    await this.loginLink.click();
  }
}
