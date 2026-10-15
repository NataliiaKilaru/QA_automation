import { test } from '@playwright/test';

import { WebTablesPage } from '../pages/webTables.page';
import {
  createEmployeeData,
  employeeToDelete,
  existingEmployee,
  updatedEmployee,
} from '../test-data/employees';
import { WEB_TABLES } from '../test-descriptions/webTables.test-description';
import {
  verifyEmployeeDeleted,
  verifyEmployeeEmailInput,
  verifyEmployeeExists,
  verifyEmployeeRow,
} from '../helpers/webTables.helper';

test.describe(WEB_TABLES.describe, () => {
  let webTablesPage: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.open(WEB_TABLES.tab);
  });

  test(WEB_TABLES.tests.create, async () => {
    const employee = createEmployeeData();

    await webTablesPage.openRegistrationForm();
    await webTablesPage.fillEmployeeForm(employee);
    await webTablesPage.submitForm();

    await verifyEmployeeRow(webTablesPage, employee);
  });

  test(WEB_TABLES.tests.edit, async () => {
    await webTablesPage.editEmployeeByEmail(existingEmployee.email);
    await verifyEmployeeEmailInput(webTablesPage, existingEmployee.email);

    await webTablesPage.fillEmployeeForm(updatedEmployee);
    await webTablesPage.submitForm();

    await verifyEmployeeRow(webTablesPage, updatedEmployee);
  });

  test(WEB_TABLES.tests.delete, async () => {
    await verifyEmployeeExists(webTablesPage, employeeToDelete.email);

    await webTablesPage.deleteEmployeeByEmail(employeeToDelete.email);

    await verifyEmployeeDeleted(webTablesPage, employeeToDelete.email);
  });
});
