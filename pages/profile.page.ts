import { expect, Locator, Page } from '@playwright/test';

export class ProfilePage {
  readonly username: Locator;
  constructor(private readonly page: Page) {
    this.username = page.locator('#userName-value');
  }

  async open() {
    await this.page.goto('https://demoqa.com/profile');
  }

  async openBookStore() {
    await this.page.goto('https://demoqa.com/books');
  }

  getBookLink(title: string): Locator {
    return this.page.getByRole('link', { name: title, exact: true });
  }

  getBookRow(title: string): Locator {
  return this.page.getByRole('row').filter({
    has: this.getBookLink(title),
  });
}


  async removeBook(title: string) {
    const row = this.getBookRow(title);
    await expect(row).toBeVisible();
    // DemoQA uses an id=delete-record-N button in each collection row.
    await row.locator('[id^="delete-record-"]').click();
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'OK', exact: true }).click();
    await expect(this.getBookLink(title)).toHaveCount(0);
  }
  async deleteAccount() {
  const deleteButton = this.page.getByRole('button', {
    name: 'Delete Account',
    exact: true,
  });

  await deleteButton.click();

  const confirmation = this.page.getByRole('dialog');
  const confirmButton = confirmation.getByRole('button', {
    name: 'OK',
    exact: true,
  });

  await expect(confirmation).toBeVisible();
  await expect(confirmButton).toBeEnabled();

  // Handle the native browser alert triggered by confirmation.
  this.page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await confirmButton.click();
}
}
