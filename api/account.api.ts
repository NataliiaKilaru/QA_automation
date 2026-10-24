import { APIRequestContext, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

export const API_BASE_URL = 'https://bookstore.toolsqa.com';

export type TestUser = {
  userId: string;
  username: string;
  password: string;
  token: string;
  deleted?: boolean;
};

export class AccountApi {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param request - Playwright API request context.
   * @returns No return value.
   */
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Creates a unique test user and obtains an authorization token.
   * @returns A promise that resolves to the created test user.
   */
  async createUser(): Promise<TestUser> {
    const username = `qa_${randomUUID().replace(/-/g, '')}`;
    const password = 'TestPassword@123';
    const created = await this.request.post(`${API_BASE_URL}/Account/v1/User`, {
      data: { userName: username, password },
    });
    expect(created.status(), `Create user: ${await created.text()}`).toBe(201);
    const body = await created.json();
    const userId: string = body.userID;
    expect(userId).toBeTruthy();
    expect(body.username).toBe(username);

    const response = await this.request.post(`${API_BASE_URL}/Account/v1/GenerateToken`, {
      data: { userName: username, password },
    });
    expect(response.status(), `Generate token: ${await response.text()}`).toBe(200);
    const token: string = (await response.json()).token;
    expect(token).toBeTruthy();
    return { userId, username, password, token };
  }

  /**
   * Checks whether the specified user is authorized.
   *
   * @param user - Test account used for the operation.
   * @returns A promise that resolves to the authorization status.
   */
  async isUserAuthorized(user: TestUser): Promise<boolean> {
    const response = await this.request.post(`${API_BASE_URL}/Account/v1/Authorized`, {
      data: { userName: user.username, password: user.password },
    });
    expect([200, 404], `Authorized check: ${await response.text()}`).toContain(response.status());
    if (response.status() === 404) return false;
    const result: unknown = await response.json();
    expect(typeof result).toBe('boolean');
    return result as boolean;
  }

  /**
   * Deletes the specified test account if it still exists.
   *
   * @param user - Test account used for the operation.
   * @returns A promise that resolves when the operation completes.
   */
  async deleteUser(user: TestUser): Promise<void> {
    if (user.deleted) return;

    if (!(await this.isUserAuthorized(user))) return;

    const tokenResponse = await this.request.post(`${API_BASE_URL}/Account/v1/GenerateToken`, {
      data: { userName: user.username, password: user.password },
    });
    expect(tokenResponse.status(), `Generate cleanup token: ${await tokenResponse.text()}`).toBe(200);
    const tokenData = await tokenResponse.json();
    expect(tokenData.token).toBeTruthy();

    const response = await this.request.delete(`${API_BASE_URL}/Account/v1/User/${user.userId}`, {
      headers: { Authorization: `Bearer ${tokenData.token}` },
    });
    expect([204, 404], `Delete user: ${await response.text()}`).toContain(response.status());
  }
}
