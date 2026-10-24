import { expect } from '@playwright/test';
import { ProfileLocators } from './profile.locators';

/**
 * Verifies that the specified book is visible in the profile.
 *
 * @param profile - Profile page object.
 * @param title - Title of the book.
 * @returns A promise that resolves when the operation completes.
 */
export async function expectProfileBookVisible(profile: ProfileLocators, title: string): Promise<void> {
  await expect(profile.getBookRow(title)).toBeVisible();
}

/**
 * Verifies that the specified book has been removed from the profile.
 *
 * @param profile - Profile page object.
 * @param title - Title of the book.
 * @returns A promise that resolves when the operation completes.
 */
export async function expectProfileBookRemoved(profile: ProfileLocators, title: string): Promise<void> {
  await expect(profile.getBookLink(title)).toHaveCount(0);
}

/**
 * Verifies that the account confirmation dialog is visible.
 *
 * @param profile - Profile page object.
 * @returns A promise that resolves when the operation completes.
 */
export async function expectConfirmationDialogVisible(profile: ProfileLocators): Promise<void> {
  await expect(profile.confirmationDialog).toBeVisible();
}

/**
 * Verifies that the confirmation button is enabled.
 *
 * @param profile - Profile page object.
 * @returns A promise that resolves when the operation completes.
 */
export async function expectConfirmationEnabled(profile: ProfileLocators): Promise<void> {
  await expect(profile.confirmationDialog.getByRole('button', { name: 'OK', exact: true })).toBeEnabled();
}
