// npm inquirer package
const inquirer = require("inquirer");

// customer scripts
const customer = require("./bamazonCustomer");

const Product = require("./product");

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
    // need to move these outside of function
    const config = require("./databaseConfig");
    let connection = config.connection;

    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5",
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

// display prompt that will let user add more of any item in store
function addInventory() {
    const config = require("./databaseConfig");
    let connection = config.connection;

    inquirer.prompt([
        {
            type: 'number', // need to validate
            name: 'itemid',
            message: 'Enter the ID number of the item you\'d like increase stock: ',
        }
    ]).then(data => {
        connection.query(
            "SELECT * FROM products WHERE item_id =" + data.itemid,
            {
                item_id: data.itemid
            },
            function (err, res) {
                if (err) throw err;
                else if (res[0].stock_quantity > 0) {
                    currentItem = res[0];
                    console.log("---------------------------------------------------------------------------------------------------")
                    console.log(
                        "Item ID: " + res[0].item_id +
                        " | Name: " + res[0].product_name +
                        " | Department: " + res[0].department_name +
                        " | Price: $" + res[0].price +
                        " | Quantity in Stock: " + res[0].stock_quantity
                    );
                    console.log("---------------------------------------------------------------------------------------------------")
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'answer',
                            message: 'You\'ve selected ' + res[0].product_name + '. Is this correct?',
                            choices: [
                                'Yes',
                                'No'
                            ]
                        }
                    ]).then(data => {
                        if (data.answer === 'Yes') {
                            inquirer.prompt([
                                {
                                    type: 'number', // need to validate
                                    name: 'quantity',
                                    message: 'How much stock would you like to add?',
                                }
                            ]).then(data => {
                                let quantity = data.quantity;
                                if (quantity > 0) {
                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'answer',
                                            message: 'Are you sure you want to add ' + quantity + " " + currentItem.product_name + "'s?",
                                            choices: [
                                                'Yes',
                                                'No'
                                            ]
                                        }
                                    ]).then(data => {
                                        if (data.answer === 'Yes') {
                                            let newStock = parseInt(currentItem.stock_quantity + quantity);
                                            // updates local quantity, may not be needed
                                            currentItem.stock_quantity = newStock;
                                            connection.query(
                                                "UPDATE products SET ? WHERE ?",
                                                [
                                                    {
                                                        stock_quantity: newStock
                                                    },
                                                    {
                                                        item_id: currentItem.item_id
                                                    }
                                                ],
                                                function (err) {
                                                    if (err) throw err;
                                                    console.log(quantity + " " + currentItem.product_name + "'s added to cart.");
                                                    console.log("---------------------------------------");
                                                    customer.chooseTransaction();
                                                });
                                        }
                                        else {
                                            console.log("No problem. Exiting to menu.")
                                            customer.chooseTransaction();
                                        }
                                    });
                                }
                                else {
                                    console.log("Please enter a positive quantity");
                                    addInventory();
                                }
                            });
                        }
                        else {
                            customer.chooseTransaction();
                        }
                    });
                }
                else {
                    console.log("Sorry! " + res[0].product_name + " is currently out of stock. Please try another item")
                    addCart();
                }
            }
        );
    });
}

// add new product to store
function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the product\'s name:'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter the product\'s department:'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Enter the product\'s price ($):'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter the product\'s stock quantity:'
        }
    ]).then(data => {
        let newProduct = new Product(data.name, data.department, data.price, data.quantity)

        const config = require("./databaseConfig");
        let connection = config.connection;

        let sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?)"
        let values = [newProduct.product_name, newProduct.department_name, newProduct.price, newProduct.stock_quantity];


        connection.query(sql, [values], function (err) {
            if (err) throw err;
            else {
                console.log(newProduct.product_name + " added to products.");
            }
        });
    });
}


module.exports = managerMethods;