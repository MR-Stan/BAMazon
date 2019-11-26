// npm inquirer package
const inquirer = require("inquirer");

let currentItem = {};

let cart = [];

let customerMethods = {
    // prompts customer to select a transaction
    chooseTransaction: function () {
        inquirer.prompt([
            {
                type: 'list',
                name: 'transaction',
                message: 'Select a transaction:',
                choices: [
                    'Display Products',
                    'Add to Cart',
                    'Show Items in Cart',
                    'Check Out',
                    'Exit'
                ]
            }
        ]).then(data => {
            // determines which file run function to call - each contains unique functionality
            switch (data.transaction) {
                case "Display Products":
                    displayProducts();
                    break;
                case "Add to Cart":
                    addCart();
                    break;
                case "Show Items in Cart":
                    checkCart();
                    break;
                case "Check Out":
                    checkOut();
                    break;
                case "Exit":
                    process.exit();
                    break;
            }
        });
    }
}


// needs to display all of the items available for sale - include ids, names, and prices
function displayProducts() {
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
                    customerMethods.chooseTransaction();
                }
            }
        });
}

// ask user for the ID of the product they would like to buy
// ask user how many units they would like to buy
function addCart() {
    const config = require("./databaseConfig");
    let connection = config.connection;

    inquirer.prompt([
        {
            type: 'number', // need to validate
            name: 'itemid',
            message: 'Enter the ID number of the item you\'d like to purchase: ',
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
                                    message: 'How many would you like to purchase?',
                                }
                            ]).then(data => {
                                let quantity = data.quantity;
                                if (quantity <= currentItem.stock_quantity) {
                                    let total = parseFloat(data.quantity * currentItem.price);
                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'answer',
                                            message: 'Are you sure you want to buy ' + quantity + " " + currentItem.product_name + "'s for $" + total + "?",
                                            choices: [
                                                'Yes',
                                                'No'
                                            ]
                                        }
                                    ]).then(data => {
                                        if (data.answer === 'Yes') {
                                            let newStock = parseInt(currentItem.stock_quantity - quantity);
                                            currentItem.stock_quantity = quantity;
                                            cart.push(currentItem);
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
                                                    console.log(currentItem.stock_quantity + " " + currentItem.product_name + "'s added to cart.");
                                                    customerMethods.chooseTransaction();
                                                });
                                        }
                                        else {
                                            console.log("No problem. Exiting to menu.")
                                            customerMethods.chooseTransaction();
                                        }
                                    });
                                }
                                else {
                                    console.log("Dear Valued Customer, \nWe sincerely apologize for the inconvenience, but we're currently out of stock in your selected product. Please select another item.");
                                    addCart();
                                }
                            });
                        }
                        else {
                            customerMethods.chooseTransaction();
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

// displays items in user's cart
function checkCart() {

}

// shows user all items in cart and sum total
function checkOut() {

}

module.exports = customerMethods;
