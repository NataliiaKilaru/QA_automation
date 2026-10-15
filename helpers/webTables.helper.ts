import { expect } from '@playwright/test';

import { WebTablesPage } from '../pages/webTables.page';
import { Employee } from '../types/employee';

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

export async function verifyEmployeeEmailInput(
  webTablesPage: WebTablesPage,
  email: string,
) {
  await expect(webTablesPage.emailInput).toHaveValue(email);
}

export async function verifyEmployeeExists(
  webTablesPage: WebTablesPage,
  email: string,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(email);

  await expect(employeeRow).toBeVisible();
}

export async function verifyEmployeeDeleted(
  webTablesPage: WebTablesPage,
  email: string,
) {
  const employeeRow = webTablesPage.getEmployeeRowByEmail(email);

  await expect(employeeRow).toHaveCount(0);
}
