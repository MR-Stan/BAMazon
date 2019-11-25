class Manager {
// inquirer prompt for cases

    function chooseTransaction() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'transaction',
            message: 'Select a transaction:',
            choices: [
                'View All Available Products',
                'View Low Inventory Products',
                'Add Inventory to a Product',
                'Add New Product'
            ]
        }
    ]).then(data => {
        // determines which file run function to call - each contains unique functionality
        switch (data.transaction) {
            case "View All Available Products":
                viewProducts();
                break;
            case "View Low Inventory Products":
                lowInventory();
                break;
            case "Add Inventory to a Product":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    });
}

// list available items - IDs, names, prices, and quantities
function viewProducts() {

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
}

module.exports = new Manager();