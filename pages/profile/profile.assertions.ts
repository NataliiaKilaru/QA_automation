import { expect } from '@playwright/test';
import { ProfileLocators } from './profile.locators';

/** Verifies that the selected book is visible in the profile. */
export async function expectProfileBookVisible(profile: ProfileLocators, title: string): Promise<void> {
  await expect(profile.getBookRow(title)).toBeVisible();
}

/** Verifies that the selected book has been removed. */
export async function expectProfileBookRemoved(profile: ProfileLocators, title: string): Promise<void> {
  await expect(profile.getBookLink(title)).toHaveCount(0);
}

/** Verifies that the account confirmation dialog is visible. */
export async function expectConfirmationDialogVisible(profile: ProfileLocators): Promise<void> {
  await expect(profile.confirmationDialog).toBeVisible();
}

/** Verifies that the account confirmation button is enabled. */
export async function expectConfirmationEnabled(profile: ProfileLocators): Promise<void> {
  await expect(profile.confirmationDialog.getByRole('button', { name: 'OK', exact: true })).toBeEnabled();
}
