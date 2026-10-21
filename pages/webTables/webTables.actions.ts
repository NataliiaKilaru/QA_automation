import { Employee } from '../../types/employee';
import { WebTablesLocators } from './webTables.locators';

/** Actions supported by the WebTables page. */
export class WebTablesActions extends WebTablesLocators {
  /** @param tab - The Web Tables navigation tab name. */
  async open(tab: string): Promise<void> {
    await this.openSection('Elements', tab);
  }

  /** Opens the employee registration dialog. */
  async openRegistrationForm(): Promise<void> {
    await this.addButton.click();
  }

  /** @param employee - The employee values to enter in the form. */
  async fillEmployeeForm(employee: Employee): Promise<void> {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.emailInput.fill(employee.email);
    await this.ageInput.fill(employee.age);
    await this.salaryInput.fill(employee.salary);
    await this.departmentInput.fill(employee.department);
  }

  /** Submits the employee form. */
  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  /** @param email - The email identifying the employee to edit. */
  async editEmployeeByEmail(email: string): Promise<void> {
    await this.getEditButton(email).click();
  }

  /** @param email - The email identifying the employee to delete. */
  async deleteEmployeeByEmail(email: string): Promise<void> {
    await this.getDeleteButton(email).click();
  }
}
