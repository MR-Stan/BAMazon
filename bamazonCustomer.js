var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "", // must enter password
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    run();
});

function run() {
    displayProducts();
    whatBuy();
}

// needs to display all of the items available for sale - include ids, names, and prices
function displayProducts() {

}

function howMany() {

}

function checkOrder() {
    if (item.quantity > 0) {

    }
    else {
        console.log(`Dear Valued Customer, \nWe apologize for the inconvenience, 
        but we're currently out of stock in your selected product. Please select
        another item and try again.`)
    }
}