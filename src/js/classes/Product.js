import { Validation } from './Validation';
class Product {
    constructor(name, price, totalAmount) {
        this.name = name;
        this.price = price;
        this.totalAmount = totalAmount;
    }
    substractAmount(amount) {
        if (amount <= this.totalAmount) {
            this.totalAmount -= amount;
        } else throw new Error('Insufficient quantity of goods.');
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = Validation.isNumber(price, 0);
    }
    get totalAmount() {
        return this._totalAmount;
    }
    set totalAmount(totalAmount) {
        this._totalAmount = Validation.isNumber(totalAmount, -0.001);
    }
}
export { Product };