-- delete the database if it already exists
DROP DATABASE IF EXISTS bamazon;

-- create the database
CREATE DATABASE bamazon;

-- use the database
USE bamazon;

-- create a table in the database
CREATE TABLE products
(
    -- creates a unique id for each entry
    id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (55) NULL,
    department_name VARCHAR
    (55) NULL,
    price DECIMAL
    (10,2) NULL,
    stock_quantity INTEGER
    (55),
    PRIMARY KEY
    (id)
);

    -- adds mock products to the database table
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Laptop", "Electronics", 999.85, 15),
        ("Kayak", "Outdoors", 1885.67, 5),
        ("RX Bar", "Groceries", 3.50, 987),
        ("Peanut Butter", "Groceries", 2.05, 441),
        ("Phone Charger", "Electronics", 9.95, 78),
        ("Make Up", "Cosmetics", 35.00, 19),
        ("Tent", "Outdoors", 159.99, 8),
        ("Granola", "Groceries", 4.89, 57),
        ("Dog Food", "Groceries", 29.99, 7),
        ("Hammock", "Outdoors", 79.99, 4);