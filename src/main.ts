import {
  Budget,
  Company,
  Department,
  Employee,
  HiredEmployees,
} from "./interfaces/interface";

class DepartmentImpl implements Department {
  employees: Employee[] = [];

  constructor(
    public name: string,
    public domain: string,
    public budget: Budget
  ) {}

  calculateBalance(): number {
    return this.budget.credit - this.budget.debit;
  }

  addEmployee(employee: Employee): void {
    employee.department = this;
    this.employees.push(employee);
    this.budget.debit += employee.income;
  }

  removeEmployee(employee: Employee): void {
    this.employees = this.employees.filter((emp) => emp !== employee);
    this.budget.debit -= employee.income;
  }

  promoteHired(preHired: HiredEmployees): Employee {
    const employee: Employee = {
      ...preHired,
      paymentInfo: `${preHired.accountNumber}`,
      status: "active",
      department: this,
    };
    this.addEmployee(employee);
    return employee;
  }
}

class AccountingDepartment extends DepartmentImpl {
  balance: number = 0;

  constructor(name: string, domain: string, budget: Budget) {
    super(name, domain, budget);
  }

  takeOnBalance(entity: Department | Employee): void {
    if ("employees" in entity) {
      this.balance += entity.calculateBalance();
    } else {
      this.balance += (entity as Employee).income;
    }
  }

  removeFromBalance(entity: Department | Employee): void {
    if ("employees" in entity) {
      this.balance -= entity.calculateBalance();
    } else {
      this.balance -= (entity as Employee).income;
    }
  }

  paySalaries(): void {
    this.employees.forEach((employee) => {
      if (employee.status === "active") {
        this.balance -= employee.income;
        console.log(
          `Paid ${employee.income} to ${employee.name} ${employee.lastName}`
        );
      }
    });
  }
}

class CompanyImpl implements Company {
  departments: Department[] = [];
  preHiredStaff: HiredEmployees[] = [];
  allStaff: Employee[] = [];

  constructor(public name: string) {}

  addDepartment(department: Department): void {
    this.departments.push(department);
  }

  hirePreHired(preHired: HiredEmployees, department: DepartmentImpl): Employee {
    const employee = department.promoteHired(preHired);
    this.preHiredStaff = this.preHiredStaff.filter(
      (hired) => hired !== preHired
    );
    this.allStaff.push(employee);
    return employee;
  }
}

const company = new CompanyImpl("Microsoft");

const accountingDepartment = new AccountingDepartment(
  "Any name",
  "Any Domain",
  {
    credit: 122222,
    debit: 23333,
  }
);

const preHiredEmployee: HiredEmployees = {
  name: "Bucks",
  lastName: "Bob",
  accountNumber: "2222211114444",
  income: 3300,
};

company.addDepartment(accountingDepartment);
// console.log(company.hirePreHired(preHiredEmployee, accountingDepartment));

const hiredEmployee = company.hirePreHired(
  preHiredEmployee,
  accountingDepartment
);
console.log(hiredEmployee);
