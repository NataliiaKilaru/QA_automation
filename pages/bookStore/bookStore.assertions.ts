import { expect } from '@playwright/test';

import { BookStorePage } from './bookStore.page';
import { Book } from '../../types/book';
//describe parameters in the annotations for the function
/** Verifies the verify books displayed expectation. */
export async function verifyBooksDisplayed(
  bookStorePage: BookStorePage,
  bookName: string,
) {
  await expect(
    bookStorePage.getBookLink(bookName),
  ).toBeVisible();
}
//describe parameters in the annotations for the function
/** Verifies the verify book displayed expectation. */
export async function verifyBookDisplayed(
  bookStorePage: BookStorePage,
  bookName: string,
) {
  await expect(
    bookStorePage.getBookLink(bookName),
  ).toBeVisible();
}
//describe parameters in the annotations for the function
/** Verifies the verify book details expectation. */
export async function verifyBookDetails(
  bookStorePage: BookStorePage,
  book: Book,
) {
  await expect(bookStorePage.titleValue).toHaveText(book.bookName);
  await expect(bookStorePage.authorValue).toHaveText(book.author);
  await expect(bookStorePage.publisherValue).toHaveText(book.publisher);
  await expect(bookStorePage.isbnValue).toHaveText(book.isbn);
}

//remove the comment and add parameters description to the function
// Verify that the filtered catalog contains no book-detail links.
/** Verifies the verify no books found expectation. */
export async function verifyNoBooksFound(bookStorePage: BookStorePage) {
  await expect(bookStorePage.bookDetailLinks).toHaveCount(0);
}
