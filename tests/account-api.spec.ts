
import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

const BASE_URL = 'https://bookstore.toolsqa.com';

test('API: create, verify and delete test user', async ({ request }) => {
  const userName = `qa_${randomUUID().replace(/-/g, '')}`;
  const password = 'TestPassword@123';

  let userId: string | undefined;
  let token: string | undefined;
  let deleted = false;
//structure of the test is unclear
// remove try block
  try {
    // 1. Create user
    const createResponse = await request.post(
      `${BASE_URL}/Account/v1/User`,
      { data: { userName, password } }
    );

    console.log('CREATE:', createResponse.status(),
      await createResponse.text());

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    userId = createdUser.userID ?? createdUser.userId;

    expect(userId).toBeTruthy();
    expect(createdUser.username).toBe(userName);

    // 2. Generate token
    const tokenResponse = await request.post(
      `${BASE_URL}/Account/v1/GenerateToken`,
      { data: { userName, password } }
    );

    expect(tokenResponse.status()).toBe(200);

    const tokenData = await tokenResponse.json();
    token = tokenData.token;

    expect(token).toBeTruthy();

    // 3. Verify profile and empty collection
    const profileResponse = await request.get(
      `${BASE_URL}/Account/v1/User/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    expect(profileResponse.status()).toBe(200);

    const profile = await profileResponse.json();
    expect(profile.username).toBe(userName);
    expect(profile.books).toEqual([]);

    // 4. Delete user
    const deleteResponse = await request.delete(
      `${BASE_URL}/Account/v1/User/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('DELETE:', deleteResponse.status());

    expect(deleteResponse.status()).toBe(204);
    deleted = true;

    // 5. Verify deleted user cannot authorize
const authResponse = await request.post(
  `${BASE_URL}/Account/v1/Authorized`,
  { data: { userName, password } }
);

const status = authResponse.status();
const body = await authResponse.text();

console.log('AUTH AFTER DELETE:', status, body);

if (status === 200) {
  expect(JSON.parse(body)).toBe(false);
} else {
  expect(status).toBe(404);
}

    console.log('PASS: user lifecycle verified');
  } finally {
    // Best-effort cleanup if an earlier assertion failed
    if (userId && !deleted) {
      try {
        if (!token) {
          const response = await request.post(
            `${BASE_URL}/Account/v1/GenerateToken`,
            { data: { userName, password }, timeout: 10000 }
          );
          if (response.ok()) {
            token = (await response.json()).token;
          }
        }

        if (token) {
          const response = await request.delete(
            `${BASE_URL}/Account/v1/User/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              timeout: 10000
            }
          );
          console.log('CLEANUP:', response.status());
        }
      } catch (error) {
        console.error('CLEANUP FAILED:', error);
      }
    }
  }
});
