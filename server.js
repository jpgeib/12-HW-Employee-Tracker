//Boilerplate code
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
    // insecureAuth: true
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    initialize();
});

//My functions

//Main initialization function

function initialize() {
    inquirer.prompt({
        name: "MainMenu",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager",
            "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles"]
    }).then(function (answer) {
        if (answer.MainMenu === "View All Employees") {
            viewAllEmployees();
        } else if (answer.MainMenu === "View All Employees by Department") {
            employeesByDept();
        } else if (answer.MainMenu === "View All Employees by Manager") {
            employeesByManager();
        } else if (answer.MainMenu === "Add Employee") {
            addEmployee();
        } else if (answer.MainMenu === "Remove Employee") {
            removeEmployee();
        } else if (answer.MainMenu === "Update Employee Role") {
            updateEmployeeRole();
        } else if (answer.MainMenu === "Update Employee Manager") {
            updateEmployeeManager();
        } else if (answer.MainMenu === "View All Roles") {
            viewAllRoles();
        } else {
            console.log("Goodbye!");
            connection.end();
        };
    });
};

//View All Employees function

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
        }
        console.log("--------------------------------------");
        initialize();
    });
};

//View Employees by Department

function employeesByDept() {
    connection.query("SELECT first_name, last_name, role.title, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function (err, res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].first_name + " | " + res[i].last_name + " | " + res[i].name + " | " + res[i].title);
        }
        console.log("--------------------------------------");
        initialize();
    });
};

//View Employees by Manager

function employeesByManager() {
    connection.query("SELECT first_name, last_name, manager_id FROM employee", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].first_name + " | " + res[i].last_name + " | " + res[i].manager_id);
        }
        console.log("--------------------------------------");
        initialize();
    });
};

//Add an employee

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the ID of this employee's manager?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err) {
                if (err) throw err;
                console.log("Employee added, enjoy corporate America for the rest of your pitiful life!");
                initialize();
            }
        );
    });
}

//Remove an employee

function removeEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the ID of this employee's manager?"
        }
    ]).then(function (answer) {
        connection.query(
            "DELETE FROM employee WHERE ? AND ? AND ? AND ?",
            [{
                first_name: answer.firstname
            },
            { last_name: answer.lastname },
            { role_id: answer.role_id },
            {
                manager_id: answer.manager_id
            }],
            function (err) {
                if (err) throw err;
                console.log("Employee deleted, enjoy the rest of your pitiful life!");
                initialize();
            }
        );
    });
}

//Update an employee's role

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "input",
            message: "What is the employee's id?"
        },
        {
            name: "newRoleID",
            type: "input",
            message: "What is this employee's new role ID?"
        }
    ]).then(function (answer) {
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{
                role_id: answer.newRoleID
            },
            {
                id: answer.employeeID
            }],
            function (err) {
                if (err) throw err;
                console.log("Employee's role updated!");
                initialize();
            }
        );
    });
};

//Update employee's manager

function updateEmployeeManager() {
    inquirer.prompt([
        {
            name: "employeeToUpdate",
            type: "input",
            message: "What is the employee's ID?"
        },
        {
            name: "newManager",
            type: "input",
            message: "What is the new manager's ID?"
        }
    ]).then(function (answer) {
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{
                manager_id: answer.newManager
            },
            {
                id: answer.employeeToUpdate
            }],
            function (err) {
                if (err) throw err;
                console.log("Employee's manager updated!");
                initialize();
            }
        );
    });
};

//View all roles

function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
        }
        console.log("--------------------------------------");
        initialize();
    });
};