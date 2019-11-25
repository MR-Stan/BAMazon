class Customer {

    // prompts customer to select a transaction
    function chooseTransaction() {
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

// needs to display all of the items available for sale - include ids, names, and prices
function displayProducts() {

}

// ask user for the ID of the product they would like to buy
// ask user how many units they would like to buy
function addCart() {

}

// check the user inputs from howMany to see if the store has enough of the product
function checkOrder() {
    // should be greater than user input not 0
    if (item.quantity > 0) {
        // update sql database by removing the requested amount
        // show the customer their total for that item
    }
    else {
        console.log(`Dear Valued Customer, \nWe apologize for the inconvenience, 
            but we're currently out of stock in your selected product. Please select
            another item.`)
    }
}

// displays items in user's cart
function checkCart() {

}

// shows user all items in cart and sum total
function checkOut() {

}
}

module.exports = new Customer();