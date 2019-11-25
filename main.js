// npm inquirer package
const inquirer = require("inquirer");

// customer scripts
const customer = require("./bamazonCustomer");

// supervisor scripts
const supervisor = require("./bamazonSupervisor");

// manager scripts
const manager = require("./bamazonManager")

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
        let SQLPassword = data.password;

        exports.SQLPassword = SQLPassword;

        login();
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

start();
