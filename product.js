class Product {
    constructor(name, department, price, quantity) {
        this.product_name = name;
        this.department_name = department;
        this.price = parseFloat(price);
        this.stock_quantity = parseInt(quantity);
    }
}

module.exports = Product;