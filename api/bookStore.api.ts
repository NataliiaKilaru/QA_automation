import { APIRequestContext, expect } from '@playwright/test';
import { API_BASE_URL, TestUser } from './account.api';

export class BookStoreApi {
  constructor(private readonly request: APIRequestContext) {}

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
