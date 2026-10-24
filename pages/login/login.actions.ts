import { expectLoginFormReady, expectLoginSucceeded } from './login.assertions';
import { LoginLocators } from './login.locators';

export class LoginActions extends LoginLocators {
  /**
   * Opens the login page.
   * @returns A promise that resolves when the operation completes.
   */
  async open(): Promise<void> {
    await this.navigate('https://demoqa.com/login');
    await expectLoginFormReady(this);
  }

  /**
   * Signs in using the provided credentials.
   *
   * @param username - Username for authentication.
   * @param password - Password for authentication.
   * @returns A promise that resolves when the operation completes.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expectLoginSucceeded(this.page);
  }
}
