import { expect } from '@playwright/test';

import { WebTablesPage } from './webTables.page';
import { Employee } from '../../types/employee';

/** Verifies the verify employee row expectation. */
export async function verifyEmployeeRow(
  webTablesPage: WebTablesPage,
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

/** Verifies the verify employee email input expectation. */
export async function verifyEmployeeEmailInput(
  webTablesPage: WebTablesPage,
  email: string,
) {
  await expect(webTablesPage.emailInput).toHaveValue(email);
}

/** Verifies the verify employee exists expectation. */
export async function verifyEmployeeExists(
  webTablesPage: WebTablesPage,
  email: string,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(email);

  await expect(employeeRow).toBeVisible();
}

/** Verifies the verify employee deleted expectation. */
export async function verifyEmployeeDeleted(
  webTablesPage: WebTablesPage,
  email: string,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(email);

  await expect(employeeRow).toHaveCount(0);
}
