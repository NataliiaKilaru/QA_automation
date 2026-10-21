import { expect } from '@playwright/test';
import { test } from '@playwright/test';
import { AccountApi, TestUser } from '../api/account.api';
import { BookStoreApi } from '../api/bookStore.api';

import { BookStorePage } from '../pages/bookStore/bookStore.page';
import { LoginPage } from '../pages/login/login.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { bookData } from '../test-data/books';

import {
  verifyBooksDisplayed,
  verifyBookDisplayed,
  verifyBookDetails,
  verifyNoBooksFound,
} from '../pages/bookStore/bookStore.assertions';

test.describe('Book Store', () => {
  test('User can search for a book and open it', async ({ page }) => {
    const bookStorePage = new BookStorePage(page);

    await test.step('Open Book Store', async () => {
      await bookStorePage.open('Book Store');
    });

    await test.step('Verify books are displayed', async () => {
      await verifyBooksDisplayed(
        bookStorePage,
        bookData.bookName,
      );
    });

    await test.step('Search for a book', async () => {
      await bookStorePage.searchBook(bookData.bookName);
    });

    await test.step('Verify searched book is displayed', async () => {
      await verifyBookDisplayed(
        bookStorePage,
        bookData.bookName,
      );
    });

    await test.step('Open searched book', async () => {
      await bookStorePage.openBook(bookData.bookName);
    });

    await test.step('Verify book details', async () => {
      await verifyBookDetails(bookStorePage, bookData);
    });
  });

  test('User can search for a nonexistent book and reset search', async ({ page }) => {
    const bookStorePage = new BookStorePage(page);
    const nonexistentTitle = 'Nonexistent Book 987654321';

    await test.step('Open Book Store', async () => {
      await bookStorePage.open('Book Store');
    });

    await test.step('Verify books are initially displayed', async () => {
      await verifyBooksDisplayed(bookStorePage, bookData.bookName);
    });

    await test.step('Search for a nonexistent book', async () => {
      await bookStorePage.searchBook(nonexistentTitle);
    });

    await test.step('Verify no matching books are displayed', async () => {
      await verifyNoBooksFound(bookStorePage);
    });

    await test.step('Clear search and verify books return', async () => {
      await bookStorePage.searchBook('');
      await verifyBooksDisplayed(bookStorePage, bookData.bookName);
    });
  });


  test.describe('Authenticated user scenarios', () => {
    let testUser: TestUser;
    let bookStoreApi: BookStoreApi;

    test.beforeEach(async ({ request }) => {
      const accountApi = new AccountApi(request);
      testUser = await accountApi.createUser();
      bookStoreApi = new BookStoreApi(request);
    });

    test.afterEach(async ({ request }) => {
      if (testUser) {
        await new AccountApi(request).deleteUser(testUser);
      }
    });

  test('Authenticated user can add a book to their collection', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const bookStorePage = new BookStorePage(page);

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
    const titleToRemove = 'Git Pocket Guide';
    const isbnToRemove = '9781449325862';
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

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
  test('User can log out and log in again via Profile page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    await test.step('Login with API-created user', async () => {
      await loginPage.open();
      await loginPage.login(testUser.username, testUser.password);
      await expect(profilePage.username).toHaveText(testUser.username);
    });

    await test.step('Log out', async () => {
      await profilePage.logout();
      await expect(page).toHaveURL('https://demoqa.com/login', { timeout: 15000 });
    });

    await test.step('Open Profile while logged out', async () => {
      await profilePage.open();
      await expect(profilePage.loginLink).toBeVisible();
      await expect(profilePage.registerLink).toBeVisible();
    });

    await test.step('Follow Login link from Profile', async () => {
      await profilePage.followLoginLink();
      await expect(page).toHaveURL('https://demoqa.com/login', { timeout: 15000 });
    });

    await test.step('Log in again and verify Profile', async () => {
      await loginPage.login(testUser.username, testUser.password);
      await expect(profilePage.username).toHaveText(testUser.username);
    });
  });
  });
});
