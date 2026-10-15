import { Locator, Page } from '@playwright/test';
import { Employee } from '../types/employee';

export class WebTablesPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;

  readonly addButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async open(tab: string) {
    await this.page.goto('https://demoqa.com/');

    await this.page
      .locator('.card-body')
      .filter({ hasText: 'Elements' })
      .click();

    await this.page.getByText(tab, { exact: true }).click();
  }

  async openRegistrationForm() {
    await this.addButton.click();
  }

  async fillEmployeeForm(employee: Employee) {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.emailInput.fill(employee.email);
    await this.ageInput.fill(employee.age);
    await this.salaryInput.fill(employee.salary);
    await this.departmentInput.fill(employee.department);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  getEmployeeRowByEmail(email: string): Locator {
    return this.page.locator('tbody tr').filter({
      hasText: email,
    });
  }

  async editEmployeeByEmail(email: string) {
    const employeeRow = this.getEmployeeRowByEmail(email);
    const editButton = employeeRow.locator('[title="Edit"]');

    await editButton.click();
  }

  async deleteEmployeeByEmail(email: string) {
    const employeeRow = this.getEmployeeRowByEmail(email);
    const deleteButton = employeeRow.locator('[title="Delete"]');

    await deleteButton.click();
  }
}
