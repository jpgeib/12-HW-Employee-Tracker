# HW 12 Employee Tracker

## Functionality

This assignment required creating a schema in mySQL Workbench containing information of a fictional company and its employees, and connecting it to the server.js. Once done, I created a main ```initialize()``` function that would display a list of choices in a dropdown menu format, made possible by the inquirer npm.

Each option in said list would fire off the following functions:

```
viewAllEmployees()
employeesByDept()
employeesByManager()
addEmployee()
removeEmployee()
updateEmployeeRole()
updateEmployeeManager()
viewAllRoles()
addRole()
```
When selected, each option will allow the user to respectively:

- View every employee in the database
- View every employee in the database according to their department
- View every employee in the database according to their manager
- Add an employee into the database
- Remove an employee from the database
- Update an employee's role ID
- Update an employee's manager ID
- View every role in the database
- Add a role into the database

## Technology Used

- MySQL Workbench
- Javascipt
- Node.js
- Inquirer

## Running the App

In order to use this employee tracker, make sure you install the following npms into the root folder:

```
npm i mysql
npm i inquire
```

Then, once everything is installed, in the root folder, enter:

```
node server.js
```
