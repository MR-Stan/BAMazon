// npm mySQL package
const mysql = require("mysql");

// npm inquirer package
const inquirer = require("inquirer");

// customer scripts
const customer = require("./bamazonCustomer");

// supervisor scripts
const supervisor = require("./bamazonSupervisor");

// manager scripts
const manager = require("./bamazonManager")


let SQLPassword = "";

function start() {
    console.log("**************************");
    console.log("*** Welcome to BAMazon ***");
    console.log("**************************");
    loginSQL();
}

function loginSQL() {
    inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Enter your mySQL password:',
            mask: true
        }
    ]).then(data => {
        // set mySQL password to user input
        SQLPassword = data.password;
        // connect to SQL database
        connectSQL();
    })
}

// prompts user to select their login type
function login() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'user',
            message: 'Select your user type:',
            choices: [
                'Customer',
                'Supervisor',
                'Manager'
            ]
        }
    ]).then(data => {
        // determines which file run function to call - each contains unique functionality
        switch (data.user) {
            case "Customer":
                customer.chooseTransaction();
                break;
            case "Supervisor":
                supervisor.chooseTransaction();
                break;
            case "Manager":
                manager.chooseTransaction();
                break;
        }
    });
}

function connectSQL() {
    // create the connection information for the sql database
    let connection = mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: SQLPassword,
        database: "bamazon"
    });

    // connect to the mysql server and sql database
    connection.connect(function (err) {
        if (err) throw err;
        else {
            login();
        }
    });
}

start();