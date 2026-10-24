import { test, expect } from '@playwright/test';
import { AccountApi, TestUser } from '../api/account.api';
import { BookStoreApi } from '../api/bookStore.api';
import { BookStoreActions } from '../pages/bookStore/bookStore.actions';
import { LoginActions } from '../pages/login/login.actions';
import { ProfileActions } from '../pages/profile/profile.actions';
import { bookData } from '../test-data/books';
import { verifyBookDisplayed, verifyBookDetails } from '../pages/bookStore/bookStore.assertions';

test.describe('Book Collection', () => {
  const titleToRemove = 'Git Pocket Guide';
  const isbnToRemove = '9781449325862';
  let bookStorePage: BookStoreActions;
  let testUser: TestUser;

  let bookStoreApi: BookStoreApi;
  let accountApi: AccountApi;
  let loginPage: LoginActions;
  let profilePage: ProfileActions;

  test.beforeEach(async ({ request, page }) => {
    bookStorePage = new BookStoreActions(page);
    loginPage = new LoginActions(page);
    profilePage = new ProfileActions(page);
    accountApi = new AccountApi(request);
    testUser = await accountApi.createUser();
    bookStoreApi = new BookStoreApi(request);
  });

  test.afterEach(async () => {
    if (testUser) {
      await accountApi.deleteUser(testUser);
    }
  });

  test('Authenticated user can add a book to their collection', async () => {

    await test.step('Login as isolated user', async () => {
      await loginPage.open();
      await loginPage.login(testUser.username, testUser.password);
      await expect(profilePage.username).toHaveText(testUser.username);
    });

    await test.step('Search and open book', async () => {
      await profilePage.openBookStore();
      await bookStorePage.searchBook(bookData.bookName);
      await verifyBookDisplayed(bookStorePage, bookData.bookName);
      await bookStorePage.openBook(bookData.bookName);
      await verifyBookDetails(bookStorePage, bookData);
    });

    await test.step('Add book using UI', async () => {
      const confirmation = await bookStorePage.addBookToCollection();
      expect(confirmation).toMatch(/added/i);
    });

    await test.step('Verify book is saved in Profile', async () => {
      await profilePage.open();
      await expect(profilePage.getBookLink(bookData.bookName)).toBeVisible();
    });
  });

  test('Authenticated user can remove a book from their collection', async ({ page }) => {

    await test.step('Arrange: add book through API', async () => {
      await bookStoreApi.addBook(testUser, isbnToRemove);
    });

    await test.step('Login as isolated user', async () => {
      await loginPage.open();
      await loginPage.login(testUser.username, testUser.password);
      await expect(profilePage.username).toHaveText(testUser.username);
    });

    await test.step('Verify precondition: book is in Profile', async () => {
      await expect(profilePage.getBookLink(titleToRemove)).toBeVisible();
    });

    await test.step('Delete book through UI', async () => {
      await profilePage.removeBook(titleToRemove);
    });

    await test.step('Verify deletion persists after reload', async () => {
      await page.reload();
      await expect(profilePage.getBookLink(titleToRemove)).toHaveCount(0);
    });
  });
});
