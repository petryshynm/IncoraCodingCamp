import { Validation } from './Validation';
import { Product } from './Product';
class Cart {
    constructor(user) {
        this._user = user;
        this._cartStorage = [];
    }
    get storage() {
        return this._cartStorage;
    }
    addProduct(product, amount) {
        if (Validation.isNumber(amount, 0) && product instanceof Product) {
            const existingProduct = this._cartStorage.findIndex((element, index, array) => element.product == product)
            if (existingProduct != -1) this._cartStorage[existingProduct].amount += amount;
            else this._cartStorage.push({
                product,
                amount
            });
        } else throw new Error('Invalid product value.')
    }
    removeProduct(prodName) {
        if (this._cartStorage.length != 0 && prodName) {
            this._cartStorage = this._cartStorage.filter(data => data.product.name != prodName);
        }
    }
    withdraw() {
        this._cartStorage.length = 0;
    }
    checkout() {
        if (this._cartStorage.length == 0) throw new Error('Cart is empty.');
        const totalPrice = this._cartStorage.reduce((sum, {
            product,
            amount
        }) => sum + amount * product.price, 0);
        this._user.addOrder(this._cartStorage, totalPrice, new Date());
    }
}
export { Cart };