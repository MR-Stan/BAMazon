DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INTEGER(255)
    AUTO_INCREMENT NOT NULL,
    product_name VARCHAR
    (55) NOT NULL,
    department_name VARCHAR
    (55) NOT NULL,
    price NUMERIC
    (20, 2) NOT NULL,
    stock_quantity INTEGER
    (255) NOT NULL,
    PRIMARY KEY
    (item_id)
);

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