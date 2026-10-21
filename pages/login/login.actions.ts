import { expectLoginFormReady, expectLoginSucceeded } from './login.assertions';
import { LoginLocators } from './login.locators';

/** Actions supported by the Login page. */
export class LoginActions extends LoginLocators {
  /** Opens the login page and waits for the form to become usable. */
  async open(): Promise<void> {
    await this.navigate('https://demoqa.com/login');
    await expectLoginFormReady(this);
  }

  /**
   * Logs in through the UI and waits for the Profile page.
   * @param username - The account username.
   * @param password - The account password.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expectLoginSucceeded(this.page);
  }
}
