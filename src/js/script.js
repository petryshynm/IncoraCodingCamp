
import {getS, wrapErrors, inputValidation, closeModal, openModal, modalWindow } from './utilities/utils';
import { Validation } from './classes/Validation';
import { renderUserInfo, renderProducts, renderCart } from './utilities/render';
import { User } from './classes/User';
import { Admin } from './classes/Admin';
import { Product } from './classes/Product';



try {
    
    let user, role,  productsDB = [
            new Product('Coca Cola', 12.5, 500),
            new Product('Coca Cola Zero', 12.5, 400),
            new Product("Sprite", 11.5, 750),
            new Product('Medoff 0.5', 110, 50),
            new Product('Globyno', 22.5, 100),
            new Product('Parlament Aqua Blue', 69.5, 1000),
            new Product('LM Loft Blue', 65, 99),
            new Product('Winston XStyle Blue', 66, 204),
            new Product('Winston XStyle Grey', 66, 300)
        ];


    getS('.checkout').onclick = wrapErrors(() => {
        user.cart.checkout();
        renderCart(user);
        renderProducts(user,productsDB);
        renderUserInfo(user,role);
    });

    getS('.withdraw').onclick = wrapErrors(() => {
        user.cart.withdraw();
        renderCart(user);
    });

    getS('.role').addEventListener('click', wrapErrors((e) => {
        if (e.target.value) {
            role = e.target.value;
            closeModal('.role');
            openModal('.sign-in');
        }
    }));

    getS('.sign-in').addEventListener('submit', wrapErrors((event) => {
        event.preventDefault();
        const form = new FormData(event.target),
            formData = Object.fromEntries(form.entries()),
            nameCheck = inputValidation(Validation.isName(formData.userName), event.target.userName),
            balanceCheck = inputValidation(Validation.isNumber(+formData.userBalance, 0), event.target.userBalance)
        if (nameCheck && balanceCheck) {
            if (role === 'Admin') {
                user = new Admin(formData.userName, +formData.userBalance);
                getS('.user-info__add-product').style.display = 'block';
            } else {
                user = new User(formData.userName, +formData.userBalance);
            }
            closeModal('.sign-in');
            document.querySelectorAll('.prod-container').forEach(elem => elem.style.display = 'flex');
            renderProducts(user,productsDB);
            renderUserInfo(user, role);
        }
    }));


    getS('.new-product-modal__btn').onclick = wrapErrors(() => {
        const prodName = getS('.new-product-modal__name'),
            prodPrice = getS('.new-product-modal__price'),
            prodAmount = getS('.new-product-modal__amount'),
            priceCheck = inputValidation(Validation.isNumber(+prodAmount.value, 0), prodAmount),
            amountCheck = inputValidation(Validation.isNumber(+prodPrice.value, 0), prodPrice);
        if (priceCheck && amountCheck) {
            const newProduct = new Product(prodName.value, +prodPrice.value, +prodAmount.value);
            productsDB.push(newProduct);
            renderProducts(user,productsDB);
            closeModal('.new-product-modal');
        }
    });

    getS('.user-info__btn').onclick = wrapErrors(() => {
        const sortingField = getS('.sorting-field').value;
        const sortingType = getS('.sorting-type').value;
        console.log(user.showOrderHistory(sortingField, sortingType));
        alert('Check the console!') //  Вивів в консоль, бо не міг придумати вигляду для реально зручної, легкої модалки 
    });

    getS('.user-info__add-product').onclick = wrapErrors(() => {
        openModal('.new-product-modal');
    });

    modalWindow('.cart-modal');
    modalWindow('.error-modal');
    modalWindow('.new-product-modal');

} catch (err) {
    getS('.error-modal__explanation').textContent = err.message;
    openModal('.error-modal');
}
