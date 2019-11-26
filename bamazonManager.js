// npm inquirer package
const inquirer = require("inquirer");

// customer scripts
const customer = require("./bamazonCustomer");

let managerMethods = {
    // prompts customer to select a transaction
    chooseTransaction: function () {
        inquirer.prompt([
            {
                type: 'list',
                name: 'transaction',
                message: 'Select a transaction:',
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
                ]
            }
        ]).then(data => {
            // determines which file run function to call - each contains unique functionality
            switch (data.transaction) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    process.exit();
                    break;
            }
        });
    }
}

// list available items - IDs, names, prices, and quantities
function viewProducts() {
    // need to move these outside of function
    const config = require("./databaseConfig");
    let connection = config.connection;

    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                console.log("---------------------------------------------------------------------------------------------------")
                console.log(
                    "Item ID: " + res[i].item_id +
                    " | Name: " + res[i].product_name +
                    " | Department: " + res[i].department_name +
                    " | Price: $" + res[i].price +
                    " | Quantity in Stock: " + res[i].stock_quantity
                );
                console.log("---------------------------------------------------------------------------------------------------")
                if (i === res.length - 1) {
                    customer.chooseTransaction();
                }
            }
        });
}

// list all items with count < 5
function lowInventory() {

}

// display prompt that will let user add more of any item in store
function addInventory() {

}

// add new item to store
function addProduct() {

}


module.exports = managerMethods;