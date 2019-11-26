// npm inquirer package
const inquirer = require("inquirer");

let supervisorMethods = {
    // inquirer prompt fto run functions
    chooseTransaction: function () {
        inquirer.prompt([
            {
                type: 'list',
                name: 'transaction',
                message: 'Select a transaction:',
                choices: [
                    'View Sales by Department',
                    'Add New Department'
                ]
            }
        ]).then(data => {
            // determines which file run function to call - each contains unique functionality
            switch (data.transaction) {
                case "View Sales by Department":
                    viewSales();
                    break;
                case "Add New Department":
                    addDept();
                    break;
                case "Exit":
                    process.exit();
                    break;
            }
        });
    }
}


// view sales by department
function viewSales() {
    // display a summarized table with
    // department_id, department_name, over_head_costs, product_sales, total_profit
}

function addDept() {

}



module.exports = supervisorMethods;