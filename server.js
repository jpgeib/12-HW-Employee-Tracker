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



