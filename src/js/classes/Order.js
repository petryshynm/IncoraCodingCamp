import { Validation } from './Validation';
class Order {
    constructor(products, totalPrice, date) {
        this.products = products;
        this.totalPrice = totalPrice;
        this.date = date;
    }
    get products() {
        return this._products;
    }
    set products(products) {
        this._products = Validation.isArray(products);
    }
    get totalPrice() {
        return this._totalPrice;
    }
    set totalPrice(totalPrice) {
        this._totalPrice = Validation.isNumber(totalPrice, 0);
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = Validation.isDate(date);
    }
}
export { Order };