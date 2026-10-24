import { Employee } from '../../types/employee';
import { WebTablesLocators } from './webTables.locators';

export class WebTablesActions extends WebTablesLocators {
  /**
   * Opens the specified Web Tables navigation tab.
   *
   * @param tab - Name of the navigation tab to open.
   * @returns A promise that resolves when the operation completes.
   */
  async open(tab: string): Promise<void> {
    await this.openSection('Elements', tab);
  }

  /**
   * Opens the employee registration form.
   * @returns A promise that resolves when the operation completes.
   */
  async openRegistrationForm(): Promise<void> {
    await this.addButton.click();
  }

  /**
   * Fills the employee form with the supplied data.
   *
   * @param employee - Employee data to enter or verify.
   * @returns A promise that resolves when the operation completes.
   */
  async fillEmployeeForm(employee: Employee): Promise<void> {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.emailInput.fill(employee.email);
    await this.ageInput.fill(employee.age);
    await this.salaryInput.fill(employee.salary);
    await this.departmentInput.fill(employee.department);
  }

  /**
   * Submits the employee form.
   * @returns A promise that resolves when the operation completes.
   */
  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Opens the edit form for the employee identified by email.
   *
   * @param email - Email address identifying the employee.
   * @returns A promise that resolves when the operation completes.
   */
  async editEmployeeByEmail(email: string): Promise<void> {
    await this.getEditButton(email).click();
  }

  /**
   * Deletes the employee identified by email.
   *
   * @param email - Email address identifying the employee.
   * @returns A promise that resolves when the operation completes.
   */
  async deleteEmployeeByEmail(email: string): Promise<void> {
    await this.getDeleteButton(email).click();
  }
}
