// npm mySQL package
let mysql = require('mysql');

let myModule = require("./main");

let SQLPassword = myModule.SQLPassword;

config = {
    host: 'localhost',
    user: 'root',
    password: SQLPassword,
    database: 'bamazon'
}

let connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) {
        console.log('error connecting:' + err.stack);
    }
    //console.log('connected successfully to DB.');
});

module.exports = {
    connection: mysql.createConnection(config)
} 