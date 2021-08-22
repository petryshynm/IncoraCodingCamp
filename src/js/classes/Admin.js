import {User} from './User'
class Admin extends User {
    createProduct(name, price, totalAmount) {
        new Product(name, price, totalAmount);
        // ....
    }
}
export { Admin };