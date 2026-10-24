import { expect } from '@playwright/test';

import { WebTablesActions } from './webTables.actions';
import { Employee } from '../../types/employee';

/**
 * Verifies that the employee row displays the expected details.
 *
 * @param webTablesPage - Web Tables page object.
 * @param employee - Employee data to enter or verify.
 * @returns A promise that resolves when the operation completes.
 */
export async function verifyEmployeeRow(
  webTablesPage: WebTablesActions,
  employee: Employee,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(employee.email);

  await expect(employeeRow).toBeVisible();
  await expect(employeeRow).toContainText(employee.firstName);
  await expect(employeeRow).toContainText(employee.lastName);
  await expect(employeeRow).toContainText(employee.age);
  await expect(employeeRow).toContainText(employee.email);
  await expect(employeeRow).toContainText(employee.salary);
  await expect(employeeRow).toContainText(employee.department);
}

/**
 * Verifies that the email input contains the expected address.
 *
 * @param webTablesPage - Web Tables page object.
 * @param email - Email address identifying the employee.
 * @returns A promise that resolves when the operation completes.
 */
export async function verifyEmployeeEmailInput(
  webTablesPage: WebTablesActions,
  email: string,
) {
  await expect(webTablesPage.emailInput).toHaveValue(email);
}

/**
 * Verifies that the specified employee is present in the table.
 *
 * @param webTablesPage - Web Tables page object.
 * @param email - Email address identifying the employee.
 * @returns A promise that resolves when the operation completes.
 */
export async function verifyEmployeeExists(
  webTablesPage: WebTablesActions,
  email: string,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(email);

  await expect(employeeRow).toBeVisible();
}

/**
 * Verifies that the specified employee is absent from the table.
 *
 * @param webTablesPage - Web Tables page object.
 * @param email - Email address identifying the employee.
 * @returns A promise that resolves when the operation completes.
 */
export async function verifyEmployeeDeleted(
  webTablesPage: WebTablesActions,
  email: string,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(email);

  await expect(employeeRow).toHaveCount(0);
}
