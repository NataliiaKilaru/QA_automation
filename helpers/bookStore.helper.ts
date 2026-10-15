import { expect } from '@playwright/test';

import { BookStorePage } from '../pages/bookStore.page';
import { Book } from '../types/book';

export async function verifyBooksDisplayed(
  bookStorePage: BookStorePage,
  bookName: string,
) {
  await expect(
    bookStorePage.getBookLink(bookName),
  ).toBeVisible();
}

export async function verifyBookDisplayed(
  bookStorePage: BookStorePage,
  bookName: string,
) {
  await expect(
    bookStorePage.getBookLink(bookName),
  ).toBeVisible();
}

export async function verifyBookDetails(
  bookStorePage: BookStorePage,
  book: Book,
) {
  await expect(bookStorePage.titleValue).toHaveText(book.bookName);
  await expect(bookStorePage.authorValue).toHaveText(book.author);
  await expect(bookStorePage.publisherValue).toHaveText(book.publisher);
  await expect(bookStorePage.isbnValue).toHaveText(book.isbn);
}


// Verify that the filtered catalog contains no book-detail links.
export async function verifyNoBooksFound(bookStorePage: BookStorePage) {
  await expect(bookStorePage.bookDetailLinks).toHaveCount(0);
}
