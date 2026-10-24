import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class WebTablesLocators extends BasePage {
  /**
   * Initializes the page object or API client with its required context.
   *
   * @param page - Playwright page used to interact with the browser.
   * @returns No return value.
   */
  constructor(page: Page) { super(page); }
  readonly firstNameInput = this.page.locator('#firstName');
  readonly lastNameInput = this.page.locator('#lastName');
  readonly emailInput = this.page.locator('#userEmail');
  readonly ageInput = this.page.locator('#age');
  readonly salaryInput = this.page.locator('#salary');
  readonly departmentInput = this.page.locator('#department');
  readonly addButton = this.page.getByRole('button', { name: 'Add' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

  /**
   * Returns the table row for the employee identified by email.
   *
   * @param email - Email address identifying the employee.
   * @returns The matching Playwright locator.
   */
  getEmployeeRowByEmail(email: string): Locator {
    return this.page.locator('tbody tr').filter({ hasText: email });
  }

  /**
   * Returns the edit button for the employee identified by email.
   *
   * @param email - Email address identifying the employee.
   * @returns The matching Playwright locator.
   */
  getEditButton(email: string): Locator {
    return this.getEmployeeRowByEmail(email).locator('[title="Edit"]');
  }

  /**
   * Returns the delete button for the employee identified by email.
   *
   * @param email - Email address identifying the employee.
   * @returns The matching Playwright locator.
   */
  getDeleteButton(email: string): Locator {
    return this.getEmployeeRowByEmail(email).locator('[title="Delete"]');
  }
}
