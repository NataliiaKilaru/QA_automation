import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

/** Locators for the WebTables page. */
export class WebTablesLocators extends BasePage {
  constructor(page: Page) { super(page); }
  readonly firstNameInput = this.page.locator('#firstName');
  readonly lastNameInput = this.page.locator('#lastName');
  readonly emailInput = this.page.locator('#userEmail');
  readonly ageInput = this.page.locator('#age');
  readonly salaryInput = this.page.locator('#salary');
  readonly departmentInput = this.page.locator('#department');
  readonly addButton = this.page.getByRole('button', { name: 'Add' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

  /** @param email - The email identifying an employee row. */
  getEmployeeRowByEmail(email: string): Locator {
    return this.page.locator('tbody tr').filter({ hasText: email });
  }

  /** @param email - The email identifying the row to edit. */
  getEditButton(email: string): Locator {
    return this.getEmployeeRowByEmail(email).locator('[title="Edit"]');
  }

  /** @param email - The email identifying the row to delete. */
  getDeleteButton(email: string): Locator {
    return this.getEmployeeRowByEmail(email).locator('[title="Delete"]');
  }
}
