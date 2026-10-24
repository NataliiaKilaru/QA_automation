import { expect } from '@playwright/test';

import { BookStoreActions } from './bookStore.actions';
import { Book } from '../../types/book';
export async function verifyBooksDisplayed(
  bookStorePage: BookStoreActions,
  bookName: string,
) {
  await expect(
    bookStorePage.getBookLink(bookName),
  ).toBeVisible();
}
export async function verifyBookDisplayed(
  bookStorePage: BookStoreActions,
  bookName: string,
) {
  await expect(
    bookStorePage.getBookLink(bookName),
  ).toBeVisible();
}
export async function verifyBookDetails(
  bookStorePage: BookStoreActions,
  book: Book,
) {
  await expect(bookStorePage.titleValue).toHaveText(book.bookName);
  await expect(bookStorePage.authorValue).toHaveText(book.author);
  await expect(bookStorePage.publisherValue).toHaveText(book.publisher);
  await expect(bookStorePage.isbnValue).toHaveText(book.isbn);
}

export async function verifyNoBooksFound(bookStorePage: BookStoreActions) {
  await expect(bookStorePage.bookDetailLinks).toHaveCount(0);
}
