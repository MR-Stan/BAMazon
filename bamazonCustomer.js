// npm inquirer package
const inquirer = require("inquirer");

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
                    'Check Out'
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
                    //connection.end();
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
            type: 'number',
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
                console.log("---------------------------------------------------------------------------------------------------")
                console.log(
                    "Item ID: " + res[0].item_id +
                    " | Name: " + res[0].product_name +
                    " | Department: " + res[0].department_name +
                    " | Price: $" + res[0].price +
                    " | Quantity in Stock: " + res[0].stock_quantity
                );
                console.log("---------------------------------------------------------------------------------------------------")
            }
        );
        // if stock > 0, prompt the user how many they want to purchse, based on that amount call checkorder, if there is sufficient amount, ask the user to confirm, push or cart and update db
        // checkOrder();
        // cart.push(res);
    });
}

// displays items in user's cart
function checkCart() {

}

// shows user all items in cart and sum total
function checkOut() {

}

// check the user inputs from howMany to see if the store has enough of the product
function checkOrder() {
    // should be greater than user input not 0
    if (item.quantity > 0) {
        // update sql database by removing the requested amount
        // show the customer their total for that item
    }
    else {
        console.log(`Dear Valued Customer, \nWe sincerely apologize for the inconvenience, 
            but we're currently out of stock in your selected product. Please select
            another item.`)
    }
}

module.exports = customerMethods;
