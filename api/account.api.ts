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
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Creates a unique test account and returns its credentials and token.
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

    // If token acquisition fails, the fixture cannot delete this account.
    // Report its ID for manual recovery instead of silently leaking it.
    try {
      const response = await this.request.post(`${API_BASE_URL}/Account/v1/GenerateToken`, {
        data: { userName: username, password },
      });
      expect(response.status(), `Generate token: ${await response.text()}`).toBe(200);
      const token: string = (await response.json()).token;
      expect(token).toBeTruthy();
      return { userId, username, password, token };
    } catch (error) {
      throw new Error(`Created user ${username} (${userId}) but could not obtain cleanup token: ${String(error)}`);
    }
  }

  /**
   * Checks whether the specified test account is authorized.
   * @param user - The test account.
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
   * Deletes the test account unless it has already been removed.
   * @param user - The test account.
   */
  async deleteUser(user: TestUser): Promise<void> {
    if (user.deleted) return;

    // A previous UI deletion may already have removed the account.
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
