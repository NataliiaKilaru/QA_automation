import { test, expect } from '@playwright/test';
import { AccountApi, TestUser } from '../api/account.api';
import { LoginActions } from '../pages/login/login.actions';
import { ProfileActions } from '../pages/profile/profile.actions';

test.describe('Login', () => {
  const loginUrl = 'https://demoqa.com/login';
  const profileUrl = 'https://demoqa.com/profile';
  const validUsername = process.env.DEMOQA_USERNAME;
  const validPassword = process.env.DEMOQA_PASSWORD;
  const invalidPassword = 'IncorrectPasswordForNegativeTest!';
  let testUser: TestUser | undefined;

  test.afterEach(async ({ request }) => {
    if (testUser) {
      await new AccountApi(request).deleteUser(testUser);
      testUser = undefined;
    }
  });

  test.beforeAll(() => {
    if (!validUsername || !validPassword) {
      throw new Error('Set DEMOQA_USERNAME and DEMOQA_PASSWORD in .env');
    }
  });

  test('Successful login for valid user', { tag: '@smoke' }, async ({ page }) => {
    await page.goto(loginUrl);
    await page.locator('#userName').fill(validUsername!);
    await page.locator('#password').fill(validPassword!);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#userName-value')).toContainText(validUsername!);
    await expect(page).toHaveURL(profileUrl);
  });

  test('User cannot login with invalid password', async ({ page }) => {
    const errorMessage = page.locator('#name');
    await page.goto(loginUrl);
    await page.locator('#userName').fill(validUsername!);
    await page.locator('#password').fill(invalidPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(loginUrl);
    await expect(errorMessage).toHaveText('Invalid username or password!');
  });

  test('User can log out and log in again via Profile page', async ({ page, request }) => {
      const loginPage = new LoginActions(page);
      const profilePage = new ProfileActions(page);
      const user = await new AccountApi(request).createUser();
    testUser = user;

    await test.step('Login with API-created user', async () => {
      await loginPage.open();
      await loginPage.login(user.username, user.password);
      await expect(profilePage.username).toHaveText(user.username);
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
      await loginPage.login(user.username, user.password);
      await expect(profilePage.username).toHaveText(user.username);
    });
  });
});
