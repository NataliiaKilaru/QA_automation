import { APIRequestContext, expect } from '@playwright/test';
import { API_BASE_URL, TestUser } from './account.api';

export class BookStoreApi {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param request - Playwright API request context.
   * @returns No return value.
   */
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Adds a book to the user collection through the API and verifies the result.
   *
   * @param user - Test account used for the operation.
   * @param isbn - ISBN of the book.
   * @returns A promise that resolves when the operation completes.
   */
  async addBook(user: TestUser, isbn: string): Promise<void> {
    const response = await this.request.post(`${API_BASE_URL}/BookStore/v1/Books`, {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { userId: user.userId, collectionOfIsbns: [{ isbn }] },
    });
    expect(response.status(), `Seed ISBN ${isbn}: ${await response.text()}`).toBe(201);

    const profile = await this.request.get(`${API_BASE_URL}/Account/v1/User/${user.userId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    expect(profile.status()).toBe(200);
    const body = await profile.json();
    expect(body.books.some((book: { isbn: string }) => book.isbn === isbn)).toBe(true);
  }
}
