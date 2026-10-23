
import { test } from '@playwright/test';

import { WebTablesPage } from '../pages/webTables/webTables.page';
import {
  createEmployeeData,
  employeeToDelete,
  existingEmployee,
  updatedEmployee,
} from '../test-data/employees';

import {
  verifyEmployeeDeleted,
  verifyEmployeeEmailInput,
  verifyEmployeeExists,
  verifyEmployeeRow,
} from '../pages/webTables/webTables.assertions';

test.describe('Web Tables', () => {
  let webTablesPage: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.open('Web Tables');
  });

  test('User can create an employee', async () => {
    const employee = createEmployeeData();

    await test.step('Open registration form', async () => {
      await webTablesPage.openRegistrationForm();
    });

    await test.step('Fill and submit employee form', async () => {
      await webTablesPage.fillEmployeeForm(employee);
      await webTablesPage.submitForm();
    });

    await test.step('Verify employee was created', async () => {
      await verifyEmployeeRow(webTablesPage, employee);
    });
  });

  test('User can edit an employee', async () => {
    await test.step('Open employee for editing', async () => {
      await webTablesPage.editEmployeeByEmail(existingEmployee.email);
      await verifyEmployeeEmailInput(
        webTablesPage,
        existingEmployee.email,
      );
    });

    await test.step('Update employee information', async () => {
      await webTablesPage.fillEmployeeForm(updatedEmployee);
      await webTablesPage.submitForm();
    });

    await test.step('Verify employee was updated', async () => {
      await verifyEmployeeRow(webTablesPage, updatedEmployee);
    });
  });

  test('User can delete an employee', async () => {
    await test.step('Verify employee exists', async () => {
      await verifyEmployeeExists(
        webTablesPage,
        employeeToDelete.email,
      );
    });

    await test.step('Delete employee', async () => {
      await webTablesPage.deleteEmployeeByEmail(
        employeeToDelete.email,
      );
    });

    await test.step('Verify employee was deleted', async () => {
      await verifyEmployeeDeleted(
        webTablesPage,
        employeeToDelete.email,
      );
    });
  });
});
