# BAMazon - Command Line Store 
BAMazon is a command line store that carries all of the items you need.

## Overview
BAMazon is a command line node application that takes in a variety of parameters and returns corresponding data. To accomplish this, it utilizes node.js, npm inquirer, SQL, and a mySQL database.

## Installation
1. Clone the repository below
```sh
git clone git@github.com:MR-Stan/BAMazon.git
```
3. Install NPM packages
```sh
npm i
```
4. Run the SQL script in the bamazon.sql file

5. Navigate into the BAMazon folder in node run main.js
```sh
node main.js
```

## Operation
All functions can be reached by answering inquirer prompts. To being the user must enter their mySQL password. From there they can choose from three access levels: Customer, Supervisor, and Manager.

<!-- ![log-data](gifs/log.gif) -->

### Customer
* Display Products
<!-- ![log-data](gifs/log.gif) -->

* Add to Cart
<!-- ![log-data](gifs/log.gif) -->

* Show Items in Cart
<!-- ![log-data](gifs/log.gif) -->

* Check Out
<!-- ![log-data](gifs/log.gif) -->

* Exit
<!-- ![log-data](gifs/log.gif) -->

### Supervisor
* View Sales by Department
<!-- ![log-data](gifs/log.gif) -->

* Add New Department
<!-- ![log-data](gifs/log.gif) -->

* Exit
<!-- ![log-data](gifs/log.gif) -->

### Manager
* View Products for Sale
<!-- ![log-data](gifs/log.gif) -->

* View Low Inventory
<!-- ![log-data](gifs/log.gif) -->

* Add to Inventory
<!-- ![log-data](gifs/log.gif) -->

* Add New Product
<!-- ![log-data](gifs/log.gif) -->