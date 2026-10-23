import { expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookStore/bookStore.page';
import { ProfilePage } from '../pages/profile/profile.page';

// Idempotent setup/cleanup: no dependence on the order of Playwright tests.
/** Performs the ensureBookAbsent helper operation. */
export async function ensureBookAbsent(profile: ProfilePage, title: string) {
  await profile.open();
  if (await profile.getBookLink(title).count() > 0) {
    await profile.removeBook(title);
  }
  await expect(profile.getBookLink(title)).toHaveCount(0);
}

/** Performs the ensureBookPresent helper operation. */
export async function ensureBookPresent(
  profile: ProfilePage,
  store: BookStorePage,
  title: string,
) {
  await profile.open();
  if (await profile.getBookLink(title).count() === 0) {
    await profile.openBookStore();
    await store.searchBook(title);
    await expect(store.getBookLink(title)).toBeVisible();
    await store.openBook(title);
    const confirmation = await store.addBookToCollection();
    expect(confirmation).toMatch(/added/i);
    await profile.open();
  }
  await expect(profile.getBookLink(title)).toBeVisible();
}
