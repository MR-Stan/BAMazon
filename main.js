let mysql = require("mysql");
let inquirer = require("inquirer");

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
                console.log("Nice braj");
                break;
            case "Supervisor":
                console.log("Nice braj");
                break;
            case "Manager":
                console.log("Nice braj");
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