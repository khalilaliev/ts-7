import { Employees } from "../types/type";

export interface HiredEmployees {
  name: string;
  lastName: string;
  income: number;
  accountNumber: string;
}

export interface Employee extends HiredEmployees {
  paymentInfo: string;
  status: Employees;
  department: Department;
}

export interface Budget {
  debit: number;
  credit: number;
}

export interface Department {
  name: string;
  domain: string;
  employees: Employee[];
  budget: Budget;
  calculateBalance(): number;
  addEmployee(employee: Employee): void;
  removeEmployee(employee: Employee): void;
}

export interface Company {
  name: string;
  departments: Department[];
  preHiredStaff: HiredEmployees[];
  allStaff: Employee[];
}
