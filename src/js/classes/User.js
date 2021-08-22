import { Validation } from './Validation';
import { Cart } from './Cart';
import { Order } from './Order';

class User {
    constructor(name, balance) {
        this._orderHistory = [];
        this._cart = new Cart(this);
        this.name = name;
        this.balance = balance;
    }

    showOrderHistory(sortingField, sortingType = 'asc') {
        let sortedHistory = this._orderHistory.sort((a, b) => {
            if (sortingField == 'date') {
                return a.date - b.date;
            } else if (sortingField == 'price') {
                return a.totalPrice - b.totalPrice;
            }
        });
        if (sortingType == 'desc') sortedHistory = sortedHistory.reverse();
        return sortedHistory;
    }
    get cart() {
        return this._cart;
    }
    addOrder(products, totalPrice, date) {
        console.log(totalPrice, this.balance);
        if (totalPrice <= this.balance) {
            this.balance -= totalPrice;
        } else throw new Error('Insufficient funds in the account.');
        products.map(({
            product,
            amount
        }) => product.substractAmount(amount));
        this.cart._cartStorage = [];
        this._orderHistory.push(new Order(products, totalPrice, date));
    }
    get name() {
        return this._name;
    }
    set name(name) {
        if (Validation.isName(name)) this._name = name;
        else throw new Error('Name must contain letters and spaces only.')
    }
    get balance() {
        return this._balance;
    }
    set balance(balance) {
        this._balance = Validation.isNumber(balance, -0.001);
    }
}

export { User };