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
    product_sales NUMERIC
    (20,2) NOT NULL DEFAULT 0.00,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Laptop", "Electronics", 999.85, 55),
        ("Kayak", "Outdoors", 1885.67, 15),
        ("RX Bar", "Groceries", 3.50, 1987),
        ("Peanut Butter", "Groceries", 2.05, 941),
        ("Phone Charger", "Electronics", 9.95, 78),
        ("Make Up", "Cosmetics", 35.00, 919),
        ("Tent", "Outdoors", 159.99, 78),
        ("Granola", "Groceries", 4.89, 657),
        ("Dog Food", "Groceries", 29.99, 135),
        ("Yeezys", "Footwear", 289.99, 75),
        ("Hammock", "Outdoors", 79.99, 94);

    CREATE TABLE departments
    (
        department_id INTEGER(255)
        AUTO_INCREMENT NOT NULL,
    department_name VARCHAR
        (55) NOT NULL,
    over_head_costs INTEGER
        (20) NOT NULL,
    PRIMARY KEY
        (department_id)
);


        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES
            ("Electronics", 55000),
            ("Groceries", 35000),
            ("Cosmetics", 15000),
            ("Outdoors", 20000),
            ("Footwear", 10000);