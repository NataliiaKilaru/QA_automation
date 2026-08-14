import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pages/webTables.page';
import {
  createEmployeeData,
  existingEmployee,
  updatedEmployee,
} from '../test-data/employees';

test('Verify that user can create a new record', async ({ page }) => {
  const employee = createEmployeeData();
  const webTablesPage = new WebTablesPage(page);

  await webTablesPage.open();
  await webTablesPage.addButton.click();
  await webTablesPage.fillEmployeeForm(employee);
  await webTablesPage.submitForm();

  const employeeRow =
    webTablesPage.getEmployeeRowByEmail(employee.email);

  await expect(employeeRow).toBeVisible();
  await expect(employeeRow).toContainText(employee.firstName);
  await expect(employeeRow).toContainText(employee.lastName);
  await expect(employeeRow).toContainText(employee.age);
  await expect(employeeRow).toContainText(employee.email);
  await expect(employeeRow).toContainText(employee.salary);
  await expect(employeeRow).toContainText(employee.department);
});

test('Verify that the user can edit an existing record', async ({ page }) => {
  const webTablesPage = new WebTablesPage(page);

  await webTablesPage.open();
  await webTablesPage.editEmployeeByEmail(existingEmployee.email);

  await expect(webTablesPage.emailInput)
    .toHaveValue(existingEmployee.email);

  await webTablesPage.fillEmployeeForm(updatedEmployee);
  await webTablesPage.submitForm();

  const updatedEmployeeRow =
    webTablesPage.getEmployeeRowByEmail(updatedEmployee.email);

  await expect(updatedEmployeeRow).toBeVisible();
  await expect(updatedEmployeeRow).toContainText(updatedEmployee.firstName);
  await expect(updatedEmployeeRow).toContainText(updatedEmployee.lastName);
  await expect(updatedEmployeeRow).toContainText(updatedEmployee.age);
  await expect(updatedEmployeeRow).toContainText(updatedEmployee.email);
  await expect(updatedEmployeeRow).toContainText(updatedEmployee.salary);
  await expect(updatedEmployeeRow).toContainText(updatedEmployee.department);
});