//Boilerplate code
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

connection.connect(function(err) {
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
    }).then(function(answer) {
        if (answer.MainMenu === "View All Employees") {
            viewAllEmployees();
        } else if(answer.MainMenu === "View All Employees by Department") {
            employeesByDept();
        } else if(answer.MainMenu === "View All Employees by Manager") {
            employeesByManager();
        } else if(answer.MainMenu === "Add Employee") {
            addEmployee();
        } else if(answer.MainMenu === "Remove Employee") {
            removeEmployee();
        } else if(answer.MainMenu === "Update Employee Role") {
            updateEmployeeRole();
        } else if(answer.MainMenu === "Update Employee Manager") {
            updateEmployeeManager();
        } else if(answer.MainMenu === "View All Roles") {
            viewAllRoles();
        } else {
            connection.end();
        };
    });
};

//View All Employees function

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
        }
        console.log("--------------------------------------");
    });
};

//View Employees by Department

function employeesByDept() {
    connection.query("SELECT first_name, last_name FROM employee INNER JOIN department ON employee.first_name = department.name", function(err, res) {
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].employee.first_name + " | " + res[i].employee.last_name + " | " + res[i].department.name);
        }
        console.log("--------------------------------------");
    });
};

//View Employees by Manager

function employeesByManager() {
    connection.query("SELECT first_name, last_name, manager_id FROM employee", function(err, res) {
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].employee.first_name + " | " + res[i].employee.last_name + " | " + res[i].manager_id);
        }
        console.log("--------------------------------------");
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
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: role_id,
                manager_id: manager_id
            },
            function(err) {
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
    ]).then(function(answer) {
        connection.query(
            "DELETE FROM employee WHERE ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: role_id,
                manager_id: manager_id
            },
            function(err) {
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
            name: "employeeToUpdate",
            type: "input",
            message: "Which employee's information would you like to update?"
        },
        {
            name: "employeeInfo",
            type: "list",
            message: "Which information would you like to update?",
            choices: ["First Name", "Last Name", "Role ID", "Manager ID"]
        }
    ])
}