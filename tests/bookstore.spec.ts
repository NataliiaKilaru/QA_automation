import { test } from '@playwright/test';

import { BookStoreActions } from '../pages/bookStore/bookStore.actions';
import { bookData } from '../test-data/books';

import {
  verifyBooksDisplayed,
  verifyBookDisplayed,
  verifyBookDetails,
  verifyNoBooksFound,
} from '../pages/bookStore/bookStore.assertions';

test.describe('Book Store', () => {
  const nonexistentTitle = 'Nonexistent Book 987654321';
  let bookStorePage: BookStoreActions;

  test.beforeEach(async ({ page }) => {
    bookStorePage = new BookStoreActions(page);
  });

  test('User can search for a book and open it', async () => {

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

  test('User can search for a nonexistent book and reset search', async () => {

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
});
