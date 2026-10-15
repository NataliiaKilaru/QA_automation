import { test as base } from '@playwright/test';
import { AccountApi, TestUser } from '../api/account.api';
import { BookStoreApi } from '../api/bookStore.api';

type Fixtures = {
  testUser: TestUser;
  bookStoreApi: BookStoreApi;
};

export const test = base.extend<Fixtures>({
  testUser: async ({ request }, use) => {
    const account = new AccountApi(request);
    const user = await account.createUser();
    try {
      await use(user);
    } finally {
      // Deleting the user also removes their book collection.
      await account.deleteUser(user);
    }
  },
  bookStoreApi: async ({ request }, use) => {
    await use(new BookStoreApi(request));
  },
});

export { expect } from '@playwright/test';
