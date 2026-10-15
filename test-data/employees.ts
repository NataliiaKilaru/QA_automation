import { Employee } from '../types/employee';

export const createEmployeeData = (): Employee => ({
  firstName: 'Natalia',
  lastName: 'Kilaru',
  email: `natalia${Date.now()}@test.com`,
  age: '41',
  salary: '7000',
  department: 'QA',
});

export const existingEmployee: Employee = {
  firstName: 'Cierra',
  lastName: 'Vega',
  email: 'cierra@example.com',
  age: '39',
  salary: '10000',
  department: 'Insurance',
};

export const updatedEmployee: Employee = {
  firstName: 'Cierraupdated',
  lastName: 'Vegaupdated',
  email: 'cierraupdated@example.com',
  age: '50',
  salary: '16870',
  department: 'Development',
};

export const employeeToDelete = {
  email: 'alden@example.com',
};
